import React from "react";
import styled from "styled-components";

const ContactContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const ContactTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: var(--white);
  margin: 20px;
`;

const Contact = () => {
  return (
    <ContactContainer>
      <ContactTitle>Contact</ContactTitle>
    </ContactContainer>
  );
};

export default Contact;
