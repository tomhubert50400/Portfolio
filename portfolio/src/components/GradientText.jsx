import React from "react";
import styled from "styled-components";

const Text = styled.h1`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(242, 231, 254, 1) 10%,
    rgba(88, 42, 140, 1) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 24px;
  line-height: 1.5;
  text-align: center;
  @media (min-width: 1023.99px) {
    font-size: 40px;
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
