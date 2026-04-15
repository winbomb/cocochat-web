import SettingBlock from "@/components/SettingBlock";
import { useTranslation } from "react-i18next";
import { KEY_ADMIN_ONLY_INVITE } from "@/app/config";
import useServerExtSetting from "@/hooks/useServerExtSetting";
import Toggle from "@/components/styled/Toggle";

type Props = {};

const WhoCanInviteUsers = ({}: Props) => {
  const { updateExtSetting, getExtSetting } = useServerExtSetting();
  const { t } = useTranslation("setting");
  const adminOnlyCanInvite = getExtSetting(KEY_ADMIN_ONLY_INVITE);
  const handleToggle = () => {
    updateExtSetting(KEY_ADMIN_ONLY_INVITE, !adminOnlyCanInvite);
  };
  return (
    <SettingBlock
      title={t("overview.admin_only_can_invite.title")}
      desc={t("overview.admin_only_can_invite.desc")}
      toggler={<Toggle onClick={handleToggle} checked={adminOnlyCanInvite} />}
    ></SettingBlock>
  );
};
export default WhoCanInviteUsers;
