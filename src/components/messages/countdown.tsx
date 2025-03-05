"use client";

import {useState, useEffect} from "react";

type CountdownProps = {
  initialTime?: number;
};

export function Countdown({initialTime = 5}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div aria-live="polite" className="text-4xl font-bold tabular-nums">
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
}
