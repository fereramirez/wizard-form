import React from "react";
import {type SelectHTMLAttributes} from "react";
import {type FieldValues, type UseFormRegister} from "react-hook-form";

import {Paragraph} from "../messages/paragraph";
import {InputError} from "../messages/input-error";

import {BoxWrapper} from "./box-wrapper";

import {cn} from "@/helpers/cn";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  options: string[];
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  isLoading?: boolean;
  required?: boolean;
  disabled?: boolean;
};

type SelectBoxProps = SelectProps & {
  question?: string;
  error?: unknown; //!type: string | undefined
};

export function Select({
  name,
  options,
  placeholder,
  register,
  disabled,
  isLoading = false,
  required = true,
  ...props
}: SelectProps) {
  const isDisabled = isLoading || !options.length || disabled;

  return (
    <select
      {...props}
      aria-label={name}
      className={cn(
        "input border-color-primary hover:border-color-primary-darker focus-visible:border-color-primary disabled:bg-color-shadow w-full cursor-pointer bg-white px-2 py-1 sm:px-3",
        {
          "pointer-events-none opacity-75": isDisabled,
        },
      )}
      disabled={isDisabled}
      {...register(name, {
        required: {
          value: required,
          message: "Select an option",
        },
      })}
    >
      {isLoading ? (
        <option value="">Loading...</option>
      ) : !options.length ? (
        <option value="">No models found</option>
      ) : (
        <option value="">{placeholder}</option>
      )}

      {options.length
        ? React.Children.toArray(
            options.map((option) => (
              <option className="cursor-pointer" value={option}>
                {option}
              </option>
            )),
          )
        : null}
    </select>
  );
}

export function SelectBox({
  question,
  name,
  options,
  placeholder,
  register,
  error,
  ...rest
}: SelectBoxProps) {
  return (
    <BoxWrapper>
      {question ? <Paragraph text={question} type="question" /> : null}

      <Select
        {...rest}
        name={name}
        options={options}
        placeholder={placeholder}
        register={register}
      />

      <InputError error={error} />
    </BoxWrapper>
  );
}
