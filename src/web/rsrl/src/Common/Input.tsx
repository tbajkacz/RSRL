import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input(props: InputProps) {
  return <input className="form-control" {...props} />;
}
