import React, { useState, useEffect } from "react";
import { Modal, ModalBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface LoadingIndicatorProps {
  children?: JSX.Element;
  promise: Promise<any> | undefined;
  asModal?: boolean;
  inline?: boolean;
  size?: "small" | "medium" | "large";
}

export default function LoadingIndicator(props: LoadingIndicatorProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setIsCompleted(false);
  }, [props.promise]);

  const getSize = () => {
    switch (props.size) {
      case "small":
        return "1x";
      case "large":
        return "4x";
      case "medium":
      default:
        return "2x";
    }
  };

  const renderLoadingIndicator = () => {
    const icon = <FontAwesomeIcon icon={faSpinner} spin={true} color="white" size={getSize()} />;
    const loadingIndicator = props.inline ? icon : <div className="d-flex justify-content-center">{icon}</div>;
    if (props.asModal) {
      return (
        <Modal className="ui-bg-transparent" isOpen={!isCompleted}>
          <ModalBody>{loadingIndicator}</ModalBody>
        </Modal>
      );
    }
    return loadingIndicator;
  };

  if (props.promise) {
    props.promise.then(
      () => {
        setIsCompleted(true);
      },
      () => {
        setIsCompleted(true);
      }
    );
    return <>{isCompleted ? props.children : renderLoadingIndicator()}</>;
  }
  return <div>{props.children}</div>;
}
