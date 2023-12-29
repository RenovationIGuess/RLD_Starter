import { useState, useEffect, useRef } from 'react';
import { getRemainingTimeStringNoDiff } from '~/utils/time';

const Timer = ({
  countdownTimestampMs,
  handleSaveContent,
  stopInterval,
  setStopInterval,
  setTimerStarted,
}) => {
  const [timer, setTimer] = useState(countdownTimestampMs);
  const [remainingTime, setRemainingTime] = useState(
    getRemainingTimeStringNoDiff(countdownTimestampMs)
  );
  const tick = useRef();

  useEffect(() => {
    if (!stopInterval) {
      tick.current = setInterval(() => {
        setTimer((timer) => timer - 1000);
      }, 1000);
    } else {
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [countdownTimestampMs, stopInterval]);

  useEffect(() => {
    setRemainingTime(getRemainingTimeStringNoDiff(timer));
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      handleSaveContent();
      setTimerStarted(false);
      setStopInterval(true);
      clearInterval(tick.current);
    }
  }, [timer]);

  useEffect(() => {
    setTimer(countdownTimestampMs);
    setRemainingTime(getRemainingTimeStringNoDiff(countdownTimestampMs));
  }, [countdownTimestampMs]);

  return (
    <span className="timer-count">
      {remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}{' '}
      until next save
    </span>
  );
};

export default Timer;
