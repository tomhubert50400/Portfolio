import React from "react";
import styled from "styled-components";
import avatarAbout from "../assets/avatar-about.png";

const BannerContainer = styled.div`
  position: relative; // Ajouté pour que le texte puisse se positionner relativement à ce conteneur
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  @media (min-width: 1023.99px) {
    flex-direction: row;
  }
`;

const Avatar = styled.img`
  width: 350px;
  @media (min-width: 1023.99px) {
    width: 790px;
  }
`;

const TextContainerFirst = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--purple-color);
  border: 1px solid var(--white);
  border-radius: 20px 20px 20px 0px;
  padding: 10px 20px;
  width: auto;
  box-sizing: border-box; // Inclut padding et border dans la largeur
  overflow: hidden; // Assure qu'il n'y a pas de débordement interne
  @media (min-width: 1023.99px) {
    top: 80px;
    right: 20px;
  }
`;

const TextFirst = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: var(--white);
  margin: 0;
  @media (min-width: 1023.99px) {
    font-size: 28px;
    margin: 0;
  }
`;

const TextContainerSecond = styled.div`
  position: absolute;
  top: 150px;
  left: 0px;
  background-color: var(--purple-color);
  border: 1px solid var(--white);
  border-radius: 20px 0px 20px 20px;
  padding: 10px 20px;
  width: auto;
  box-sizing: border-box;
  overflow: hidden;
  @media (min-width: 1023.99px) {
    top: 350px;
    left: 20px;
  }
`;
const TextSecond = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: var(--white);
  margin: 0;
  @media (min-width: 1023.99px) {
    font-size: 28px;
    margin: 0;
  }
`;

const Banner = () => {
  return (
    <BannerContainer>
      <Avatar src={avatarAbout} alt="Tom Hubert" />
      <TextContainerFirst>
        <TextFirst>Hey, I'm Tom !</TextFirst>
      </TextContainerFirst>
      <TextContainerSecond>
        <TextSecond>
          I'm a junior <br />
          Web Developer
        </TextSecond>
      </TextContainerSecond>
    </BannerContainer>
  );
};

export default Banner;
