import { useEffect } from 'react';

const useFocus = (elementRef, { autoFocus, enabled }) => useEffect(() => {
  const shouldFocus = elementRef.current && autoFocus && enabled === true;

  if (shouldFocus) {
    elementRef.current.focus();
  }
}, [autoFocus, elementRef, enabled]);

export default useFocus;
