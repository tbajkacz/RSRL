import React, { useState } from "react";
import Input from "../Common/Input";
import Button from "../Common/Button";
import { combineClasses } from "../Common/ComponentUtility";
import { useAuth } from "./authContext";
import { Redirect } from "react-router";
import routes from "../Common/Routes";
import { AuthParams } from "../Common/types";

interface LoginProps {
  className?: string;
}

export function Login(props: LoginProps) {
  const [params, setParams] = useState<AuthParams>();
  const auth = useAuth();

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    auth.signIn(params);
  };

  return auth.currentUser ? (
    <Redirect to={routes.Home} />
  ) : (
    <form
      className={combineClasses(
        "col-sm-8 col-md-6 col-lg-4 mx-auto border rounded p-3",
        props.className
      )}
    >
      <h3 className="text-center">Sign in to RSRLC</h3>
      <div className="form-group">
        <Input
          onChange={e =>
            setParams({ ...params!, login: e.currentTarget.value })
          }
          placeholder="Login"
        />
      </div>
      <div className="form-group">
        <Input
          onChange={e =>
            setParams({ ...params!, password: e.currentTarget.value })
          }
          placeholder="Password"
          type="password"
        />
      </div>
      <div className="form-group">
        <Button className="btn-block" type="primary" onClick={onSubmit}>
          Login
        </Button>
      </div>
    </form>
  );
}
