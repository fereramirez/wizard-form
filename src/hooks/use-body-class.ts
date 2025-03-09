import {useEffect} from "react";

export function useBodyClass(className: string): void {
  useEffect(() => {
    document.body.classList.add(...className.split(" "));

    return () => {
      document.body.classList.remove(...className.split(" "));
    };
  }, [className]);
}
