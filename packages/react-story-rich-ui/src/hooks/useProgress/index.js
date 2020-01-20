import { useMemo } from 'react';

const useProgress = (onTimeout, timeout, { enabled }, hasActions) => useMemo(() => (
  !!timeout && hasActions && enabled
), [enabled, hasActions, timeout]);

export default useProgress;
