import { Switch, Route } from "react-router-dom";
import { urls } from "./urls";
import { Login } from "../modules/auth/login/Login";
import { Register } from "../modules/auth/register/Register";

export const AuthRoutes = () => {
  return (
    <Switch>
      <Route path={urls.auth.login}>
        <Login />
      </Route>
      <Route path={urls.auth.register}>
        <Register />
      </Route>
    </Switch>
  );
};
