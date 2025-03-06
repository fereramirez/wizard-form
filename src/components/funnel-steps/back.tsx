"use client";

import {useForm} from "react-hook-form";

import {Title} from "@/components/messages/title";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {Button} from "@/components/inputs/button";
import {useAnalytics} from "@/hooks/use-analytics";

export function Back({onSubmit, secondaryOnSubmit, ...rest}: FormStepProps) {
  const {handleSubmit} = useForm();

  useAnalytics("back");

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>In this step you can go back to the previous step</Title>

      <div className="flex gap-10">
        <Button text="BACK" type="button" onClick={secondaryOnSubmit} />
        <Button text="NEXT" />
      </div>
    </Form>
  );
}
