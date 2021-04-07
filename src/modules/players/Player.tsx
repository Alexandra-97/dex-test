import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../core/redux/store";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import { playersSelector } from "./playersSlice";
import { useEffect } from "react";
import { deletePlayer, getPlayer } from "./playersActions";
import { Loading } from "../../core/redux/loading";
import { Spinner } from "../../components/Spinner";
import { ViewInfo } from "../../components/ui/ViewInfo";
import { urls } from "../../routes/urls";
import { EmptyComponent } from "../../components/EmptyComponent";
import { getAge } from "../../core/helpers/getAge";

export const Player = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { goBack } = useHistory();
  const { player, loading } = useSelector(playersSelector);

  useEffect(() => {
    id && dispatch(getPlayer({ id }));
  }, [dispatch, id]);

  const deleteHandler = () => {
    id && dispatch(deletePlayer({ id, callback: () => goBack() }));
  };

  return (
    <>
      {loading === Loading.pending ? (
        <Spinner />
      ) : player ? (
        <ViewInfo
          editUrl={urls.players.editPlayer + id}
          onDelete={deleteHandler}
          imagePlacement={"bottom"}
          name={player.name}
          number={`#${player.number}`}
          breadCrumbs={[
            { label: t("breadCrumbs.players"), to: urls.players.players },
            { label: player.name, to: urls.players.players + id },
          ]}
          description={[
            {
              value: player.position,
              label: t("players.position"),
            },
            {
              value: player.teamName || "",
              label: t("players.team"),
            },
            {
              value: player.height,
              label: t("players.height"),
            },
            {
              value: player.weight,
              label: t("players.weight"),
            },
            {
              value: getAge(player.birthday),
              label: t("players.age"),
            },
          ]}
          imageUrl={player.avatarUrl || ""}
        />
      ) : (
        <EmptyComponent />
      )}
    </>
  );
};
