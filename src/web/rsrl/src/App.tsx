import React from "react";
import "./App.css";
import { Login } from "./Auth/Login";
import { Route, Link, Switch, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import UserMenu from "./Auth/UserMenu";
import { ProvideAuth } from "./Auth/authContext";
import routes from "./Common/Routes";

const history = createBrowserHistory();

function App() {
  return (
    <ProvideAuth>
      <Router history={history}>
        <div>
          <nav className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand text-light" to={routes.Home}>
              RSRLC
            </Link>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to={routes.Login}>
                  Access cards
                </Link>
              </li>
            </ul>
            <UserMenu />
          </nav>
        </div>
        <div className="container">
          <Switch>
            <Route path={routes.Login}>
              <Login className="mt-5" />
            </Route>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
