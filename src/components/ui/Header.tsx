import React from "react";
import styled from "styled-components";
import { deviceSize } from "../../assets/styles/theme/device";
import { Logo } from "./Logo";
import { ProfileInfo } from "./ProfileInfo";
import { MenuButton } from "./MenuButton";

interface Props {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const Header = ({ isMenuOpen, toggleMenu }: Props) => {
  return (
    <Container>
      <MenuButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <Logo />
      <ProfileInfo userName={"John Smith"} />
    </Container>
  );
};

const Container = styled.header`
  max-width: 100%;
  height: 62px;
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  position: relative;
  z-index: 1;
  & > div {
    left: 15px;
    :last-child {
      display: none;
    }
  }
  @media screen and ${deviceSize.tablet} {
    height: 80px;
    padding: 0 50px;
    justify-content: space-between;
    box-shadow: 0 1px 10px rgba(209, 209, 209, 0.5);
    & > div:last-child {
      display: flex;
    }
  }
  }
`;
