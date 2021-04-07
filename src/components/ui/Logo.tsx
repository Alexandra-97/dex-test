import React from "react";
import logo from "../../assets/images/logo.png";
import styled from "styled-components";
import { deviceSize } from "../../assets/styles/theme/device";

export const Logo = () => {
  return <Image src={logo} alt={"logoImg"} />;
};

const Image = styled.img`
  width: 137px;
  @media screen and ${deviceSize.tablet} {
    width: 191px;
  }
`;
