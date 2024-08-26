import React from "react";
import ProjectCards from "../components/ProjectCards";
import styled from "styled-components";
import smilingAvatar from "../assets/smiling-avatar.png";

const Container = styled.div`
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

const ProjectsContainer = styled.div`
  position: relative; /* Le conteneur parent définit le cadre de référence pour l'avatar */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 350px;
  margin-bottom: 40px;
  @media (min-width: 1023.99px) {
    padding: 0 80px;
    margin-top: 40px;
  }
`;

const ProjectsTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: var(--white);
  margin: 20px 0 77px 0;
  @media (min-width: 1023.99px) {
    font-size: 48px;
    margin: 20px 0 122px 0;
  }
`;

const ProjectsImg = styled.img`
  position: absolute;
  top: -20px;
  right: 40px;
  width: 120px;
  @media (min-width: 1023.99px) {
    top: -50px;
    right: 30px;
    width: 200px;
  }
`;

const Projects = () => {
  return (
    <Container id="projects">
      <ProjectsContainer>
        <ProjectsTitle>Projects</ProjectsTitle>
        <ProjectsImg src={smilingAvatar} alt="smiling-avatar" />
        <ProjectCards />
      </ProjectsContainer>
    </Container>
  );
};

export default Projects;
