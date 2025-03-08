import {Title} from "../messages/title";

import {Countdown} from "@/components/messages/countdown";
import Spinner from "@/assets/spinner.svg";
import {InOutAnimationWrapper} from "@/components/wrappers/in-out-animation-wrapper";
import {useHiddenData} from "@/hooks/use-hidden-data";

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

export const COUNT_DOWN_TIME = 3; //! VOLVER A VER cambiar a 10

export function WaitStep() {
  useHiddenData();

  //! VOLVER A VER agregar al step anterior a este
  /*
    <p>
      The next step only shows a waiting animation, as it is not a <strong>real</strong> step it won't affect the funnel progress bar
    </p>
  */

  return (
    <InOutAnimationWrapper>
      <div className="flex grow flex-col items-center justify-evenly gap-8">
        <Title>
          We can render different steps based on the data collected, the next step will be chosen
          based on the <strong className="text-primary-1">random number</strong> generated a few
          steps before.
        </Title>

        <p>
          We are also collecting some data from the user, like the{" "}
          <strong className="text-primary-1">user agent</strong> from the browser and the{" "}
          <strong className="text-primary-1">affiliate id</strong> from the query params
        </p>

        <Countdown initialTime={COUNT_DOWN_TIME - 1} />

        <span className="flex max-h-72 w-full max-w-72 grow items-center justify-center">
          <Spinner className="size-full grow animate-spin" fill="currentColor" />
        </span>
      </div>
    </InOutAnimationWrapper>
  );
}
