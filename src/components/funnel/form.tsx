import {type FormHTMLAttributes} from "react";
import {type FieldValues, type SubmitHandler} from "react-hook-form";

import {cn} from "@/helpers/cn";
import {ExitEnterAnimationWrapper} from "@/components/wrappers/exit-enter-animation-wrapper";

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
    <ExitEnterAnimationWrapper className="overflow-hidden">
      <form className={cn("flex flex-col justify-around gap-5 sm:gap-10", className)} {...rest}>
        {children}
      </form>
    </ExitEnterAnimationWrapper>
  );
}
