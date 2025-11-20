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

  const getTransformClass = () => {
    if (exitEnterAnimation === EXIT_ENTER_ANIMATION_STATE.NORMAL) {
      return "translate-x-0 translate-y-0";
    }

    // Y axis
    if (
      animationDirection === ANIMATION_DIRECTION.UP ||
      animationDirection === ANIMATION_DIRECTION.DOWN
    ) {
      const isUpDirection = animationDirection === ANIMATION_DIRECTION.UP;

      if (exitEnterAnimation === EXIT_ENTER_ANIMATION_STATE.ENTERING) {
        return isUpDirection
          ? "translate-y-full" // Entering from bottom to center (UP)
          : "-translate-y-full"; // Entering from top to center (DOWN)
      } else {
        // EXITING
        return isUpDirection
          ? "-translate-y-full" // Exiting from center to top (UP)
          : "translate-y-full"; // Exiting from center to bottom (DOWN)
      }
    }

    // X axis
    else {
      const isLeftDirection = animationDirection === ANIMATION_DIRECTION.LEFT;

      if (exitEnterAnimation === EXIT_ENTER_ANIMATION_STATE.ENTERING) {
        return isLeftDirection
          ? "translate-x-2/1" // Entering from right to center (LEFT)
          : "-translate-x-2/1"; // Entering from left to center (RIGHT)
      } else {
        // EXITING
        return isLeftDirection
          ? "-translate-x-2/1" // Exiting from center to left (LEFT)
          : "translate-x-2/1"; // Exiting from center to right (RIGHT)
      }
    }
  };

  return (
    <section
      className={cn(
        "flex size-full grow flex-col justify-center",
        "transition-transform",
        className,
        getTransformClass(),
      )}
      style={{transitionDuration}}
    >
      {children}
    </section>
  );
}
