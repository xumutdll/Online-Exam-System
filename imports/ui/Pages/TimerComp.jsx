import React, { useState, useEffect } from "react";
import { Timer, Time, TimerOptions } from "timer-node";
import moment from "moment/moment";
import { useFetcher } from "react-router-dom";

export const TimerComp = ({ examDuration, startTime, stop }) => {
  const [timerState, setTimerState] = useState(() => "");
  if (startTime) {
  }
  const timer = new Timer({
    label: "test-timer",
    startTimestamp: startTime,
  });

  useEffect(() => {
    if (stop) {
      clearInterval(clock);
    }
  }, [stop]);

  useEffect(() => {
    clock = setInterval(() => {
      setTimerState(moment(examDuration * 60000 - timer.ms()).format("mm:ss"));
    }, 1000);
  }, []);

  return ` ${timerState}`;
};
