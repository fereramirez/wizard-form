import {cn} from "@/helpers/cn";
import {
  TOTAL_EXIT_ENTER_ANIMATION_TIME,
  EXIT_ENTER_ANIMATION_STATE,
  useAnimationStore,
  ANIMATION_DIRECTION,
} from "@/contexts/use-animation-store";

type ExitEnterAnimationWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export function ExitEnterAnimationWrapper({children, className}: ExitEnterAnimationWrapperProps) {
  const {exitEnterAnimation, animationDirection} = useAnimationStore();

  const transitionDuration = `${TOTAL_EXIT_ENTER_ANIMATION_TIME}ms`;
  const isUpDirection = animationDirection === ANIMATION_DIRECTION.UP;

  return (
    <section
      className={cn(
        "flex size-full grow flex-col justify-center",
        "transition-transform",
        className,
        exitEnterAnimation === EXIT_ENTER_ANIMATION_STATE.ENTERING
          ? isUpDirection
            ? "translate-y-full" // Entering from bottom to center (default)
            : "-translate-y-full" // Entering from top to center (inverted)
          : exitEnterAnimation === EXIT_ENTER_ANIMATION_STATE.EXITING
            ? isUpDirection
              ? "-translate-y-full" // Exiting from center to top (default)
              : "translate-y-full" // Exiting from center to bottom (inverted)
            : "translate-y-0", // Normal state (centered)
      )}
      style={{transitionDuration}}
    >
      {children}
    </section>
  );
}
