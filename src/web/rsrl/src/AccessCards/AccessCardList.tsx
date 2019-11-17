import * as React from "react";
import {
  AccessCard,
  AccessCardModalData,
  AccessCardOperation
} from "./accessCardTypes";
import { accessCardsService } from "./AccessCardsService";
import useEffectAsync from "../Common/useEffectAsync";
import { useState } from "react";
import LoadingIndicator from "../LoadingIndicator";
import { userService } from "../Users/UserService";
import { UserAccountSelectOptionModel } from "../Users/userTypes";
import AccessCardModal from "./AccessCardModal";
import AccessCardSideMenu from "./AccessCardSideMenu";
import AccessCardItem from "./AccessCardItem";
import { accessCardHelpers } from "./accessCardHelpers";

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
  const [dataChanged, setDataChanged] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalOperation, setModalOperation] = useState(
    AccessCardOperation.None
  );

  const toggle = () => setIsOpen(!isOpen);

  useEffectAsync(async () => {
    let promise = accessCardsService.Get();
    setLoadingPromise(promise);
    setAccessCards((await promise).result);
  }, [dataChanged]);

  const updateUserInfos = async () => {
    let promise = userService.Get();
    setModalPromise(promise);
    promise.then(response => {
      setUserInfos(
        response.result.map(u => {
          return {
            id: u.id,
            login: u.login
          };
        })
      );
    });
  };

  const onSideMenuClick = async (option: AccessCardOperation) => {
    setModalOperation(option);
    switch (option) {
      case AccessCardOperation.Add:
      case AccessCardOperation.Edit:
        await updateUserInfos();
        toggle();
        break;
      case AccessCardOperation.Remove:
        accessCardHelpers.requestRemove(selected!.id, onRequestCompleted);
        break;
      default:
        break;
    }
  };

  const findUserIdByLogin = (login: string) => {
    let users = userInfos!.filter(u => u.login === login);
    return users.length > 0 ? users[0].id : 0;
  };

  const onRequestCompleted = () => {
    setDataChanged(!dataChanged);
  };

  const onModalConfirm = (
    modifiedData: AccessCardModalData | undefined,
    operation: AccessCardOperation
  ) => {
    if (modifiedData) {
      switch (operation) {
        case AccessCardOperation.Add:
          accessCardHelpers.requestAdd(
            modifiedData,
            findUserIdByLogin(modifiedData.ownerLogin),
            onRequestCompleted
          );
          break;
        case AccessCardOperation.Edit:
          accessCardHelpers.requestEdit(
            modifiedData,
            findUserIdByLogin(modifiedData.ownerLogin),
            onRequestCompleted
          );
          break;
      }
    }
  };

  return (
    <div className={props.className}>
      <LoadingIndicator promise={loadingPromise}>
        <div className={props.className}>
          {accessCards ? (
            <div className="ui-list-flex-container">
              <AccessCardSideMenu
                onClick={onSideMenuClick}
                isItemSelected={selected ? true : false}
              />
              <div className="ui-list-wrapper col-sm-7">
                <h6 className="ui-list-header">Access Cards</h6>
                <ul className="ui-list-dark">
                  {accessCards.map(c => (
                    <AccessCardItem
                      accessCard={c}
                      onClick={c => setSelected(c)}
                      isSelected={c === selected}
                    />
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </LoadingIndicator>
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
