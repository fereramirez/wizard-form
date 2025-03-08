"use client";

import {useForm} from "react-hook-form";

import {Title} from "@/components/messages/title";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {Button} from "@/components/inputs/button";
import {useTriggerEvent} from "@/hooks/use-trigger-event";
import {useFunnelStore} from "@/contexts/use-funnel-store";
import {DataCollected} from "@/components/messages/data-collected";

export function FunnelData({onSubmit, disabled, ...rest}: FormStepProps) {
  const {handleSubmit} = useForm();

  const {funnelState} = useFunnelStore();

  useTriggerEvent("funnelData");

  return (
    <Form className="overflow-hidden" onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title className="shrink-0">This is the raw data collected from the funnel</Title>

      <DataCollected>
        {Object.entries(funnelState).map(([key, value]) => (
          <div
            key={key}
            className="border-primary-3 grid auto-rows-fr grid-cols-2 gap-2 border-b py-1"
          >
            <p>{key}:</p>
            <p className="break-words">{JSON.stringify(value)}</p>
          </div>
        ))}
      </DataCollected>

      <Button className="shrink-0" disabled={disabled}>
        NEXT
      </Button>
    </Form>
  );
}
