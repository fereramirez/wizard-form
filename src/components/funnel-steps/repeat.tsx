"use client";

import {useForm} from "react-hook-form";

import {Title} from "@/components/messages/title";
import {type CheckboxData, CheckboxesBox} from "@/components/inputs/checkbox";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {Button} from "@/components/inputs/button";
import {Question} from "@/components/messages/question";
import {useFunnelStore} from "@/contexts/use-funnel-store";
import {useTriggerEvent} from "@/hooks/use-trigger-event";

const autosubmitOptions: CheckboxData[] = [
  {value: "true", label: "Yes"},
  {value: "false", label: "No"},
];

export function Repeat({onSubmit, disabled, ...rest}: FormStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const {repeat} = useFunnelStore();

  const isRepeating = repeat === "true";

  useTriggerEvent(`repeat${isRepeating ? "_II" : ""}`);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>
        In case we need to collect info for other individual we can repeat previous steps
        {isRepeating ? "*" : ""}
      </Title>

      {isRepeating ? (
        <Question>*You've already repeated the first steps</Question>
      ) : (
        <CheckboxesBox
          checkBoxesClassName="p-2"
          className="grid-cols-2"
          disabled={disabled}
          error={errors.repeat?.message}
          name="repeat"
          options={autosubmitOptions}
          question="Repeat first steps?"
          register={register}
          watch={watch}
        />
      )}

      <Button disabled={disabled}>NEXT</Button>
    </Form>
  );
}
