import * as React from "react";
import ScrollableList from "../Common/ScrollableList";
import { AccessCard, AccessCardModalData } from "./accessCardTypes";
import { accessCardsService } from "./AccessCardsService";
import {
  ListGroupItem,
  Modal,
  ModalHeader,
  Form,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormGroup
} from "reactstrap";
import useEffectAsync from "../Common/useEffectAsync";
import { useState } from "react";
import LoadingIndicator from "../LoadingIndicator";
import { userService } from "../Users/UserService";
import { UserAccountSelectOptionModel } from "../Users/userTypes";

interface AccessCardListProps {
  className?: string;
}

export default function AccessCardList(props: AccessCardListProps) {
  const [accessCards, setAccessCards] = useState<AccessCard[]>();
  const [userInfos, setUserInfos] = useState<UserAccountSelectOptionModel[]>();
  const [loadingPromise, setLoadingPromise] = useState<
    Promise<any> | undefined
  >();
  const [selected, setSelected] = useState<AccessCard>();
  const [useEffectChanged, setUseEffectChanged] = useState(false);

  useEffectAsync(async () => {
    let promise = accessCardsService.Get();
    setLoadingPromise(promise);
    setAccessCards((await promise).result);
  }, [useEffectChanged]);

  const renderer = (accessCard: AccessCard) => {
    let itemClass =
      selected === accessCard
        ? "ui-list-item-dark ui-selected"
        : "ui-list-item-dark";
    return (
      <ListGroupItem
        onClick={() => setSelected(accessCard)}
        className={itemClass}
      >
        {accessCard.id}
      </ListGroupItem>
    );
  };

  const add = async () => {
    let response = await userService.Get();

    setUserInfos(
      response.result.map(u => {
        return {
          id: u.id,
          login: u.login
        };
      })
    );
    toggle();
  };

  const update = () => {
    console.log("to be updated");
    console.log(selected);
  };

  const remove = () => {
    console.log("remove");
  };

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const renderUserOptions = () => {
    if (userInfos) {
      return userInfos.map(u => <option>{u.login}</option>);
    }
  };

  const [accessCardModalData, setAccessCardModalData] = useState<
    AccessCardModalData
  >();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let copy = { ...accessCardModalData! };
    copy.id = e.currentTarget.value;
    setAccessCardModalData(copy);
  };

  const onSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let copy = { ...accessCardModalData! };
    if (userInfos) {
      copy.ownerId = userInfos.filter(
        u => u.login === e.currentTarget.selectedOptions[0].value
      )[0].id;
      setAccessCardModalData(copy);
    }
  };

  const requestAdd = async () => {
    if (accessCardModalData) {
      await accessCardsService.Add({
        id: accessCardModalData.id,
        ownerId: accessCardModalData.ownerId
      });
      setUseEffectChanged(!useEffectChanged);
    }
  };

  return (
    <div>
      <ScrollableList<AccessCard>
        data={accessCards}
        rowRenderer={renderer}
        loadingPromise={loadingPromise}
        onAddClick={add}
        onUpdateClick={update}
        onRemoveClick={remove}
      />
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Modal</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Input name="id" placeholder="id" onChange={onChangeHandler} />
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
          <Button color="primary" onClick={requestAdd}>
            Add
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
