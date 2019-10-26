import React from "react";
import { useAuth } from "./authContext";
import { Link } from "react-router-dom";
import SignInOutButton from "./SignInOutButton";
import routes from "../Common/Routes";

export default React.memo(function UserMenu() {
  const auth = useAuth();

  return auth.currentUser ? (
    <div className="text-light">
      <text className="mr-2">Logged in as {auth.currentUser.login}</text>
      <SignInOutButton onClick={() => auth.signOut()}>Sign out</SignInOutButton>
    </div>
  ) : (
    <Link to={routes.Login}>
      <SignInOutButton>Sign in</SignInOutButton>
    </Link>
  );
});
