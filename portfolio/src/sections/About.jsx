import React from "react";
import styled from "styled-components";
import GradientText from "../components/GradientText";
import Banner from "../components/Banner";
import CardsAbout from "../components/CardsAbout";

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

const About = () => {
  return (
    <>
      <AboutContainer id="about">
        <GradientText content="Hi, my name is Tom Hubert and I'm a junior web developer, welcome to my portfolio." />
        <Banner />
        <AboutCardsContainer>
          <CardsAbout title="1 " content="year of experience" />
          <CardsAbout title="2 " content="years of study" />
          <CardsAbout title="5 +" content="different technologies" />
        </AboutCardsContainer>
      </AboutContainer>
    </>
  );
};

export default About;
