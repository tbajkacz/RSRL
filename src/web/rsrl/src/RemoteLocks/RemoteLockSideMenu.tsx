import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { combineClasses } from "../Common/ComponentUtility";
import { RemoteLockOperation } from "./remoteLockTypes";

interface RemoteLockSideMenuProps {
  isItemSelected: boolean;
  onClick: (option: RemoteLockOperation) => void;
}

export default function RemoteLockSideMenu(props: RemoteLockSideMenuProps) {
  const sideMenuElement = (option: number, icon: IconDefinition, disabled: boolean) => {
    return (
      <li
        className={combineClasses("ui-side-list-item-dark", disabled ? "ui-disabled" : "")}
        onClick={disabled ? undefined : () => props.onClick(option as RemoteLockOperation)}
      >
        <span>
          <FontAwesomeIcon icon={icon} />
        </span>
        {RemoteLockOperation[option]}
      </li>
    );
  };

  const sideMenuElements = [
    sideMenuElement(RemoteLockOperation.Add, faPlus, false),
    sideMenuElement(RemoteLockOperation.Edit, faPen, !props.isItemSelected),
    sideMenuElement(RemoteLockOperation.Remove, faTrash, !props.isItemSelected)
  ];

  return (
    <div className="ui-list-wrapper ui-side-list-wrapper col-sm-1">
      <ul className="ui-list-dark">{sideMenuElements}</ul>
    </div>
  );
}
