import React, { useCallback, useEffect, useMemo, useState } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

const INTERVAL = 200;
const COMPLETED = 100;

const useProgress = (injectedProps, extraProps, interval = INTERVAL) => {
  const { enabled } = injectedProps;
  const { onTimeout, timeout } = extraProps;

  const [completed, setCompleted] = useState(enabled ? 0 : COMPLETED);
  const [timer, setTimer] = useState(null);

  const diff = useMemo(() => COMPLETED / (timeout / interval), [interval, timeout]);
  const progress = useCallback(() => {
    setCompleted((oldCompleted) => Math.min(oldCompleted + diff, COMPLETED));
  }, [diff]);

  useEffect(() => {
    const mustEnd = timer && (completed === COMPLETED || !enabled);
    const mustStart = !timer && completed === 0 && enabled;

    if (mustEnd) {
      setCompleted(COMPLETED);
      setTimer(null);

      if (completed === COMPLETED && onTimeout) {
        onTimeout(injectedProps, extraProps);
      }

      return clearInterval(timer);
    }

    if (mustStart) {
      setTimer(setInterval(progress, INTERVAL));
      setCompleted(0);
    }

    return () => { clearInterval(timer); };
  }, [completed, enabled, extraProps, injectedProps, onTimeout, progress, timer]);

  const Progress = useMemo(
    () => <LinearProgress variant="determinate" value={completed} />,
    [completed],
  );

  return [Progress, completed, timer];
};

export default useProgress;
