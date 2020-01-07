import * as React from "react";
import { useAuth } from "./Auth/authContext";
import Restricted from "./Common/Restricted";
import roles from "./Common/roles";
import routes from "./Common/Routes";
import { Link } from "react-router-dom";
import { getRoleDisplayString } from "./Common/ComponentUtility";

export default function Home() {
  let auth = useAuth();
  let userName = auth.currentUser ? auth.currentUser.name + " " + auth.currentUser.surname : "Guest";
  let userRoles = auth.currentUser ? auth.currentUser.roles.map(r => getRoleDisplayString(r)).join(", ") : "guest";
  return (
    <div className="col-sm-8 offset-sm-2">
      <div className="card-columns">
        <div className="ui-card-dark">
          <div className="card-body">
            <h5 className="card-title">Welcome, {userName}!</h5>
            <p className="card-text">
              <small className="text-muted">Your current roles: {userRoles}</small>
            </p>
          </div>
        </div>

        <Restricted roles={[roles.guest]}>
          <div className="ui-card-dark">
            <div className="card-body">
              <h5 className="card-title">Sign in</h5>
              <p className="card-text">Already have an account?</p>
              <Link to={routes.UserAccounts} className="btn btn-primary">
                Sign in
              </Link>
            </div>
          </div>
        </Restricted>

        <Restricted roles={[roles.guest]}>
          <div className="ui-card-dark">
            <div className="card-body">
              <h5 className="card-title">Register</h5>
              <p className="card-text">Need an account? Contact your administrator.</p>
              <a href={"mailto:tomasz.bajkacz@gmail.com"} className="btn btn-primary">
                Contact
              </a>
            </div>
          </div>
        </Restricted>

        <Restricted roles={[roles.admin]}>
          <div className="ui-card-dark">
            <div className="card-body">
              <h5 className="card-title">Users</h5>
              <p className="card-text">Add new users or edit existing accounts.</p>
              <Link to={routes.UserAccounts} className="btn btn-primary">
                Manage users
              </Link>
            </div>
          </div>
        </Restricted>

        <Restricted roles={[roles.lockManager]}>
          <div className="ui-card-dark">
            <div className="card-body">
              <h5 className="card-title">Access cards</h5>
              <p className="card-text">Register or edit an access card and assign it to a user.</p>
              <Link to={routes.AccessCards} className="btn btn-primary">
                Manage cards
              </Link>
            </div>
          </div>
        </Restricted>
        <Restricted roles={[roles.lockManager]}>
          <div className="ui-card-dark">
            <div className="card-body">
              <h5 className="card-title">Remote locks</h5>
              <p className="card-text">Configure lock information and access permissions.</p>
              <Link to={routes.RemoteLocks} className="btn btn-primary">
                Manage locks
              </Link>
            </div>
          </div>
        </Restricted>
        <Restricted roles={[roles.logManager]}>
          <div className="ui-card-dark">
            <div className="card-body">
              <h5 className="card-title">Audit</h5>
              <p className="card-text">Check recent events.</p>
              <Link to={routes.Audit} className="btn btn-primary">
                Browse logs
              </Link>
            </div>
          </div>
        </Restricted>
      </div>
    </div>
  );
}
