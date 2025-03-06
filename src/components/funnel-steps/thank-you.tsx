"use client";

import {useAnalytics} from "@/hooks/use-analytics";
import {InOutAnimationWrapper} from "@/components/wrappers/in-out-animation-wrapper";
import {type InOutAnimationState} from "@/hooks/use-animate";
import {Title} from "@/components/messages/title";
import {useFunnelStore} from "@/contexts/use-funnel-store";

type ThankYouProps = {
  inOutAnimation: InOutAnimationState;
};

export function ThankYouAds({inOutAnimation}: ThankYouProps) {
  const {randomValue} = useFunnelStore();

  useAnalytics("tyAds");

  return (
    <InOutAnimationWrapper inOutAnimation={inOutAnimation}>
      <div
        className="relative flex w-full grow flex-col items-center justify-evenly gap-8"
        data-testid="thankyou"
      >
        <Title>
          You received the number <strong className="text-primary-1">{randomValue}</strong> from a
          API, based on that number we show ads. If you go through the funnel again probably you
          won't see ads (50% of the time).
        </Title>

        <div className="grid w-full max-w-2xl grid-cols-2 gap-4 p-4">
          <div className="rounded-lg bg-gray-100 p-4 shadow transition-shadow hover:shadow-md">
            <h3 className="font-bold">Special Offer #1</h3>
            <p className="text-sm">Limited time discount!</p>
          </div>
          <div className="rounded-lg bg-gray-100 p-4 shadow transition-shadow hover:shadow-md">
            <h3 className="font-bold">Special Offer #2</h3>
            <p className="text-sm">Best deal of the season!</p>
          </div>
          <div className="rounded-lg bg-gray-100 p-4 shadow transition-shadow hover:shadow-md">
            <h3 className="font-bold">Special Offer #3</h3>
            <p className="text-sm">Exclusive promotion!</p>
          </div>
          <div className="rounded-lg bg-gray-100 p-4 shadow transition-shadow hover:shadow-md">
            <h3 className="font-bold">Special Offer #4</h3>
            <p className="text-sm">Don't miss out!</p>
          </div>
        </div>
      </div>
    </InOutAnimationWrapper>
  );
}

export function ThankYou({inOutAnimation}: ThankYouProps) {
  const {randomValue} = useFunnelStore();

  useAnalytics("ty");

  return (
    <InOutAnimationWrapper inOutAnimation={inOutAnimation}>
      <div
        className="relative flex w-full grow flex-col items-center justify-evenly"
        data-testid="thankyou"
      >
        <Title>
          You received the number <strong className="text-primary-1">{randomValue}</strong> from a
          API, based on that number we don't show ads. If you go through the funnel again probably
          you will see ads (50% of the time).
        </Title>
      </div>
    </InOutAnimationWrapper>
  );
}
