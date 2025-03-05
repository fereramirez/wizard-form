import {type FormHTMLAttributes} from "react";
import {type FieldValues, type SubmitHandler} from "react-hook-form";

import {cn} from "@/helpers/cn";
import {InOutAnimationWrapper} from "@/components/wrappers/in-out-animation-wrapper";
import {type InOutAnimationState} from "@/hooks/use-inout-animation";

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  children: React.ReactNode;
  className?: string;
  inOutAnimation: InOutAnimationState;
};

export type FormStepProps = FormHTMLAttributes<HTMLFormElement> & {
  onSubmit: SubmitHandler<FieldValues>;
  isLoading?: boolean;
  inOutAnimation: InOutAnimationState;
};

export function Form({children, className, inOutAnimation, ...rest}: FormProps) {
  return (
    <InOutAnimationWrapper inOutAnimation={inOutAnimation}>
      <form
        className={cn(
          "flex min-h-full w-full grow flex-col justify-around gap-10 transition-all duration-500",
          className,
        )}
        {...rest}
      >
        {children}
      </form>
    </InOutAnimationWrapper>
  );
}
