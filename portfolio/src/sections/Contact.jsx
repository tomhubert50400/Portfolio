import React from "react";
import styled from "styled-components";
import GradientText from "../components/GradientText";
import { useTranslation } from "react-i18next";

const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const ContactSubContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 250px;
  margin: 20px;
  @media (min-width: 1023.99px) {
    max-width: 800px;
  }
`;

const ContactTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: var(--white);
  margin: 20px;
  @media (min-width: 1023.99px) {
    font-size: 48px;
    margin: 20px;
  }
`;

const ContactSubTitleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
`;

const ContactSubTitle = styled.p`
  font-size: 16px;
  background: var(--purple-color);
  color: var(--white);
  padding: 15px;
  margin: 20px;
  width: 150px;
  text-align: center;
  border-radius: 50px;
  border: 2px solid;
  border-color: #bababa;
  transition: all 0.5s ease;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  }
  @media (min-width: 1023.99px) {
    font-size: 24px;
    width: 250px;
    padding: 15px;
  }
`;

const ContactLink = styled.a`
  text-decoration: none;
  color: var(--white);
`;

const ContactSubTierTitle = styled.p`
  font-size: 30px;
  color: var(--white);
`;

const Contact = () => {
  const { t } = useTranslation();
  return (
    <ContactContainer id="contact">
      <ContactSubContainer>
        <ContactTitle>{t("contact_title")}</ContactTitle>
        <GradientText content={t("contact_description")} />
      </ContactSubContainer>
      <ContactSubTierTitle>{t("contact_sub_title")}</ContactSubTierTitle>
      <ContactSubTitleContainer>
        <ContactLink href="https://github.com/tomhubert50400" target="_blank">
          <ContactSubTitle>{t("contact_github")}</ContactSubTitle>
        </ContactLink>
        <ContactLink
          href="mailto:contact@zerqua.com"
          target="_blank"
          title="contact@zerqua.com"
        >
          <ContactSubTitle>{t("contact_email")}</ContactSubTitle>
        </ContactLink>
        <ContactLink
          href="https://www.linkedin.com/in/tom-hubert/"
          target="_blank"
        >
          <ContactSubTitle>{t("contact_linkedin")}</ContactSubTitle>
        </ContactLink>
      </ContactSubTitleContainer>
    </ContactContainer>
  );
};

export default Contact;
