import React from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  @media (min-width: 1023.99px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const FooterSubContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90vw;
  @media (min-width: 1023.99px) {
  }
`;

const FooterHr = styled.hr`
  width: 100%;
  margin: 20px 0;
  border: 0.5px solid;
  border-color: rgba(255, 255, 255, 0.5);
`;

const FooterText = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0 10px 0;
  text-align: center;
  line-height: 1.5;
  @media (min-width: 1023.99px) {
    font-size: 14px;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterSubContainer>
        <FooterHr />
        <FooterText>
          © 2024 - Portfolio by Tom HUBERT - All rights reserved
        </FooterText>
      </FooterSubContainer>
    </FooterContainer>
  );
};

export default Footer;
