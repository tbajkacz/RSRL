import * as React from "react";
import { AccessCard } from "./accessCardTypes";
import { formatUserInfo } from "../Common/formatting";

interface AccessCardItemProps {
  accessCard: AccessCard;
  isSelected: boolean;
  onClick: (card: AccessCard) => void;
}

export default function AccessCardItem(props: AccessCardItemProps) {
  let itemClass = props.isSelected ? "ui-list-item-dark ui-selected" : "ui-list-item-dark";

  let ownerInfo = props.accessCard.owner ? formatUserInfo(props.accessCard.owner) : "unowned";

  return (
    <li onClick={() => props.onClick(props.accessCard)} className={itemClass}>
      <div>Card id: {props.accessCard.id}</div>
      <div>Owner: {ownerInfo}</div>
    </li>
  );
}
