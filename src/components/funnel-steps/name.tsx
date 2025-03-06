"use client";

import {useForm} from "react-hook-form";

import {Title} from "@/components/messages/title";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {InputBox, type Validation} from "@/components/inputs/input";
import {Button} from "@/components/inputs/button";
import {useAnalytics} from "@/hooks/use-analytics";
import {useFunnelStore} from "@/contexts/use-funnel-store";
import {useFocus} from "@/hooks/use-focus";
import {ANIMATION_TIMES} from "@/hooks/use-animate";
const nameValidation: Validation = {
  required: {
    value: true,
    message: "Enter your Name",
  },
  pattern: {
    value: /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/,
    message: "Enter a valid Name",
  },
  minLength: {
    value: 2,
    message: "Name must be 2 characters length at least",
  },
  maxLength: {
    value: 25,
    message: "Name must have less than 26 characters",
  },
};

export function Name({onSubmit, isLoading = false, ...rest}: FormStepProps) {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    setFocus,
  } = useForm();

  const {repeat} = useFunnelStore();

  useFocus(setFocus, "name", ANIMATION_TIMES.DELAY + ANIMATION_TIMES.DURATION);
  useAnalytics("name");

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>Please enter your name to {repeat === "true" ? "continue" : "start"}</Title>

      <InputBox
        aria-label="Name"
        error={errors.name?.message}
        name={`name${repeat === "true" ? "_2" : ""}`}
        placeholder="Fernando"
        question="Name"
        register={register}
        validation={nameValidation}
      />

      <Button isLoading={isSubmitting || isLoading} text="NEXT" />
    </Form>
  );
}
