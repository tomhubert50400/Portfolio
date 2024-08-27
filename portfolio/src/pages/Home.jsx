import Header from "../sections/Header";
import About from "../sections/About";
import Projects from "../sections/Projects";
import Contact from "../sections/Contact";
import styled from "styled-components";
import backgroundMobile from "../assets/background-mobile.png";
import backgroundDesktop from "../assets/background-desktop.png";
import Footer from "../sections/Footer";

const HomeContainer = styled.div`
  background-image: url(${backgroundMobile});
  background-size: cover;
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
      <Contact />
      <Footer />
    </HomeContainer>
  );
};

export default Home;
