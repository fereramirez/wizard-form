import {Title} from "../messages/title";

import {Countdown} from "@/components/messages/countdown";
import Spinner from "@/assets/spinner.svg";
import {InOutAnimationWrapper} from "@/components/wrappers/in-out-animation-wrapper";
import {type InOutAnimationState} from "@/hooks/use-animate";

type WaitStepProps = {
  inOutAnimation: InOutAnimationState;
};

export function WaitForPromise({inOutAnimation}: WaitStepProps) {
  //! VOLVER A VER si esto aparece cuando la data ya esta lista
  return (
    <InOutAnimationWrapper inOutAnimation={inOutAnimation}>
      <div className="flex grow flex-col items-center justify-evenly gap-8">
        <Title>
          Remember for the data we would use in the last step? If you see this step, it means that
          the data is not ready yet
        </Title>

        <span className="flex max-h-72 w-full max-w-72 grow items-center justify-center">
          <Spinner className="size-full grow animate-spin" fill="currentColor" />
        </span>
      </div>
    </InOutAnimationWrapper>
  );
}

export function WaitStep({inOutAnimation}: WaitStepProps) {
  return (
    <InOutAnimationWrapper inOutAnimation={inOutAnimation}>
      <div className="flex grow flex-col items-center justify-evenly gap-8">
        <Title>This step is used to wait for data to be ready if needed</Title>

        <Countdown initialTime={6} />

        <span className="flex max-h-72 w-full max-w-72 grow items-center justify-center">
          <Spinner className="size-full grow animate-spin" fill="currentColor" />
        </span>
      </div>
    </InOutAnimationWrapper>
  );
}
