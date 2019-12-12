import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import noop from '../../helpers/noop';
import omit from '../../helpers/omit';
import debounce from '../../helpers/debounce';

/**
 * `import Element from '@react-story-rich/core/components/Element';`
 * @param props
 * @return {*}
 * @constructor
 */
function Element(props) {
  const {
    autoFocus,
    component: Component,
    elementNumber,
    enabled,
    locations,
    onEnable,
    onTap,
    onTimeout,
    readOnly,
    timeout,
    ...other
  } = props;

  const ref = useRef(null);

  const handleEnable = useCallback(() => {
    if (ref && ref.current && autoFocus) { ref.current.focus(); }
    onEnable(props);
  }, [onEnable, autoFocus, props]);

  const handleTimeout = useCallback(() => {
    const wait = typeof timeout === 'function' ? timeout(props) : timeout;

    if (wait) {
      const callback = () => onTimeout(props);
      const debounced = debounce(callback, wait);

      debounced();

      return debounced.clear;
    }

    return noop;
  }, [onTimeout, props, timeout]);

  const handleTap = useCallback((e) => {
    if (enabled && onTap && !readOnly) { onTap(props, e); }
  }, [enabled, onTap, props, readOnly]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') { handleTap(e); }
  }, [handleTap]);

  useEffect(handleEnable, [enabled]);
  useEffect(handleTimeout, []);

  return (
    <Component
      autoFocus={autoFocus}
      data-element-number={elementNumber}
      onClick={handleTap}
      onKeyPress={handleKeyPress}
      readOnly={readOnly}
      ref={ref}
      {...omit(['data', 'dispatch', 'history', 'location'], other)}
    />
  );
}

Element.propTypes = {
  /**
   * If set to false, component will not be focused when being enabled.
   */
  autoFocus: PropTypes.bool,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  elementNumber: PropTypes.number,
  /**
   * @ignore
   */
  enabled: PropTypes.bool,
  /**
   * @ignore
   */
  locations: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
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
   */
  readOnly: PropTypes.bool,
  /**
   * The delay *onTimeout* will be waiting before being triggered.
   */
  timeout: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
};

Element.defaultProps = {
  autoFocus: false,
  component: 'div',
  elementNumber: undefined, // via useElements
  enabled: false, // via useElements
  locations: [], // via useElements
  onEnable: noop,
  onTap: undefined,
  onTimeout: noop,
  readOnly: false,
  timeout: 0,
};

export default Element;
