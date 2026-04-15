import SettingBlock from "@/components/SettingBlock";
import { useTranslation } from "react-i18next";
import { KEY_ADMIN_SEE_CHANNEL_MEMBERS } from "@/app/config";
import useServerExtSetting from "@/hooks/useServerExtSetting";
import Toggle from "@/components/styled/Toggle";

type Props = {};

const OnlyAdminCanSeeChannelMembers = ({}: Props) => {
  const { updateExtSetting, getExtSetting } = useServerExtSetting();
  const { t } = useTranslation("setting");
  const onlyAdminSeeChannelMembers = getExtSetting(KEY_ADMIN_SEE_CHANNEL_MEMBERS);
  const handleToggle = () => {
    updateExtSetting(KEY_ADMIN_SEE_CHANNEL_MEMBERS, !onlyAdminSeeChannelMembers);
  };
  return (
    <SettingBlock
      title={t("overview.admin_see_group_members.title")}
      desc={t("overview.admin_see_group_members.desc")}
      toggler={<Toggle onClick={handleToggle} checked={onlyAdminSeeChannelMembers} />}
    ></SettingBlock>
  );
};

export default OnlyAdminCanSeeChannelMembers;
