import {useHiddenData} from "@/hooks/use-hidden-data";
import {ExitEnterAnimationWrapper} from "@/components/wrappers/exit-enter-animation-wrapper";
import {Title} from "@/components/messages/title";
import {Countdown} from "@/components/messages/countdown";
import {Note} from "@/components/messages/note";
import Spinner from "@/assets/spinner.svg";

export function WaitForPromise() {
  return (
    <ExitEnterAnimationWrapper>
      <div className="flex grow flex-col items-center justify-evenly gap-8">
        <Title>
          Remember for the data we would use in the last step? If you see this step, it means that
          the data is not ready yet. Please wait.
        </Title>

        <span className="flex max-h-72 w-full max-w-72 grow items-center justify-center">
          <Spinner className="size-full grow animate-spin" fill="currentColor" />
        </span>
      </div>
    </ExitEnterAnimationWrapper>
  );
}

export const COUNT_DOWN_TIME = 10;

export function WaitStep() {
  useHiddenData();

  return (
    <ExitEnterAnimationWrapper>
      <div className="flex grow flex-col items-center justify-evenly gap-8">
        <Title>
          We can render different steps based on the data collected, the next step will be chosen
          based on the <strong className="text-primary-1">random number</strong> generated a few
          steps before.
        </Title>

        <Note>
          We are also collecting some data from the user, like the{" "}
          <strong className="text-primary-1">user agent</strong> from the browser and the{" "}
          <strong className="text-primary-1">affiliate id</strong> from the query params
        </Note>

        <Countdown initialTime={COUNT_DOWN_TIME - 1} />

        <span className="flex max-h-72 w-full max-w-72 grow items-center justify-center">
          <Spinner className="size-full grow animate-spin" fill="currentColor" />
        </span>
      </div>
    </ExitEnterAnimationWrapper>
  );
}
