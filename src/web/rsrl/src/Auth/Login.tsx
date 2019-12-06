import React, { useState, FormEvent } from "react";
import { useAuth } from "./authContext";
import { Redirect } from "react-router";
import routes from "../Common/Routes";
import "./styles/Login.scss";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthParams } from "./authTypes";
import { Card, CardHeader, CardBody, Form, InputGroup, CardFooter, FormGroup, Label, Input, Button } from "reactstrap";

interface LoginProps {
  className?: string;
}

export function Login(props: LoginProps) {
  const [params, setParams] = useState<AuthParams>();
  const auth = useAuth();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth.signIn(params);
  };

  return auth.currentUser ? (
    <Redirect to={routes.Home} />
  ) : (
    <div className={props.className}>
      <div className="ui-login-card shadow">
        <CardHeader>
          <h3 className="text-white">Sign In</h3>
        </CardHeader>
        <CardBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <InputGroup className="input-group">
                <span className="ui-input-icon">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <Input
                  type="text"
                  placeholder="username"
                  onChange={e => setParams({ ...params!, login: e.currentTarget.value })}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup>
                <span className="ui-input-icon">
                  <FontAwesomeIcon icon={faKey} />
                </span>
                <Input
                  type="password"
                  placeholder="password"
                  onChange={e => setParams({ ...params!, password: e.currentTarget.value })}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup className="ui-login-remember-me">
              <Input type="checkbox" />
              <Label>Remember me</Label>
            </FormGroup>
            <FormGroup>
              <Button color="primary" block={true}>
                Login
              </Button>
            </FormGroup>
          </Form>
        </CardBody>
        <CardFooter>
          <small className="text-white">
            Don't have an account? <a href="mailto:tomasz.bajkacz@gmail.com">Contact</a> your administrator
          </small>
        </CardFooter>
      </div>
    </div>
  );
}
