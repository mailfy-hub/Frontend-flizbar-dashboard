"use client";
import { useMemo, useState, useEffect } from "react";
import { Locale, defaultLocale } from "../../i18n";
import Br from "../../assets/br.png";
import Eua from "../../assets/eua.png";
import Es from "../../assets/es.png";
import { useWindowSize } from "@uidotdev/usehooks";
import { useTranslation } from "react-i18next";

const flagMap: { [key in Locale]: any } = {
  pt: Br,
  en: Eua,
  es: Es,
};

const languagesTitles: { [key in Locale]: string } = {
  pt: "Português",
  en: "English",
  es: "Espanhol",
};

const languageKeys: Locale[] = Object.keys(languagesTitles) as Locale[];

export default function LocaleSwitch() {
  const [selectedLocale, setSelectedLocale] = useState<Locale>(defaultLocale);
  const [isOpen, setIsOpen] = useState(false);

  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const size = useWindowSize();
  const isMobile = useMemo(() => {
    if (size && size.width) {
      return size.width < 600;
    }
    return false;
  }, [size]);

  const refreshPage = () => {
    window.location.reload();
  };

  const handleSelect = (newLocale: Locale) => {
    setLanguage(newLocale);
    localStorage.setItem("selectedLocale", newLocale);
    localStorage.setItem("language", newLocale);
    setSelectedLocale(newLocale);
    setIsOpen(false);
    refreshPage();
  };

  useEffect(() => {
    const storedLocale = localStorage.getItem("selectedLocale") as Locale;
    if (storedLocale) {
      setSelectedLocale(storedLocale);
    }
  }, []);

  return (
    <div className="relative w-[140px] md:max-w-[60px]">
      <div
        className="rounded-full w-full h-[40px] px-[4px] py-[5px] text-sm bg-black cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <img
            src={flagMap[selectedLocale]}
            alt={selectedLocale}
            width={26}
            height={26}
            className="mr-2"
          />
          {isMobile && <span>{languagesTitles[selectedLocale]}</span>}
        </div>
        <span className="ml-2">&#9660;</span>
      </div>
      {isOpen && (
        <ul className="absolute w-full bg-black rounded-lg mt-1 z-10">
          {languageKeys.map((locale) => (
            <li
              key={locale}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-700 flex items-center"
              onClick={() => handleSelect(locale)}
            >
              <img
                src={flagMap[locale]}
                alt={languagesTitles[locale]}
                width={26}
                height={26}
                className="mr-2"
              />
              {isMobile && languagesTitles[locale]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
