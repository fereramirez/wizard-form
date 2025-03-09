"use client";

import {createContext, useCallback, useContext, useState, type ReactNode} from "react";

export const EXIT_ENTER_ANIMATION_STATE = {
  ENTERING: "entering",
  EXITING: "exiting",
  NORMAL: "normal",
} as const;

const ANIMATION_TIMES = {
  DELAY: 50,
  DURATION: 550,
} as const;

export const TOTAL_EXIT_ENTER_ANIMATION_TIME = ANIMATION_TIMES.DELAY + ANIMATION_TIMES.DURATION;

type ExitEnterAnimationState =
  (typeof EXIT_ENTER_ANIMATION_STATE)[keyof typeof EXIT_ENTER_ANIMATION_STATE];

type AnimationStore = {
  exitEnterAnimation: ExitEnterAnimationState;
  triggerExitEnterAnimation: (callback: () => void) => void;
};

const AnimationContext = createContext<AnimationStore | undefined>(undefined);

export function AnimationProvider({children}: {children: ReactNode}) {
  const [exitEnterAnimation, setExitEnterAnimation] = useState<ExitEnterAnimationState>(
    EXIT_ENTER_ANIMATION_STATE.NORMAL,
  );

  const triggerExitEnterAnimation = useCallback(
    (callback: () => void) => {
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
    [setExitEnterAnimation],
  );

  const value = {
    exitEnterAnimation,
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
