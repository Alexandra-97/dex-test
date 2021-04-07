import { Switch, Route, Redirect } from "react-router-dom";
import { AppLayout } from "../components/layouts/AppLayout";
import { urls } from "./urls";
import { AddOrEditTeam } from "../modules/teams/AddOrEditTeam";
import { Teams } from "../modules/teams/Teams";
import { Team } from "../modules/teams/Team";

export const TeamsRoutes = () => {
  return (
    <AppLayout>
      <Switch>
        <Route path={urls.teams.teams + ":id(\\d+)"} exact>
          <Team />
        </Route>
        <Route path={urls.teams.teams} exact>
          <Teams />
        </Route>
        <Route path={urls.teams.editTeam + ":id"}>
          <AddOrEditTeam />
        </Route>
        <Route path={urls.teams.addTeam}>
          <AddOrEditTeam />
        </Route>
        <Redirect to={urls.teams.teams} />
      </Switch>
    </AppLayout>
  );
};
