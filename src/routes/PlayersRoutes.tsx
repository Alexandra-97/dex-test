import { AppLayout } from "../components/layouts/AppLayout";
import { Route, Switch, Redirect } from "react-router-dom";
import { urls } from "./urls";
import { AddOrEditPlayer } from "../modules/players/AddOrEditPlayer";
import { Players } from "../modules/players/Players";
import { Player } from "../modules/players/Player";

export const PlayersRoutes = () => {
  return (
    <AppLayout>
      <Switch>
        <Route path={urls.players.players + ":id(\\d+)"} exact>
          <Player />
        </Route>
        <Route path={urls.players.players} exact>
          <Players />
        </Route>
        <Route path={urls.players.editPlayer + ":id"}>
          <AddOrEditPlayer />
        </Route>
        <Route path={urls.players.addPlayer}>
          <AddOrEditPlayer />
        </Route>
        <Redirect to={urls.teams.teams} />
      </Switch>
    </AppLayout>
  );
};
