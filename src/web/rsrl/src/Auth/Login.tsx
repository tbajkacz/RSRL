import React, { useState, FormEvent } from "react";
import { useAuth } from "./authContext";
import { Redirect } from "react-router";
import routes from "../Common/Routes";
import "./styles/Login.scss";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthParams } from "./authTypes";
import { Card, CardHeader, CardBody, Form, InputGroup, CardFooter, FormGroup, Label, Input, Button } from "reactstrap";
import { FormInput, FormInputConfig } from "../Common/FormInput";
import useForm from "react-hook-form";

interface LoginProps {
  className?: string;
}

export function Login(props: LoginProps) {
  const [params, setParams] = useState<AuthParams>({
    login: "",
    password: "",
    rememberMe: false
  });

  const auth = useAuth();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = () => {
    auth.signIn(params);
  };

  const onChange = (name: string, value: string) => {
    setParams({ ...params, [name]: value });
  };

  const config: FormInputConfig = {
    onChange,
    errors
  };

  return auth.currentUser ? (
    <Redirect to={routes.Home} />
  ) : (
    <div className={props.className}>
      <div className="ui-login-card shadow">
        <CardHeader>
          <h3 className="text-white">Sign In</h3>
        </CardHeader>
        <div className="ui-login-card-body">
          <Form>
            <FormInput
              className="flex-fill"
              config={config}
              type="text"
              name="login"
              icon={faUser}
              inputRef={register({
                required: true
              })}
            />
            <FormInput
              className="flex-fill"
              config={config}
              type="password"
              name="password"
              icon={faKey}
              inputRef={register({
                required: true
              })}
            />
            <FormGroup className="ui-login-remember-me">
              <Input type="checkbox" onChange={e => setParams({ ...params!, rememberMe: e.currentTarget.checked })} />
              <Label>Remember me</Label>
            </FormGroup>
            <FormGroup>
              <Button color="primary" block={true} type="submit" onClick={handleSubmit(onSubmit)}>
                Login
              </Button>
            </FormGroup>
          </Form>
        </div>
        <CardFooter>
          <small className="text-white">
            Don't have an account? <a href="mailto:tomasz.bajkacz@gmail.com">Contact</a> your administrator
          </small>
        </CardFooter>
      </div>
    </div>
  );
}
