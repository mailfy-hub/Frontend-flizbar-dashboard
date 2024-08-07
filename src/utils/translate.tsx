// import React from "react";
import { useTranslation } from "react-i18next";

function Translate(route: string) {
  4;
  console.log("route", route);

  const { t } = useTranslation();

  return t("default.routes." + route);
}

console.log("Translate", Translate("dashboard"));

export default Translate;
