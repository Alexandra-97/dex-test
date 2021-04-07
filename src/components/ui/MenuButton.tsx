import React from "react";
import styled from "styled-components";
import { deviceSize } from "../../assets/styles/theme/device";

export const BURGER_ID = "burgerId";

interface Props {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

export const MenuButton = ({ isMenuOpen, toggleMenu }: Props) => {
  return (
    <BurgerIcon isOpen={isMenuOpen} onClick={toggleMenu} id={BURGER_ID}>
      <span />
    </BurgerIcon>
  );
};

const BurgerIcon = styled.div<{ isOpen: boolean }>`
  position: absolute;
  width: 18px;
  height: 12px;
  &:before,
  &:after,
  span {
    content: "";
    background-color: var(--grey);
    position: absolute;
    width: 100%;
    height: 2px;
    left: 0;
    border-radius: 8px;
    transition: all 0.3s ease 0s;
  }
  &:before {
    top: 0;
  }
  &:after {
    bottom: 0;
  }
  span {
    top: 5px;
  }
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
  ${({ isOpen }) =>
    isOpen &&
    `
    &:before {
        transform: rotate(45deg);
        top: 5px;
    }
    &:after {
        transform: rotate(-45deg);
        bottom: 5px;
    }
    span {
        transform: scale(0);
    }
  `}
  @media screen and ${deviceSize.tablet} {
    display: none;
  }
`;
