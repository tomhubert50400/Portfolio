import React from "react";
import styled from "styled-components";
import GradientText from "./GradientText";
import { useTranslation } from "react-i18next";

const AboutDescriptionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  @media (min-width: 1023.99px) {
    padding: 0 80px;
    margin-top: 40px;
  }
`;

const AboutDescriptionTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: var(--white);
  margin: 20px 0;
  @media (min-width: 1023.99px) {
    font-size: 48px;
    margin: 0;
  }
`;

const AboutDescription = () => {
  const { t } = useTranslation();
  return (
    <AboutDescriptionContainer>
      <AboutDescriptionTitle>
        {t("about_description_title")}
      </AboutDescriptionTitle>
      <GradientText content={t("about_description")} />
    </AboutDescriptionContainer>
  );
};

export default AboutDescription;
