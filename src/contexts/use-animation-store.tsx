import {createContext, useCallback, useContext, useState, type ReactNode} from "react";

export const EXIT_ENTER_ANIMATION_STATE = {
  ENTERING: "entering",
  EXITING: "exiting",
  NORMAL: "normal",
} as const;

export const ANIMATION_DIRECTION = {
  UP: "up",
  DOWN: "down",
} as const;

const ANIMATION_TIMES = {
  DELAY: 50,
  DURATION: 550,
} as const;

export const TOTAL_EXIT_ENTER_ANIMATION_TIME = ANIMATION_TIMES.DELAY + ANIMATION_TIMES.DURATION;

type ExitEnterAnimationState =
  (typeof EXIT_ENTER_ANIMATION_STATE)[keyof typeof EXIT_ENTER_ANIMATION_STATE];

export type AnimationDirection = (typeof ANIMATION_DIRECTION)[keyof typeof ANIMATION_DIRECTION];

type AnimationStore = {
  exitEnterAnimation: ExitEnterAnimationState;
  animationDirection: AnimationDirection;
  triggerExitEnterAnimation: (callback: () => void, direction?: AnimationDirection) => void;
};

const AnimationContext = createContext<AnimationStore | undefined>(undefined);

export function AnimationProvider({children}: {children: ReactNode}) {
  const [exitEnterAnimation, setExitEnterAnimation] = useState<ExitEnterAnimationState>(
    EXIT_ENTER_ANIMATION_STATE.NORMAL,
  );
  const [animationDirection, setAnimationDirection] = useState<AnimationDirection>(
    ANIMATION_DIRECTION.UP,
  );

  const triggerExitEnterAnimation = useCallback(
    (callback: () => void, direction: AnimationDirection = ANIMATION_DIRECTION.UP) => {
      setAnimationDirection(direction);
      setExitEnterAnimation(EXIT_ENTER_ANIMATION_STATE.EXITING);

      setTimeout(() => {
        setExitEnterAnimation(EXIT_ENTER_ANIMATION_STATE.ENTERING);

        callback();

        // After enter animation starts, transition to normal state
        setTimeout(() => {
          setExitEnterAnimation(EXIT_ENTER_ANIMATION_STATE.NORMAL);
        }, ANIMATION_TIMES.DELAY); // Start enter animation quickly
      }, ANIMATION_TIMES.DURATION); // Wait for exit animation to almost complete
    },
    [setExitEnterAnimation, setAnimationDirection],
  );

  const value = {
    exitEnterAnimation,
    animationDirection,
    triggerExitEnterAnimation,
  };

  return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
}

export function useAnimationStore() {
  const context = useContext(AnimationContext);

  if (!context) {
    throw new Error("useAnimationStore must be used within an AnimationProvider");
  }

  return context;
}
