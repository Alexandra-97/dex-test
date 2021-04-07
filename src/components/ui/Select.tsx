import Select, { OptionsType, Theme } from "react-select";
import React, { forwardRef } from "react";
import styled from "styled-components";
import { SelectComponentsProps } from "react-select/base";
import { ErrorMessage } from "../common/ErrorMessage";

export type SelectOptions = OptionsType<{
  value?: number;
  label?: string;
}>;

interface SelectProps extends SelectComponentsProps {
  title?: string;
  error?: string;
  selectType?: "primary" | "secondary";
  size?: "small";
}

export const StyledSelect = forwardRef<HTMLSelectElement, SelectProps>(
  ({ title, error, selectType = "primary", size, ...rest }, ref) => {
    return (
      <SelectContainer size={size}>
        {title && <Title> {title}</Title>}
        <CustomSelect
          classNamePrefix={"react-select"}
          error={!!error}
          selectType={selectType}
          {...rest}
          ref={ref}
          theme={(theme: Theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: "var(--dark-red)",
              primary25: "var(--lightest-red)",
              dangerLight: "var(--white)",
            },
          })}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </SelectContainer>
    );
  }
);

const SelectContainer = styled.div<{ size?: "small" }>`
  width: 100%;
  max-width: 366px;
  ${({ size }) =>
    size === "small" &&
    `
          max-width: 88px;
        `}
`;

const Title = styled.div`
  font-weight: 500;
  padding-bottom: 8px;
  color: var(--grey);
`;

const CustomSelect = styled(Select)<{
  error?: boolean;
  selectType?: "primary" | "secondary";
}>`
  .react-select__control {
    min-height: 40px;
    background: var(--white);
    border: 0.5px solid var(--lightest-grey);
    z-index: 2;
    ${({ selectType }) =>
      selectType === "secondary" &&
      `
          background: var(--lightest-grey1);
          border: none;
        `}
    &:hover {
      background: var(--lightest-grey);
      cursor: pointer;
      border: none;
    }
    &:focus-within {
      box-shadow: 0 0 5px var(--shadow-color);
      border: none;
    }
    &,
    &:hover,
    &:focus-within {
      ${({ error }) =>
        error &&
        `
        border: 1px solid var(--lightest-red);
    `}
    }
    Input,
    .react-select__single-value {
      font-weight: 500;
      color: var(--dark-grey);
    }
    .react-select__placeholder {
      font-weight: 500;
      color: var(--grey);
    }
    .react-select__multi-value {
      color: var(--white);
      background: var(--red);
      border-radius: 4px;
      max-width: calc(100% - 10px);
      .react-select__multi-value__label {
        color: var(--white);
        font-size: 14px;
      }
    }
    .react-select__indicator-separator {
      width: 0.5px;
      background: var(--lightest-grey);
    }
    .react-select__dropdown-indicator {
      svg {
        height: 14px;
      }
    }
    .react-select__clear-indicator {
      svg {
        height: 18px;
        width: 19px;
      }
    }
  }
  .react-select__menu {
    z-index: 100;
    box-shadow: none;
    color: var(--grey);
    background: var(--white);
    border: 0.5px solid var(--lightest-grey);
    .react-select__menu-list {
      z-index: 1;
      border-radius: 4px;
      padding: 0;
      .react-select__option {
        outline: none;
        font-weight: 500;
        border-bottom: 0.5px solid var(--lightest-grey);
        &:last-child {
          border-bottom: none;
        }
        &:hover {
          cursor: pointer;
          color: var(--white);
        }
        &:active {
          background: var(--dark-red);
        }
      }
      .react-select__option--is-focused {
        color: var(--white);
      }
    }
  }
`;
