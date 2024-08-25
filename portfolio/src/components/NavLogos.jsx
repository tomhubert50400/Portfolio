import React from "react";
import "../index.css";
import styled from "styled-components";
import githubLogo from "../assets/icons/github-icon.svg";
import linkedinLogo from "../assets/icons/linkedin-icon.svg";
import instagramLogo from "../assets/icons/instagram-icon.svg";

const LogoContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const Logo = styled.img`
  width: 28px;
  margin: 0 30px;
  @media (min-width: 1023.98px) {
    width: 40px;
    margin-left: 50px;
  }
`;
const LogoLink = styled.a`
  text-decoration: none;
`;

const NavLogos = () => {
  return (
    <LogoContainer>
      <LogoLink href="https://github.com/tomhubert50400" target="_blank">
        <Logo src={githubLogo} alt="GitHub logo" />
      </LogoLink>
      <LogoLink href="https://www.linkedin.com/in/tom-hubert/" target="_blank">
        <Logo src={linkedinLogo} alt="LinkedIn logo" />
      </LogoLink>
      <LogoLink href="https://www.instagram.com/tomhrt1/" target="_blank">
        <Logo src={instagramLogo} alt="Instagram logo" />
      </LogoLink>
    </LogoContainer>
  );
};

export default NavLogos;
