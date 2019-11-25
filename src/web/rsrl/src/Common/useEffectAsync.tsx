import { useEffect } from "react";

export default function useEffectAsync(effect: () => any, deps?: any[]) {
  useEffect(() => {
    effect();
  }, deps);
}
