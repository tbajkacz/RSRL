import * as React from "react";
import { RemoteLock } from "./remoteLockTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { remoteLockService } from "./RemoteLockService";
import { useState, useEffect } from "react";
import LoadingIndicator from "../LoadingIndicator";

interface RemoteLockItemProps {
  remoteLock: RemoteLock;
  isSelected: boolean;
  onClick: (card: RemoteLock) => void;
}

export default React.memo(function RemoteLockItem(props: RemoteLockItemProps) {
  let itemClass = props.isSelected ? "ui-list-item-dark ui-selected" : "ui-list-item-dark";
  const [blocked, setBlocked] = useState<boolean | undefined>();
  const [blockedPromise, setBlockedPromise] = useState<Promise<any>>();

  useEffect(() => {
    setBlockedPromise(
      remoteLockService.IsBlocked({ id: props.remoteLock.id }).then(r => setBlocked(r.result.isBlocked))
    );
  }, [props.remoteLock]);

  const getIcon = () => {
    switch (blocked) {
      case false:
        return faUnlock;
      case true:
        return faLock;
      case undefined:
        return faExclamationTriangle;
    }
  };

  return (
    <li onClick={() => props.onClick(props.remoteLock)} className={itemClass}>
      <div>
        <LoadingIndicator promise={blockedPromise} inline size="small">
          <FontAwesomeIcon className="mr-1" icon={getIcon()} />
        </LoadingIndicator>
        {props.remoteLock.name}
      </div>
      <div className="small">{"Url: " + props.remoteLock.url}</div>
    </li>
  );
});
