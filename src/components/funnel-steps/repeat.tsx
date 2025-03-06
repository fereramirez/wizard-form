"use client";

import {useForm} from "react-hook-form";

import {Title} from "@/components/messages/title";
import {type CheckboxData, CheckboxesBox} from "@/components/inputs/checkbox";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {Button} from "@/components/inputs/button";
import {Question} from "@/components/messages/question";
import {useAnalytics} from "@/hooks/use-analytics";
import {useFunnelStore} from "@/contexts/use-funnel-store";
import {IN_OUT_ANIMATION_STATE} from "@/hooks/use-animate";

const autosubmitOptions: CheckboxData[] = [
  {value: "true", label: "Yes"},
  {value: "false", label: "No"},
];

export function Repeat({onSubmit, isLoading, inOutAnimation, ...rest}: FormStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: {isSubmitting},
  } = useForm();

  const {repeat} = useFunnelStore();

  useAnalytics("repeat");

  return (
    <Form inOutAnimation={inOutAnimation} onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>
        In case we need to collect info for other individual we can repeat previous steps
      </Title>

      {repeat === "true" &&
      (inOutAnimation === IN_OUT_ANIMATION_STATE.ENTERING ||
        inOutAnimation === IN_OUT_ANIMATION_STATE.NORMAL) ? (
        <Question>You've already repeated the first steps</Question>
      ) : (
        <CheckboxesBox
          checkBoxesClassName="p-2"
          className="grid-cols-2"
          disabled={isSubmitting || isLoading}
          error={undefined}
          name="repeat"
          options={autosubmitOptions}
          question="Repeat first steps?"
          register={register}
          watch={watch}
        />
      )}

      <Button isLoading={isSubmitting || isLoading} text="NEXT" />
    </Form>
  );
}
