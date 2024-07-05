import React from "react";
import { Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { Shop } from "../pages";

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
