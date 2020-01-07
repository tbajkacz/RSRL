import React from "react";
import { useAuth } from "./authContext";
import { Link } from "react-router-dom";
import SignInOutButton from "./SignInOutButton";
import routes from "../Common/Routes";

export default React.memo(function UserMenu() {
  const auth = useAuth();

  return auth.currentUser ? (
    <div className="text-light">
      <p className="mr-2 d-inline">Welcome, {auth.currentUser.name + " " + auth.currentUser.surname}</p>
      <SignInOutButton onClick={() => auth.signOut()}>Sign out</SignInOutButton>
    </div>
  ) : (
    <Link to={routes.Login}>
      <SignInOutButton>Sign in</SignInOutButton>
    </Link>
  );
});
