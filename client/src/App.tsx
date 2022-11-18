import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./share/Navbar/component";
import { AuthContext } from "./context/AuthContext";
import { useAuth } from "./hooks/auth.hook";
import { RestrictedByAuthProps, RestrictedByRoleProps } from "./contracts/interfaces";
import * as Pages from './pages';

const RestrictedByAuth = ({
  component,
  defaultRoute = "/",
  path,
  ...rest
}: RestrictedByAuthProps) => {
  const { ready } = useAuth();
  return ready ? (
    <Route component={component} {...rest} />
  ) : (
    <Redirect to={defaultRoute} />
  );
};

const RestrictedByReg = ({
  component,
  defaultRoute = "/",
  path,
  ...rest
}: RestrictedByAuthProps) => {
  const { ready, userRole } = useAuth();
  return path === "/registration" && (!ready || userRole === 'admin' ) ? (
    <Route component={component} {...rest} />
  ) : (
    <Redirect to={defaultRoute} />
  );
};

const RestrictedByRole = ({
  component,
  defaultRoute = "/",
  role,
  ...rest
}: RestrictedByRoleProps) => {
  const { userRole } = useAuth();

  return userRole === role ? (
    <RestrictedByAuth
      component={component}
      defaultRoute={defaultRoute}
      {...rest}
    />
  ) : (
    <Redirect to={defaultRoute} />
  );
};

const App: React.FC = () => {
  const auth = useAuth();
  return (
    <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <Navbar auth={auth} />
        <Switch>
          <Route component={Pages.MainPage} path="/" exact />
          <RestrictedByReg component={Pages.RegistrationPage} path="/registration" />
          <RestrictedByAuth component={Pages.ProfilePage} path="/profile" exact />
          <Route component={Pages.DetailPage} path="/detail/:id" />
          <RestrictedByRole component={Pages.AdminPage} role="admin" path="/admin" />
          <RestrictedByRole component={Pages.CreateAndUpdateMoviePage} role="admin" path="/createandupdatemovie/:id" />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
