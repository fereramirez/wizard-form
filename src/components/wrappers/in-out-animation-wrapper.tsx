import {cn} from "@/helpers/cn";
import {
  type InOutAnimationState,
  ANIMATION_TIMES,
  IN_OUT_ANIMATION_STATE,
} from "@/hooks/use-animate";

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
  const transitionDuration = `${ANIMATION_TIMES.DURATION + ANIMATION_TIMES.DELAY}ms`;

  return (
    <section
      className={cn(
        "flex size-full grow flex-col",
        "transition-transform",
        className,
        inOutAnimation === IN_OUT_ANIMATION_STATE.ENTERING
          ? "translate-y-full" // opacity-0"
          : inOutAnimation === IN_OUT_ANIMATION_STATE.EXITING
            ? "-translate-y-full" // opacity-0"
            : "translate-y-0", // opacity-100
      )}
      style={{transitionDuration}}
    >
      {children}
    </section>
  );
}
