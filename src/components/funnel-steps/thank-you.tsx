"use client";

import {useForm} from "react-hook-form";

import {Form, type FormStepProps} from "@/components/funnel/form";
import {useTriggerEvent} from "@/hooks/use-trigger-event";
import {Title} from "@/components/messages/title";
import {useFunnelStore} from "@/contexts/use-funnel-store";
import Github from "@/assets/github.svg";
import {Button} from "@/components/inputs/button";

export function ThankYouAds({onSubmit, disabled, ...rest}: FormStepProps) {
  const {handleSubmit} = useForm();

  const {randomValue, queryParams} = useFunnelStore();

  useTriggerEvent("tyAds");

  //! VOLVER A VER agregar ghost variant para el link de github
  //! VOLVER A VER arreglar el hover de github
  //! VOLVER A VER el repositorio debe abrirse en otra pestaña

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>
        You received the number <strong className="text-primary-1">{randomValue}</strong> from a
        API, based on that number the repository link is shown
      </Title>

      <p>If you go through the funnel again probably you won't see it (50% of the time)</p>

      <div className="flex gap-10">
        <Button
          className="gap-2"
          disabled={disabled}
          href={`https://github.com/fereramirez/wizard-form?${queryParams}`}
        >
          <Github fill="currentColor" />

          <span>REPOSITORY</span>
        </Button>

        <Button disabled={disabled}>NEXT</Button>
      </div>

      <p>
        If you hover over the repository link you can see the URL query params appended to it, this
        is helpful to track the user
      </p>
    </Form>
  );
}

export function ThankYou({onSubmit, disabled, ...rest}: FormStepProps) {
  const {handleSubmit} = useForm();

  const {randomValue} = useFunnelStore();

  useTriggerEvent("ty");

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>
        You received the number <strong className="text-primary-1">{randomValue}</strong> from a
        API, based on that number the repository link is not shown
      </Title>

      <p>If you go through the funnel again probably you will see it (50% of the time)</p>

      <Button disabled={disabled}>NEXT</Button>
    </Form>
  );
}
