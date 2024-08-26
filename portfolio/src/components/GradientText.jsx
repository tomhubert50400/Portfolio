import React from "react";
import styled from "styled-components";

const Text = styled.h1`
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
  font-size: 20px;
  line-height: 1.5;
  text-align: center;
  @media (min-width: 1023.99px) {
    font-size: 32px;
  }
`;

const GradientText = ({ content }) => {
  return (
    <>
      <Text>{content}</Text>
    </>
  );
};

export default GradientText;
