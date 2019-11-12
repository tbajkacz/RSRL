import * as React from "react";
import ScrollableList from "../Common/ScrollableList";
import { AccessCard, AccessCardModalData } from "./accessCardTypes";
import { accessCardsService } from "./AccessCardsService";
import { ListGroupItem } from "reactstrap";
import useEffectAsync from "../Common/useEffectAsync";
import { useState } from "react";
import LoadingIndicator from "../LoadingIndicator";
import { userService } from "../Users/UserService";
import { UserAccountSelectOptionModel } from "../Users/userTypes";
import AccessCardModal, { AccessCardOperation } from "./AccessCardModal";

interface AccessCardListProps {
  className?: string;
}

export default function AccessCardList(props: AccessCardListProps) {
  const [accessCards, setAccessCards] = useState<AccessCard[]>();
  const [userInfos, setUserInfos] = useState<UserAccountSelectOptionModel[]>();
  const [loadingPromise, setLoadingPromise] = useState<
    Promise<any> | undefined
  >();
  const [modalPromise, setModalPromise] = useState<Promise<any> | undefined>();
  const [selected, setSelected] = useState<AccessCard>();
  const [elementChangedTrigger] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalOperation, setModalOperation] = useState(
    AccessCardOperation.None
  );

  const toggle = () => setIsOpen(!isOpen);

  useEffectAsync(async () => {
    let promise = accessCardsService.Get();
    setLoadingPromise(promise);
    setAccessCards((await promise).result);
  }, [elementChangedTrigger]);

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

  const updateUserInfos = async () => {
    let promise = userService.Get();
    setModalPromise(promise);
    let response = await promise;

    setUserInfos(
      response.result.map(u => {
        return {
          id: u.id,
          login: u.login
        };
      })
    );
  };

  const add = async () => {
    setModalOperation(AccessCardOperation.Add);
    await updateUserInfos();
    toggle();
  };

  const update = async () => {
    setModalOperation(AccessCardOperation.Edit);
    await updateUserInfos();
    toggle();
  };

  const remove = () => {
    console.log("remove");
  };

  const getUserId = (login: string) => {
    let users = userInfos!.filter(u => u.login === login);
    return users.length > 0 ? users[0].id : 0;
  };

  const requestAdd = async (accessCardModalData: AccessCardModalData) => {
    await accessCardsService.Add({
      id: accessCardModalData.id,
      ownerId: getUserId(accessCardModalData.ownerLogin)
    });
  };

  const requestEdit = async (accessCardModalData: AccessCardModalData) => {
    await accessCardsService.Update({
      id: accessCardModalData.id,
      ownerId: getUserId(accessCardModalData.ownerLogin)
    });
  };

  const onModalConfirm = (
    modifiedData: AccessCardModalData | undefined,
    operation: AccessCardOperation
  ) => {
    if (modifiedData) {
      switch (operation) {
        case AccessCardOperation.Add:
          requestAdd(modifiedData);
          break;
        case AccessCardOperation.Edit:
          requestEdit(modifiedData);
          break;
      }
    }
  };

  return (
    <div className={props.className}>
      <ScrollableList<AccessCard>
        data={accessCards}
        rowRenderer={renderer}
        loadingPromise={loadingPromise}
        onAddClick={add}
        onUpdateClick={update}
        onRemoveClick={remove}
      />
      <LoadingIndicator promise={modalPromise} asModal={true}>
        <AccessCardModal
          operation={modalOperation}
          isOpen={isOpen}
          toggle={toggle}
          userInfos={userInfos}
          onConfirm={onModalConfirm}
          currentData={selected}
        />
      </LoadingIndicator>
    </div>
  );
}
