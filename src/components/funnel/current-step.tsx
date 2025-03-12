"use client";

import {type FunnelForms, useFunnelStore} from "@/contexts/use-funnel-store";
import {useSubmit} from "@/hooks/use-submit";
import {Intro} from "@/components/funnel-steps/intro";
import {Name} from "@/components/funnel-steps/name";
import {Back} from "@/components/funnel-steps/back";
import {Optional} from "@/components/funnel-steps/optional";
import {Repeat} from "@/components/funnel-steps/repeat";
import {StorePromise} from "@/components/funnel-steps/store-promise";
import {ButtonLoader} from "@/components/funnel-steps/button-loader";
import {Autosubmit} from "@/components/funnel-steps/autosubmit";
import {AutosubmitFetchAndWait} from "@/components/funnel-steps/autosubmit-fetch";
import {AutosubmitShowFetchedData} from "@/components/funnel-steps/autosubmit-show";
import {WaitForPromise, WaitStep} from "@/components/funnel-steps/wait";
import {ShowRepo, DontShowRepo} from "@/components/funnel-steps/show-repo";
import {FunnelData} from "@/components/funnel-steps/funnel-data";
import {Events} from "@/components/funnel-steps/events";
import {Restart} from "@/components/funnel-steps/restart";

export function CurrentStep() {
  const {realStepIndex, repeat} = useFunnelStore();

  const {
    isLoading,
    notAllowedToPass,
    submitQuestion,
    submitJump,
    submitBack,
    submitWaitFakeRequest,
    submitFetchWaitData,
    submitRepeat,
    submitStorePromise,
    submitWaitForPromise,
    submitLastQuestion,
    submitRestart,
  } = useSubmit();

  const isRepeating = repeat === "true";

  /*
  ! funciona pero tira error ts
    <Repeat
      key="4"
      disabled={notAllowedToPass}
      onSubmit={(data) => submitJump(data, data?.repeat === "true" ? 1 : "+1")}
    />,
  */

  const stepsArray = [
    <Intro key="0" disabled={notAllowedToPass} onSubmit={submitQuestion} />,
    <Name
      key="1"
      disabled={notAllowedToPass}
      onSubmit={(data) => submitJump(data, isRepeating ? "+2" : "+1")}
    />,
    <Back
      key="2"
      disabled={notAllowedToPass}
      secondaryOnSubmit={submitBack}
      onSubmit={submitQuestion}
    />,
    <Optional key="3" disabled={notAllowedToPass} onSubmit={submitQuestion} />,
    <Repeat key="4" disabled={notAllowedToPass} onSubmit={submitRepeat} />,
    <StorePromise key="5" disabled={notAllowedToPass} onSubmit={submitStorePromise} />,
    <ButtonLoader
      key="6"
      disabled={notAllowedToPass}
      isLoading={isLoading}
      onSubmit={submitWaitFakeRequest}
    />,
    <Autosubmit key="7" disabled={notAllowedToPass} onSubmit={submitQuestion} />,
    <AutosubmitFetchAndWait
      key="8"
      disabled={notAllowedToPass || isLoading}
      onSubmit={submitFetchWaitData}
    />,
    <AutosubmitShowFetchedData
      key="9"
      disabled={notAllowedToPass}
      onSubmit={submitWaitForPromise}
    />,
    <WaitForPromise key="10" />,
    <Name key="11" disabled={notAllowedToPass} onSubmit={submitLastQuestion} />, //! VOLVER A VER cambiar este step
    <WaitStep key="12" />,
    <ShowRepo
      key="13"
      disabled={notAllowedToPass}
      onSubmit={(data) => submitJump(data, "+2", "+1")}
    />,
    <DontShowRepo key="14" disabled={notAllowedToPass} onSubmit={submitQuestion} />,
    <FunnelData key="15" disabled={notAllowedToPass} onSubmit={submitQuestion} />,
    <Events key="16" disabled={notAllowedToPass} onSubmit={submitQuestion} />,
    <Restart key="17" disabled={notAllowedToPass} onSubmit={submitRestart} />,
  ];

  const stepsArrayTest = [
    <Optional key="3" disabled={notAllowedToPass} onSubmit={submitQuestion} />,
    <ShowRepo
      key="13"
      disabled={notAllowedToPass}
      onSubmit={(data) => submitJump(data, "+2", "+1")}
    />,
    <Back
      key="2"
      disabled={notAllowedToPass}
      secondaryOnSubmit={submitBack}
      onSubmit={submitQuestion}
    />,
    <FunnelData key="15" disabled={notAllowedToPass} onSubmit={submitQuestion} />,
    <FunnelData key="15" disabled={notAllowedToPass} onSubmit={submitQuestion} />,

    <ButtonLoader
      key="6"
      disabled={notAllowedToPass}
      isLoading={isLoading}
      onSubmit={submitWaitFakeRequest}
    />,
    <WaitStep key="12" />,
  ];

  return stepsArray[realStepIndex];
}

export const STEP_INDEXES = {
  NAME: 11,
  SHOW_REPO: 13,
  DONT_SHOW_REPO: 14,
  LAST_USER: 14,
  LAST_REAL: 17,
} as const;

const STEPS = {
  Step0: 0,
  Step1: 1,
  Step2: 2,
  Step3: 3,
  Step4: 4,
  Step5: 5,
  Step6: 6,
  Step7: 7,
  Step8: 8,
  Step9: 9,
  Step10: 10,
  Step11: 11,
  Step12: 12,
  Step13: 13,
  Step14: 14,
  Step15: 15,
  Step16: 16,
  LAST: 17,
} as const;

export type StepValue = (typeof STEPS)[keyof typeof STEPS];

export function CurrentStepV2() {
  const {realStepIndex, repeat} = useFunnelStore() as FunnelForms & {
    realStepIndex: StepValue;
  };

  const {
    isLoading,
    notAllowedToPass,
    submitQuestion,
    submitJump,
    submitBack,
    submitWaitFakeRequest,
    submitFetchWaitData,
    submitRepeat,
    submitStorePromise,
    submitWaitForPromise,
    submitLastQuestion,
    submitRestart,
  } = useSubmit();

  const isRepeating = repeat === "true";

  switch (realStepIndex) {
    default: {
      const _exhaustiveCheck: never = realStepIndex;

      return _exhaustiveCheck;
    }

    case STEPS.Step0:
      return <Intro disabled={notAllowedToPass} onSubmit={submitQuestion} />;

    case STEPS.Step1:
      return (
        <Name
          disabled={notAllowedToPass}
          onSubmit={(data) => submitJump(data, isRepeating ? "+2" : "+1")}
        />
      );

    case STEPS.Step2:
      return (
        <Back
          disabled={notAllowedToPass}
          secondaryOnSubmit={submitBack}
          onSubmit={submitQuestion}
        />
      );

    case STEPS.Step3:
      return <Optional disabled={notAllowedToPass} onSubmit={submitQuestion} />;

    case STEPS.Step4:
      return <Repeat disabled={notAllowedToPass} onSubmit={submitRepeat} />;

    case STEPS.Step5:
      return <StorePromise disabled={notAllowedToPass} onSubmit={submitStorePromise} />;

    case STEPS.Step6:
      return (
        <ButtonLoader
          disabled={notAllowedToPass}
          isLoading={isLoading}
          onSubmit={submitWaitFakeRequest}
        />
      );

    case STEPS.Step7:
      return <Autosubmit disabled={notAllowedToPass} onSubmit={submitQuestion} />;

    case STEPS.Step8:
      return (
        <AutosubmitFetchAndWait
          disabled={notAllowedToPass || isLoading}
          onSubmit={submitFetchWaitData}
        />
      );

    case STEPS.Step9:
      return (
        <AutosubmitShowFetchedData disabled={notAllowedToPass} onSubmit={submitWaitForPromise} />
      );

    case STEPS.Step10:
      return <WaitForPromise />;

    case STEPS.Step11:
      return <Name disabled={notAllowedToPass} onSubmit={submitLastQuestion} />; //! VOLVER A VER cambiar este step

    case STEPS.Step12:
      return <WaitStep />;

    case STEPS.Step13:
      return (
        <ShowRepo disabled={notAllowedToPass} onSubmit={(data) => submitJump(data, "+2", "+1")} />
      );

    case STEPS.Step14:
      return <DontShowRepo disabled={notAllowedToPass} onSubmit={submitQuestion} />;

    case STEPS.Step15:
      return <FunnelData disabled={notAllowedToPass} onSubmit={submitQuestion} />;

    case STEPS.Step16:
      return <Events disabled={notAllowedToPass} onSubmit={submitQuestion} />;

    case STEPS.LAST:
      return <Restart disabled={notAllowedToPass} onSubmit={submitRestart} />;
  }
}
