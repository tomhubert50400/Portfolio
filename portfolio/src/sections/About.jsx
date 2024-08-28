import React from "react";
import styled from "styled-components";
import GradientText from "../components/GradientText";
import Banner from "../components/Banner";
import CardsAbout from "../components/CardsAbout";
import AboutDescription from "../components/AboutDescription";
import { useTranslation } from "react-i18next";

//#region Styles
const AboutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  flex-direction: column;
  @media (min-width: 1023.99px) {
    padding: 0 80px;
  }
`;

const AboutCardsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 40px;
  @media (min-width: 1023.99px) {
    padding: 0 80px;
    flex-direction: row;
  }
`;
//#endregion
const About = () => {
  const { t } = useTranslation();
  return (
    <>
      <AboutContainer id="about">
        <GradientText content={t("about_title1")} />
        <Banner />
        <AboutCardsContainer>
          <CardsAbout title="1 " content={t("cards_content1")} />
          <CardsAbout title="2 " content={t("cards_content2")} />
          <CardsAbout title="5 +" content={t("cards_content3")} />
        </AboutCardsContainer>
        <AboutDescription />
      </AboutContainer>
    </>
  );
};

export default About;
