"use client";

import {useForm} from "react-hook-form";

import {CheckboxesBox} from "@/components/inputs/checkbox";
import {Form, type FormStepProps} from "@/components/funnel/form";
import {useAutosubmit} from "@/hooks/use-auto-submit";
import {useFunnelStore} from "@/contexts/use-funnel-store";
import {useAnalytics} from "@/hooks/use-analytics";
import {Title} from "@/components/messages/title";

export function AutosubmitShowFetchedData({onSubmit, disabled, ...rest}: FormStepProps) {
  const {register, handleSubmit, watch} = useForm();

  const {fakeApiData} = useFunnelStore();

  useAnalytics("autosubmitShow");
  useAutosubmit(watch, () => handleSubmit(onSubmit));

  return (
    <Form {...rest}>
      <Title>
        This step shows the data requested in the previous step and shows it as a list of options
      </Title>

      <CheckboxesBox
        checkBoxesClassName="p-2"
        className="grid-cols-4 sm:grid-cols-2"
        disabled={disabled}
        error={undefined}
        name="autosubmitShow"
        options={fakeApiData}
        question="Please select an option"
        register={register}
        watch={watch}
      />
    </Form>
  );
}
