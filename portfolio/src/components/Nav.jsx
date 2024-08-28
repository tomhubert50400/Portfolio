import React from "react";
import styled from "styled-components";
import { useEffect } from "react";
import "../index.css";
import { useTranslation } from "react-i18next";
import uk from "../assets/icons/uk.svg";
import fr from "../assets/icons/fr.svg";

//#region Styles
const NavContainer = styled.div`
  background-color: var(--background-black);
  border: 0.5px solid var(--white);
  border-radius: 50px;
  margin: 30px 40px 30px 40px;
  width: 100%;
  max-width: 500px;
  @media (min-width: 1023.99px) {
    margin: 30px 40px 30px 40px;
  }
`;
const HeaderNav = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const HeaderLink = styled.a`
  display: flex;
  text-decoration: none;
  color: var(--white);
  font-size: 16px;
  font-weight: bold;
  margin: 20px 0 20px 0;
  @media (min-width: 1023.99px) {
    font-size: 24px;
    margin: 30px 0 30px 0;
  }
`;

const LanguageImg = styled.img`
  width: 30px;
  height: 30px;
  @media (min-width: 1023.99px) {
    width: 40px;
    height: 40px;
    margin: 0;
  }
`;

const LanguageButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin: 0;
`;
//#endregion
const Nav = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]); // Cette effet se déclenche au montage du composant

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("preferredLanguage", lng); // Sauvegarde la langue choisie dans le localStorage
  };

  return (
    <>
      <NavContainer>
        <HeaderNav>
          <HeaderLink href="#about">{t("nav_about")}</HeaderLink>
          <HeaderLink href="#projects">{t("nav_projects")}</HeaderLink>
          <HeaderLink href="#contact">{t("nav_contact")}</HeaderLink>
          {i18n.language === "en" && (
            <LanguageButton onClick={() => changeLanguage("fr")}>
              <LanguageImg
                src={fr}
                alt="Français"
                title="click to change language to french"
              />
            </LanguageButton>
          )}
          {i18n.language === "fr" && (
            <LanguageButton onClick={() => changeLanguage("en")}>
              <LanguageImg
                src={uk}
                alt="English"
                title="cliquez pour changer la langue en anglais"
              />
            </LanguageButton>
          )}
        </HeaderNav>
      </NavContainer>
    </>
  );
};

export default Nav;
