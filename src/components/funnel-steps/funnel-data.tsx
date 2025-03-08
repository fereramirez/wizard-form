"use client";

import {useForm} from "react-hook-form";

import {Title} from "@/components/messages/title";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {Button} from "@/components/inputs/button";
import {useTriggerEvent} from "@/hooks/use-trigger-event";
import {useFunnelStore} from "@/contexts/use-funnel-store";

export function FunnelData({onSubmit, disabled, ...rest}: FormStepProps) {
  const {handleSubmit} = useForm();

  const {funnelState} = useFunnelStore();

  useTriggerEvent("funnelData");

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>This is the raw data collected from the funnel</Title>

      <pre>{JSON.stringify(funnelState, null, 2)}</pre>

      <Button disabled={disabled}>NEXT</Button>
    </Form>
  );
}
