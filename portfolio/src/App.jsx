import "./index.css";
import "./config/i18n";

import Home from "./pages/Home.jsx";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("preferredLanguage", lng); // Sauvegarde la langue choisie dans le localStorage
  };
  return (
    <>
      <Home />
    </>
  );
}

export default App;
