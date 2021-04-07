import {
  FieldsContainer,
  FlexFields,
  Form,
} from "../../../components/common/Form";
import { Input } from "../../../components/ui/Input";
import React from "react";
import { useTranslation } from "react-i18next";
import { Controller, UseFormMethods } from "react-hook-form";
import { FormData } from "../AddOrEditPlayer";
import { SelectOptions, StyledSelect } from "../../../components/ui/Select";
import { Button } from "../../../components/ui/Button";
import { OptionTypeBase } from "react-select";
import { UploadPhoto } from "../../../components/ui/UploadPhoto";
import styled from "styled-components";
import { deviceSize } from "../../../assets/styles/theme/device";
import { Loading } from "../../../core/redux/loading";

interface Props {
  form: UseFormMethods<FormData>;
  positionsOptions: OptionTypeBase[];
  teamsOptions?: SelectOptions;
  onInputChange: (value: string) => void;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  initialPhoto?: string;
  loadingTeams?: Loading;
}

export const PlayersForm = ({
  form,
  positionsOptions,
  teamsOptions,
  onInputChange,
  onSubmit,
  onCancel,
  initialPhoto,
  loadingTeams,
}: Props) => {
  const { t } = useTranslation();
  const { register, errors, control, handleSubmit } = form;

  return (
    <Form>
      <UploadContainer>
        <UploadPhoto
          ref={register}
          name={"avatarUrl"}
          initialPhoto={initialPhoto}
        />
      </UploadContainer>
      <FieldsContainer>
        <Input
          title={t("players.name")}
          error={errors.name?.message}
          ref={register({
            required: { value: true, message: t("errors.requiredField") },
          })}
          name={"name"}
        />
        <Controller
          control={control}
          defaultValue={""}
          rules={{
            required: { value: true, message: t("errors.requiredField") },
          }}
          as={
            <StyledSelect
              title={t("players.position")}
              error={errors.position?.message}
              selectType={"secondary"}
              options={positionsOptions}
            />
          }
          name={"position"}
        />
        <Controller
          control={control}
          defaultValue={""}
          isLoading={loadingTeams === Loading.pending}
          rules={{
            required: { value: true, message: t("errors.requiredField") },
          }}
          as={
            <StyledSelect
              title={t("players.team")}
              error={errors.playerTeam?.message}
              selectType={"secondary"}
              onInputChange={onInputChange}
              options={teamsOptions}
              isClosable={false}
            />
          }
          name={"playerTeam"}
        />
        <FlexFields>
          <Input
            title={t("players.heightcm")}
            type={"number"}
            error={errors.height?.message}
            ref={register({
              required: { value: true, message: t("errors.requiredField") },
            })}
            name={"height"}
          />
          <Input
            title={t("players.weightkg")}
            type={"number"}
            error={errors.weight?.message}
            ref={register({
              required: { value: true, message: t("errors.requiredField") },
            })}
            name={"weight"}
          />
        </FlexFields>
        <FlexFields>
          <Input
            title={t("players.birthday")}
            type={"date"}
            error={errors.birthday?.message}
            ref={register({
              required: { value: true, message: t("errors.requiredField") },
            })}
            name={"birthday"}
          />
          <Input
            title={t("players.number")}
            type={"number"}
            error={errors.number?.message}
            ref={register({
              required: { value: true, message: t("errors.requiredField") },
            })}
            name={"number"}
          />
        </FlexFields>
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
