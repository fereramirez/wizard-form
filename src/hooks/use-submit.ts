/* eslint-disable no-console */
import {useCallback, useState} from "react";
import {type FieldValues} from "react-hook-form";

import {useTimer} from "./use-timer";

import {fakeApi, type RandomValueResponse} from "@/helpers/fake-api";
import {useFunnelStore} from "@/contexts/use-funnel-store";
import {STEP_INDEXES} from "@/components/funnel/current-step";
import {useInoutAnimation} from "@/hooks/use-animate";

function useFunctionGate() {
  const [allowed, setAllowed] = useState<boolean>(true);

  const isNotAllowed = useCallback(() => {
    if (!allowed) return true;

    setAllowed(false);

    return false;
  }, [allowed]);

  const allowToContinue = useCallback(() => {
    setAllowed(true);
  }, []);

  return {isNotAllowed, allowToContinue};
}

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
  } = useFunnelStore();

  const {startTimer, stopAndGetElapsedTime} = useTimer();
  const {triggerInOutAnimation, inOutAnimation} = useInoutAnimation();
  const {isNotAllowed, allowToContinue} = useFunctionGate();

  const handleNextStep = useCallback(
    (toStep?: number | "next", showLoading?: boolean) => {
      if (toStep === undefined || toStep === "next") {
        setRealStepIndex();
        setUserStepIndex();
      } else {
        setRealStepIndex(toStep);
        setUserStepIndex(toStep);
      }

      if (showLoading) setIsLoading(false);

      allowToContinue();
    },
    [allowToContinue, setRealStepIndex, setUserStepIndex],
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
    callbackStart: () => Promise<void> | void,
    showLoading?: boolean,
    toStep?: number | "next",
    skipAnimation?: boolean,
  ) {
    if (isNotAllowed()) return;
    if (showLoading) setIsLoading(true);

    await callbackStart();

    if (skipAnimation) {
      handleNextStep(toStep, showLoading);
    } else {
      triggerInOutAnimation(() => handleNextStep(toStep, showLoading));
    }
  }

  function submitQuestion(dataUpdated: FieldValues) {
    handleSubmit(() => {
      setFunnelData(dataUpdated);
    });
  }

  function submitRepeat(dataUpdated: FieldValues) {
    if (dataUpdated?.repeat === "true") {
      handleSubmit(
        () => {
          setFunnelData(dataUpdated);
        },
        false,
        1,
      );
    } else {
      handleSubmit(() => {
        setFunnelData(dataUpdated);
      });
    }
  }

  function submitStorePromise(dataUpdated: FieldValues) {
    handleSubmit(() => {
      try {
        setFunnelData(dataUpdated);

        const promise = fakeApi.getRandomValue(30 * 1000);

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

        const {data} = await fakeApi.getFakeApiData(2 * 1000);

        setHiddenData({fakeApiData: data});
      } catch (error) {
        console.log(error);

        setHiddenData({fakeApiData: []});
      }
    }, true);
  }

  function submitWaitForPromise(dataUpdated: FieldValues) {
    handleSubmit(() => {
      setFunnelData(dataUpdated);
    });

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
    handleSubmit(() => {
      setFunnelData(dataUpdated);
    });

    (async () => {
      try {
        const fillTime = stopAndGetElapsedTime();

        const dataToDispatch = {
          ...funnelState,
          ...dataUpdated,
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

  return {
    startTimer,
    isLoading,
    inOutAnimation,
    submitQuestion,
    submitFetchAndWait,
    submitRepeat,
    submitStorePromise,
    submitWaitForPromise,
    submitLastQuestion,
  };
}
