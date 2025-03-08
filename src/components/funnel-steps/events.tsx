"use client";

import {useForm} from "react-hook-form";

import {Title} from "@/components/messages/title";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {Button} from "@/components/inputs/button";
import {useTriggerEvent} from "@/hooks/use-trigger-event";
import {useEventsStore} from "@/contexts/use-events-store";

export function Events({onSubmit, disabled, ...rest}: FormStepProps) {
  const {handleSubmit} = useForm();

  const {getEventsWithElapsedTime} = useEventsStore();

  useTriggerEvent("events");

  const events = getEventsWithElapsedTime();

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>
        We also collect the time you took to complete the funnel. These are the events of each step
        with the elapsed time in seconds
      </Title>

      <div className="flex flex-col">
        {events.map((event) => (
          <div
            key={event.timestamp}
            className="border-primary-3 grid auto-rows-fr grid-cols-2 gap-2 border-b py-1"
          >
            <p key={event.name}>{event.name}:</p>
            <p> {event.elapsedTime / 1000} s</p>
          </div>
        ))}
      </div>

      <Button disabled={disabled}>NEXT</Button>
    </Form>
  );
}
