"use client";

import {Intro} from "../funnel-steps/intro";

import {AutosubmitShowFetchedData} from "@/components/funnel-steps/autosubmit-data";
import {AutosubmitFetchAndWait} from "@/components/funnel-steps/autosubmit-fetch";
import {Name} from "@/components/funnel-steps/name";
import {ThankYouAds, ThankYou} from "@/components/funnel-steps/thank-you";
import {Repeat} from "@/components/funnel-steps/repeat";
import {Optional} from "@/components/funnel-steps/optional";
import {StorePromise} from "@/components/funnel-steps/store-promise";
import {useFunnelStore} from "@/contexts/use-funnel-store";
import {useSubmit} from "@/hooks/use-submit";
import {Autosubmit} from "@/components/funnel-steps/autosubmit";
import {WaitForPromise, WaitStep} from "@/components/funnel-steps/wait";
import {Back} from "@/components/funnel-steps/back";

export function CurrentStep() {
  const {realStepIndex} = useFunnelStore();

  const {
    startTimer,
    isLoading,
    inOutAnimation,
    submitQuestion,
    submitBack,
    submitFetchAndWait,
    submitRepeat,
    submitStorePromise,
    submitWaitForPromise,
    submitLastQuestion,
  } = useSubmit();

  //! VOLVER A VER agregar steps adicionales

  const stepsArray = [
    <Intro key="0" inOutAnimation={inOutAnimation} onSubmit={submitQuestion} />,
    <Name
      key="1"
      inOutAnimation={inOutAnimation}
      isLoading={isLoading}
      onChange={startTimer}
      onSubmit={submitQuestion}
    />,
    <Back key="2" inOutAnimation={inOutAnimation} onSubmit={submitBack} />,
    <Optional
      key="2"
      inOutAnimation={inOutAnimation}
      isLoading={isLoading}
      onSubmit={submitQuestion}
    />,
    <Repeat
      key="3"
      inOutAnimation={inOutAnimation}
      isLoading={isLoading}
      onSubmit={submitRepeat}
    />,
    <StorePromise
      key="4"
      inOutAnimation={inOutAnimation}
      isLoading={isLoading}
      onSubmit={submitStorePromise}
    />,
    <Autosubmit
      key="5"
      inOutAnimation={inOutAnimation}
      isLoading={isLoading}
      onSubmit={submitQuestion}
    />,
    <AutosubmitFetchAndWait
      key="6"
      inOutAnimation={inOutAnimation}
      isLoading={isLoading}
      onSubmit={submitFetchAndWait}
    />,
    <AutosubmitShowFetchedData
      key="7"
      inOutAnimation={inOutAnimation}
      isLoading={isLoading}
      onSubmit={submitWaitForPromise}
    />,
    <WaitForPromise key="8" inOutAnimation={inOutAnimation} />,
    <Name
      key="9"
      inOutAnimation={inOutAnimation}
      isLoading={isLoading}
      onSubmit={submitLastQuestion}
    />,
    <WaitStep key="10" inOutAnimation={inOutAnimation} />,
    <ThankYouAds key="11" inOutAnimation={inOutAnimation} />,
    <ThankYou key="12" inOutAnimation={inOutAnimation} />,
  ];

  const stepsArrayTest = [
    <WaitStep key="10" inOutAnimation={inOutAnimation} />,
    <StorePromise
      key="4"
      inOutAnimation={inOutAnimation}
      isLoading={isLoading}
      onSubmit={submitStorePromise}
    />,
    <AutosubmitFetchAndWait
      key="6"
      inOutAnimation={inOutAnimation}
      isLoading={isLoading}
      onSubmit={submitFetchAndWait}
    />,

    <AutosubmitShowFetchedData
      key="7"
      inOutAnimation={inOutAnimation}
      isLoading={isLoading}
      onSubmit={submitWaitForPromise}
    />,
    <WaitForPromise key="8" inOutAnimation={inOutAnimation} />,
    <Name
      key="9"
      inOutAnimation={inOutAnimation}
      isLoading={isLoading}
      onSubmit={submitLastQuestion}
    />,
    <ThankYouAds key="11" inOutAnimation={inOutAnimation} />,
    <ThankYou key="12" inOutAnimation={inOutAnimation} />,
  ];

  return stepsArray[realStepIndex];
}

export const STEP_INDEXES = {
  NAME: 9,
  LAST_USER: 9,
  TYADS: 11,
  LAST_REAL: 12,
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
} as const;

type StepValue = (typeof STEPS)[keyof typeof STEPS];
type StepKey = keyof typeof STEPS;

export function CurrentStepV2() {
  const {realStepIndex} = useFunnelStore() as {
    realStepIndex: StepValue;
  };

  const {
    startTimer,
    isLoading,
    submitQuestion,
    submitFetchAndWait,
    submitRepeat,
    submitStorePromise,
    submitWaitForPromise,
    submitLastQuestion,
  } = useSubmit();

  switch (realStepIndex) {
    case STEPS.Step0:
      return <Name isLoading={isLoading} onChange={startTimer} onSubmit={submitQuestion} />;

    case STEPS.Step1:
      return <Optional isLoading={isLoading} onSubmit={submitQuestion} />;

    case STEPS.Step2:
      return <Repeat isLoading={isLoading} onSubmit={submitRepeat} />;

    case STEPS.Step3:
      return <StorePromise isLoading={isLoading} onSubmit={submitStorePromise} />;

    case STEPS.Step4:
      return <Autosubmit isLoading={isLoading} onSubmit={submitQuestion} />;

    case STEPS.Step5:
      return <AutosubmitFetchAndWait isLoading={isLoading} onSubmit={submitFetchAndWait} />;

    case STEPS.Step6:
      return <AutosubmitShowFetchedData isLoading={isLoading} onSubmit={submitWaitForPromise} />;

    case STEPS.Step7:
      return <WaitForPromise />;

    case STEPS.Step8:
      return <Name isLoading={isLoading} onSubmit={submitLastQuestion} />;

    case STEPS.Step9:
      return <WaitStep />;

    case STEPS.Step10:
      return <ThankYouAds />;

    case STEPS.Step11:
      return <ThankYou />;

    default: {
      const _exhaustiveCheck: never = userStepIndex;

      return _exhaustiveCheck;
    }
  }
}
