import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routs";

const AppRouter = () => {
  let isAuth = false;
  return (
    <Switch>
      {isAuth &&
        authRoutes.map(({ path, Component }, i) => (
          <Route
            key={path + i + "a"}
            path={path}
            component={Component}
            exact
          />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route
          key={path + i + "p"}
          path={path}
          component={Component}
          exact
        />
      ))}
      <Redirect to={SHOP_ROUTE} />
    </Switch>
  );
};
export default AppRouter;
