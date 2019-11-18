import React from "react";
import "./styles/App.scss";
import { Login } from "./Auth/Login";
import { Route, Link, Switch, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import UserMenu from "./Auth/UserMenu";
import { ProvideAuth } from "./Auth/authContext";
import routes from "./Common/Routes";
import Home from "./Home";
import AccessCardList from "./AccessCards/AccessCardList";
import { Navbar, Nav, NavbarBrand, NavItem } from "reactstrap";
import UserAccountList from "./Users/UserAccountList";

const history = createBrowserHistory();

function App() {
  return (
    <ProvideAuth>
      <Router history={history}>
        <Navbar className="ui-element-bg-dark shadow">
          <NavbarBrand>
            <Link className="navbar-brand text-light mr-0" to={routes.Home}>
              RSRLC
            </Link>
          </NavbarBrand>
          <Nav className="mr-auto">
            <NavItem>
              <Link className="ui-nav-link" to={routes.AccessCards}>
                Access cards
              </Link>
            </NavItem>
            <NavItem>
              <Link className="ui-nav-link" to={routes.UserAccounts}>
                Users
              </Link>
            </NavItem>
          </Nav>
          <UserMenu />
        </Navbar>
        <div className="mt-5">
          <Switch>
            <Route path={routes.Home}>
              <Home />
            </Route>
            <Route path={routes.AccessCards}>
              <AccessCardList />
            </Route>
            <Route path={routes.UserAccounts}>
              <UserAccountList />
            </Route>
            <Route path={routes.Login}>
              <Login className="d-flex justify-content-center mt-5" />
            </Route>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
