import React, { useState, useEffect } from "react";
import { Timer, Time, TimerOptions } from "timer-node";
import moment from "moment/moment";

export const TimerComp = ({ examDuration, startTime, stop, timeOut }) => {
  const [timerState, setTimerState] = useState(() => "");
  if (startTime) {
  }
  const timer = new Timer({
    label: "exam-timer",
    startTimestamp: startTime,
  });

  useEffect(() => {
    if (stop) {
      clearInterval(clock);
    }
  }, [stop]);

  useEffect(() => {
    clock = setInterval(() => {
      let remainingTime = Number(examDuration) * 60000 - timer.ms();
      // setTimerState(moment(remainingTime).format("HH:mm:ss"));

      let minutes = Math.floor(remainingTime / 60000);
      let seconds = ((remainingTime % 60000) / 1000).toFixed(0);
      setTimerState(minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
      console.log(remainingTime);
      if (remainingTime <= 0) {
        clearInterval(clock);
        timeOut();
      }
    }, 1000);
  }, []);

  return ` ${timerState}`;
};
