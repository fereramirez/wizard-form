"use client";

import {useForm} from "react-hook-form";
import Link from "next/link";

import {Form, type FormStepProps} from "@/components/funnel/form";
import {useTriggerEvent} from "@/hooks/use-trigger-event";
import {Title} from "@/components/messages/title";
import {useFunnelStore} from "@/contexts/use-funnel-store";
import Github from "@/assets/github.svg";
import {Button, buttonVariants} from "@/components/inputs/button";
import {Note} from "@/components/messages/note";
import {cn} from "@/helpers/cn";

export function ShowRepo({onSubmit, disabled, ...rest}: FormStepProps) {
  const {handleSubmit} = useForm();

  const {randomValue, queryParams} = useFunnelStore();

  useTriggerEvent("showRepo");

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>
        You received the number <strong className="text-primary-1">{randomValue}</strong> from a
        API, based on that number the repository link is shown
      </Title>

      <Note>If you go through the funnel again probably you won't see it (20% of the time)</Note>

      <div className="flex gap-5 sm:gap-10">
        <Link
          className={cn(buttonVariants({variant: "outline"}), {
            "pointer-events-none opacity-50": disabled,
          })}
          href={`https://github.com/fereramirez/wizard-form${queryParams ? `?${queryParams}` : ""}`}
          target="_blank"
        >
          <Github fill="white" />

          <span>REPOSITORY</span>
        </Link>

        <Button disabled={disabled}>NEXT</Button>
      </div>

      <Note>
        If you hover over the repository link you can see the URL query params appended to it, this
        is helpful to track the user
      </Note>
    </Form>
  );
}

export function DontShowRepo({onSubmit, disabled, ...rest}: FormStepProps) {
  const {handleSubmit} = useForm();

  const {randomValue} = useFunnelStore();

  useTriggerEvent("dontShowRepo");

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>
        You received the number <strong className="text-primary-1">{randomValue}</strong> from a
        API, based on that number the repository link is not shown
      </Title>

      <Note>If you go through the funnel again probably you will see it (80% of the time)</Note>

      <Button disabled={disabled}>NEXT</Button>
    </Form>
  );
}
