/* eslint-disable no-console */
import {useCallback, useState} from "react";
import {type FieldValues} from "react-hook-form";

import {useTimer} from "./use-timer";
import {useFunctionGate} from "./use-function-gate";

import {fakeApi, type RandomValueResponse} from "@/helpers/fake-api";
import {type RealStepPayload, useFunnelStore} from "@/contexts/use-funnel-store";
import {STEP_INDEXES} from "@/components/funnel/current-step";
import {useAnimationStore} from "@/contexts/use-animation-store";

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
    (toStep?: number) => {
      return () => {
        if (toStep !== undefined) setRealStepIndex(toStep);
        else setRealStepIndex();
      };
    },
    [setRealStepIndex],
  );

  async function handleSubmit(
    callback: () => Promise<void> | void,
    showLoading?: boolean,
    toStep?: RealStepPayload,
    skipAnimation?: boolean,
  ) {
    if (!oneTimePass()) return;
    if (showLoading) setIsLoading(true);

    if (skipAnimation) {
      handleNextStep(toStep, showLoading);

      await callback();
    } else {
      triggerInOutAnimation(async () => {
        handleNextStep(toStep, showLoading);

        await callback();
      });
    }
  }

  function submitQuestion(dataUpdated: FieldValues) {
    handleSubmit(() => setFunnelData(dataUpdated), false);
  }

  function submitJump(dataUpdated: FieldValues, toStep?: number) {
    console.log("dataUpdated", dataUpdated);
    console.log("toStep", toStep);

    handleSubmit(() => setFunnelData(dataUpdated), false, toStep);
  }

  function submitBack() {
    //! VOLVER A VER setFunnelData no es type safe, se puede pasar cualquier cosa
    handleSubmit(() => setFunnelData({back: true}), false, "-1");
  }

  function submitRepeat(dataUpdated: FieldValues) {
    //! VOLVER A VER dataUpdated no es type safe
    if (dataUpdated?.repeat === "true") {
      handleSubmit(() => setFunnelData(dataUpdated), false, 1);
    } else {
      handleSubmit(() => setFunnelData(dataUpdated));
    }
  }

  function submitStorePromise(dataUpdated: FieldValues) {
    handleSubmit(() => {
      try {
        setFunnelData(dataUpdated);

        const promise = fakeApi.getRandomValue(60 * 1000);

        setRandomValuePromise(promise);
      } catch (error) {
        console.log(error);
      }
    });
  }

  function submitFetchAndWait(dataUpdated: FieldValues) {
    handleSubmit(async () => {
      try {
        setFunnelData(dataUpdated);

        const {data} = await fakeApi.getFakeApiData(3 * 1000);

        setHiddenData({fakeApiData: data});
      } catch (error) {
        console.log(error);

        setHiddenData({fakeApiData: []});
      }
    }, true);
  }

  function submitWaitForPromise(dataUpdated: FieldValues) {
    handleSubmit(() => setFunnelData(dataUpdated));

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

  function submitLastQuestion(dataUpdated: FieldValues) {
    handleSubmit(() => setFunnelData(dataUpdated));

    (async () => {
      //! VOLVER A VER si esto se puede poner dentro de un handleSubmit
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

        await fakeApi.getFakeApiData(7 * 1000);
      } finally {
        triggerInOutAnimation(() => {
          if (randomValue > 5) setRealStepIndex(STEP_INDEXES.TYADS);
          else setRealStepIndex(STEP_INDEXES.LAST_REAL);
          setIsLoading(false);
        });
      }
    })();
  }

  function submitRestart() {
    handleSubmit(() => resetFunnel());
  }

  return {
    startTimer,
    isLoading,
    notAllowedToPass,
    inOutAnimation,
    submitQuestion,
    submitJump,
    submitBack,
    submitFetchAndWait,
    submitRepeat,
    submitStorePromise,
    submitWaitForPromise,
    submitLastQuestion,
    submitRestart,
  };
}
