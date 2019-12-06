import React, { useState } from "react";
import { UserAccount, UserAccountOperation, UserAccountModalData } from "./userTypes";
import useEffectAsync from "../Common/useEffectAsync";
import { userService } from "./UserService";
import LoadingIndicator from "../LoadingIndicator";
import UserAccountsSideMenu from "./UserAccountsSideMenu";
import UserAccountItem from "./UserAcountItem";
import UserAccountModal from "./UserAccountModal";
import { userHelpers } from "./userAccountListHelpers";

interface UserAccountListProps {
  className?: string;
}

export default function UserAccountList(props: UserAccountListProps) {
  const [currentOperation, setCurrentOperation] = useState(UserAccountOperation.None);
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>();
  const [userRoles, setUserRoles] = useState<string[]>();
  const [selected, setSelected] = useState<UserAccount>();

  const [loadingPromise, setLoadingPromise] = useState<Promise<any>>();
  const [modalPromise, setModalPromise] = useState<Promise<any>>();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [dataChanged, setDataChanged] = useState(false);

  const toggle = () => setModalIsOpen(!modalIsOpen);

  const updateRoles = async () => {
    let modalPromise = userService.Roles();
    setModalPromise(modalPromise);
    modalPromise.then(res => {
      setUserRoles(res.result);
    });
  };

  useEffectAsync(async () => {
    let promise = userService.Get();
    setLoadingPromise(promise);
    let response = await promise;
    setUserAccounts(response.result);
  }, [dataChanged]);

  const onRequestCompleted = () => {
    setDataChanged(!dataChanged);
  };

  const onSideMenuClick = async (option: UserAccountOperation) => {
    setCurrentOperation(option);
    switch (option) {
      case UserAccountOperation.Add:
      case UserAccountOperation.Edit:
        await updateRoles();
        toggle();
        break;
      case UserAccountOperation.Remove:
        await userHelpers.requestRemove(selected!.id, onRequestCompleted);
        break;
      case UserAccountOperation.ChangePassword:
        toggle();
        break;
    }
  };

  const onModalConfirm = async (data: UserAccountModalData | undefined, option: UserAccountOperation) => {
    if (data) {
      switch (option) {
        case UserAccountOperation.Add:
          userHelpers.requestAdd(data, onRequestCompleted);
          break;
        case UserAccountOperation.Edit:
          userHelpers.requestUpdate(data, onRequestCompleted);
          break;
        case UserAccountOperation.ChangePassword:
          userHelpers.requestChangePassword(data, onRequestCompleted);
          break;
      }
    }
  };

  return (
    <div className={props.className}>
      <LoadingIndicator promise={loadingPromise}>
        <div className={props.className}>
          {userAccounts ? (
            <div className="ui-list-flex-container">
              <UserAccountsSideMenu onClick={onSideMenuClick} isItemSelected={selected ? true : false} />
              <div className="ui-list-wrapper col-sm-7">
                <h6 className="ui-list-header">Users</h6>
                <ul className="ui-list-dark">
                  {userAccounts.map(c => (
                    <UserAccountItem
                      key={c.id}
                      userAccount={c}
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
        <UserAccountModal
          operation={currentOperation}
          userRoles={userRoles}
          isOpen={modalIsOpen}
          toggle={toggle}
          onConfirm={onModalConfirm}
          currentData={selected}
        />
      </LoadingIndicator>
    </div>
  );
}
