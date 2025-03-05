import {useEffect} from "react";
import {type FieldValues, type UseFormSetFocus} from "react-hook-form";

export function useFocus(
  setFocus: UseFormSetFocus<FieldValues>,
  inputName: string,
  delay?: number,
) {
  useEffect(() => {
    setTimeout(() => {
      setFocus(inputName);
    }, delay);
  }, [setFocus, inputName, delay]);
}
