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
    <Form className="overflow-hidden" onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title className="shrink-0">This is the raw data collected from the funnel</Title>

      <section className="grow overflow-y-auto">
        {/*  <pre>{JSON.stringify(funnelState, null, 2)}</pre> */}
        <pre className="p-2">
          {JSON.stringify(
            {
              realStepIndex: 0,
              userStepIndex: 0,
              name: null,
              name_2: null,
              back: false,
              optional: null,
              purple: null,
              blue: null,
              green: null,
              optional_2: null,
              purple_2: null,
              blue_2: null,
              green_2: null,
              repeat: "false",
              storePromise: null,
              autosubmit: null,
              autosubmitFetch: null,
              autosubmitShow: null,
              fakeApiData: [],
              randomValue: 0,
              userAgent: null,
              queryParams: "",
              utmSource: null,
              affiliateId: null,
            },
            null,
            2,
          )}
        </pre>
      </section>

      <Button className="shrink-0" disabled={disabled}>
        NEXT
      </Button>
    </Form>
  );
}
