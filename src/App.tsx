import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { MainRoutes } from "./routes/MainRoutes";
import { AppDispatch } from "./core/redux/store";
import { authActions } from "./modules/auth/authSlice";

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(authActions.getUser());
  }, [dispatch]);

  return (
    <Suspense fallback={"Empty"}>
      <MainRoutes />
    </Suspense>
  );
};
