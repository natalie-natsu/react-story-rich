import { useEffect } from 'react';

const useEnabled = (injectedProps, extraProps) => useEffect(() => {
  const { enabled } = injectedProps;
  const { onEnable } = extraProps;

  if (enabled) {
    onEnable(injectedProps, extraProps);
  }

  // Only enabled is needed as dep
  // This will not be effected
  // if injectedProps and extraProps change (extraProps.enabled of course)

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [extraProps.enabled]);

export default useEnabled;
