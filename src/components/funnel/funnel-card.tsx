"use client";

import {ProgressBar} from "./progress-bar";
import {CurrentStepV2, STEP_INDEXES} from "./current-step";

import {AnimationProvider} from "@/contexts/use-animation-store";
import {EventsProvider} from "@/contexts/use-events-store";
import {FunnelStoreProvider} from "@/contexts/use-funnel-store";

export function FunnelCard() {
  return (
    <main className="flex size-full min-h-80 max-w-3xl grow flex-col items-center justify-between px-2 py-5 transition-all duration-200 ease-linear motion-reduce:transition-none sm:px-4 sm:py-10">
      <AnimationProvider>
        <EventsProvider>
          <FunnelStoreProvider>
            <ProgressBar lastStepIndex={STEP_INDEXES.LAST_USER} />

            <CurrentStepV2 />
          </FunnelStoreProvider>
        </EventsProvider>
      </AnimationProvider>
    </main>
  );
}
