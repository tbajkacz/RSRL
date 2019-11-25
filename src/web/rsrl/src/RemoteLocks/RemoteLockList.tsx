import * as React from "react";
import useEffectAsync from "../Common/useEffectAsync";
import { useState } from "react";
import LoadingIndicator from "../LoadingIndicator";
import {
  RemoteLock,
  RemoteLockOperation,
  RemoteLockModalData,
  AccessCardSelectModel
} from "./remoteLockTypes";
import { remoteLockService } from "./RemoteLockService";
import { accessCardsService } from "../AccessCards/AccessCardsService";
import { remoteLockHelpers } from "./remoteLockHelpers";
import RemoteLockModal from "./RemoteLockModal";
import RemoteLockItem from "./RemoteLockItem";
import RemoteLockSideMenu from "./RemoteLockSideMenu";

interface RemoteLockListProps {
  className?: string;
}

export default function RemoteLockList(props: RemoteLockListProps) {
  const [remoteLocks, setRemoteLocks] = useState<RemoteLock[]>();
  const [accessCardsInfos, setAccessCardsInfos] = useState<
    AccessCardSelectModel[]
  >();
  const [loadingPromise, setLoadingPromise] = useState<
    Promise<any> | undefined
  >();
  const [modalPromise, setModalPromise] = useState<Promise<any> | undefined>();
  const [selected, setSelected] = useState<RemoteLock>();
  const [dataChanged, setDataChanged] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalOperation, setModalOperation] = useState(
    RemoteLockOperation.None
  );

  const toggle = () => setIsOpen(!isOpen);

  useEffectAsync(async () => {
    let promise = remoteLockService.Get();
    setLoadingPromise(promise);
    setRemoteLocks((await promise).result);
  }, [dataChanged]);

  const updateAccessCardsInfos = async () => {
    let promise = accessCardsService.Get();
    setModalPromise(promise);
    promise.then(response => {
      let mapped = response.result.map(c => ({
        id: c.id,
        ownerLogin: c.owner.login
      }));
      setAccessCardsInfos(mapped);
    });
  };

  const onSideMenuClick = async (option: RemoteLockOperation) => {
    setModalOperation(option);
    switch (option) {
      case RemoteLockOperation.Add:
      case RemoteLockOperation.Edit:
        await updateAccessCardsInfos();
        toggle();
        break;
      case RemoteLockOperation.Remove:
        remoteLockHelpers.requestRemove(selected!.id, onRequestCompleted);
        break;
      default:
        break;
    }
  };

  const onRequestCompleted = () => {
    setDataChanged(!dataChanged);
  };

  const onModalConfirm = (
    modifiedData: RemoteLockModalData | undefined,
    operation: RemoteLockOperation
  ) => {
    if (modifiedData) {
      switch (operation) {
        case RemoteLockOperation.Add:
          remoteLockHelpers.requestAdd(modifiedData, onRequestCompleted);
          break;
        case RemoteLockOperation.Edit:
          remoteLockHelpers.requestEdit(modifiedData, onRequestCompleted);
          break;
      }
    }
  };

  return (
    <div className={props.className}>
      <LoadingIndicator promise={loadingPromise}>
        <div className={props.className}>
          {remoteLocks ? (
            <div className="ui-list-flex-container">
              <RemoteLockSideMenu
                onClick={onSideMenuClick}
                isItemSelected={selected ? true : false}
              />
              <div className="ui-list-wrapper col-sm-7">
                <h6 className="ui-list-header">Remote locks</h6>
                <ul className="ui-list-dark">
                  {remoteLocks.map(c => (
                    <RemoteLockItem
                      remoteLock={c}
                      onClick={c => setSelected(c)}
                      isSelected={c === selected}
                    />
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </LoadingIndicator>
      <LoadingIndicator promise={modalPromise} asModal={true}>
        <RemoteLockModal
          operation={modalOperation}
          accessCards={accessCardsInfos}
          isOpen={isOpen}
          toggle={toggle}
          onConfirm={onModalConfirm}
          currentData={selected}
        />
      </LoadingIndicator>
    </div>
  );
}
