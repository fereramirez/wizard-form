import {useEffect} from "react";

import {useFunnelStore} from "@/contexts/use-funnel-store";

export const useAnalytics = (trackName: string) => {
  const {userStepIndex} = useFunnelStore();

  useEffect(() => {
    try {
      const eventName = `${trackName}_${userStepIndex}`;

      console.log({eventName});
    } catch (error) {
      console.log(error);
    }
  }, [trackName, userStepIndex]);
};
