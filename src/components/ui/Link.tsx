import React, { FC } from "react";
import styled from "styled-components";

interface Props {
  to: string;
  disabled?: boolean;
}

export const LinkButton: FC<Props> = ({ children, to, disabled = false }) => {
  return (
    <StyledLink href={to} disabled={disabled}>
      {children}
    </StyledLink>
  );
};

const StyledLink = styled.a<{ disabled?: boolean }>`
  font-weight: 500;
  color: var(--red);
  &:hover {
    color: var(--light-red);
  }
  &:active {
    color: var(--dark-red);
  }
  ${({ disabled }) =>
    disabled &&
    `
    color: var(--lightest-grey);
    cursor: default;
    pointer-events: none;
  `}
`;
