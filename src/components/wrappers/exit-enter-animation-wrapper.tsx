import {cn} from "@/helpers/cn";
import {
  TOTAL_EXIT_ENTER_ANIMATION_TIME,
  EXIT_ENTER_ANIMATION_STATE,
  useAnimationStore,
} from "@/contexts/use-animation-store";

type ExitEnterAnimationWrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export function ExitEnterAnimationWrapper({children, className}: ExitEnterAnimationWrapperProps) {
  const {exitEnterAnimation} = useAnimationStore();

  const transitionDuration = `${TOTAL_EXIT_ENTER_ANIMATION_TIME}ms`;

  return (
    <section
      className={cn(
        "flex size-full grow flex-col justify-center",
        "transition-transform",
        className,
        exitEnterAnimation === EXIT_ENTER_ANIMATION_STATE.ENTERING
          ? "translate-y-full" // opacity-0"
          : exitEnterAnimation === EXIT_ENTER_ANIMATION_STATE.EXITING
            ? "-translate-y-full" // opacity-0"
            : "translate-y-0", // opacity-100
      )}
      style={{transitionDuration}}
    >
      {children}
    </section>
  );
}
