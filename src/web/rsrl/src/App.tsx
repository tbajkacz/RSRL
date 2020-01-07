import React from "react";
import "./styles/App.scss";
import { Login } from "./Auth/Login";
import { Route, Link, Switch, Router, HashRouter, Redirect } from "react-router-dom";
import UserMenu from "./Auth/UserMenu";
import { ProvideAuth } from "./Auth/authContext";
import routes from "./Common/Routes";
import Home from "./Home";
import AccessCardList from "./AccessCards/AccessCardList";
import { Navbar, Nav, NavbarBrand, NavItem } from "reactstrap";
import UserAccountList from "./Users/UserAccountList";
import RemoteLockList from "./RemoteLocks/RemoteLockList";
import ActionLogList from "./Audit/ActionLogList";
import Restricted from "./Common/Restricted";
import roles from "./Common/roles";

function App() {
  return (
    <ProvideAuth>
      <HashRouter>
        <Navbar className="ui-element-bg-dark shadow">
          <div className="navbar-brand">
            <Link className="navbar-brand text-light mr-0" to={routes.Home}>
              RSRLC
            </Link>
          </div>
          <Nav className="mr-auto">
            <Restricted roles={[roles.admin]}>
              <NavItem>
                <Link className="ui-nav-link" to={routes.UserAccounts}>
                  Users
                </Link>
              </NavItem>
            </Restricted>
            <Restricted roles={[roles.lockManager]}>
              <NavItem>
                <Link className="ui-nav-link" to={routes.AccessCards}>
                  Access cards
                </Link>
              </NavItem>
            </Restricted>
            <Restricted roles={[roles.lockManager]}>
              <NavItem>
                <Link className="ui-nav-link" to={routes.RemoteLocks}>
                  Remote locks
                </Link>
              </NavItem>
            </Restricted>
            <Restricted roles={[roles.logManager]}>
              <NavItem>
                <Link className="ui-nav-link" to={routes.Audit}>
                  Logs
                </Link>
              </NavItem>
            </Restricted>
          </Nav>
          <UserMenu />
        </Navbar>
        <div className="mt-5">
          <Switch>
            <Route path={routes.Home}>
              <Home />
            </Route>
            <Route path={routes.AccessCards}>
              <Restricted roles={[roles.lockManager]} redirectToLogin>
                <AccessCardList />
              </Restricted>
            </Route>
            <Route path={routes.UserAccounts}>
              <Restricted roles={[roles.admin]} redirectToLogin>
                <UserAccountList />
              </Restricted>
            </Route>
            <Route path={routes.Login}>
              <Login className="d-flex justify-content-center mt-5" />
            </Route>
            <Route path={routes.RemoteLocks}>
              <Restricted roles={[roles.lockManager]} redirectToLogin>
                <RemoteLockList />
              </Restricted>
            </Route>
            <Route path={routes.Audit}>
              <Restricted roles={[roles.logManager]} redirectToLogin>
                <ActionLogList />
              </Restricted>
            </Route>
            <Route>
              <Redirect to={routes.Home} />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    </ProvideAuth>
  );
}

export default App;
