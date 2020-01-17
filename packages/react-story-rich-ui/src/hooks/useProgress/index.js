import React, { useMemo } from 'react';
import useTimeout from '@react-story-rich/core/hooks/useTimeout';
import Progress from '@react-story-rich/ui/components/Progress';

const useProgress = (onTimeout, timeout, { enabled, nav }, hasActions) => {
  const hasProgress = useMemo(() => !!timeout && hasActions, [hasActions, timeout]);

  const progress = useMemo(() => (hasProgress ? (
    <Progress timeout={timeout} nav={nav} onTimeout={onTimeout} enabled={enabled} />
  ) : null), [enabled, hasProgress, nav, onTimeout, timeout]);

  useTimeout(onTimeout, timeout, { enabled: enabled && !hasProgress, nav });

  return [hasProgress, progress];
};

export default useProgress;
