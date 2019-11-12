import * as React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  ModalFooter,
  Button,
  Label
} from "reactstrap";
import { UserAccountSelectOptionModel } from "../Users/userTypes";
import { AccessCardModalData, AccessCard } from "./accessCardTypes";
import { useState, useEffect } from "react";

export enum AccessCardOperation {
  None,
  Add,
  Edit
}

interface AccessCardModalProps {
  operation: AccessCardOperation;
  currentData: AccessCard | undefined;
  userInfos: UserAccountSelectOptionModel[] | undefined;
  isOpen: boolean;
  toggle: () => void;
  onConfirm: (
    modifiedData: AccessCardModalData | undefined,
    operation: AccessCardOperation
  ) => void;
}

export default function AccessCardModal(props: AccessCardModalProps) {
  const modalDataDefaultValue = {
    id: "",
    ownerLogin: ""
  };
  const [modalData, setModalData] = useState<AccessCardModalData>(
    modalDataDefaultValue
  );

  useEffect(() => {
    switch (props.operation) {
      case AccessCardOperation.Add:
        setModalData(modalDataDefaultValue);
        break;
      case AccessCardOperation.Edit:
        if (props.currentData) {
          setModalData({
            id: props.currentData.id,
            ownerLogin: props.currentData.owner.login
          });
        }
        break;
    }
    console.log(modalData);
  }, [props.isOpen]);

  const renderUserOptions = () => {
    if (props.userInfos) {
      return props.userInfos.map(u => (
        <option selected={modalData.ownerLogin === u.login}>{u.login}</option>
      ));
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let copy = { ...modalData! };
    copy.id = e.currentTarget.value;
    setModalData(copy);
  };

  const onSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let copy = { ...modalData! };
    if (props.userInfos) {
      copy.ownerLogin = e.currentTarget.selectedOptions[0].value;
      setModalData(copy);
    }
  };

  const onSubmit = () => {
    props.onConfirm(modalData, props.operation);
    props.toggle();
  };

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader>Modal</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Input
              name="id"
              placeholder="id"
              onChange={onChangeHandler}
              disabled={props.operation === AccessCardOperation.Edit}
              value={modalData.id}
            />
          </FormGroup>
          <FormGroup>
            <select className="form-control" onChange={onSelectHandler}>
              <option></option>
              {renderUserOptions()}
            </select>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onSubmit}>
          Accept
        </Button>
        <Button color="secondary" onClick={props.toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
