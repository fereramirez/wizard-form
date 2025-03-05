import {useCallback, useRef, useState} from "react";

export const useTimer = () => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const timerStarted = useRef(false);

  const startTimer = useCallback(() => {
    if (!timerStarted.current) {
      setStartTime(Date.now());
      timerStarted.current = true;
    }
  }, []);

  const stopAndGetElapsedTime = useCallback(() => {
    if (timerStarted.current && startTime) {
      return (Date.now() - startTime) / 1000;
    }

    return 0;
  }, [startTime]);

  const stopTimer = useCallback(() => {
    if (timerStarted.current) {
      setEndTime(Date.now());
    }
  }, []);

  const getElapsedTime = useCallback(() => {
    if (startTime && endTime) {
      return (endTime - startTime) / 1000;
    }

    return 0;
  }, [startTime, endTime]);

  return {startTimer, stopAndGetElapsedTime, stopTimer, getElapsedTime};
};
