import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../../../components/layouts/AuthLayout";
import signUpImg from "../../../assets/images/signUpImg.png";
import { LinkButton } from "../../../components/ui/Link";
import { urls } from "../../../routes/urls";
import { RegisterForm } from "./components/RegisterForm";
import { AppDispatch } from "../../../core/redux/store";
import { signUp } from "../authActions";

export interface FormData {
  userName: string;
  login: string;
  password: string;
  repeatPassword: string;
  accept: boolean;
}

export const Register = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<FormData>({ mode: "onBlur" });

  const submitHandler = useCallback(
    (data: FormData) => {
      const { userName, login, password } = data;
      dispatch(
        signUp({
          userName,
          login,
          password,
        })
      );
    },
    [dispatch]
  );

  return (
    <AuthLayout
      title={t("auth.signUp")}
      image={signUpImg}
      info={
        <>
          {t("auth.signUpInfo")}
          <LinkButton to={urls.auth.login}>{t("auth.signIn")}</LinkButton>
        </>
      }
    >
      <RegisterForm form={form} onSubmit={submitHandler} />
    </AuthLayout>
  );
};
