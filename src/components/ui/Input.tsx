import styled from "styled-components";
import React, { forwardRef, InputHTMLAttributes, useState } from "react";
import { useTranslation } from "react-i18next";
import searchIcon from "../../assets/icons/search.png";
import closedEyeIcon from "../../assets/icons/closedEye.png";
import eyeIcon from "../../assets/icons/eye.png";
import { ErrorMessage } from "../common/ErrorMessage";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  disabled?: boolean;
  error?: string;
  search?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ title, disabled = false, error, search = false, ...rest }, ref) => {
    const { t } = useTranslation();
    const [inputType, setInputType] = useState(rest?.type);

    const showOrHidePassword = () => {
      setInputType((prevState) => {
        return prevState === "text" ? "password" : "text";
      });
    };

    return (
      <InputContainer>
        {title && <Title> {title}</Title>}
        <StyledInput
          disabled={disabled}
          error={!!error}
          search={!!search}
          placeholder={search ? t("common.search") : ""}
          {...rest}
          type={inputType}
          ref={ref}
        />
        {rest?.type === "password" && (
          <PasswordIcon
            alt={"Password Icon"}
            src={inputType === "text" ? eyeIcon : closedEyeIcon}
            onClick={showOrHidePassword}
          />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </InputContainer>
    );
  }
);

const InputContainer = styled.div`
  width: 100%;
  max-width: 366px;
  position: relative;
`;

const Title = styled.div`
  font-weight: 500;
  padding-bottom: 8px;
  color: var(--grey);
`;

const PasswordIcon = styled.img`
  cursor: pointer;
  position: absolute;
  top: 40px;
  right: 12px;
`;

const StyledInput = styled.input<{ error?: boolean; search?: boolean }>`
  font-weight: 500;
  color: var(--dark-grey);
  padding: 8px 12px;
  outline: none;
  height: 40px;
  width: 100%;
  background-color: var(--lightest-grey1);
  border-radius: 4px;
  border: none;
  &::placeholder {
    color: var(--grey);
  }
  &:hover {
    background: var(--lightest-grey);
    cursor: pointer;
  }
  &:focus {
    box-shadow: 0 0 5px var(--shadow-color);
  }
  &:disabled {
    background: var(--lightest-grey1);
    color: var(--lightest-grey);
    cursor: default;
  }
  ${({ error }) =>
    error &&
    `
    border: 1px solid var(--lightest-red);
  `}
  ${({ search }) =>
    search &&
    `
    border: 0.5px solid var(--lightest-grey);
    background: var(--white) url(${searchIcon}) no-repeat right 14px center;
    padding: 8px 32px 8px 12px;
  `}
`;
