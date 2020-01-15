import React, { forwardRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import toElement, { getElementInjectedProps } from './toElement';

const Element = forwardRef((props, ref) => {
  const { component, enabled, onEnable, onTimeout, onTap, readOnly, timeout, ...rest } = props;
  const injectedProps = getElementInjectedProps(props);

  // Basic Mounting/Enable Effect
  // We need to listen "enabled" in case of REWIND_TO action in history
  useEffect(() => {
    if (enabled) { onEnable(injectedProps, rest); }
  }, [enabled, injectedProps, onEnable, rest]);

  // Timeout Effect
  useEffect(() => {
    let currentTimeout = null;

    if (enabled === true) {
      currentTimeout = setTimeout(
        () => onTimeout(injectedProps, rest),
        timeout + 500,
      );
    } else { clearTimeout(currentTimeout); }

    return () => clearTimeout(currentTimeout);

    // Disabling this rule here because it's way more digest like this
    // We know that it's need to be effected only when enabled prop is changing
    // and no matters [onTimeout, injectedProps, rest, timeout]
    // because they're not supposed to change are if they do,
    // it's not supposed to affect the timeout

    // If you want to modify the onTimeout prop after setTimeout is called,
    // please write your own logic in a Custom component.

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  const handleTap = useCallback((e) => {
    if (enabled && !readOnly && onTap !== null) { onTap(injectedProps, rest, e); }
  }, [enabled, injectedProps, onTap, readOnly, rest]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') { handleTap(e); }
  }, [handleTap]);

  return (
    <component
      disabled={!enabled}
      onClick={handleTap}
      onKeyPress={handleKeyPress}
      ref={ref}
      {...rest}
    />
  );
});

Element.propTypes = {
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  enabled: PropTypes.bool.isRequired,
  /**
   * Callback triggered when Element is enabled by the Story.
   */
  onEnable: PropTypes.func,
  /**
   * Callback triggered when Element is enabled and is clicked or key pressed.
   */
  onTap: PropTypes.func,
  /**
   * Callback triggered when Element is enabled and the timeout delay is reached.
   */
  onTimeout: PropTypes.func,
  /**
   * If set to true, the enabled Element cannot be "tapped" but *onTimeout* can still be called.
   * Useful if you want to wait for an audio to finish before making tapping possible.
   *
   * Note that a component with a noop onTap is considered as readOnly: true
   */
  readOnly: PropTypes.bool,
  /**
   * The delay *onTimeout* will be waiting before being triggered.
   */
  timeout: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
};

Element.defaultProps = {
  component: 'div',
  onEnable: noop,
  onTap: null,
  onTimeout: noop,
  readOnly: false,
  timeout: 0,
};

export default toElement()(Element);
