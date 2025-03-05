"use client";

import {useForm} from "react-hook-form";

import {type CheckboxData, CheckboxesBox} from "@/components/inputs/checkbox";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {useAutosubmit} from "@/hooks/use-auto-submit";
import {useAnalytics} from "@/hooks/use-analytics";
import {Title} from "@/components/messages/title";

const autosubmitFetchOptions: CheckboxData[] = [
  {value: "option1", label: "Option 1"},
  {value: "option2", label: "Option 2"},
  {value: "option3", label: "Option 3"},
  {value: "option4", label: "Option 4"},
];

export function AutosubmitFetchAndWait({onSubmit, isLoading, ...rest}: FormStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: {isSubmitting},
  } = useForm();

  useAnalytics("autosubmit_fetch");
  useAutosubmit(watch, () => handleSubmit(onSubmit));

  return (
    <Form {...rest}>
      <Title>
        In this step we will fetch data from a API and wait for it to be ready before showing it in
        the next step
      </Title>

      <CheckboxesBox
        checkBoxesClassName="p-2"
        className="grid-cols-2 sm:grid-cols-4"
        disabled={isSubmitting || isLoading}
        error={undefined}
        name="autosubmit_fetch"
        options={autosubmitFetchOptions}
        question="Please select an option"
        register={register}
        watch={watch}
      />
    </Form>
  );
}
