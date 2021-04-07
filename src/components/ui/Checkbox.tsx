import React, { forwardRef, InputHTMLAttributes } from "react";
import styled from "styled-components";
import { ErrorMessage } from "../common/ErrorMessage";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  disabled?: boolean;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ label, disabled = false, error, ...rest }: Props, ref) => {
    return (
      <div>
        <StyledCheckbox
          type={"checkbox"}
          id={"checkbox"}
          disabled={disabled}
          error={!!error}
          ref={ref}
          {...rest}
        />
        <label htmlFor={"checkbox"}>{label}</label>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  }
);

const StyledCheckbox = styled.input<{ error?: boolean }>`
  position: absolute;
  opacity: 0;
  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
    font-weight: 500;
    color: var(--grey);
  }
  & + label:before {
    content: "";
    margin: 0 10px 4px 0;
    display: inline-block;
    vertical-align: middle;
    width: 14px;
    height: 14px;
    background: var(--white);
    border: 1px solid var(--light-grey);
    border-radius: 2px;
  }
  &:hover + label:before {
    border: 1px solid var(--red);
  }
  &:focus + label:before {
    box-shadow: 0 0 5px var(--shadow-color);
  }
  &:checked + label:before {
    background: var(--red);
    border: 1px solid var(--red);
  }
  &:checked + label:after {
    content: "";
    position: absolute;
    left: 4px;
    top: 3px;
    transform: rotate(45deg);
    height: 9px;
    width: 5px;
    border-bottom: 1px solid var(--white);
    border-right: 1px solid var(--white);
  }
  &:disabled + label {
    color: var(--lightest-grey);
    cursor: default;
  }
  &:disabled + label:before {
    border: 1px solid var(--lightest-grey);
    background: var(--lightest-grey1);
  }
  ${({ error }) =>
    error &&
    `
    & + label{
    color: var(--lightest-red);
    }
    & + label:before {
    border: 1px solid var(--lightest-red);
    }
  `}
`;
