import React from "react";
import ProjectCards from "../components/ProjectCards";
import styled from "styled-components";
import smilingAvatar from "../assets/smiling-avatar.png";

const ProjectsContainer = styled.div`
  position: relative;
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
  font-size: 28px;
  font-weight: bold;
  color: var(--white);
  margin: 20px 0 93px 0;
  @media (min-width: 1023.99px) {
    font-size: 48px;
    margin: 20px 0 93px 0;
  }
`;

const ProjectsImg = styled.img`
  position: absolute;
  top: -60px;
  right: 30px;
  width: 150px;
  margin: 20px 0;
  @media (min-width: 1023.99px) {
    top: 0px;
    left: 1000px;
    width: 200px;
  }
`;

const Projects = () => {
  return (
    <ProjectsContainer>
      <ProjectsTitle>Projects</ProjectsTitle>
      <ProjectsImg src={smilingAvatar} alt="smiling-avatar" />
      <ProjectCards />
    </ProjectsContainer>
  );
};

export default Projects;
