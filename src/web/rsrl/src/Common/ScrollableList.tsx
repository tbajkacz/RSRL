import React from "react";
import LoadingIndicator from "../LoadingIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccessCardSideMenu from "../AccessCards/AccessCardSideMenu";

interface ScrollableListProps<T> {
  isItemSelected: boolean;
  className?: string;
  data: T[] | undefined;
  rowRenderer: (entity: T) => JSX.Element;
  loadingPromise: Promise<any> | undefined;
  onAddClick: () => void;
  onUpdateClick: () => void;
  onRemoveClick: () => void;
}

export default function ScrollableList<T>(props: ScrollableListProps<T>) {
  return (
    <LoadingIndicator promise={props.loadingPromise}>
      <div className={props.className}>
        {props.data ? (
          <div className="d-flex justify-content-center">
            <AccessCardSideMenu
              isItemSelected={props.isItemSelected}
              onAddClick={props.onAddClick}
              onRemoveClick={props.onRemoveClick}
              onUpdateClick={props.onUpdateClick}
            />
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
