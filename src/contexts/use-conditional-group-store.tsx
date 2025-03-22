import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export const ANIMATION_DURATION = 250;

type ConditionalGroupStore = {
  triggerConditionalGroupAnimation: (callback: () => void) => void;
  registerRecord: (id: string, isOpen: boolean) => void;
};

const ConditionalGroupContext = createContext<ConditionalGroupStore | undefined>(undefined);

export function ConditionalGroupProvider({children}: {children: ReactNode}) {
  const [openRecord, setOpenRecord] = useState<Record<string, boolean>>({});

  const triggerConditionalGroupAnimation = useCallback(
    (callback: () => void) => {
      const delay = Object.values(openRecord).some((value) => value === true)
        ? ANIMATION_DURATION
        : 0;

      setTimeout(() => {
        callback();
      }, delay);
    },
    [openRecord],
  );

  const registerRecord = useCallback((id: string, isOpen: boolean) => {
    setOpenRecord((prev) => ({
      ...prev,
      [id]: isOpen,
    }));
  }, []);

  const value = {
    triggerConditionalGroupAnimation,
    registerRecord,
  };

  return (
    <ConditionalGroupContext.Provider value={value}>{children}</ConditionalGroupContext.Provider>
  );
}

function useConditionalGroupStore() {
  const context = useContext(ConditionalGroupContext);

  if (!context) {
    throw new Error("useConditionalGroupStore must be used within an ConditionalGroupProvider");
  }

  return context;
}

export const useAnimateConditionalGroup = (id: string, isOpen: boolean) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<string>("0px");
  const [shouldRender, setShouldRender] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const {triggerConditionalGroupAnimation, registerRecord} = useConditionalGroupStore();

  useEffect(() => {
    if (isOpen) {
      // console.log(id.toUpperCase(), "-----render");
      setShouldRender(true);

      setIsMounted(true);
    } else {
      setIsMounted(false);
    }
  }, [isOpen]);

  /* const calculateHeight = useCallback(() => {
    if (!ref.current) return;

    if (shouldRender) {
      const contentHeight = ref.current.scrollHeight;

      setHeight(`${contentHeight.toString()}px`);
    }
  }, [shouldRender]);

  useEffect(() => {
    calculateHeight();
    window.addEventListener("resize", calculateHeight);

    return () => window.removeEventListener("resize", calculateHeight);
  }, [calculateHeight]); */

  useEffect(() => {
    if (isMounted) {
      if (!ref.current) return;

      const contentHeight = ref.current.scrollHeight;

      registerRecord(id, true);

      triggerConditionalGroupAnimation(() => {
        // console.log(id.toUpperCase(), "-----height", contentHeight);
        setHeight(`${contentHeight.toString()}px`);
        setShouldRender(true);
      });
    } else {
      // console.log(id.toUpperCase(), "-----height", 0);
      setHeight("0px");

      registerRecord(id, false);

      triggerConditionalGroupAnimation(() => {
        // console.log(id.toUpperCase(), "-----not render");
        setHeight("0px");
        setShouldRender(false);
      });
    }
  }, [isMounted]);

  const style = {
    height,
    overflow: "hidden",
    transition: `height ${ANIMATION_DURATION.toString()}ms ease-in-out`,
  };

  return {ref, style, shouldRender};
};
