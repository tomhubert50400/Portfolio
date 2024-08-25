import React from "react";
import styled from "styled-components";

const CardsAboutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background-black);
  width: 350px;
  border-radius: 30px;
  background-clip: border-box;
  flex-direction: column;
  height: 140px;
  @media (min-width: 1023.99px) {
    width: 400px;
    height: 280px;
  }
`;

const CardsAboutBorder = styled.div`
  width: 352px;
  height: 142px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    145deg,
    rgba(210, 209, 209, 1) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  @media (min-width: 1023.99px) {
    width: 402px;
    height: 282px;
  }
`;

const CardsAboutTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(242, 231, 254, 1) 10%,
    rgba(88, 42, 140, 1) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  @media (min-width: 1023.99px) {
    font-size: 48px;
    margin: 0;
  }
`;

const CardsAboutText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #d6d6d6;
  margin-top: 20px;
  @media (min-width: 1023.99px) {
    font-size: 28px;
    margin: 20px;
  }
`;

const CardsAbout = ({ title, content }) => {
  return (
    <CardsAboutBorder>
      <CardsAboutContainer>
        <CardsAboutTitle>{title}</CardsAboutTitle>
        <CardsAboutText>{content}</CardsAboutText>
      </CardsAboutContainer>
    </CardsAboutBorder>
  );
};

export default CardsAbout;
