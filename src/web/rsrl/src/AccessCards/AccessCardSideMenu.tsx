import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { combineClasses } from "../Common/ComponentUtility";
import { AccessCardOperation } from "./accessCardTypes";

interface AccessCardSideMenuProps {
  isItemSelected: boolean;
  onClick: (option: AccessCardOperation) => void;
}

export default function AccessCardSideMenu(props: AccessCardSideMenuProps) {
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
            : () => props.onClick(option as AccessCardOperation)
        }
      >
        <span>
          <FontAwesomeIcon icon={icon} />
        </span>
        {AccessCardOperation[option]}
      </li>
    );
  };

  const sideMenuElements = [
    sideMenuElement(AccessCardOperation.Add, faPlus, false),
    sideMenuElement(AccessCardOperation.Edit, faPen, !props.isItemSelected),
    sideMenuElement(AccessCardOperation.Remove, faTrash, true)
  ];

  return (
    <div className="ui-list-wrapper ui-side-list-wrapper col-sm-1">
      <ul className="ui-list-dark">{sideMenuElements}</ul>
    </div>
  );
}
