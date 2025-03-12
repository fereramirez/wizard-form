import {createContext, useCallback, useContext, useState, type ReactNode} from "react";

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

export function useConditionalGroupStore() {
  const context = useContext(ConditionalGroupContext);

  if (!context) {
    throw new Error("useConditionalGroupStore must be used within an ConditionalGroupProvider");
  }

  return context;
}
