import {type InputHTMLAttributes} from "react";
import {type FieldValues, type UseFormRegister} from "react-hook-form";

import {BoxWrapper} from "./box-wrapper";

import {InputError} from "@/components/messages/input-error";
import {Paragraph} from "@/components/messages/paragraph";
import {cn} from "@/helpers/cn";

export type Validation = {
  required: {
    value: boolean;
    message: string;
  };
  maxLength?: {
    value: number;
    message: string;
  };
  minLength?: {
    value: number;
    message: string;
  };
  pattern?: {
    value: RegExp;
    message: string;
  };
  validate?: Record<string, (_value: string) => string | boolean>;
};

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  question?: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  validation: Validation;
  error?: unknown; //!type: string | undefined
  className?: string;
};

export function Input({
  inputMode = "text",
  register,
  name,
  validation,
  error,
  className,
  ...rest
}: InputProps) {
  const errorId = `error-for-${name}`;

  return (
    <input
      {...rest}
      inputMode={inputMode}
      {...register(name, validation)}
      aria-describedby={error ? errorId : undefined}
      aria-invalid={error ? "true" : "false"}
      autoComplete="off"
      className={cn(
        "w-full px-0 py-2 text-base text-white placeholder:text-white/50 focus:outline-none motion-reduce:transition-none sm:text-3xl",
        "bottom-shadow",
        className,
      )}
      type="text"
      onPaste={(e) => e.preventDefault()}
    />
  );
}

export function InputBox({question, register, name, validation, error, ...rest}: InputProps) {
  const inputId = `input-${name}`;
  const errorId = `error-for-${name}`;

  return (
    <BoxWrapper className="flex flex-col gap-2">
      {question ? <Paragraph text={question} type="question" /> : null}

      <Input
        {...rest}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? "true" : "false"}
        aria-labelledby={question ? `label-${name}` : undefined}
        id={inputId}
        name={name}
        register={register}
        validation={validation}
      />

      <InputError error={error} />
    </BoxWrapper>
  );
}
