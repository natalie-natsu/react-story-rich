import { useCallback } from 'react';

const useTap = (onTap, readOnly, { enabled, nav }) => {
  const handleTap = useCallback((event) => {
    if (enabled && !readOnly && onTap !== null) {
      onTap(nav, event);
    }
  }, [enabled, nav, onTap, readOnly]);

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleTap(event);
    }
  }, [handleTap]);

  return [handleTap, handleKeyPress];
};

export default useTap;
