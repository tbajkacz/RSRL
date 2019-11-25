import * as React from "react";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, ModalFooter, Button } from "reactstrap";
import { UserAccountSelectOptionModel } from "../Users/userTypes";
import { AccessCardModalData, AccessCard, AccessCardOperation } from "./accessCardTypes";
import { useState, useEffect } from "react";
import useForm from "react-hook-form";
import { FormInputConfig, FormInput } from "../Common/FormInput";

interface AccessCardModalProps {
  operation: AccessCardOperation;
  currentData: AccessCard | undefined;
  userInfos: UserAccountSelectOptionModel[] | undefined;
  isOpen: boolean;
  toggle: () => void;
  onConfirm: (modifiedData: AccessCardModalData | undefined, operation: AccessCardOperation) => void;
}

export default function AccessCardModal(props: AccessCardModalProps) {
  const modalDataDefaultValue = {
    id: "",
    ownerLogin: ""
  };
  const [modalData, setModalData] = useState<AccessCardModalData>(modalDataDefaultValue);

  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    setModalData(modalDataDefaultValue);
    switch (props.operation) {
      case AccessCardOperation.Edit:
        if (props.currentData) {
          setModalData({
            id: props.currentData.id,
            ownerLogin: props.currentData.owner ? props.currentData.owner.login : ""
          });
        }
        break;
    }
  }, [props.isOpen]);

  const renderUserOptions = () => {
    if (props.userInfos) {
      return props.userInfos.map(u => <option selected={modalData.ownerLogin === u.login}>{u.login}</option>);
    }
  };

  const onChangeHandler = (name: string, value: string) => {
    setModalData({ ...modalData, [name]: value });
  };

  const onSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let copy = { ...modalData! };
    if (props.userInfos) {
      copy.ownerLogin = e.currentTarget.selectedOptions[0].value;
      setModalData(copy);
    }
  };

  const onSubmit = (data: any) => {
    console.log(data);
    props.onConfirm(modalData, props.operation);
    props.toggle();
  };

  const isInputDisabled = (name: string) => {
    switch (name) {
      case "id":
        return props.operation === AccessCardOperation.Edit;
        break;
    }
    return false;
  };

  const inputConfig: FormInputConfig = {
    onChange: onChangeHandler,
    isDisabled: isInputDisabled,
    errors
  };

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader>{AccessCardOperation[props.operation] + " access card"}</ModalHeader>
      <ModalBody>
        <Form>
          <FormInput
            config={inputConfig}
            name="id"
            defaultValue={modalData.id}
            inputRef={register({
              required: true
            })}
          />
          <FormGroup>
            <select className="form-control" onChange={onSelectHandler}>
              <option></option>
              {renderUserOptions()}
            </select>
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
