"use client";

import {ProgressBar} from "./progress-bar";
import {CurrentStep, STEP_INDEXES} from "./current-step";

import {AnimationProvider} from "@/contexts/use-animation-store";
import {EventsProvider} from "@/contexts/use-events-store";
import {FunnelStoreProvider} from "@/contexts/use-funnel-store";

export function FunnelCard() {
  return (
    <main
      className="flex size-full min-h-80 max-w-3xl grow flex-col items-center justify-between overflow-hidden p-4 transition-all duration-200 ease-linear motion-reduce:transition-none md:p-6"
      id="funnel-card-container"
    >
      <AnimationProvider>
        <EventsProvider>
          <FunnelStoreProvider>
            <ProgressBar lastStepIndex={STEP_INDEXES.LAST_USER} />

            <CurrentStep />
          </FunnelStoreProvider>
        </EventsProvider>
      </AnimationProvider>
    </main>
  );
}
