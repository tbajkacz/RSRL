import React, { useState, useEffect } from "react";
import { ActionLog } from "./auditTypes";
import { auditService } from "./AuditService";
import LoadingIndicator from "../LoadingIndicator";
import { formatUserInfo } from "../Common/formatting";

interface ActionLogListProps {
  className?: string;
}

export default function ActionLogList(props: ActionLogListProps) {
  const [logs, setLogs] = useState<ActionLog[]>();
  const [loadingPromise, setLoadingPromise] = useState<Promise<any>>();

  useEffect(() => {
    setLoadingPromise(
      auditService.GetLogs().then(r => {
        setLogs(r.result);
      })
    );
  }, []);

  return (
    <div className={props.className}>
      <LoadingIndicator promise={loadingPromise}>
        <div className={props.className}>
          {logs ? (
            <div className="ui-list-flex-container">
              <div className="ui-list-wrapper col-sm-7">
                <h6 className="ui-list-header">Action logs</h6>
                <ul className="ui-list-dark">
                  {logs.map(c => (
                    <li className="ui-list-item-dark">{c.description + " by " + formatUserInfo(c.executor)}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </LoadingIndicator>
    </div>
  );
}
