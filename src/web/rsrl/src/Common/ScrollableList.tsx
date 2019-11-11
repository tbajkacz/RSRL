import React from "react";
import LoadingIndicator from "../LoadingIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";

interface ScrollableListProps<T> {
  className?: string;
  data: T[] | undefined;
  rowRenderer: (entity: T) => JSX.Element;
  loadingPromise: Promise<any> | undefined;
  onAddClick: () => void;
  onUpdateClick: () => void;
  onRemoveClick: () => void;
}

export default function ScrollableList<T>(props: ScrollableListProps<T>) {
  const sideMenuElement = (
    text: string,
    icon: IconDefinition,
    onClick: () => void
  ) => {
    return (
      <li className="ui-side-list-item-dark" onClick={onClick}>
        <span>
          <FontAwesomeIcon icon={icon} />
        </span>
        {text}
      </li>
    );
  };

  const sideMenuElements = [
    sideMenuElement("Add", faPlus, props.onAddClick),
    sideMenuElement("Edit", faPen, props.onUpdateClick),
    sideMenuElement("Remove", faTrash, props.onRemoveClick)
  ];

  return (
    <LoadingIndicator promise={props.loadingPromise}>
      <div className={props.className}>
        {props.data ? (
          <div className="d-flex justify-content-center">
            <div className="ui-side-list-wrapper col-sm-1 mr-1">
              <ul className="ui-list-dark flex-fill">{sideMenuElements}</ul>
            </div>
            <div className="ui-element-bg-dark ui-list-wrapper col-sm-7 p-0">
              <h6 className="ui-list-header">Access Cards</h6>
              <ul className="ui-list-dark flex-fill">
                {props.data.map(d => props.rowRenderer(d))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </LoadingIndicator>
  );
}
