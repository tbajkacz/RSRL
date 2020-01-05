import React, { useState, useEffect } from "react";
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
  const [complete, setComplete] = useState(false);

  const callback = () => {
    setComplete(true);
  };

  useEffect(() => {
    if (auth.promise) {
      auth.promise.then(callback, callback);
    }
  }, [auth.promise]);

  const hasAnyOfRoles = () => {
    return auth.currentUser && auth.currentUser.roles.some(r => props.roles.includes(r) || r === roles.admin);
  };

  return hasAnyOfRoles() ? props.children : props.redirectToLogin && complete ? redirect : null;
}
