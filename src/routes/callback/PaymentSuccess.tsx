import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import Button from "@/components/styled/Button";

type Props = {
  sid: string;
};

const PaymentSuccess = ({ sid }: Props) => {
  const { t } = useTranslation("setting", { keyPrefix: "license" });
  const navigateTo = useNavigate();
  const handleBack = () => {
    navigateTo("/");
  };
  return (
    <section className="flex flex-col items-center bg-slate-100 dark:bg-slate-800 rounded-2xl w-4/5 md:w-[512px] p-6">
      <img
        className="w-28 h-28"
        src="https://s.voce.chat/web_client/assets/img/check.png"
        alt="check icon"
      />
      <h1 className="font-bold text-3xl pt-5">{t("payment_success")}</h1>
      <p className="text-lg pb-7 mt-2 text-gray-400 dark:text-gray-600">
        {t("tip_renewed")}
      </p>
      <Button className="back" onClick={handleBack}>
        {t("back_home")}
      </Button>
    </section>
  );
};

export default PaymentSuccess;
