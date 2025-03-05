import {useCallback, useState} from "react";

export const IN_OUT_ANIMATION_STATE = {
  ENTERING: "entering",
  EXITING: "exiting",
  NORMAL: "normal",
} as const;

export type InOutAnimationState =
  (typeof IN_OUT_ANIMATION_STATE)[keyof typeof IN_OUT_ANIMATION_STATE];

export function useInoutAnimation() {
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
        }, 50); // Start enter animation quickly
      }, 450); // Wait for exit animation to almost complete
    },
    [setInOutAnimation],
  );

  return {inOutAnimation, triggerInOutAnimation};
}
