import {useEffect} from "react";

import {useFunnelStore} from "@/contexts/use-funnel-store";
import {useEventsStore} from "@/contexts/use-events-store";

export const useTriggerEvent = (eventName: string) => {
  const {userStepIndex} = useFunnelStore();
  const {trackEvent} = useEventsStore();

  useEffect(() => {
    const eventNameWithStep = `${eventName}_${userStepIndex}`;

    trackEvent(eventNameWithStep);
  }, [eventName, userStepIndex]);
};
