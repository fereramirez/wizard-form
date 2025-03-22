"use client";

import React from "react";

import {useAnimateConditionalGroup} from "@/contexts/use-conditional-group-store";

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
