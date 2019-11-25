import * as React from "react";
import { RemoteLock } from "./remoteLockTypes";

interface RemoteLockItemProps {
  remoteLock: RemoteLock;
  isSelected: boolean;
  onClick: (card: RemoteLock) => void;
}

export default function RemoteLockItem(props: RemoteLockItemProps) {
  let itemClass = props.isSelected ? "ui-list-item-dark ui-selected" : "ui-list-item-dark";

  return (
    <li onClick={() => props.onClick(props.remoteLock)} className={itemClass}>
      <div>{props.remoteLock.name}</div>
      <div className="small">{"Url: " + props.remoteLock.url}</div>
    </li>
  );
}
