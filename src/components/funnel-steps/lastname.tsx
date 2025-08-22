"use client";

import {useForm} from "react-hook-form";

import {Title} from "@/components/messages/title";
import {Note} from "@/components/messages/note";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {InputBox, type Validation} from "@/components/inputs/input";
import {Button} from "@/components/inputs/button";
import {useFocus} from "@/hooks/use-focus";
import {TOTAL_EXIT_ENTER_ANIMATION_TIME} from "@/contexts/use-animation-store";
import {useTriggerEvent} from "@/hooks/use-trigger-event";

const nameValidation: Validation = {
  required: {
    value: true,
    message: "Enter your Last Name",
  },
  pattern: {
    value: /^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/,
    message: "Enter a valid Last Name",
  },
  minLength: {
    value: 2,
    message: "Last Name must be 2 characters length at least",
  },
  maxLength: {
    value: 25,
    message: "Last Name must have less than 26 characters",
  },
};

export function LastName({onSubmit, disabled, ...rest}: FormStepProps) {
  //! VOLVER A VER agregar types a forms
  const {
    register,
    handleSubmit,
    formState: {errors},
    setFocus,
  } = useForm();

  useFocus(setFocus, "lastname", TOTAL_EXIT_ENTER_ANIMATION_TIME);
  useTriggerEvent(`lastname`);

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>Please enter your last name to finish the funnel</Title>

      <InputBox
        aria-label="Last Name"
        disabled={disabled}
        error={errors.lastname?.message}
        name="lastname"
        placeholder="Ramirez"
        question="Last Name"
        register={register}
        validation={nameValidation}
      />

      <Note>
        The next step only shows a waiting animation, as it is not a <strong>real</strong> step it
        won't affect the funnel progress bar
      </Note>

      <Button disabled={disabled}>FINISH</Button>
    </Form>
  );
}
