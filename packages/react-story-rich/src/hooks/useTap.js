import { useCallback } from 'react';

const useTap = (injectedProps, extraProps) => {
  const { enabled } = injectedProps;
  const { onTap, readOnly } = extraProps;

  const handleTap = useCallback((e) => {
    if (enabled && !readOnly && onTap !== null) { onTap(injectedProps, extraProps, e); }
  }, [enabled, extraProps, injectedProps, onTap, readOnly]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') { handleTap(e); }
  }, [handleTap]);

  return [handleTap, handleKeyPress];
};

export default useTap;
