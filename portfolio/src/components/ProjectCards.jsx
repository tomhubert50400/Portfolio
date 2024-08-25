import React from "react";
import styled from "styled-components";

const ProjectCardsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  width: 350px;
  height: 400px;
  @media (min-width: 1023.99px) {
    padding: 0 80px;
    margin-top: 40px;
  }
`;

const ProjectCardsTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: var(--white);
  margin: 20px 0;
  @media (min-width: 1023.99px) {
    font-size: 48px;
    margin: 0;
  }
`;

const ProjectCards = ({ image, stack, title, techno }) => {
  return (
    <ProjectCardsContainer>
      <ProjectCardsTitle>Projects</ProjectCardsTitle>
    </ProjectCardsContainer>
  );
};

export default ProjectCards;
