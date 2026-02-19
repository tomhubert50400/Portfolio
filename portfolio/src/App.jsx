import "./index.css";
import "./config/i18n";

import Home from "./pages/Home.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

function App() {
  const { i18n } = useTranslation();
  const [isAdmin, setIsAdmin] = useState(
    window.location.hash === "#admin"
  );

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  useEffect(() => {
    const onHashChange = () => {
      setIsAdmin(window.location.hash === "#admin");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("preferredLanguage", lng);
  };

  return <>{isAdmin ? <AdminPage /> : <Home />}</>;
}

export default App;
