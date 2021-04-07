import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { teamsSelector } from "./teamsSlice";
import { AppDispatch } from "../../core/redux/store";
import { useEffect } from "react";
import { deleteTeam, getTeam, getTeamPlayers } from "./teamsActions";
import { ViewInfo } from "../../components/ui/ViewInfo";
import { useTranslation } from "react-i18next";
import { Roster } from "./components/Roster";
import { urls } from "../../routes/urls";
import { Loading } from "../../core/redux/loading";
import { Spinner } from "../../components/Spinner";
import { EmptyComponent } from "../../components/EmptyComponent";

export const Team = () => {
  const { id } = useParams<{ id: string }>();
  const { goBack } = useHistory();
  const { team, teamPlayers, loading } = useSelector(teamsSelector);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  useEffect(() => {
    id && dispatch(getTeam({ id }));
    id && dispatch(getTeamPlayers([+id]));
  }, [dispatch, id]);

  const deleteHandler = () => {
    id && dispatch(deleteTeam({ id, callback: () => goBack() }));
  };

  return (
    <>
      {loading === Loading.pending ? (
        <Spinner />
      ) : team ? (
        <>
          <ViewInfo
            editUrl={urls.teams.editTeam + id}
            onDelete={deleteHandler}
            name={team.name}
            breadCrumbs={[
              { label: t("breadCrumbs.teams"), to: urls.teams.teams },
              { label: team.name, to: urls.teams.teams + id },
            ]}
            description={[
              {
                value: team.foundationYear,
                label: t("teams.foundationYear"),
              },
              {
                value: team.division,
                label: t("teams.division"),
              },
              {
                value: team.conference,
                label: t("teams.conference"),
              },
            ]}
            imageUrl={team.imageUrl as string}
          />
          {teamPlayers?.length ? <Roster players={teamPlayers} /> : null}
        </>
      ) : (
        <EmptyComponent />
      )}
    </>
  );
};
