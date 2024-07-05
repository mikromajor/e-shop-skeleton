import React from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { Shop } from "../pages";
import { SHOP_ROUTE } from "../utils/constants";

const AppRouter = () => {
  let isAuth = true;
  return (
    <Routes>
      {isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={Component}
            exact
          />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={Component}
          exact
        />
      ))}
      <Route path='*' element={<Shop />} />
    </Routes>
  );
};

export default AppRouter;
