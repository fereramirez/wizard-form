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
