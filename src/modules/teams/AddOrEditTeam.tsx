import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TeamsForm } from "./components/TeamsForm";
import { AppDispatch } from "../../core/redux/store";
import { addTeam, editTeam, getTeam } from "./teamsActions";
import { teamsSelector } from "./teamsSlice";
import { Loading } from "../../core/redux/loading";
import { Spinner } from "../../components/Spinner";
import { FormContainer } from "../../components/common/Form";
import { BreadCrumbs } from "../../components/Breadcrumbs";
import { useTranslation } from "react-i18next";
import { urls } from "../../routes/urls";

export interface FormData {
  name: string;
  division: string;
  conference: string;
  foundationYear: number;
  imageUrl: FileList;
}

export const AddOrEditTeam = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const { goBack } = useHistory();
  const { team, loading } = useSelector(teamsSelector);
  const dispatch = useDispatch<AppDispatch>();
  const form = useForm<FormData>({ mode: "onBlur" });
  const { setValue } = form;

  useEffect(() => {
    if (id && team) {
      setValue("name", team.name);
      setValue("division", team.division);
      setValue("conference", team.conference);
      setValue("foundationYear", team.foundationYear);
    }
  }, [team, setValue, id]);

  useEffect(() => {
    id && dispatch(getTeam({ id }));
  }, [dispatch, id]);

  const submitHandler = useCallback(
    (data: FormData) => {
      const { name, division, conference, foundationYear, imageUrl } = data;

      return !id
        ? dispatch(
            addTeam({
              name,
              division,
              conference,
              foundationYear,
              newImage: imageUrl[0],
              callback: () => goBack(),
            })
          )
        : team &&
            dispatch(
              editTeam({
                id: team.id,
                name,
                division,
                conference,
                foundationYear,
                newImage: imageUrl[0],
                imageUrl: team.imageUrl,
                callback: () => goBack(),
              })
            );
    },
    [dispatch, team, goBack, id]
  );

  const goBackHandler = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <>
      {loading === Loading.pending ? (
        <Spinner />
      ) : (
        <FormContainer>
          <BreadCrumbs
            items={[
              { label: t("breadCrumbs.teams"), to: urls.teams.teams },
              {
                label: !id
                  ? t("breadCrumbs.addTeam")
                  : t("breadCrumbs.editTeam"),
                to: !id ? urls.teams.addTeam : urls.teams.editTeam + id,
              },
            ]}
          />
          <TeamsForm
            form={form}
            onSubmit={submitHandler}
            onCancel={goBackHandler}
            initialPhoto={(id && team?.imageUrl) || ""}
          />
        </FormContainer>
      )}
    </>
  );
};
