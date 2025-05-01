import React from "react";
import styled from "styled-components";
import GradientText from "../components/GradientText";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import ContactForm from "../components/contactForm";

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
const Contact = () => {
  const { t } = useTranslation();

  return (
    <ContactContainer id="contact">
      <ContactContainer id="contact">
        <ContactSubContainer>
          <ContactTitle>{t("contact_title")}</ContactTitle>
        </ContactSubContainer>

        <ContactForm />
      </ContactContainer>
    </ContactContainer>
  );
};

export default Contact;
