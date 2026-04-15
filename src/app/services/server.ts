import { createApi } from "@reduxjs/toolkit/query/react";

import { Channel } from "@/types/channel";
import { ContentTypeKey } from "@/types/message";
import {
  CreateAdminDTO,
  LoginConfig,
  Server,
  SystemCommon,
} from "@/types/server";
import { User } from "@/types/user";
import { compareVersion, encodeBase64 } from "@/utils";
import BASE_URL, {
  ContentTypes,
  KEY_SERVER_VERSION,
} from "../config";
import { updateInfo } from "../slices/server";
import { RootState } from "../store";
import baseQuery from "./base.query";
import { GetFilesDTO, VoceChatFile } from "@/types/resource";
import { GroupAnnouncement } from "@/types/sse";

export const serverApi = createApi({
  reducerPath: "serverApi",
  baseQuery,
  tagTypes: ["GroupAnnouncements"],
  endpoints: (builder) => ({
    getServer: builder.query<Server, void>({
      query: () => ({ url: `/admin/system/organization` }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const { data: server } = await queryFulfilled;
          const logo = `${BASE_URL}/resource/organization/logo?t=${+new Date()}`;
          dispatch(updateInfo({ ...server, logo }));
        } catch {
          console.error("get server info error");
        }
      },
    }),
    getThirdPartySecret: builder.query<string, void>({
      query: () => ({
        url: `/admin/system/third_party_secret`,
        responseHandler: "text",
      }),
      keepUnusedDataFor: 0,
    }),
    updateThirdPartySecret: builder.mutation<string, void>({
      query: () => ({
        url: `/admin/system/third_party_secret`,
        method: "POST",
        responseHandler: "text",
      }),
    }),
    getServerVersion: builder.query<string, void>({
      query: () => ({
        headers: {
          accept: "text/plain",
        },
        url: `/admin/system/version`,
        responseHandler: "text",
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const resp = await queryFulfilled;
          localStorage.setItem(KEY_SERVER_VERSION, resp.data);
          dispatch(updateInfo({ version: resp.data }));
        } catch {
          console.error("get server version error");
        }
      },
    }),
    getSystemCommon: builder.query<SystemCommon, void>({
      query: () => ({ url: `/admin/system/common` }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const resp = await queryFulfilled;
          dispatch(updateInfo(resp.data));
        } catch {
          console.error("get server common error");
        }
      },
    }),
    updateSystemCommon: builder.mutation<void, Partial<SystemCommon>>({
      query: (data) => ({
        url: `/admin/system/common`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(updateInfo(data));
        } catch {
          console.error("update server common error");
        }
      },
    }),
    getLoginConfig: builder.query<LoginConfig, void>({
      query: () => ({ url: `/admin/login/config` }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          const resp = await queryFulfilled;
          if (resp.data) {
            console.info("update login config in redux", resp.data);
            dispatch(updateInfo({ loginConfig: resp.data }));
          }
        } catch {
          console.error("get login config error");
        }
      },
    }),
    getFiles: builder.query<VoceChatFile[], GetFilesDTO>({
      query: (params) => ({
        url: `/admin/system/files?${new URLSearchParams(
          params as Record<string, string>,
        ).toString()}`,
      }),
    }),
    updateLoginConfig: builder.mutation<void, Partial<LoginConfig>>({
      query: (data) => ({
        url: `/admin/login/config`,
        method: "POST",
        body: data,
      }),
    }),
    updateLogo: builder.mutation<void, File>({
      query: (data) => ({
        headers: {
          "content-type": "image/png",
        },
        url: `/admin/system/organization/logo`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            updateInfo({
              logo: `${BASE_URL}/resource/organization/logo?t=${+new Date()}`,
            }),
          );
        } catch {
          console.error("update server logo error");
        }
      },
    }),
    updateServer: builder.mutation<void, Partial<Server>>({
      query: (data) => ({
        url: "admin/system/organization",
        method:
          compareVersion(localStorage.getItem(KEY_SERVER_VERSION) ?? "", "0.3.8") > 0
            ? "PUT"
            : "POST",
        body: data,
      }),
      async onQueryStarted(data, { dispatch, queryFulfilled, getState }) {
        const rootStore = getState() as RootState;
        const { name: prevName, description: prevDesc } = rootStore.server;
        dispatch(updateInfo(data));
        try {
          await queryFulfilled;
        } catch {
          dispatch(updateInfo({ name: prevName, description: prevDesc }));
        }
      },
    }),
    createAdmin: builder.mutation<User, CreateAdminDTO>({
      query: (data) => ({
        url: "/admin/system/create_admin",
        method: "POST",
        body: data,
      }),
    }),
    getFrontendUrl: builder.query<string, void>({
      query: () => ({
        url: `/admin/system/frontend_url`,
        responseHandler: "text",
      }),
    }),
    updateFrontendUrl: builder.mutation<void, string>({
      query: (url) => ({
        url: `/admin/system/update_frontend_url`,
        method: "POST",
        headers: {
          "content-type": "text/plain",
        },
        body: url,
      }),
    }),
    clearAllMessages: builder.query<void, void>({
      query: () => ({
        url: "/admin/system/message/clear",
        method: "DELETE",
      }),
    }),
    clearAllFiles: builder.query<void, void>({
      query: () => ({
        url: "/resource/file/delete",
        method: "DELETE",
      }),
    }),
    getWidgetExtCSS: builder.query<string, void>({
      query: () => ({
        url: "/resource/widget-extra.css",
        responseHandler: "text",
      }),
    }),
    updateWidgetExtCSS: builder.mutation<boolean, string>({
      query: (css) => ({
        url: "/resource/widget-extra.css",
        method: "PUT",
        body: { data: css },
      }),
    }),
    getBotRelatedChannels: builder.query<Channel[], { api_key: string; public_only?: boolean }>({
      query: ({ api_key, public_only = false }) => ({
        url: public_only ? `/bot?public_only=${public_only}` : `/bot`,
        headers: {
          "x-api-key": api_key,
        },
      }),
    }),
    sendMessageByBot: builder.mutation<
      number,
      {
        uid?: number;
        cid?: number;
        api_key: string;
        content: string;
        type?: ContentTypeKey;
        properties?: object;
      }
    >({
      query: ({ uid, cid, api_key, type = "text", properties, content }) => ({
        headers: {
          "x-api-key": api_key,
          "content-type": ContentTypes[type],
          "X-Properties": properties ? encodeBase64(JSON.stringify(properties)) : "",
        },
        url: cid ? `/bot/send_to_group/${cid}` : `/bot/send_to_user/${uid}`,
        method: "POST",
        body: content,
      }),
    }),
    getGroupAnnouncement: builder.query<{ announcement: GroupAnnouncement | null }, number>({
      query: (gid) => ({
        url: `/group/${gid}/announcement`,
      }),
      providesTags: (result, error, gid) => [{ type: "GroupAnnouncements", id: gid }],
    }),
    createOrUpdateGroupAnnouncement: builder.mutation<
      GroupAnnouncement,
      { gid: number; content: string }
    >({
      query: ({ gid, content }) => ({
        url: `/group/${gid}/announcement`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (result, error, { gid }) => [{ type: "GroupAnnouncements", id: gid }],
    }),
    deleteGroupAnnouncement: builder.mutation<void, number>({
      query: (gid) => ({
        url: `/group/${gid}/announcement`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, gid) => [{ type: "GroupAnnouncements", id: gid }],
    }),
  }),
});

export const {
  useLazyGetServerVersionQuery,
  useGetServerVersionQuery,
  useLazyGetLoginConfigQuery,
  useGetLoginConfigQuery,
  useUpdateLoginConfigMutation,
  useGetServerQuery,
  useUpdateServerMutation,
  useUpdateLogoMutation,
  useGetThirdPartySecretQuery,
  useUpdateThirdPartySecretMutation,
  useCreateAdminMutation,
  useLazyGetBotRelatedChannelsQuery,
  useSendMessageByBotMutation,
  useUpdateFrontendUrlMutation,
  useGetFrontendUrlQuery,
  useUpdateSystemCommonMutation,
  useLazyGetSystemCommonQuery,
  useGetSystemCommonQuery,
  useLazyClearAllFilesQuery,
  useLazyClearAllMessagesQuery,
  useLazyGetFilesQuery,
  useGetGroupAnnouncementQuery,
  useCreateOrUpdateGroupAnnouncementMutation,
  useDeleteGroupAnnouncementMutation,
} = serverApi;
