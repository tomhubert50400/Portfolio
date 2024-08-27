import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import projectDatas from "../assets/data.json";
import cssIcon from "../assets/icons/css-icon.svg";
import htmlIcon from "../assets/icons/html-icon.svg";
import jsIcon from "../assets/icons/js-icon.svg";
import reactIcon from "../assets/icons/react-icon.svg";
import nodeIcon from "../assets/icons/node-icon.svg";
import figmaIcon from "../assets/icons/figma-icon.svg";
import sassIcon from "../assets/icons/sass-icon.svg";
import gitIcon from "../assets/icons/github-icon.svg";
import databaseIcon from "../assets/icons/database-icon.svg";
import linkArrow from "../assets/icons/link-arrow.svg";

Modal.setAppElement("#root");

const techIcons = {
  HTML: htmlIcon,
  CSS: cssIcon,
  JavaScript: jsIcon,
  React: reactIcon,
  Node: nodeIcon,
  Figma: figmaIcon,
  Sass: sassIcon,
  Git: gitIcon,
  Database: databaseIcon,
};

const TechIcon = styled.img`
  justify-content: flex-start;
  width: 25px;
`;

const LinkArrow = styled.img`
  width: 15px;
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
  text-align: start;
  margin-bottom: 10px;
  color: rgba(255, 255, 255, 1);
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

const ProjectModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(33, 33, 33);
  background: linear-gradient(
    145deg,
    rgba(33, 33, 33, 0.871608018207283) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  border-radius: 10px;
  max-width: 800px;
  padding: 10px;
  margin: auto;
  color: white;
`;

const ModalTitle = styled.h2`
  background: rgb(255, 255, 255);
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(152, 128, 179, 1) 59%,
    rgba(90, 44, 143, 0.8155637254901961) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  text-align: center;
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  @media (min-width: 1023.99px) {
    height: 450px;
  }
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const PrevButton = styled(CarouselButton)`
  left: 10px;
  border-radius: 20px;
`;

const NextButton = styled(CarouselButton)`
  right: 10px;
  border-radius: 20px;
`;

const Description = styled.p`
  background: rgb(255, 255, 255);
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(152, 128, 179, 1) 59%,
    rgba(90, 44, 143, 0.8155637254901961) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  text-align: center;
  max-height: ${(props) => (props.isExpanded ? "none" : "60px")};
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  margin: 0;
`;

const ShowMoreButton = styled.button`
  background-color: var(--purple-color);
  border: 1px solid grey;
  border-radius: 50px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  color: white;
  margin-top: 10px;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;

const ProjectLinkButton = styled.a`
  margin-top: 20px;
  border: none;
  font-size: 16px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: var(--purple-dark-color);
  }
`;

const GithubLinkButton = styled.a`
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 16px;
  transition: color 0.3s ease;
`;

const GithubIcon = styled.img`
  width: 24px;
  margin-right: 5px;
`;

const ProjectCards = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const openModal = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setIsDescriptionExpanded(false); // Reset description state
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedProject(null);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedProject.imagesCarousel.length - 1
        ? 0
        : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0
        ? selectedProject.imagesCarousel.length - 1
        : prevIndex - 1
    );
  };

  const toggleDescription = () => {
    setIsDescriptionExpanded((prev) => !prev);
  };

  return (
    <GlobalContainer>
      <ProjectCardsContainer>
        {projectDatas.projects.map((project) => (
          <ProjectCard key={project.id} onClick={() => openModal(project)}>
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
      {selectedProject && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Project Details"
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#2c2c2c",
              border: "1px solid rgb(74 74 74)",
              padding: "0px",
              borderRadius: "10px",
              maxWidth: "800px",
              width: "90vw",
            },
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
          }}
        >
          <ProjectModalContent>
            <ModalTitle>{selectedProject.title}</ModalTitle>

            <CarouselContainer>
              <PrevButton onClick={prevImage}>{"<"}</PrevButton>
              <CarouselImage
                src={selectedProject.imagesCarousel[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
              />
              <NextButton onClick={nextImage}>{">"}</NextButton>
            </CarouselContainer>
            <p>From {selectedProject.year}</p>
            <ProjectTechnologies>
              {selectedProject.technologies.map((tech, index) => (
                <TechBadge key={index}>
                  <TechIcon src={techIcons[tech]} alt={tech} />
                </TechBadge>
              ))}
            </ProjectTechnologies>

            <Description isExpanded={isDescriptionExpanded}>
              {selectedProject.description}
            </Description>
            {selectedProject.description.length > 100 && (
              <ShowMoreButton onClick={toggleDescription}>
                {isDescriptionExpanded ? "Show less" : "Show more"}
              </ShowMoreButton>
            )}

            <ModalCloseButton onClick={closeModal}>X</ModalCloseButton>
            {selectedProject.projectLink && (
              <ProjectLinkButton
                href={selectedProject.projectLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit my project here <LinkArrow src={linkArrow} alt="Link" />
              </ProjectLinkButton>
            )}
            {selectedProject.githubLink && (
              <GithubLinkButton
                href={selectedProject.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon src={gitIcon} alt="GitHub" />
              </GithubLinkButton>
            )}
          </ProjectModalContent>
        </Modal>
      )}
    </GlobalContainer>
  );
};

export default ProjectCards;
