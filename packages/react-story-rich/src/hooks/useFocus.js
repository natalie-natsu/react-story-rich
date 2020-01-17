import { useEffect, useRef } from 'react';

const useFocus = (ref, { autoFocus, enabled, tabIndex }) => {
  const newRef = useRef(null);
  const el = ref !== undefined ? ref : newRef;

  // TODO: fix it
  useEffect(() => {
    if (autoFocus && enabled === true && el !== null) {
      el.current.focus();
    }
  }, [autoFocus, el, enabled]);

  return [el, tabIndex];
};

export default useFocus;
