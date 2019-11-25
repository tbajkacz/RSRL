import React from "react";
import { UserAccount } from "./userTypes";

interface UserAccountItemProps {
  userAccount: UserAccount;
  onClick: (u: UserAccount) => void;
  isSelected: boolean;
}

export default function UserAccountItem(props: UserAccountItemProps) {
  let itemClass = props.isSelected ? "ui-list-item-dark ui-selected" : "ui-list-item-dark";

  return (
    <li onClick={() => props.onClick(props.userAccount)} className={itemClass}>
      <div className="h5">{props.userAccount.name + " " + props.userAccount.surname}</div>
      <div className="small">{"Roles: " + props.userAccount.roles.join(", ")}</div>
    </li>
  );
}
