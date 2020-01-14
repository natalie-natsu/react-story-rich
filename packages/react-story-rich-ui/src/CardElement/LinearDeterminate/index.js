import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import isFunction from 'lodash/isFunction';

import LinearProgress from '@material-ui/core/LinearProgress';

const INTERVAL = 200;
const PROGRESS_COMPLETED_VALUE = 100;

function LinearDeterminate(props) {
  const { enabled, timeout: elementTimeout, ...rest } = props;

  const timeout = useMemo(
    () => (isFunction(elementTimeout) ? elementTimeout(props) : elementTimeout),
    [props, elementTimeout],
  );

  const diff = useMemo(() => PROGRESS_COMPLETED_VALUE / (timeout / INTERVAL), [timeout]);

  const [completed, setCompleted] = useState(enabled ? 0 : PROGRESS_COMPLETED_VALUE);
  const [timer, setTimer] = useState(null);

  const progress = useCallback(() => {
    setCompleted((oldCompleted) => Math.min(oldCompleted + diff, PROGRESS_COMPLETED_VALUE));
  }, [diff]);

  useEffect(() => {
    if (!timer && enabled) {
      setTimer(setInterval(progress, INTERVAL));
      setCompleted(0);
    } else if (!enabled) {
      setCompleted(PROGRESS_COMPLETED_VALUE);
      setTimer(null);
      clearInterval(timer);
    }

    return () => { clearInterval(timer); };
  }, [progress, timer, enabled]);

  useEffect(() => {
    if (completed === PROGRESS_COMPLETED_VALUE) { clearInterval(timer); }
  }, [completed, timer]);

  return <LinearProgress {...rest} variant="determinate" value={completed} />;
}

LinearDeterminate.propTypes = {
  enabled: PropTypes.bool.isRequired,
  timeout: PropTypes.number.isRequired,
};

export default LinearDeterminate;
