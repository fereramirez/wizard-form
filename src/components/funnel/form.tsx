import {type FormHTMLAttributes} from "react";
import {type FieldValues, type SubmitHandler} from "react-hook-form";

import {cn} from "@/helpers/cn";
import {InOutAnimationWrapper} from "@/components/wrappers/in-out-animation-wrapper";

export type FormStepProps = FormHTMLAttributes<HTMLFormElement> & {
  onSubmit: SubmitHandler<FieldValues>;
  secondaryOnSubmit?: SubmitHandler<FieldValues>;
  isLoading?: boolean;
  disabled?: boolean;
};

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  children: React.ReactNode;
  className?: string;
};

export function Form({children, className, ...rest}: FormProps) {
  return (
    <InOutAnimationWrapper>
      <form
        className={cn("flex min-h-full w-full grow flex-col justify-around gap-10", className)}
        {...rest}
      >
        {children}
      </form>
    </InOutAnimationWrapper>
  );
}
