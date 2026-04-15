import { useTranslation } from "react-i18next";

import { LoginConfig } from "@/types/server";
import SaveTip from "@/components/SaveTip";
import Label from "@/components/styled/Label";
import Toggle from "@/components/styled/Toggle";
import useConfig from "@/hooks/useConfig";

export default function Logins() {
  const { t } = useTranslation("setting", { keyPrefix: "login" });
  const { values, updateConfig, setValues, reset, changed } = useConfig("login");
  const handleUpdate = async () => {
    if (changed && values) {
      updateConfig(values);
    }
  };
  const handleToggle = (
    val: Partial<Pick<LoginConfig, "password" | "magic_link" | "passkey">>
  ) => {
    if (values) {
      setValues({ ...values, ...val });
    }
  };
  if (!values) return null;
  const { password, magic_link, passkey } = values as LoginConfig;

  return (
    <div className="setting-container max-md:w-full max-md:h-auto max-md:py-4">
      <div className="inputs">
        <div className="input">
          <div className="row">
            <div className="title">
              <div className="txt">
                <Label>{t("password")}</Label>
              </div>
              <span className="desc dark:!text-gray-400">{t("password_desc")}</span>
            </div>
            <Toggle
              onClick={handleToggle.bind(null, { password: !password })}
              checked={password}
            ></Toggle>
          </div>
        </div>
        <div className="input">
          <div className="row">
            <div className="title">
              <div className="txt">
                <Label>{t("magic_link")}</Label>
              </div>
              <span className="desc dark:!text-gray-400">{t("magic_link_desc")}</span>
            </div>
            <Toggle
              onClick={handleToggle.bind(null, { magic_link: !magic_link })}
              checked={magic_link}
            ></Toggle>
          </div>
        </div>
        <div className="input">
          <div className="row">
            <div className="title">
              <div className="txt">
                <Label>{t("passkey")}</Label>
              </div>
              <span className="desc dark:!text-gray-400">{t("passkey_desc")}</span>
            </div>
            <Toggle
              onClick={handleToggle.bind(null, { passkey: !passkey })}
              checked={passkey}
            ></Toggle>
          </div>
        </div>
      </div>
      {changed && <SaveTip saveHandler={handleUpdate} resetHandler={reset} />}
    </div>
  );
}
