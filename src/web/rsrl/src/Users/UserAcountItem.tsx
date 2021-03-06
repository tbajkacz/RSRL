import React from "react";
import { UserAccount } from "./userTypes";
import { formatUserInfo } from "../Common/formatting";
import { getRoleDisplayString } from "../Common/ComponentUtility";

interface UserAccountItemProps {
  userAccount: UserAccount;
  onClick: (u: UserAccount) => void;
  isSelected: boolean;
}

export default React.memo(function UserAccountItem(props: UserAccountItemProps) {
  let itemClass = props.isSelected ? "ui-list-item-dark ui-selected" : "ui-list-item-dark";

  return (
    <li onClick={() => props.onClick(props.userAccount)} className={itemClass}>
      <div className="h5">{formatUserInfo(props.userAccount)}</div>
      <div className="small">{"Roles: " + props.userAccount.roles.map(r => getRoleDisplayString(r)).join(", ")}</div>
    </li>
  );
});
