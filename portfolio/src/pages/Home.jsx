import Header from "../sections/Header";
import About from "../sections/About";
import Projects from "../sections/Projects";
import styled from "styled-components";
import backgroundMobile from "../assets/background-mobile.png";
import backgroundDesktop from "../assets/background-desktop.png";

const HomeContainer = styled.div`
  background-image: url(${backgroundMobile});
  background-size: repeat;
  min-height: 100vh;
  @media (min-width: 768px) {
    background-image: url(${backgroundDesktop});
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Header />
      <About />
      <Projects />
    </HomeContainer>
  );
};

export default Home;
