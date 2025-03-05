"use client";

import {useForm} from "react-hook-form";

import {type CheckboxData, CheckboxesBox} from "@/components/inputs/checkbox";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {useAutosubmit} from "@/hooks/use-auto-submit";
import {useAnalytics} from "@/hooks/use-analytics";
import {Title} from "@/components/messages/title";

const autosubmitOptions: CheckboxData[] = [
  {value: "option1", label: "Option 1"},
  {value: "option2", label: "Option 2"},
  {value: "option3", label: "Option 3"},
  {value: "option4", label: "Option 4"},
];

export function Autosubmit({onSubmit, isLoading, ...rest}: FormStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: {isSubmitting},
  } = useForm();

  useAnalytics("autosubmit");
  useAutosubmit(watch, () => handleSubmit(onSubmit));

  return (
    <Form {...rest}>
      <Title>
        This step does not require a submit button, it submits when the user selects an option
      </Title>

      <CheckboxesBox
        checkBoxesClassName="p-2"
        className="grid-cols-2 sm:grid-cols-4"
        disabled={isSubmitting || isLoading}
        error={undefined}
        name="autosubmit"
        options={autosubmitOptions}
        question="Please select an option"
        register={register}
        watch={watch}
      />
    </Form>
  );
}
