"use client";

import {useForm} from "react-hook-form";

import {type CheckboxData, CheckboxesBox} from "@/components/inputs/checkbox";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {Button} from "@/components/inputs/button";
import {useAnalytics} from "@/hooks/use-analytics";
import {Title} from "@/components/messages/title";

const storePromiseOptions: CheckboxData[] = [
  {value: "no", label: "No"},
  {value: "negative", label: "Negative"},
  {value: "false", label: "False"},
];

export function StorePromise({onSubmit, isLoading, ...rest}: FormStepProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: {isSubmitting},
  } = useForm();

  useAnalytics("store_promise");

  return (
    <Form onSubmit={handleSubmit(onSubmit)} {...rest}>
      <Title>
        In this step we will fetch some data (a random number between 0 and 10) that takes 30
        seconds to be ready, we will use this data in the last step. Doing this we can avoid the
        user to wait for it
      </Title>

      <CheckboxesBox
        checkBoxesClassName="p-2"
        className="grid-cols-3"
        disabled={isSubmitting || isLoading}
        error={undefined}
        name="store_promise"
        options={storePromiseOptions}
        question="Do you want to wait for the data?"
        register={register}
        watch={watch}
      />

      <Button isLoading={isSubmitting || isLoading} text="NEXT" />
    </Form>
  );
}
