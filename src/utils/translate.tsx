import { useTranslation } from "react-i18next";

function Translate(route: string) {
  4;

  const { t } = useTranslation();

  return t("default.routes." + route);
}

export default Translate;
