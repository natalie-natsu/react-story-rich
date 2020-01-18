import { useEffect } from 'react';

const useEnabled = (onEnable, { enabled, nav }) => useEffect(() => {
  if (enabled) { onEnable(nav); }
}, [enabled, nav, onEnable]);

export default useEnabled;
