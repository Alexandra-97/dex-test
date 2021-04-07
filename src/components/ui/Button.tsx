import React, { ButtonHTMLAttributes, FC } from "react";
import styled from "styled-components";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  buttonType?: "primary" | "secondary";
}

export const Button: FC<Props> = ({
  children,
  disabled = false,
  buttonType = "primary",
  ...rest
}) => {
  return (
    <StyledButton disabled={disabled} buttonType={buttonType} {...rest}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  buttonType?: "primary" | "secondary";
}>`
  font-size: 16px;
  font-weight: 500;
  color: var(--white);
  outline: none;
  height: 40px;
  width: 100%;
  max-width: 366px;
  background: var(--red);
  border-radius: 4px;
  border: none;
  &:hover {
    background: var(--light-red);
    cursor: pointer;
  }
  &:focus {
    box-shadow: 0 0 5px var(--shadow-color);
  }
  &:active {
    background: var(--dark-red);
  }
  ${({ buttonType }) =>
    buttonType === "secondary" &&
    `
    color: var(--light-grey);
    background: var(--white);
    border: 1px solid var(--light-grey);
    &:hover {
    background: var(--lightest-grey);
    }
    &:active {
    color: var(--grey);
    border: 1px solid var(--grey);
    background: var(--light-grey);
    }
  `}
  &:disabled {
    background: var(--lightest-grey1);
    color: var(--lightest-grey);
    cursor: default;
  }
`;
