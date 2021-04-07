import { UseFormMethods } from "react-hook-form";
import { FormData } from "../AddOrEditTeam";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { deviceSize } from "../../../assets/styles/theme/device";
import { UploadPhoto } from "../../../components/ui/UploadPhoto";
import {
  FieldsContainer,
  FlexFields,
  Form,
} from "../../../components/common/Form";

interface Props {
  form: UseFormMethods<FormData>;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  initialPhoto?: string;
}

export const TeamsForm = ({
  form,
  onSubmit,
  initialPhoto,
  onCancel,
}: Props) => {
  const { t } = useTranslation();

  const { errors, handleSubmit, register } = form;

  return (
    <Form>
      <UploadContainer>
        <UploadPhoto
          ref={register}
          name={"imageUrl"}
          initialPhoto={initialPhoto}
        />
      </UploadContainer>
      <FieldsContainer>
        <Input
          title={t("teams.name")}
          error={errors.name?.message}
          ref={register({
            required: { value: true, message: t("errors.requiredField") },
          })}
          name={"name"}
        />
        <Input
          title={t("teams.division")}
          error={errors.division?.message}
          ref={register({
            required: { value: true, message: t("errors.requiredField") },
          })}
          name={"division"}
        />
        <Input
          title={t("teams.conference")}
          error={errors.conference?.message}
          ref={register({
            required: { value: true, message: t("errors.requiredField") },
          })}
          name={"conference"}
        />
        <Input
          title={t("teams.foundationYear")}
          type={"number"}
          error={errors.foundationYear?.message}
          ref={register({
            required: { value: true, message: t("errors.requiredField") },
            pattern: { value: /^[1-9]\d{3,}$/, message: "Invalid year" },
          })}
          name={"foundationYear"}
        />
        <FlexFields>
          <Button buttonType={"secondary"} onClick={onCancel}>
            {t("common.cancel")}
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>{t("common.save")}</Button>
        </FlexFields>
      </FieldsContainer>
    </Form>
  );
};

const UploadContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 48px;
  @media screen and ${deviceSize.laptop} {
    padding-right: 73px;
    margin: 0;
    display: block;
  }
`;
