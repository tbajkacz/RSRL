import React from "react";
import { FieldError } from "react-hook-form/dist/types";
import { FormGroup } from "reactstrap";

export interface FormInputConfig {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: (name: string) => boolean;
  errors: Partial<Record<string, FieldError>>;
}

interface FormInputProps {
  config: FormInputConfig;
  name: string;
  defaultValue: string;
  errorMsg: string;
  inputRef: (instance: HTMLInputElement | null) => void;
}

export function FormInput(props: FormInputProps) {
  return (
    <FormGroup>
      <input
        className={
          props.config.errors[props.name]
            ? "form-control is-invalid"
            : "form-control"
        }
        name={props.name}
        placeholder={props.name}
        onChange={props.config.onChange}
        disabled={props.config.isDisabled(props.name)}
        defaultValue={props.defaultValue}
        ref={props.inputRef}
      />
      <span className="text-danger">
        {props.config.errors[props.name] ? props.errorMsg : ""}
      </span>
    </FormGroup>
  );
}
