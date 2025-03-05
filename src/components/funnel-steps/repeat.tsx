"use client";

import {useForm} from "react-hook-form";

import {Title} from "@/components/messages/title";
import {type CheckboxData, CheckboxesBox} from "@/components/inputs/checkbox";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {Button} from "@/components/inputs/button";
import {Paragraph} from "@/components/messages/paragraph";
import {useAnalytics} from "@/hooks/use-analytics";
import {useFunnelStore} from "@/contexts/use-funnel-store";

const autosubmitOptions: CheckboxData[] = [
  {value: "true", label: "Yes"},
  {value: "false", label: "No"},
];

export function Repeat({onSubmit, isLoading, ...rest}: FormStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: {isSubmitting},
  } = useForm();

  const {repeat} = useFunnelStore();

  useAnalytics("repeat");

  //! VOLVER A VER permitir repetir tres veces, en la tercera repeticion saltear step

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>
        In case we need to collect info for other individual we can repeat previous steps
      </Title>

      {repeat === "false" ? (
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
      ) : (
        <Paragraph text="You've already repeated the first steps" type="question" />
      )}

      <Button isLoading={isSubmitting || isLoading} text="NEXT" />
    </Form>
  );
}
