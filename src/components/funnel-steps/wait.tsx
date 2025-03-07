import {Title} from "../messages/title";

import {Countdown} from "@/components/messages/countdown";
import Spinner from "@/assets/spinner.svg";
import {InOutAnimationWrapper} from "@/components/wrappers/in-out-animation-wrapper";

export function WaitForPromise() {
  return (
    <InOutAnimationWrapper>
      <div className="flex grow flex-col items-center justify-evenly gap-8">
        <Title>
          Remember for the data we would use in the last step? If you see this step, it means that
          the data is not ready yet. Please wait.
        </Title>

        <span className="flex max-h-72 w-full max-w-72 grow items-center justify-center">
          <Spinner className="size-full grow animate-spin" fill="currentColor" />
        </span>
      </div>
    </InOutAnimationWrapper>
  );
}

export function WaitStep() {
  return (
    <InOutAnimationWrapper>
      <div className="flex grow flex-col items-center justify-evenly gap-8">
        <Title>
          We can render different steps based on the data collected, the next step will be chosen
          based on the <strong className="text-primary-1">random number</strong> generated a few
          steps before.
        </Title>

        <Countdown initialTime={10} />

        <span className="flex max-h-72 w-full max-w-72 grow items-center justify-center">
          <Spinner className="size-full grow animate-spin" fill="currentColor" />
        </span>
      </div>
    </InOutAnimationWrapper>
  );
}
