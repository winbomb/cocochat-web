import { useAppSelector } from "@/app/store";
import SettingBlock from "@/components/SettingBlock";
import { useTranslation } from "react-i18next";
import { useGetSystemCommonQuery, useUpdateSystemCommonMutation } from "@/app/services/server";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { shallowEqual } from "react-redux";
import Toggle from "@/components/styled/Toggle";

type Props = {};

const OnlyAdminCreateGroup = ({}: Props) => {
  const { t } = useTranslation("setting");
  const { t: ct } = useTranslation();
  const { refetch } = useGetSystemCommonQuery();
  const onlyAdminCreateGroup = useAppSelector(
    (store) => store.server.only_admin_can_create_group ?? false,
    shallowEqual
  );
  const [updateSetting, { isSuccess }] = useUpdateSystemCommonMutation();
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(ct("tip.update"));
    }
  }, [isSuccess]);
  const toggleEnable = () => {
    updateSetting({ only_admin_can_create_group: !onlyAdminCreateGroup });
  };
  return (
    <SettingBlock
      title={t("overview.admin_create_group.title")}
      desc={t("overview.admin_create_group.desc")}
      toggler={<Toggle onClick={toggleEnable} checked={onlyAdminCreateGroup}></Toggle>}
    ></SettingBlock>
  );
};

export default OnlyAdminCreateGroup;
