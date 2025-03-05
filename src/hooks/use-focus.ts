import {useEffect} from "react";
import {type FieldValues, type UseFormSetFocus} from "react-hook-form";

export function useFocus(setFocus: UseFormSetFocus<FieldValues>, inputName: string) {
  useEffect(() => {
    setFocus(inputName);
  }, [setFocus, inputName]);
}
