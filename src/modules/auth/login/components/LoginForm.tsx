import { Input } from "../../../../components/ui/Input";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../components/ui/Button";
import styled from "styled-components";
import { UseFormMethods } from "react-hook-form";
import { FormData } from "../Login";

interface Props {
  form: UseFormMethods<FormData>;
  onSubmit: (data: FormData) => void;
}

export const LoginForm = ({ form, onSubmit }: Props) => {
  const { t } = useTranslation();
  const { errors, handleSubmit, register } = form;

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Input
        title={t("auth.login")}
        error={errors.login?.message}
        ref={register({
          required: { value: true, message: t("errors.requiredField") },
        })}
        name={"login"}
      />
      <Input
        title={t("auth.password")}
        type={"password"}
        error={errors.password?.message}
        ref={register({
          required: { value: true, message: t("errors.requiredField") },
        })}
        name={"password"}
      />
      <Button>{t("auth.signIn")}</Button>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  & > div:nth-child(-n + 3) {
    margin-bottom: 24px;
  }
`;
