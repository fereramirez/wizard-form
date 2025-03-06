"use client";

import {createContext, useCallback, useContext, useState, type ReactNode} from "react";

export const IN_OUT_ANIMATION_STATE = {
  ENTERING: "entering",
  EXITING: "exiting",
  NORMAL: "normal",
} as const;

export const ANIMATION_TIMES = {
  DELAY: 50,
  DURATION: 450,
} as const;

export const ANIMATION_DURATION = 450;

export type InOutAnimationState =
  (typeof IN_OUT_ANIMATION_STATE)[keyof typeof IN_OUT_ANIMATION_STATE];

type AnimationContextType = {
  inOutAnimation: InOutAnimationState;
  triggerInOutAnimation: (callback: () => void) => void;
};

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({children}: {children: ReactNode}) {
  const [inOutAnimation, setInOutAnimation] = useState<InOutAnimationState>(
    IN_OUT_ANIMATION_STATE.NORMAL,
  );

  const triggerInOutAnimation = useCallback(
    (callback: () => void) => {
      setInOutAnimation(IN_OUT_ANIMATION_STATE.EXITING);

      setTimeout(() => {
        setInOutAnimation(IN_OUT_ANIMATION_STATE.ENTERING);

        callback();

        // After enter animation starts, transition to normal state
        setTimeout(() => {
          setInOutAnimation(IN_OUT_ANIMATION_STATE.NORMAL);
        }, ANIMATION_TIMES.DELAY); // Start enter animation quickly
      }, ANIMATION_TIMES.DURATION); // Wait for exit animation to almost complete
    },
    [setInOutAnimation],
  );

  const value = {
    inOutAnimation,
    triggerInOutAnimation,
  };

  return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>;
}

export function useAnimationStore() {
  const context = useContext(AnimationContext);

  if (context === undefined) {
    throw new Error("useAnimationStore must be used within an AnimationProvider");
  }

  return context;
}
