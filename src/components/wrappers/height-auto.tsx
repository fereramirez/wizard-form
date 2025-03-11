"use client";

import React from "react";

import {useAnimateConditionalGroup} from "@/hooks/use-animate-conditional-group";

type HeightAutoGroupProps = {
  id: string;
  isOpen: boolean;
  className?: string;
  children: React.ReactNode;
};

export function HeightAutoGroup({id, isOpen, className, children}: HeightAutoGroupProps) {
  const {ref, style, shouldRender} = useAnimateConditionalGroup(id, isOpen);

  if (!shouldRender) return null;

  return (
    <div style={style}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </div>
  );
}
