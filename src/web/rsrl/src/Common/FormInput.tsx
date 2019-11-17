import React from "react";
import { FieldError } from "react-hook-form/dist/types";
import { FormGroup } from "reactstrap";

export interface FormInputConfig {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled: (name: string) => boolean;
  isHidden?: (name: string) => boolean;
  errors: Partial<Record<string, FieldError>>;
}

interface FormInputProps {
  config: FormInputConfig;
  name: string;
  defaultValue: string | number;
  errorMsg?: string;
  inputRef: (instance: HTMLInputElement | null) => void;
}

export function FormInput(props: FormInputProps) {
  const defaultErrorMsg = (name: string) => `Field ${name} is required`;

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
        hidden={
          props.config.isHidden ? props.config.isHidden(props.name) : false
        }
        defaultValue={props.defaultValue}
        ref={props.inputRef}
      />
      <span className="text-danger">
        {props.config.errors[props.name]
          ? props.errorMsg
            ? props.errorMsg
            : defaultErrorMsg(props.name)
          : ""}
      </span>
    </FormGroup>
  );
}
