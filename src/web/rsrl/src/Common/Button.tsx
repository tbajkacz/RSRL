import React from "react";
import { combineClasses } from "./ComponentUtility";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type: "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link";
  children?: React.ReactNode | React.ReactNode[] | string;
}

export default function Button(props: ButtonProps) {
  const { type, className, ...rest } = props;
  return <button className={combineClasses("btn", "btn-" + type, className)} {...rest}></button>;
}
