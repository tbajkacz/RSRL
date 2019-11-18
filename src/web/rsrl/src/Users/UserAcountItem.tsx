import React from "react";
import { UserAccount } from "./userTypes";

interface UserAccountItemProps {
  userAccount: UserAccount;
  onClick: (u: UserAccount) => void;
  isSelected: boolean;
}

export default function UserAccountItem(props: UserAccountItemProps) {
  let itemClass = props.isSelected
    ? "ui-list-item-dark ui-selected"
    : "ui-list-item-dark";

  return (
    <li onClick={() => props.onClick(props.userAccount)} className={itemClass}>
      <div>{props.userAccount.login}</div>
    </li>
  );
}
