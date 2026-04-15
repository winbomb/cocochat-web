import Tippy from "@tippyjs/react";
import { useState, useMemo } from "react";
import LanguageList, { LangMap, LanguageType } from "../routes/setting/Overview/Language";
import StyledButton from "./styled/Button";
import { useTranslation } from "react-i18next";
import ArrowDown from "@/assets/icons/arrow.down.svg";
import { cn } from "../utils";
type Props = {};

const SelectLanguage = ({}: Props) => {
  const { i18n } = useTranslation();
  const [visible, setVisible] = useState(false);
  const lang = useMemo(() => {
    const langKey = i18n.language.split("-")[0] as LanguageType;
    return LangMap[langKey] || LangMap.en;
  }, [i18n.language]);
  return (
    <Tippy
      onShown={setVisible.bind(null, true)}
      onHidden={setVisible.bind(null, false)}
      interactive
      placement="bottom-end"
      trigger="click"
      content={<LanguageList context="aside" />}
    >
      <StyledButton className="small ghost fixed right-3 top-3 inline-flex gap-1 !w-fit">
        <span>{lang}</span>{" "}
        <ArrowDown
          className={cn("dark:stroke-gray-100 transition-all", visible ? "rotate-180" : "")}
        />{" "}
      </StyledButton>
    </Tippy>
  );
};

export default SelectLanguage;
