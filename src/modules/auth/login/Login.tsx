import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { AuthLayout } from "../../../components/layouts/AuthLayout";
import signInImg from "../../../assets/images/signInImg.png";
import { LoginForm } from "./components/LoginForm";
import { LinkButton } from "../../../components/ui/Link";
import { signIn } from "../authActions";
import { urls } from "../../../routes/urls";
import { AppDispatch } from "../../../core/redux/store";

export interface FormData {
  login: string;
  password: string;
}

export const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<FormData>({ mode: "onBlur" });

  const submitHandler = useCallback(
    (data: FormData) => {
      dispatch(signIn(data));
    },
    [dispatch]
  );

  return (
    <AuthLayout
      title={t("auth.signIn")}
      image={signInImg}
      info={
        <>
          {t("auth.signInInfo")}
          <LinkButton to={urls.auth.register}>{t("auth.signUp")}</LinkButton>
        </>
      }
    >
      <LoginForm form={form} onSubmit={submitHandler} />
    </AuthLayout>
  );
};
