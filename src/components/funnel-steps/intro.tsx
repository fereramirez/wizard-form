"use client";

import {useForm} from "react-hook-form";

import {Title} from "@/components/messages/title";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {Button} from "@/components/inputs/button";
import {useAnalytics} from "@/hooks/use-analytics";

export function Intro({onSubmit, disabled, ...rest}: FormStepProps) {
  const {handleSubmit} = useForm();

  useAnalytics("intro");

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>This is only a funnel to show how the steps work</Title>

      <Button disabled={disabled} text="START" />
    </Form>
  );
}
