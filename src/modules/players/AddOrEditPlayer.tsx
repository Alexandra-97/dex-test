import { PlayersForm } from "./components/PlayersForm";
import { FormContainer } from "../../components/common/Form";
import { useForm } from "react-hook-form";
import { OptionTypeBase } from "react-select";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { playersSelector } from "./playersSlice";
import { Loading } from "../../core/redux/loading";
import { Spinner } from "../../components/Spinner";
import { AppDispatch } from "../../core/redux/store";
import {
  addPlayer,
  editPlayer,
  getPlayer,
  getPositions,
  getTeamsFilter,
} from "./playersActions";
import { useDebounce } from "../../core/hooks/useDebounce";
import { urls } from "../../routes/urls";
import { BreadCrumbs } from "../../components/Breadcrumbs";
import { useTranslation } from "react-i18next";

export interface FormData {
  name: string;
  position: OptionTypeBase;
  playerTeam: OptionTypeBase;
  height: number;
  weight: number;
  birthday: string;
  number: number;
  avatarUrl: FileList;
}

export const AddOrEditPlayer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { goBack } = useHistory();
  const { id } = useParams<{ id: string }>();
  const [teamInputValue, setTeamInputValue] = useState("");
  const { loading, player, positions, teamsFilter, loadingTeams } = useSelector(
    playersSelector
  );
  const form = useForm<FormData>({
    mode: "onBlur",
    defaultValues: {
      birthday: new Date().toISOString().split("T")[0],
    },
  });
  const { setValue } = form;
  const debouncedTeamInputValue = useDebounce({ value: teamInputValue });

  useEffect(() => {
    dispatch(getPositions());
    dispatch(getTeamsFilter({ pageSize: 5 }));
  }, [dispatch]);

  const positionsOptions = useMemo(() => {
    return (
      positions &&
      positions.map((position) => ({ value: position, label: position }))
    );
  }, [positions]);

  const teamsOptions = useMemo(() => {
    return (
      teamsFilter &&
      teamsFilter.map(({ id, name }) => ({ value: id, label: name }))
    );
  }, [teamsFilter]);

  useEffect(() => {
    id && dispatch(getPlayer({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    if (id && player) {
      const { name, height, weight, birthday, number } = player;
      setValue("name", name);
      setValue("height", height);
      setValue("weight", weight);
      setValue("birthday", birthday.split("T")[0]);
      setValue("number", number);
    }
  }, [player, id, setValue]);

  useEffect(() => {
    if (positionsOptions && player && id) {
      setValue("position", { value: player.position, label: player.position });
    }
  }, [positionsOptions, player, setValue, id]);

  useEffect(() => {
    if (teamsOptions && player && id) {
      setValue(
        "playerTeam",
        teamsOptions.filter((item) => item.value === player.team)[0]
      );
    }
  }, [teamsOptions, player, setValue, id]);

  const handleInputChange = useCallback((value) => {
    value && setTeamInputValue(value);
  }, []);

  useEffect(() => {
    debouncedTeamInputValue &&
      dispatch(getTeamsFilter({ name: debouncedTeamInputValue, pageSize: 5 }));
  }, [dispatch, debouncedTeamInputValue]);

  const submitHandler = useCallback(
    (data: FormData) => {
      const {
        name,
        number,
        position,
        playerTeam,
        birthday,
        height,
        weight,
        avatarUrl,
      } = data;
      if (!id) {
        dispatch(
          addPlayer({
            name,
            number,
            position: position.value,
            team: playerTeam.value,
            birthday,
            height,
            weight,
            callback: () => goBack(),
            newAvatar: avatarUrl[0],
          })
        );
      } else {
        player &&
          dispatch(
            editPlayer({
              id: player.id,
              name,
              number,
              position: position.value,
              team: playerTeam.value,
              birthday,
              height,
              weight,
              callback: () => goBack(),
              newAvatar: avatarUrl[0],
              avatarUrl: player?.avatarUrl,
            })
          );
      }
    },
    [dispatch, goBack, id, player]
  );

  const goBackHandler = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <>
      {loading === Loading.pending ? (
        <Spinner />
      ) : positionsOptions ? (
        <FormContainer>
          <BreadCrumbs
            items={[
              { label: t("breadCrumbs.players"), to: urls.players.players },
              {
                label: !id
                  ? t("breadCrumbs.addPlayer")
                  : t("breadCrumbs.editPlayer"),
                to: !id ? urls.players.addPlayer : urls.players.addPlayer + id,
              },
            ]}
          />
          <PlayersForm
            form={form}
            positionsOptions={positionsOptions}
            teamsOptions={teamsOptions}
            onInputChange={handleInputChange}
            onSubmit={submitHandler}
            onCancel={goBackHandler}
            initialPhoto={(id && player?.avatarUrl) || ""}
            loadingTeams={loadingTeams}
          />
        </FormContainer>
      ) : null}
    </>
  );
};
