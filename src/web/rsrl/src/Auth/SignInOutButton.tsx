import React from "react";
import { Button } from "reactstrap";

interface SignInOutButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function SignInOutButton(props: SignInOutButtonProps) {
  return (
    <Button size="sm" color="secondary" onClick={props.onClick}>
      {props.children}
    </Button>
  );
}
