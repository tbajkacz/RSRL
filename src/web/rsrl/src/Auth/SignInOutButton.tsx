import React from "react";
import Button from "../Common/Button";

interface SignInOutButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function SignInOutButton(props: SignInOutButtonProps) {
  return (
    <Button className="btn my-sm-0 btn-sm" type="secondary" onClick={props.onClick}>
      {props.children}
    </Button>
  );
}
