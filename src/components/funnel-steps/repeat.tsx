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

export function Repeat({onSubmit, inOutAnimation, disabled, ...rest}: FormStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: {isSubmitting},
  } = useForm();

  const {repeat} = useFunnelStore();

  useAnalytics("repeat");

  //! VOLVER A VER en la segunda repeticion hay un error en el renderizado condicional cuando la animacion se va. Cuando se está yendo se renderiza CheckboxesBox (deberia renderizarse Question en todo momento)

  return (
    <Form inOutAnimation={inOutAnimation} onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>
        In case we need to collect info for other individual we can repeat previous steps{" "}
        {repeat === "true" ? "*" : ""}
      </Title>

      {repeat === "true" &&
      (inOutAnimation === IN_OUT_ANIMATION_STATE.ENTERING ||
        inOutAnimation === IN_OUT_ANIMATION_STATE.NORMAL) ? (
        <Question>*You've already repeated the first steps</Question>
      ) : (
        <CheckboxesBox
          checkBoxesClassName="p-2"
          className="grid-cols-2"
          disabled={isSubmitting || disabled}
          error={undefined}
          name="repeat"
          options={autosubmitOptions}
          question="Repeat first steps?"
          register={register}
          watch={watch}
        />
      )}

      <Button disabled={isSubmitting || disabled} text="NEXT" />
    </Form>
  );
}
