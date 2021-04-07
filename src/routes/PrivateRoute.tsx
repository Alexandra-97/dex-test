import { FC } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../modules/auth/authSlice";
import { urls } from "./urls";

export const PrivateRoute: FC = ({ children, ...rest }) => {
  const { user } = useSelector(authSelector);

  if (!user) {
    return <Redirect to={urls.auth.login} />;
  }
  return <Route {...rest}>{children}</Route>;
};
