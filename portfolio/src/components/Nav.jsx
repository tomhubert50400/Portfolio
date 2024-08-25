import React from "react";
import styled from "styled-components";
import "../index.css";

const NavContainer = styled.div`
  background-color: var(--background-black);
  border: 0.5px solid var(--white);
  border-radius: 50px;
  margin: 30px 40px 30px 40px;
  width: 100%;
  max-width: 500px;
  @media (min-width: 1023.99px) {
    margin: 30px 40px 30px 40px;
  }
`;
const HeaderNav = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const HeaderLink = styled.a`
  display: flex;
  text-decoration: none;
  color: var(--white);
  font-size: 16px;
  font-weight: bold;
  margin: 20px 0 20px 0;
  @media (min-width: 1023.99px) {
    font-size: 24px;
    margin: 30px 0 30px 0;
  }
`;

const Nav = () => {
  return (
    <>
      <NavContainer>
        <HeaderNav>
          <HeaderLink href="#about">About</HeaderLink>
          <HeaderLink href="#projects">Projects</HeaderLink>
          <HeaderLink href="#contact">Contact</HeaderLink>
        </HeaderNav>
      </NavContainer>
    </>
  );
};

export default Nav;
