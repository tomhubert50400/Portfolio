import React from "react";
import styled from "styled-components";
import GradientText from "./GradientText";

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
  return (
    <AboutDescriptionContainer>
      <AboutDescriptionTitle>About me</AboutDescriptionTitle>
      <GradientText
        content="I'm a young developer who has worked in various sectors, 
      including sales. I've always had a passion for technology and computing in general.  
      I'm looking for my first job as a web developer. I have experience from personal 
      projects which you can view below."
      />
    </AboutDescriptionContainer>
  );
};

export default AboutDescription;
