import React from "react";
import styled from "styled-components";
import GradientText from "../components/GradientText";
import Banner from "../components/Banner";

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

const About = () => {
  return (
    <>
      <AboutContainer id="about">
        <GradientText content="Hi, my name is Tom Hubert and I'm a junior web developer, welcome to my portfolio." />
        <Banner />
      </AboutContainer>
    </>
  );
};

export default About;
