import { useEffect } from 'react';

const useTimeout = (onTimeout, timeout, { enabled, nav }) => useEffect(() => {
  let currentTimeout = null;

  if (enabled === true) {
    currentTimeout = setTimeout(
      () => onTimeout(nav),
      timeout + 500,
    );
  } else { clearTimeout(currentTimeout); }

  return () => clearTimeout(currentTimeout);
}, [enabled, nav, onTimeout, timeout]);

export default useTimeout;
