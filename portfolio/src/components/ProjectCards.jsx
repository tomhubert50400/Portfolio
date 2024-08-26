import React from "react";
import styled from "styled-components";
import projectDatas from "../assets/data.json";
import cssIcon from "../assets/icons/css-icon.svg";
import htmlIcon from "../assets/icons/html-icon.svg";
import jsIcon from "../assets/icons/js-icon.svg";
import reactIcon from "../assets/icons/react-icon.svg";
import nodeIcon from "../assets/icons/node-icon.svg";
import figmaIcon from "../assets/icons/figma-icon.svg";
import sassIcon from "../assets/icons/sass-icon.svg";
import gitIcon from "../assets/icons/github-icon.svg";

const techIcons = {
  HTML: htmlIcon,
  CSS: cssIcon,
  JavaScript: jsIcon,
  React: reactIcon,
  Node: nodeIcon,
  Figma: figmaIcon,
  Sass: sassIcon,
  Git: gitIcon,
};

const TechIcon = styled.img`
  justify-content: flex-start;
  width: 25px;
`;

const GlobalContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  @media (min-width: 1023.99px) {
    width: 100vw;
  }
`;

const ProjectCardsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 50px;
  border-radius: 25px;
  height: auto;
`;

const ProjectCard = styled.div`
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.1);
  width: 300px;
  padding: 15px;
  text-align: center;
  border: 1px solid;
  border-color: #a5a3a3;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  }
  @media (min-width: 1023.99px) {
    width: 350px;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const ProjectTitle = styled.p`
  font-size: 20px;
  color: var(--white);
  text-align: start;
  margin-bottom: 10px;
`;

const ProjectStack = styled.p`
  text-align: start;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 10px;
`;

const ProjectTechnologies = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
`;

const TechBadge = styled.span`
  background-color: var(--background-dark-color);
  color: var(--white-color);
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 14px;
`;

const SpacerHr = styled.hr`
  width: 100%;
  margin: 20px 0;
  border: 0.5px solid;
  border-color: rgba(255, 255, 255, 0.2);
`;

const ProjectCards = () => {
  return (
    <GlobalContainer>
      <ProjectCardsContainer>
        {projectDatas.projects.map((project) => (
          <ProjectCard key={project.id}>
            <ProjectImage src={project.imageUrl} alt={project.title} />
            <ProjectStack>{project.stack}</ProjectStack>
            <ProjectTitle>{project.title}</ProjectTitle>
            <SpacerHr />
            <ProjectTechnologies>
              {project.technologies.map((tech, index) => (
                <TechBadge key={index}>
                  <TechIcon src={techIcons[tech]} alt={tech} />
                </TechBadge>
              ))}
            </ProjectTechnologies>
          </ProjectCard>
        ))}
      </ProjectCardsContainer>
    </GlobalContainer>
  );
};

export default ProjectCards;
