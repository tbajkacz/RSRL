import React, { useState, useEffect } from "react";

interface LoadingIndicatorProps {
  children?: JSX.Element;
  promise: Promise<any> | undefined;
}

export default function LoadingIndicator(props: LoadingIndicatorProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setIsCompleted(false);
  }, [props.promise]);

  if (props.promise) {
    props.promise.then(() => {
      console.log("done");
      setIsCompleted(true);
    });
    return <div>{isCompleted ? props.children : "Loading..."}</div>;
  }
  return <div>{props.children}</div>;
}
