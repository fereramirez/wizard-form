/* eslint-disable no-console */
import {useCallback, useState} from "react";
import {type FieldValues} from "react-hook-form";

import {useTimer} from "./use-timer";

import {fakeApi, type RandomValueResponse} from "@/helpers/fake-api";
import {useFunnelStore} from "@/contexts/use-funnel-store";
import {STEP_INDEXES} from "@/components/funnel/current-step";
import {useInoutAnimation} from "@/hooks/use-inout-animation";

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
    (toStep?: number | "next", shouldWait?: boolean) => {
      if (toStep === undefined || toStep === "next") {
        setRealStepIndex();
        setUserStepIndex();
      } else {
        setRealStepIndex(toStep);
        setUserStepIndex(toStep);
      }

      if (shouldWait) setIsLoading(false);

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

  async function handleSubmit( //! VOLVER A VER si se estan usando todos los argumentos
    callbackStart: () => Promise<void> | void,
    shouldWait?: boolean,
    toStep?: number | "next",
    skipAnimation?: boolean,
  ) {
    if (isNotAllowed()) return;
    if (shouldWait) setIsLoading(true);

    await callbackStart();

    if (skipAnimation) {
      handleNextStep(toStep, shouldWait);
    } else {
      triggerInOutAnimation(() => handleNextStep(toStep, shouldWait));
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

/*
Este es mi codigo actualizado. Hay dos pares de funciones que deberian tener el mismo comportamiento pero no lo tienen.

1. El primer par es `submitWaitForPromise` y `submitWaitForPromiseNew`.
Lo que hace `submitWaitForPromise` originalmente es pasar al siguiente step (un step auxiliar que solo muestra un loader) y esperar en ese step a que se resuelva la promesa `randomValuePromise`. En cambio lo que hace  `submitWaitForPromiseNew` es quedarse en el step actual hasta que se resuelva la promesa `randomValuePromise`, cuando la promesa se resuelve se saltea el siguiente step (el que muestra un loader). Quiero replicar el comportamiento original de `submitWaitForPromise` pero utilizando las funciones auxiliares.

2. El segundo par es `submitLastQuestionOld` y `submitLastQuestion`.
Lo que hace `submitLastQuestion` originalmente es esperar a que se resuelva la promesa `randomValuePromise` y luego pasar al siguiente step. En cambio lo que hace  `submitLastQuestionNew` es quedarse en el step actual hasta que se resuelva la promesa `randomValuePromise`, cuando la promesa se resuelve se pasa al siguiente step. Quiero replicar el comportamiento original de `submitLastQuestion` pero utilizando las funciones auxiliares.
*/
