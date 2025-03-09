"use client";

import {useForm} from "react-hook-form";

import {Button} from "@/components/inputs/button";
import {Title} from "@/components/messages/title";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {useTriggerEvent} from "@/hooks/use-trigger-event";

export function Back({onSubmit, secondaryOnSubmit, disabled, ...rest}: FormStepProps) {
  const {handleSubmit} = useForm();

  useTriggerEvent("back");

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>In this step you can go back to the previous step</Title>

      <div className="flex gap-10">
        <Button disabled={disabled} type="button" variant="outline" onClick={secondaryOnSubmit}>
          BACK
        </Button>

        <Button disabled={disabled}>NEXT</Button>
      </div>
    </Form>
  );
}
