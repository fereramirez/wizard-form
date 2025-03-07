"use client";

import {useForm} from "react-hook-form";
import {useSearchParams} from "next/navigation";

import {Title} from "@/components/messages/title";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {Button} from "@/components/inputs/button";
import {useAnalytics} from "@/hooks/use-analytics";

export function Intro({onSubmit, disabled, ...rest}: FormStepProps) {
  const {handleSubmit} = useForm();

  const searchParams = useSearchParams();

  useAnalytics("intro");

  const utmSource = searchParams.get("utm_source");
  const affiliateId = searchParams.get("affiliate_id");

  if (!utmSource || !affiliateId)
    return (
      <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
        <Title>
          Before starting let's add some query params to the url, we will use them later
        </Title>

        <Button
          disabled={disabled}
          href="/?utm_source=THIS-IS-A-SOURCE&affiliate_id=THIS-IS-AN-AFFILIATE-ID"
        >
          ADD QUERY PARAMS
        </Button>
      </Form>
    );

  return (
    <Form className="fade-in" onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>This is a funnel to show how the steps work</Title>

      <Button disabled={disabled}>START</Button>
    </Form>
  );
}
