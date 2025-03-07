/* eslint-disable no-console */
import {useCallback, useState} from "react";
import {type FieldValues} from "react-hook-form";

import {useTimer} from "./use-timer";
import {useFunctionGate} from "./use-function-gate";

import {fakeApi, type RandomValueResponse} from "@/helpers/fake-api";
import {type RealStepPayload, useFunnelStore} from "@/contexts/use-funnel-store";
import {STEP_INDEXES} from "@/components/funnel/current-step";
import {useAnimationStore} from "@/contexts/use-animation-store";
import {COUNT_DOWN_TIME} from "@/components/funnel-steps/wait";

export function useSubmit() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [randomValuePromise, setRandomValuePromise] = useState<Promise<RandomValueResponse> | null>(
    null,
  );
  const {
    funnelState,
    setFunnelData,
    setHiddenData,
    setRealStepIndex,
    setUserStepIndex,
    randomValue,
    resetFunnel,
  } = useFunnelStore();

  const {startTimer, stopAndGetElapsedTime} = useTimer();
  const {triggerInOutAnimation, inOutAnimation} = useAnimationStore();
  const {oneTimePass, allowNextPass, notAllowedToPass} = useFunctionGate();

  const handleNextStep = useCallback(
    (toStep?: RealStepPayload, showLoading?: boolean) => {
      if (toStep === undefined) {
        setRealStepIndex();
        setUserStepIndex();
      } else {
        setRealStepIndex(toStep);
        setUserStepIndex(toStep);
      }

      if (showLoading) setIsLoading(false);

      allowNextPass();
    },
    [allowNextPass, setRealStepIndex, setUserStepIndex],
  );

  const handleRealStepOnly = useCallback(
    (toStep?: RealStepPayload) => {
      return () => {
        if (toStep !== undefined) setRealStepIndex(toStep);
        else setRealStepIndex();
      };
    },
    [setRealStepIndex],
  );

  async function handleSubmit(
    callbackBeforeAnimation: (() => Promise<void> | void) | null,
    callbackAfterAnimation?: (() => Promise<void> | void) | null,
    showLoading?: boolean,
    toStep?: RealStepPayload,
    notUserStep?: boolean,
  ) {
    if (!oneTimePass()) return;
    if (showLoading) setIsLoading(true);

    if (callbackBeforeAnimation) await callbackBeforeAnimation();

    triggerInOutAnimation(async () => {
      if (toStep === undefined) {
        setRealStepIndex();
        if (!notUserStep) setUserStepIndex();
      } else {
        setRealStepIndex(toStep);
        if (!notUserStep) setUserStepIndex(toStep);
      }

      if (showLoading) setIsLoading(false);

      allowNextPass();

      if (callbackAfterAnimation) await callbackAfterAnimation();
    });
  }

  function submitQuestion(dataUpdated: FieldValues) {
    handleSubmit(null, () => setFunnelData(dataUpdated));
  }

  function submitJump(dataUpdated: FieldValues, toStep?: number) {
    handleSubmit(null, () => setFunnelData(dataUpdated), false, toStep);
  }

  function submitBack() {
    //! VOLVER A VER setFunnelData no es type safe, se puede pasar cualquier cosa
    handleSubmit(null, () => setFunnelData({back: true}), false, "-1");
  }

  function submitRepeat(dataUpdated: FieldValues) {
    //! VOLVER A VER dataUpdated no es type safe
    if (dataUpdated?.repeat === "true") {
      handleSubmit(null, () => setFunnelData(dataUpdated), false, 1);
    } else {
      handleSubmit(null, () => setFunnelData(dataUpdated));
    }
  }

  function submitStorePromise(dataUpdated: FieldValues) {
    handleSubmit(
      () => {
        try {
          const promise = fakeApi.getRandomValue(1 * 1000); //! VOLVER A VER cambiar a 60*1000

          setRandomValuePromise(promise);
        } catch (error) {
          console.log(error);
        }
      },
      () => setFunnelData(dataUpdated),
    );
  }

  function submitWaitFakeRequest(dataUpdated: FieldValues) {
    handleSubmit(
      async () => {
        try {
          await fakeApi.getFakeApiData(2 * 1000);
        } catch (error) {
          console.log(error);
        }
      },
      () => setFunnelData(dataUpdated),
      true,
    );
  }

  function submitFetchWaitData(dataUpdated: FieldValues) {
    handleSubmit(
      async () => {
        try {
          const {data} = await fakeApi.getFakeApiData(2 * 1000);

          setHiddenData({fakeApiData: data});
        } catch (error) {
          console.log(error);

          setHiddenData({fakeApiData: []});
        }
      },
      () => setFunnelData(dataUpdated),
      true,
    );
  }

  function submitWaitForPromise(dataUpdated: FieldValues) {
    handleSubmit(null, () => setFunnelData(dataUpdated));

    (async () => {
      try {
        if (!randomValuePromise) return;

        const promiseResolved = await randomValuePromise;

        if (promiseResolved?.data) setHiddenData({randomValue: promiseResolved.data});

        triggerInOutAnimation(() => setRealStepIndex());
      } catch (error) {
        console.log(error);

        triggerInOutAnimation(() => setRealStepIndex(STEP_INDEXES.NAME));
      }
    })();
  }

  async function submitLastQuestion(dataUpdated: FieldValues) {
    handleSubmit(null, () => setFunnelData(dataUpdated));

    await handleSubmit(
      async () => {
        try {
          const fillTime = stopAndGetElapsedTime();

          const dataToDispatch = {
            ...funnelState,
            ...dataUpdated,
            fillTime,
            userAgent: navigator.userAgent,
            purple: funnelState.optional === "purple" ? dataUpdated.purple : null,
            blue: funnelState.optional === "blue" ? dataUpdated.blue : null,
            green: funnelState.optional === "green" ? dataUpdated.green : null,
          };

          console.log(`You took ${fillTime} seconds to complete the funnel`);

          console.log(dataToDispatch);

          await fakeApi.getFakeApiData(COUNT_DOWN_TIME * 1000);
        } catch (error) {
          console.log(error);
        }
      },
      null,
      false,
      randomValue > 5 ? STEP_INDEXES.TYADS : STEP_INDEXES.TY,
      true,
    );
  }

  function submitRestart() {
    handleSubmit(null, () => resetFunnel());
  }

  return {
    startTimer,
    isLoading,
    notAllowedToPass,
    inOutAnimation,
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
  };
}
