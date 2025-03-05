import {useEffect} from "react";
import {type UseFormHandleSubmit, type FieldValues, type UseFormWatch} from "react-hook-form";

import {useSubmit} from "./use-submit";

export const useAutosubmit = (
  watch: UseFormWatch<FieldValues>,
  handleSubmit: UseFormHandleSubmit<FieldValues>,
) => {
  const {submitQuestion} = useSubmit();

  useEffect(() => {
    // @ts-expect-error type
    const subscription = watch(handleSubmit(submitQuestion)) as unknown;

    return () => (subscription as {unsubscribe: () => void}).unsubscribe();
  }, [handleSubmit, watch, submitQuestion]);
};
