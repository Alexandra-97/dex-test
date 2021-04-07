import { Input } from "../../../../components/ui/Input";
import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../components/ui/Button";
import styled from "styled-components";
import { UseFormMethods } from "react-hook-form";
import { FormData } from "../Register";
import { Checkbox } from "../../../../components/ui/Checkbox";

const PASSWORD_MIN_LENGTH = 3;
const USERNAME_MIN_LENGTH = 3;

interface Props {
  form: UseFormMethods<FormData>;
  onSubmit: (data: FormData) => void;
}

export const RegisterForm = ({ form, onSubmit }: Props) => {
  const { t } = useTranslation();
  const { errors, handleSubmit, register, watch } = form;

  return (
    <Wrapper onSubmit={handleSubmit(onSubmit)}>
      <Input
        title={t("auth.name")}
        error={errors.userName?.message}
        ref={register({
          required: { value: true, message: t("errors.requiredField") },
          minLength: {
            value: USERNAME_MIN_LENGTH,
            message: t("errors.minLength", { count: USERNAME_MIN_LENGTH }),
          },
        })}
        name={"userName"}
      />
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
          minLength: {
            value: PASSWORD_MIN_LENGTH,
            message: t("errors.minLength", { count: PASSWORD_MIN_LENGTH }),
          },
        })}
        name={"password"}
      />
      <Input
        title={t("auth.repeatPassword")}
        type={"password"}
        error={errors.repeatPassword?.message}
        ref={register({
          required: { value: true, message: t("errors.requiredField") },
          validate: (value) =>
            value === watch("password") || t("errors.mustMatch"),
        })}
        name={"repeatPassword"}
      />
      <Checkbox
        label={t("auth.accept")}
        error={errors.accept?.message}
        ref={register({
          required: { value: true, message: t("errors.requiredField") },
        })}
        name={"accept"}
      />
      <Button>{t("auth.signUp")}</Button>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  & > div:nth-child(-n + 5) {
    margin-bottom: 24px;
  }
`;
