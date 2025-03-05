"use client";

import React from "react";

import {cn} from "@/helpers/cn";
import {useAnimateHeight} from "@/hooks/use-animate";

type DivAnimatedHeightProps = {
  isOpen: boolean;
  className?: string;
  outerClassName?: string;
  duration?: number;
  children: React.ReactNode;
  float?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

export function DivAnimatedHeight({
  isOpen,
  className,
  duration = 300,
  children,
  float = false,
  outerClassName,
  onMouseEnter,
  onMouseLeave,
}: DivAnimatedHeightProps) {
  const {ref, style} = useAnimateHeight(isOpen, duration);

  return (
    <div
      className={cn(outerClassName, {"absolute z-40": float})}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div ref={ref} className={className}>
        {children}
      </div>
    </div>
  );
}
