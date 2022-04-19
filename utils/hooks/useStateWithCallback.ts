import { SetStateAction, useEffect, useRef, useState } from "react";

export type CallbackType<T> = (value?: T) => void;

export type CallbackOption<T> =
  | CallbackType<T>
  | {
      callback: CallbackType<T>;
      clean: () => void;
    };
type DispatchWithCallback<T> = (
  value: SetStateAction<T>,
  callback?: CallbackOption<T>
) => void;

export default function useStateWithCallback<T>(
  initialState: T | (() => T)
): [T, DispatchWithCallback<T>] {
  const [state, _setState] = useState(initialState);

  const callbackRef = useRef<CallbackOption<T>>();

  const setState = (
    setStateAction: SetStateAction<T>,
    callback?: CallbackOption<T>
  ): void => {
    _setState(setStateAction);
    callback && (callbackRef.current = callback);
  };

  useEffect(() => {
    if (callbackRef.current) {
      if ((callbackRef.current as any).callback) {
        (callbackRef.current as any).callback(state);
      } else {
        (callbackRef.current as Function)(state);
      }
    }

    return () => {
      callbackRef.current &&
        (callbackRef.current as any).clean &&
        (callbackRef.current as any).clean();
    };
  }, [JSON.stringify(state), [NaN].includes(state as any)]);

  return [state, setState];
}
