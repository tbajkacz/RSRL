import React, { useState, useEffect } from "react";
import { UserAccountOperation, UserAccount, UserAccountModalData } from "./userTypes";
import { AccessCardOperation } from "../AccessCards/accessCardTypes";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Input, ModalFooter, Button } from "reactstrap";
import useForm from "react-hook-form";
import { FormInput, FormInputConfig } from "../Common/FormInput";
import Select, { ValueType } from "react-select";
import { isPeselValid } from "./userModalValidation";

interface UserAccountModalProps {
  operation: UserAccountOperation;
  userRoles: string[] | undefined;
  currentData: UserAccount | undefined;
  isOpen: boolean;
  toggle: () => void;
  onConfirm: (modifiedData: UserAccountModalData | undefined, operation: UserAccountOperation) => void;
}

export default function UserAccountModal(props: UserAccountModalProps) {
  const modalDataDefaultValue = {
    id: 0,
    login: "",
    password: "",
    roles: [],
    name: "",
    surname: "",
    pesel: ""
  };

  const [modalData, setModalData] = useState<UserAccountModalData>(modalDataDefaultValue);

  const { register, handleSubmit, errors, getValues } = useForm();

  useEffect(() => {
    setModalData(modalDataDefaultValue);
    switch (props.operation) {
      case UserAccountOperation.ChangePassword:
      case UserAccountOperation.Edit:
        if (props.currentData) {
          let data: UserAccountModalData = {
            id: props.currentData.id,
            login: props.currentData.login,
            name: props.currentData.name,
            surname: props.currentData.surname,
            pesel: props.currentData.pesel,
            password: "",
            roles: props.currentData.roles
          };
          setModalData(data);
        }
        break;
    }
  }, [props.isOpen]);

  const onSelectChange = (value: ValueType<{ value: string; label: string }>) => {
    if (Array.isArray(value)) {
      let casted = value as { value: string; label: string }[];
      if (casted) {
        setModalData({ ...modalData, roles: casted.map(o => o.value) });
      }
    }
  };

  const onChangeHandler = (name: string, value: string) => {
    setModalData({ ...modalData, [name]: value });
  };

  const onSubmit = () => {
    props.onConfirm(modalData, props.operation);
    props.toggle();
  };

  const isInputHidden = (name: string) => {
    switch (name) {
      case "id":
        return props.operation === UserAccountOperation.Add;
      case "password":
      case "confirmPassword":
        return props.operation !== UserAccountOperation.ChangePassword && props.operation !== UserAccountOperation.Add;
      case "roles":
        return props.operation !== UserAccountOperation.Edit && props.operation !== UserAccountOperation.Add;
    }
    return false;
  };

  const isInputDisabled = (name: string) => {
    switch (name) {
      case "id":
        return true;
      case "login":
        return props.operation === UserAccountOperation.ChangePassword;
    }
    return false;
  };

  const config: FormInputConfig = {
    onChange: onChangeHandler,
    isDisabled: isInputDisabled,
    isHidden: isInputHidden,
    errors
  };

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader>{UserAccountOperation[props.operation] + " user"}</ModalHeader>
      <ModalBody>
        <Form>
          <FormInput config={config} name="id" defaultValue={modalData.id} inputRef={register({ required: true })} />
          <FormInput
            config={config}
            name="name"
            defaultValue={modalData.name}
            inputRef={register({ required: true })}
          />
          <FormInput
            config={config}
            name="surname"
            defaultValue={modalData.surname}
            inputRef={register({ required: true })}
          />
          <FormInput
            config={config}
            type="number"
            name="pesel"
            defaultValue={modalData.pesel}
            errorMsg="You need to provide a valid pesel"
            inputRef={register({ validate: (val: string) => isPeselValid(val) })}
          />
          <FormInput
            config={config}
            name="login"
            defaultValue={modalData.login}
            inputRef={register({ required: true })}
          />
          <FormInput config={config} name="password" type="password" inputRef={register({ required: true })} />
          <FormInput
            config={config}
            name="confirmPassword"
            type="password"
            errorMsg="Passwords must match"
            inputRef={register({
              required: true,
              validate: (val: string) => val === getValues()["password"]
            })}
          />
          <FormGroup hidden={isInputHidden("roles")}>
            <Select
              options={props.userRoles ? props.userRoles.map(r => ({ value: r, label: r })) : undefined}
              isMulti={true}
              onChange={onSelectChange}
              defaultValue={modalData.roles.map(r => ({ value: r, label: r }))}
              placeholder="roles"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit(onSubmit)}>
          Accept
        </Button>
        <Button color="secondary" onClick={props.toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
