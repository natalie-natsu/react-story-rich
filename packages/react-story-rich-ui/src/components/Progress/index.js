import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import LinearProgress from '@material-ui/core/LinearProgress';

const INTERVAL = 200;
const COMPLETED = 100;

const Progress = forwardRef(({ timeout, enabled }, ref) => {
  const [completed, setCompleted] = useState(enabled ? 0 : COMPLETED);
  const [timer, setTimer] = useState(null);

  const diff = useMemo(() => COMPLETED / (timeout / INTERVAL), [timeout]);

  useEffect(() => {
    const mustStart = !timer && completed === 0 && enabled;
    const mustEnd = !!timer && (completed === COMPLETED || !enabled);

    if (mustStart) {
      setCompleted(0);
      setTimer(setInterval(() => {
        setCompleted((oldCompleted) => Math.min(oldCompleted + diff, COMPLETED));
      }, INTERVAL));
    }

    if (mustEnd) {
      clearInterval(timer);
      setCompleted(COMPLETED);
      setTimer(null);
    }
  }, [completed, diff, enabled, timer]);

  useEffect(() => () => clearInterval(timer), [timer]);

  return <LinearProgress ref={ref} variant="determinate" value={completed} />;
});

Progress.propTypes = {
  /**
   * A Flag for indicating if the Element is currently active
   */
  enabled: PropTypes.bool.isRequired,
  /**
   * The delay *onTimeout* will be waiting before being triggered.
   */
  timeout: PropTypes.number.isRequired,
};

export default Progress;
