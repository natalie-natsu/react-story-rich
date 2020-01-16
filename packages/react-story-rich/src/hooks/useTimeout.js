import { useEffect } from 'react';

const useTimeout = (injectedProps, extraProps) => useEffect(() => {
  let currentTimeout = null;
  const { enabled } = injectedProps;
  const { onTimeout, timeout } = extraProps;

  if (enabled === true) {
    currentTimeout = setTimeout(
      () => onTimeout(injectedProps, extraProps),
      timeout + 500,
    );
  } else { clearTimeout(currentTimeout); }

  return () => clearTimeout(currentTimeout);

  // Only enabled is needed as dep
  // This will not be effected
  // if injectedProps and extraProps change (extraProps.enabled of course)

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [extraProps.enabled]);

export default useTimeout;
