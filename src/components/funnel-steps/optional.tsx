"use client";

import {useForm} from "react-hook-form";

import {DivAnimatedHeight} from "@/components/wrappers/div-animated-height";
import {Title} from "@/components/messages/title";
import {type CheckboxData, CheckboxesBox} from "@/components/inputs/checkbox";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {Button} from "@/components/inputs/button";
import {useAnalytics} from "@/hooks/use-analytics";
import {useFunnelStore} from "@/contexts/use-funnel-store";

const optionalOptions: CheckboxData[] = [
  {value: "purple", label: "Purple"},
  {value: "blue", label: "Blue"},
  {value: "green", label: "Green"},
  {value: "noColors", label: "I don't like colors"},
];

const purpleOptions: CheckboxData[] = [
  {value: "#800080", label: "Purple"},
  {value: "#4B0082", label: "Indigo"},
  {value: "#6A5ACD", label: "Slate Blue"},
  {value: "#E6E6FA", label: "Lavender"},
];

const blueOptions: CheckboxData[] = [
  {value: "#0000FF", label: "Blue"},
  {value: "#191970", label: "Midnight Blue"},
  {value: "#4682B4", label: "Steel Blue"},
];

const greenOptions: CheckboxData[] = [
  {value: "#008000", label: "Green"},
  {value: "#00FF00", label: "Lime"},
];

export function Optional({onSubmit, disabled, ...rest}: FormStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const {repeat} = useFunnelStore();

  useAnalytics(`optional${repeat === "true" ? "_II" : ""}`);

  const fieldNames = {
    optional: `optional${repeat === "true" ? "_II" : ""}`,
    purple: `purple${repeat === "true" ? "_II" : ""}`,
    blue: `blue${repeat === "true" ? "_II" : ""}`,
    green: `green${repeat === "true" ? "_II" : ""}`,
  };

  const optionalValue = watch(fieldNames.optional) as string;

  //! VOLVER A VER al desmontar step opcional mostrar animacion, se podria agregar un wrapper que reciba el condicional option = value que se encargue de la animacion de desmonte?

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>Based on the option you chose you can see additional questions</Title>

      <CheckboxesBox
        checkBoxesClassName="p-2"
        className="grid-cols-2 sm:grid-cols-4"
        disabled={disabled}
        error={errors.optional?.message}
        name={fieldNames.optional}
        options={optionalOptions}
        question={`Please select a ${repeat === "true" ? "second" : ""} color`}
        register={register}
        type="radio"
        watch={watch}
      />

      {optionalValue === "purple" ? (
        <DivAnimatedHeight isOpen={optionalValue === "purple"}>
          <CheckboxesBox
            checkBoxesClassName="p-2"
            className="grid-cols-2 sm:grid-cols-4"
            disabled={disabled}
            error={errors.purple?.message}
            name={fieldNames.purple}
            options={purpleOptions}
            question="You've selected purple. Please select your favorite purple color, you can select multiple"
            register={register}
            type="checkbox"
            watch={watch}
          />
        </DivAnimatedHeight>
      ) : null}

      {optionalValue === "blue" ? (
        <DivAnimatedHeight isOpen={optionalValue === "blue"}>
          <CheckboxesBox
            checkBoxesClassName="p-2"
            className="grid-cols-1 sm:grid-cols-3"
            disabled={disabled}
            error={errors.blue?.message}
            name={fieldNames.blue}
            options={blueOptions}
            question="You've selected blue. Please select your favorite blue color, you can select multiple"
            register={register}
            type="checkbox"
            watch={watch}
          />
        </DivAnimatedHeight>
      ) : null}

      {optionalValue === "green" ? (
        <DivAnimatedHeight isOpen={optionalValue === "green"}>
          <CheckboxesBox
            checkBoxesClassName="p-2"
            className="grid-cols-2"
            disabled={disabled}
            error={errors.green?.message}
            name={fieldNames.green}
            options={greenOptions}
            question="You've selected green. Please select your favorite green color, you can select multiple"
            register={register}
            type="checkbox"
            watch={watch}
          />
        </DivAnimatedHeight>
      ) : null}

      <Button disabled={disabled}>NEXT</Button>
    </Form>
  );
}
