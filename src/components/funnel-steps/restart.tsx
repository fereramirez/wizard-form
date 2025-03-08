"use client";

import {useForm} from "react-hook-form";

import {Title} from "@/components/messages/title";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {Button} from "@/components/inputs/button";
import {useTriggerEvent} from "@/hooks/use-trigger-event";

export function Restart({onSubmit, disabled, ...rest}: FormStepProps) {
  const {handleSubmit} = useForm();

  useTriggerEvent("restart");

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>Thank you for completing the funnel</Title>

      <Button disabled={disabled}>RESTART FUNNEL</Button>
    </Form>
  );
}
