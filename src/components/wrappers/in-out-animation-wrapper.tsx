import {cn} from "@/helpers/cn";
import {type InOutAnimationState, IN_OUT_ANIMATION_STATE} from "@/hooks/use-animate";

type InOutAnimationWrapperProps = {
  children: React.ReactNode;
  inOutAnimation: InOutAnimationState;
  className?: string;
};

export function InOutAnimationWrapper({
  children,
  inOutAnimation,
  className,
}: InOutAnimationWrapperProps) {
  return (
    <section
      className={cn(
        "flex size-full grow flex-col transition-all duration-500",
        className,
        inOutAnimation === IN_OUT_ANIMATION_STATE.ENTERING
          ? "translate-y-full" // opacity-0"
          : inOutAnimation === IN_OUT_ANIMATION_STATE.EXITING
            ? "-translate-y-full" // opacity-0"
            : "translate-y-0", // opacity-100
      )}
    >
      {children}
    </section>
  );
}
