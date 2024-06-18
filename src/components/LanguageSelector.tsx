import { useTranslation } from "react-i18next";

type Language = {
  code: string;
  lang: string;
};

export default function LanguageSelector() {
  const { t } = useTranslation();

  const languages = [
    { code: "en", lang: "English" },
    { code: "ru", lang: "Russian" },
  ];

  const { i18n } = useTranslation();
  const switchLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <nav className="nab-dropdown-wrapper">
        <a href="#" className="nab-link">
          {t("languages")} ▼
        </a>
        <ul className="nab-dropdown">
          {languages.map((lng: Language) => (
            <li key={lng.code}>
              <a
                className={lng.code === i18n.language ? "selected" : ""}
                onClick={() => switchLanguage(lng.code)}
              >
                {t(`${lng.lang.toLowerCase()}`)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
