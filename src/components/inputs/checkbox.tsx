import React, {type InputHTMLAttributes} from "react";
import {type FieldValues, type UseFormRegister, type UseFormWatch} from "react-hook-form";

import {BoxWrapper} from "./box-wrapper";

import {InputError} from "@/components/messages/input-error";
import {Question} from "@/components/messages/question";
import {cn} from "@/helpers/cn";

export type CheckboxData = {
  label: string;
  value: string;
};

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: CheckboxData["label"];
  value: CheckboxData["value"];
  register: UseFormRegister<FieldValues>;
  name: string;
  watch: UseFormWatch<FieldValues>;
  disabled?: boolean;
  type?: "checkbox" | "radio";
  required?: boolean;
  className?: string;
};

type CheckboxesBoxProps = {
  question: string;
  options: CheckboxData[];
  name: string;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  disabled?: boolean;
  type?: "checkbox" | "radio";
  required?: boolean;
  error: unknown; //!type: string | undefined
  className?: string;
  checkBoxesClassName?: string;
};

export function Checkbox({
  label,
  value,
  register,
  name,
  watch,
  disabled = false,
  type = "radio",
  required = true,
  className,
}: CheckboxProps) {
  const checkedRadio = type === "radio" && watch(name) === value;

  const checkedCheckbox =
    type === "checkbox" && Array.isArray(watch(name))
      ? (watch(name) as string[]).length && (watch(name) as string[]).includes(value)
      : watch(name) === value;

  const checked = checkedCheckbox || checkedRadio;

  const inputId = `${name}-${value}`;

  return (
    <label
      aria-disabled={disabled ? "true" : undefined}
      className={cn(
        "balance flex cursor-pointer items-center justify-center rounded-xs border-2 text-center text-base font-bold transition-all duration-200 ease-linear select-none sm:text-lg",
        "checkbox",
        className,
        {
          "checkbox-checked": checked,
        },
        {
          "radio-checked cursor-default": checked && type === "radio",
        },
        {
          "pointer-events-none opacity-50": disabled,
        },
      )}
      htmlFor={inputId}
    >
      <input
        id={inputId}
        role={type === "checkbox" ? "checkbox" : "radio"}
        {...register(name, {
          required: {
            value: required,
            message: required ? "Select an option" : "",
          },
        })}
        aria-checked={checked}
        aria-disabled={disabled ? "true" : undefined}
        aria-required={required ? "true" : undefined}
        className="sr-only"
        disabled={disabled}
        type={type}
        value={value}
      />

      {label}
    </label>
  );
}

export function CheckboxesBox({
  question,
  className,
  checkBoxesClassName,
  options,
  register,
  name,
  watch,
  disabled,
  type,
  required,
  error,
}: CheckboxesBoxProps) {
  const groupId = `group-${name}`;
  const errorId = error ? `error-for-${name}` : undefined;
  const questionId = `question-${name}`;

  return (
    <BoxWrapper fieldset>
      <Question id={questionId}>{question}</Question>

      {required ? (
        <span className="sr-only" id={`sr-required-${name}`}>
          This field is required
        </span>
      ) : null}

      <div
        aria-describedby={errorId}
        aria-labelledby={questionId}
        className={cn("my-2 grid w-full auto-rows-fr grid-cols-1 gap-3", className)}
        data-testid="checkboxes-grid"
        id={groupId}
        role="group"
      >
        {options.map((option) => (
          <Checkbox
            key={option.value}
            className={checkBoxesClassName}
            disabled={disabled}
            label={option.label}
            name={name}
            register={register}
            required={required}
            type={type}
            value={option.value}
            watch={watch}
          />
        ))}
      </div>

      <InputError error={error} id={errorId} />
    </BoxWrapper>
  );
}
