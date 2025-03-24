/* eslint-disable no-console */
import {useState} from "react";
import {type FieldValues} from "react-hook-form";

import {useFunctionGate} from "./use-function-gate";

import {fakeApi, type RandomValueResponse} from "@/helpers/fake-api";
import {type StepPayload, useFunnelStore} from "@/contexts/use-funnel-store";
import {STEP_INDEXES} from "@/components/funnel/current-step";
import {type AnimationDirection, useAnimationStore} from "@/contexts/use-animation-store";
import {COUNT_DOWN_TIME} from "@/components/funnel-steps/wait";
import {useEventsStore} from "@/contexts/use-events-store";

export function useSubmit() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [randomValuePromise, setRandomValuePromise] = useState<Promise<RandomValueResponse> | null>(
    null,
  );

  const {
    setFunnelData,
    setHiddenData,
    setRealStepIndex,
    setUserStepIndex,
    randomValue,
    resetFunnel,
  } = useFunnelStore();
  const {resetEvents} = useEventsStore();

  const {triggerExitEnterAnimation} = useAnimationStore();
  const {oneTimePass, allowNextPass, notAllowedToPass} = useFunctionGate();

  async function handleSubmit(
    callbackBeforeAnimation?: (() => Promise<void> | void) | null,
    callbackAfterAnimation?: (() => Promise<void> | void) | null,
    showLoading?: boolean,
    toRealStep?: StepPayload,
    notUserStep?: boolean,
    toUserStep?: StepPayload,
    animationDirection?: AnimationDirection,
  ) {
    if (!oneTimePass()) return;
    if (showLoading) setIsLoading(true);

    if (callbackBeforeAnimation) await callbackBeforeAnimation();

    triggerExitEnterAnimation(async () => {
      window.scrollTo({top: 0, behavior: "smooth"});

      if (toRealStep === undefined) {
        setRealStepIndex();
        if (!notUserStep) setUserStepIndex();
      } else {
        setRealStepIndex(toRealStep);
        if (!notUserStep) setUserStepIndex(toUserStep !== undefined ? toUserStep : toRealStep);
      }

      if (showLoading) setIsLoading(false);

      allowNextPass();

      if (callbackAfterAnimation) await callbackAfterAnimation();
    }, animationDirection);
  }

  function submitQuestion(dataUpdated: FieldValues) {
    handleSubmit(undefined, () => setFunnelData(dataUpdated));
  }

  function submitJump(
    dataUpdated: FieldValues,
    toRealStep?: StepPayload,
    toUserStep?: StepPayload,
    animationDirection?: AnimationDirection,
  ) {
    handleSubmit(
      undefined,
      () => setFunnelData(dataUpdated),
      undefined,
      toRealStep,
      undefined,
      toUserStep,
      animationDirection,
    );
  }

  function submitBack() {
    //! VOLVER A VER setFunnelData no es type safe, se puede pasar cualquier cosa
    handleSubmit(
      undefined,
      () => setFunnelData({back: true}),
      undefined,
      "-1",
      undefined,
      undefined,
      "down",
    );
  }

  function submitRepeat(dataUpdated: FieldValues) {
    //! VOLVER A VER dataUpdated no es type safe
    if (dataUpdated?.repeat === "true") {
      handleSubmit(
        undefined,
        () => setFunnelData(dataUpdated),
        undefined,
        1,
        undefined,
        undefined,
        "left",
      );
    } else {
      handleSubmit(undefined, () => setFunnelData(dataUpdated));
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
    handleSubmit(undefined, () => setFunnelData(dataUpdated));

    (async () => {
      try {
        if (!randomValuePromise) return;

        const promiseResolved = await randomValuePromise;

        if (promiseResolved?.data) setHiddenData({randomValue: promiseResolved.data});

        triggerExitEnterAnimation(() => setRealStepIndex());
      } catch (error) {
        console.log(error);

        triggerExitEnterAnimation(() => setRealStepIndex(STEP_INDEXES.NAME));
      }
    })();
  }

  async function submitLastQuestion(dataUpdated: FieldValues) {
    handleSubmit(undefined, () => setFunnelData(dataUpdated));

    await handleSubmit(
      async () => {
        try {
          await fakeApi.getFakeApiData(COUNT_DOWN_TIME * 1000);
        } catch (error) {
          console.log(error);
        }
      },
      undefined,
      undefined,
      randomValue >= 3 ? STEP_INDEXES.SHOW_REPO : STEP_INDEXES.DONT_SHOW_REPO,
      true,
    );
  }

  function submitRestart() {
    handleSubmit(
      undefined,
      () => {
        resetFunnel();
        resetEvents();
      },
      undefined,
      undefined,
      undefined,
      undefined,
      "left",
    );
  }

  return {
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
  };
}
