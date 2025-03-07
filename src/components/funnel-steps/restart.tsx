"use client";

import {useForm} from "react-hook-form";

import {Title} from "@/components/messages/title";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {Button} from "@/components/inputs/button";
import {useAnalytics} from "@/hooks/use-analytics";
import {useFunnelStore} from "@/contexts/use-funnel-store";

export function Restart({onSubmit, disabled, ...rest}: FormStepProps) {
  const {handleSubmit} = useForm();

  const {funnelState} = useFunnelStore();

  console.log(funnelState);

  useAnalytics("restart");

  //! VOLVER A VER mostar data collected, eliminar data no relevante para el usuario

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>This is all the data collected from the user</Title>

      <pre>{JSON.stringify(funnelState, null, 2)}</pre>

      <Button disabled={disabled}>RESTART FUNNEL</Button>
    </Form>
  );
}
