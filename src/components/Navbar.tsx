import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HeaderContext } from "../pages/Layout";
import { Sorting } from "./Sorting";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

export default function Navbar() {
  const { t } = useTranslation();
  const { setSearchText } = useContext(HeaderContext); // teleporting "setSearchText"

  const DEFAULT_BG = "background: #222";
  const SECOND_BG = "background: #777";
  const [bgColor, setBgColor] = useState<string>(DEFAULT_BG);
  function switchColor() {
    if (bgColor === DEFAULT_BG) {
      setBgColor(SECOND_BG);
      document.body.style.cssText = `${SECOND_BG}; background-size: 400% 400%; animation: gradient 20s ease infinite;`;
    } else {
      setBgColor(DEFAULT_BG);
      document.body.style.cssText = `${DEFAULT_BG}`;
    }
  }

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link className="nav-link nav-link-home" to={"/"}>
          {t("home")}
        </Link>
        {Object.keys(useParams()).length === 0 && (
          <input
            placeholder={t("search_category")}
            type="search"
            onChange={(event) => setSearchText(event.target.value)}
            className="nav-searching-button"
          ></input>
        )}
        <Sorting />
      </div>
      <div className="nav-right">
        <LanguageSelector />
        <button className="nav-button" onClick={switchColor}>
          {t("switch_mode")}
        </button>
      </div>
    </nav>
  );
}
