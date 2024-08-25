import React from "react";
import styled from "styled-components";
import Nav from "../components/Nav";
import NavLogos from "../components/NavLogos";
import "../index.css";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  @media (max-width: 1023.98px) {
    flex-direction: column-reverse;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <NavLogos />
      <Nav />
    </HeaderContainer>
  );
};

export default Header;
