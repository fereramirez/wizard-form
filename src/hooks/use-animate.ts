import {useRef, useState, useEffect, useCallback} from "react";

export const useAnimateHeight = (isOpen: boolean, duration = 300) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>("0px");

  const calculateHeight = useCallback(() => {
    if (!ref.current) return;

    if (isOpen) {
      const contentHeight = ref.current.scrollHeight;

      setHeight(`${contentHeight.toString()}px`);
    } else {
      setHeight("0px");
    }
  }, [isOpen]);

  useEffect(() => {
    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => window.removeEventListener("resize", calculateHeight);
  }, [calculateHeight]);

  const style = {
    height,
    overflow: "hidden",
    transition: `height ${duration.toString()}ms ease-in-out`,
  };

  return {ref, style};
};

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
