import { Redirect, Route, RouteProps, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthRoutes } from "./AuthRoutes";
import { urls } from "./urls";
import { PrivateRoute } from "./PrivateRoute";
import { TeamsRoutes } from "./TeamsRoutes";
import { Loading } from "../core/redux/loading";
import { Spinner } from "../components/Spinner";
import { authSelector } from "../modules/auth/authSlice";
import { PlayersRoutes } from "./PlayersRoutes";

interface MainProps extends RouteProps {
  key: string;
}

const authRoutes: MainProps[] = [
  {
    key: "AuthRoutes",
    path: Object.values(urls.auth),
    children: <AuthRoutes />,
    exact: true,
  },
];

const mainRoutes: MainProps[] = [
  {
    key: "TeamsRoutes",
    path: Object.values(urls.teams),
    children: <TeamsRoutes />,
  },
  {
    key: "PlayersRoutes",
    path: Object.values(urls.players),
    children: <PlayersRoutes />,
  },
];

export const MainRoutes = () => {
  const { loading, user } = useSelector(authSelector);

  return loading === Loading.idle ? (
    <Switch>
      {!user &&
        authRoutes.map(({ key, children, ...rest }) => {
          return (
            <Route key={key} {...rest}>
              {children}
            </Route>
          );
        })}
      {mainRoutes.map(({ key, children, ...rest }) => {
        return (
          <PrivateRoute key={key} {...rest}>
            {children}
          </PrivateRoute>
        );
      })}
      <Redirect from={"*"} to={urls.teams.teams} />
    </Switch>
  ) : (
    <Spinner />
  );
};
