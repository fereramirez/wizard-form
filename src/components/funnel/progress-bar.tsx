"use client";

import {useEffect, useRef} from "react";

import {useFunnelStore} from "@/contexts/use-funnel-store";

type ProgressBarProps = {
  lastStepIndex: number;
};

export function ProgressBar({lastStepIndex}: ProgressBarProps) {
  const {userStepIndex} = useFunnelStore();
  const progressRef = useRef<HTMLDivElement>(null);

  //! VOLVER A VER al modificar la cantidad de steps (por ejemplo en repeat) no retroceder el progreso y seguir aumentando

  useEffect(() => {
    if (progressRef.current) {
      const progress = (userStepIndex * 100) / lastStepIndex;

      progressRef.current.style.setProperty("--progress-width", `${progress}%`);
    }
  }, [userStepIndex, lastStepIndex]);

  return (
    <div className="bg-primary-3 absolute top-0 left-0 h-[5px] w-full overflow-hidden">
      <div
        ref={progressRef}
        aria-valuemax={lastStepIndex}
        aria-valuemin={0}
        aria-valuenow={userStepIndex}
        className="relative h-full w-full"
        role="progressbar"
      >
        <div
          className="bg-primary-1 absolute top-0 left-0 h-full transition-all duration-300 ease-in-out"
          style={{width: "var(--progress-width, 0%)"}}
        />
      </div>
    </div>
  );
}
