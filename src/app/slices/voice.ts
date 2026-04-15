import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatContext } from "@/types/common";
import { KEY_UID } from "../config";
import { resetAuthData } from "./auth.data";

// Connection state type
type ConnectionState = "CONNECTED" | "DISCONNECTED" | "RECONNECTING" | "CONNECTING";

export type VoiceBasicInfo = {
  context: ChatContext;
  from?: number;
  id: number; // means to in dm context
};

export type VoicingInfo = {
  downlinkNetworkQuality?: number;
  joining?: boolean;
  connectionState?: ConnectionState;
} & VoiceBasicInfo &
  VoicingMemberInfo;

export type VoicingMemberInfo = {
  speakingVolume?: number;
  muted?: boolean;
  deafen?: boolean;
  video?: boolean;
  shareScreen?: boolean;
};

export type CallInfo = {
  from: number;
  to: number;
  calling: boolean;
};

export type VoiceState = {
  voicing?: VoicingInfo;
  members: { [uid: number]: VoicingMemberInfo };
  callInfo?: CallInfo;
};

const initialState: VoiceState = {
  voicing: undefined,
  members: {},
  callInfo: undefined,
};

const voiceSlice = createSlice({
  name: "voice",
  initialState,
  reducers: {
    setVoicing(state, action: PayloadAction<VoicingInfo | undefined>) {
      state.voicing = action.payload;
    },
    updateVoicing(state, action: PayloadAction<Partial<VoicingInfo>>) {
      if (state.voicing) {
        state.voicing = { ...state.voicing, ...action.payload };
      }
    },
    setMembers(state, action: PayloadAction<{ [uid: number]: VoicingMemberInfo }>) {
      state.members = action.payload;
    },
    updateMember(state, action: PayloadAction<{ uid: number; info: Partial<VoicingMemberInfo> }>) {
      const { uid, info } = action.payload;
      if (state.members[uid]) {
        state.members[uid] = { ...state.members[uid], ...info };
      } else {
        state.members[uid] = info as VoicingMemberInfo;
      }
    },
    removeMember(state, action: PayloadAction<number>) {
      delete state.members[action.payload];
    },
    clearVoice(state) {
      state.voicing = undefined;
      state.members = {};
    },
    updateCallInfo(state, action: PayloadAction<CallInfo>) {
      state.callInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAuthData, () => initialState);
  },
});

export const {
  setVoicing,
  updateVoicing,
  setMembers,
  updateMember,
  removeMember,
  clearVoice,
  updateCallInfo,
} = voiceSlice.actions;

export default voiceSlice.reducer;
