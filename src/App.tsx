import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Routes } from "./routes";
import { ScrollToTop } from "./utils/scrollToTop";
import "react-tooltip/dist/react-tooltip.css";
export function App() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("pt");

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <>
      <ScrollToTop />
      <Routes />
    </>
  );
}
