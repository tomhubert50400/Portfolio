import React from "react";
import styled from "styled-components";

const ProjectsContainer = styled.div`
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

const ProjectsTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: var(--white);
  margin: 20px 0;
  @media (min-width: 1023.99px) {
    font-size: 48px;
    margin: 0;
  }
`;

const Projects = () => {
  return (
    <ProjectsContainer>
      <ProjectsTitle>Projects</ProjectsTitle>
    </ProjectsContainer>
  );
};

export default Projects;
