import { useEffect, useRef } from "react";

export default function useUpdateOnOpen(effect: React.EffectCallback, isOpen: boolean) {
  const didMount = useRef(false);

  useEffect(() => {
    if (isOpen) {
      didMount.current = true;
    }
  }, [isOpen]);

  useEffect(() => {
    if (didMount.current) {
      effect();
    }
  }, []);
}
