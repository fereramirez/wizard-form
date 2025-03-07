"use client";

import {useForm} from "react-hook-form";

import {Title} from "@/components/messages/title";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {InputBox, type Validation} from "@/components/inputs/input";
import {Button} from "@/components/inputs/button";
import {useAnalytics} from "@/hooks/use-analytics";
import {useFunnelStore} from "@/contexts/use-funnel-store";
import {useFocus} from "@/hooks/use-focus";
import {ANIMATION_TIMES} from "@/contexts/use-animation-store";

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

export function Name({onSubmit, disabled, ...rest}: FormStepProps) {
  //! VOLVER A VER agregar types a forms
  const {
    register,
    handleSubmit,
    formState: {errors},
    setFocus,
  } = useForm();

  const {name, repeat, back} = useFunnelStore();

  useFocus(setFocus, "name", ANIMATION_TIMES.DELAY + ANIMATION_TIMES.DURATION);
  useAnalytics("name");

  //! VOLVER A VER agregar otro titulo para el caso de que se repita el paso

  const inputName = `name${repeat === "true" ? "_2" : ""}`;

  return (
    <Form //! VOLVER A VER agregar tipos
      onSubmit={handleSubmit((data) => onSubmit(data, repeat === "true" ? "+2" : "+1"))}
      {...rest}
    >
      <Title>
        {back === true && repeat === "false"
          ? `We can show content based on previous answers ${name}. `
          : ""}
        Please enter your name {back === true ? "again" : ""} to{" "}
        {repeat === "true" ? "continue" : "start"}
      </Title>

      <InputBox
        aria-label="Name"
        disabled={disabled}
        error={errors[inputName]?.message}
        name={inputName}
        placeholder="Fernando"
        question="Name"
        register={register}
        validation={nameValidation}
      />

      {repeat === "true" ? ( //! VOLVER A VER agregar funcionalidad para saltear paso
        <p>
          We can jump steps. The next step should be the one with the Back button, we are going to
          jump that step
        </p>
      ) : null}

      <Button disabled={disabled} text="JUMP NEXT STEP" />
    </Form>
  );
}
