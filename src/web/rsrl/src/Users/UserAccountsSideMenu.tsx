import React from "react";
import { UserAccountOperation } from "./userTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { combineClasses } from "../Common/ComponentUtility";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faPen, faTrash, faLock } from "@fortawesome/free-solid-svg-icons";

interface UserAccountsSideMenuProps {
  onClick: (option: UserAccountOperation) => void;
  isItemSelected: boolean;
}

export default function UserAccountsSideMenu(props: UserAccountsSideMenuProps) {
  const spaceOnUpper = (s: string) => {
    return s.match(/[A-Z][a-z]+|[0-9]+/g)!.join(" ");
  };

  const sideMenuElement = (option: number, icon: IconDefinition, disabled: boolean) => {
    return (
      <li
        key={option}
        className={combineClasses("ui-side-list-item-dark", disabled ? "ui-disabled" : "")}
        onClick={disabled ? undefined : () => props.onClick(option as UserAccountOperation)}
      >
        <span>
          <FontAwesomeIcon icon={icon} />
        </span>
        {spaceOnUpper(UserAccountOperation[option])}
      </li>
    );
  };

  const sideMenuElements = [
    sideMenuElement(UserAccountOperation.Add, faPlus, false),
    sideMenuElement(UserAccountOperation.Edit, faPen, !props.isItemSelected),
    sideMenuElement(UserAccountOperation.Remove, faTrash, !props.isItemSelected),
    sideMenuElement(UserAccountOperation.ChangePassword, faLock, !props.isItemSelected)
  ];

  return (
    <div className="ui-list-wrapper ui-side-list-wrapper">
      <ul className="ui-list-dark">{sideMenuElements}</ul>
    </div>
  );
}
