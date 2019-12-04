import React from "react";
import { Redirect } from "react-router";
import routes from "./Routes";
import { useAuth } from "../Auth/authContext";
import roles from "./roles";

interface RestrictedProps {
  children: JSX.Element;
  redirectToLogin?: boolean;
  roles: string[];
}

const redirect = <Redirect to={routes.Login} />;

export default function Restricted(props: RestrictedProps) {
  const auth = useAuth();

  return auth.currentUser && auth.currentUser.roles.some(r => props.roles.includes(r) || r === roles.admin)
    ? props.children
    : props.redirectToLogin
    ? redirect
    : null;
}
