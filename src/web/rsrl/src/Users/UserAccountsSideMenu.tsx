import React from "react";
import { UserAccountOperation } from "./userTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { combineClasses } from "../Common/ComponentUtility";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

interface UserAccountsSideMenuProps {
  onClick: (option: UserAccountOperation) => void;
  isItemSelected: boolean;
}

export default function UserAccountsSideMenu(props: UserAccountsSideMenuProps) {
  const sideMenuElement = (
    option: number,
    icon: IconDefinition,
    disabled: boolean
  ) => {
    return (
      <li
        className={combineClasses(
          "ui-side-list-item-dark",
          disabled ? "ui-disabled" : ""
        )}
        onClick={
          disabled
            ? undefined
            : () => props.onClick(option as UserAccountOperation)
        }
      >
        <span>
          <FontAwesomeIcon icon={icon} />
        </span>
        {UserAccountOperation[option]}
      </li>
    );
  };

  const sideMenuElements = [
    sideMenuElement(UserAccountOperation.Add, faPlus, false),
    sideMenuElement(UserAccountOperation.Edit, faPen, !props.isItemSelected),
    sideMenuElement(UserAccountOperation.Remove, faTrash, !props.isItemSelected)
  ];

  return (
    <div className="ui-list-wrapper ui-side-list-wrapper col-sm-1">
      <ul className="ui-list-dark">{sideMenuElements}</ul>
    </div>
  );
}
