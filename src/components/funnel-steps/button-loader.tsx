"use client";

import {useForm} from "react-hook-form";

import {type CheckboxData, CheckboxesBox} from "@/components/inputs/checkbox";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {useAnalytics} from "@/hooks/use-analytics";
import {Title} from "@/components/messages/title";
import {Button} from "@/components/inputs/button";

//! VOLVER A VER cambiar values

const purpleOptions: CheckboxData[] = [
  {value: "#800080", label: "Purple"},
  {value: "#4B0082", label: "Indigo"},
  {value: "#6A5ACD", label: "Slate Blue"},
  {value: "#E6E6FA", label: "Lavender"},
];

const greenOptions: CheckboxData[] = [
  {value: "#008000", label: "Green"},
  {value: "#00FF00", label: "Lime"},
];

export function ButtonLoader({onSubmit, disabled, isLoading, ...rest}: FormStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  useAnalytics("buttonLoader");

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>
        In this step we will show a spinner on the button to show the user that the app is loading
      </Title>

      <CheckboxesBox
        checkBoxesClassName="p-2"
        className="grid-cols-2"
        disabled={disabled}
        error={errors[`buttonLoader-green`]?.message}
        name="buttonLoader-green" //! VOLVER A VER cambiar name
        options={greenOptions}
        question="Please select an option"
        register={register}
        type="radio"
        watch={watch}
      />

      <CheckboxesBox
        checkBoxesClassName="p-2"
        className="grid-cols-2 sm:grid-cols-4"
        disabled={disabled}
        error={errors[`buttonLoader-purple`]?.message}
        name="buttonLoader-purple" //! VOLVER A VER cambiar name
        options={purpleOptions}
        question="Please select an option, select all that apply"
        register={register}
        required={false}
        type="checkbox"
        watch={watch}
      />

      <Button disabled={disabled} isLoading={isLoading} text="NEXT" />
    </Form>
  );
}
