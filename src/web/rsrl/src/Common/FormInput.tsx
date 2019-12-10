import React, { useState } from "react";
import { FieldError } from "react-hook-form/dist/types";
import { FormGroup } from "reactstrap";
import { combineClasses } from "./ComponentUtility";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface FormInputConfig {
  onChange: (name: string, value: string) => void;
  isDisabled?: (name: string) => boolean;
  isHidden?: (name: string) => boolean;
  errors?: Partial<Record<string, FieldError>>;
}

interface FormInputProps {
  className?: string;
  config: FormInputConfig;
  name: string;
  type?: "text" | "number" | "password";
  defaultValue?: string | number;
  errorMsg?: string;
  icon?: IconProp;
  inputRef: (instance: HTMLInputElement | null) => void;
}

export function FormInput(props: FormInputProps) {
  const defaultErrorMsg = (name: string) => `Field ${name} is required`;

  const [value, setValue] = useState("");

  const isHidden = () => props.config.isHidden && props.config.isHidden(props.name);
  const isDisabled = () => props.config.isDisabled && props.config.isDisabled(props.name);

  const renderError = () => {
    if (props.config.errors && props.config.errors[props.name] && !isHidden() && !isDisabled()) {
      return props.errorMsg ? props.errorMsg : defaultErrorMsg(props.name);
    }
  };

  return (
    <FormGroup className={combineClasses(props.className)}>
      <label className="flex-row ui-input-label" hidden={isHidden()}>
        <small>{props.name.charAt(0).toUpperCase() + props.name.slice(1)}</small>
      </label>
      <div className="d-flex">
        {props.icon ? (
          <span className="ui-input-icon">
            <FontAwesomeIcon icon={props.icon} />
          </span>
        ) : null}
        <input
          className={combineClasses(
            props.config.errors && props.config.errors[props.name] ? "ui-input-dark is-invalid" : "ui-input-dark",
            props.className
          )}
          name={props.name}
          type={props.type}
          placeholder={props.name}
          onChange={e => {
            setValue(e.currentTarget.value);
            props.config.onChange(props.name, e.currentTarget.value);
          }}
          disabled={isDisabled()}
          hidden={isHidden()}
          defaultValue={props.defaultValue}
          ref={isHidden() || isDisabled() ? undefined : props.inputRef}
        />
      </div>
      <small className="text-danger">{renderError()}</small>
    </FormGroup>
  );
}
