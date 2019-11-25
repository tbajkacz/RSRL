import React from "react";
import { FieldError } from "react-hook-form/dist/types";
import { FormGroup } from "reactstrap";

export interface FormInputConfig {
  onChange: (name: string, value: string) => void;
  isDisabled: (name: string) => boolean;
  isHidden?: (name: string) => boolean;
  errors: Partial<Record<string, FieldError>>;
}

interface FormInputProps {
  config: FormInputConfig;
  name: string;
  type?: "text" | "number" | "password";
  defaultValue?: string | number;
  errorMsg?: string;
  inputRef: (instance: HTMLInputElement | null) => void;
}

export function FormInput(props: FormInputProps) {
  const defaultErrorMsg = (name: string) => `Field ${name} is required`;

  const isHidden = () => (props.config.isHidden ? props.config.isHidden(props.name) : false);

  const renderError = () => {
    if (props.config.errors[props.name] && !isHidden()) {
      return props.errorMsg ? props.errorMsg : defaultErrorMsg(props.name);
    }
  };

  return (
    <FormGroup>
      <input
        className={props.config.errors[props.name] ? "form-control is-invalid" : "form-control"}
        name={props.name}
        type={props.type}
        placeholder={props.name}
        onChange={e => props.config.onChange(props.name, e.currentTarget.value)}
        disabled={props.config.isDisabled(props.name)}
        hidden={isHidden()}
        defaultValue={props.defaultValue}
        ref={isHidden() || props.config.isDisabled(props.name) ? undefined : props.inputRef}
      />
      <span className="text-danger">{renderError()}</span>
    </FormGroup>
  );
}
