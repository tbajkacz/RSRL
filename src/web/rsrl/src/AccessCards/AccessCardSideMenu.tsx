import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { combineClasses } from "../Common/ComponentUtility";

interface AccessCardSideMenuProps {
  isItemSelected: boolean;
  onAddClick: () => void;
  onUpdateClick: () => void;
  onRemoveClick: () => void;
}

export default function AccessCardSideMenu(props: AccessCardSideMenuProps) {
  const sideMenuElement = (
    text: string,
    icon: IconDefinition,
    onClick: () => void,
    disabled: boolean
  ) => {
    return (
      <li
        className={combineClasses(
          "ui-side-list-item-dark",
          disabled ? "ui-disabled" : ""
        )}
        onClick={disabled ? undefined : onClick}
      >
        <span>
          <FontAwesomeIcon icon={icon} />
        </span>
        {text}
      </li>
    );
  };

  const sideMenuElements = [
    sideMenuElement("Add", faPlus, props.onAddClick, false),
    sideMenuElement("Edit", faPen, props.onUpdateClick, !props.isItemSelected),
    sideMenuElement(
      "Remove",
      faTrash,
      props.onRemoveClick,
      !props.isItemSelected
    )
  ];

  return (
    <div className="ui-side-list-wrapper col-sm-1 mr-1">
      <ul className="ui-list-dark flex-fill">{sideMenuElements}</ul>
    </div>
  );
}
