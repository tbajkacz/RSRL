import * as React from "react";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, ModalFooter, Button } from "reactstrap";
import { useState, useEffect } from "react";
import useForm from "react-hook-form";
import { FormInputConfig, FormInput } from "../Common/FormInput";
import { RemoteLockModalData, RemoteLockOperation, RemoteLock, AccessCardSelectModel } from "./remoteLockTypes";
import Select, { ValueType } from "react-select";
import { formatUserInfo } from "../Common/formatting";
import reactSelectDarkStyle from "../Common/reactSelectStyling";

interface RemoteLockModalProps {
  operation: RemoteLockOperation;
  currentData: RemoteLock | undefined;
  accessCards: AccessCardSelectModel[] | undefined;
  isOpen: boolean;
  toggle: () => void;
  onConfirm: (modifiedData: RemoteLockModalData | undefined, operation: RemoteLockOperation) => void;
}

export default function RemoteLockModal(props: RemoteLockModalProps) {
  const modalDataDefaultValue: RemoteLockModalData = {
    id: 0,
    url: "",
    name: "",
    allowedAccessCardIds: []
  };
  const [modalData, setModalData] = useState<RemoteLockModalData>(modalDataDefaultValue);

  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    setModalData(modalDataDefaultValue);
    switch (props.operation) {
      case RemoteLockOperation.Edit:
        if (props.currentData) {
          setModalData({
            id: props.currentData.id,
            url: props.currentData.url,
            name: props.currentData.name,
            allowedAccessCardIds: props.currentData.allowedAccessCards.map(c => c.id)
          });
        }
        break;
    }
  }, [props.isOpen]);

  const onChangeHandler = (name: string, value: string) => {
    setModalData({ ...modalData, [name]: value });
  };

  const onSubmit = () => {
    props.onConfirm(modalData, props.operation);
    props.toggle();
  };

  const isInputDisabled = (name: string) => {
    switch (name) {
      case "id":
        return props.operation === RemoteLockOperation.Edit;
    }
    return false;
  };

  const isInputHidden = (name: string) => {
    switch (name) {
      case "id":
        return props.operation === RemoteLockOperation.Add;
    }
    return false;
  };

  const inputConfig: FormInputConfig = {
    onChange: onChangeHandler,
    isDisabled: isInputDisabled,
    isHidden: isInputHidden,
    errors
  };

  const accessCardsToSelectOptions = () => {
    return props.accessCards
      ? props.accessCards.map(r => ({
          value: r.id,
          label: `${r.id}, owner: ${
            r.ownerLogin ? formatUserInfo({ name: r.ownerName, login: r.ownerLogin, surname: r.ownerSurname }) : "-"
          }`
        }))
      : undefined;
  };

  const allowedAccessCardsToSelectDefaultValue = () => {
    return modalData.allowedAccessCardIds.map(r => {
      if (props.accessCards) {
        let found = props.accessCards.find(c => c.id === r);
        if (found) {
          return {
            value: r,
            label: `${r}, owner: ${
              found.ownerLogin
                ? formatUserInfo({ name: found.ownerName, login: found.ownerLogin, surname: found.ownerSurname })
                : "-"
            }`
          };
        }
      }
      return { value: "ERROR", label: "ERROR" };
    });
  };

  const onSelectChange = (value: ValueType<{ value: string; label: string }>) => {
    if (Array.isArray(value)) {
      let casted = value as { value: string; label: string }[];
      if (casted) {
        setModalData({ ...modalData, allowedAccessCardIds: casted.map(o => o.value) });
      }
    }
  };

  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader>{RemoteLockOperation[props.operation] + " lock"}</ModalHeader>
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
          <FormInput
            config={inputConfig}
            name="name"
            defaultValue={modalData.name}
            inputRef={register({
              required: true
            })}
          />
          <FormInput
            config={inputConfig}
            name="url"
            defaultValue={modalData.url}
            inputRef={register({
              required: true
            })}
          />
          <FormGroup hidden={isInputHidden("allowedAccessCardIds")}>
            <small className="ui-input-label">Access cards</small>
            <Select
              styles={reactSelectDarkStyle}
              options={accessCardsToSelectOptions()}
              isMulti={true}
              defaultValue={allowedAccessCardsToSelectDefaultValue()}
              onChange={onSelectChange}
              placeholder="access cards"
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
