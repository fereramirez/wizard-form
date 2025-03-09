"use client";

import {useForm} from "react-hook-form";

import {useEventsStore} from "@/contexts/use-events-store";
import {useTriggerEvent} from "@/hooks/use-trigger-event";
import {useBodyClass} from "@/hooks/use-body-class";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {Title} from "@/components/messages/title";
import {DataCollected} from "@/components/messages/data-collected";
import {Button} from "@/components/inputs/button";
import {cn} from "@/helpers/cn";

export function Events({onSubmit, disabled, ...rest}: FormStepProps) {
  const {handleSubmit} = useForm();

  const {getEventsWithElapsedTime} = useEventsStore();

  useTriggerEvent("events");
  useBodyClass("max-h-screen");

  const events = getEventsWithElapsedTime();

  return (
    <Form className="overflow-hidden" onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title className="shrink-0">
        We also collect the time you took to complete the funnel. These are the events of each step
        with the elapsed time in seconds
      </Title>

      <DataCollected keyName="Event" value="Elapsed Time">
        {events.map((event) => (
          <div
            key={event.timestamp}
            className={cn(
              "border-primary-3 grid auto-rows-fr grid-cols-2 gap-2 border-b py-1",
              "last:border-b-0",
            )}
          >
            <p key={event.name}>{event.name}</p>
            <p> {event.elapsedTime / 1000} s</p>
          </div>
        ))}
      </DataCollected>

      <Button className="shrink-0" disabled={disabled}>
        NEXT
      </Button>
    </Form>
  );
}
