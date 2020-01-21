import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import Navigation from '../../classes/Navigation';

import useEnabled from '../../hooks/useEnabled';
import useTimeout from '../../hooks/useTimeout';
import useTap from '../../hooks/useTap';
import useFocus from '../../hooks/useFocus';

const Element = forwardRef(function Element(props, ref) {
  const {
    component: Component,
    injected,
    onEnable,
    onTap,
    onTimeout,
    readOnly,
    timeout,
    ...passThroughProps
  } = props;

  const elementRef = useRef(null);
  const [handleTap, handleKeyPress] = useTap(onTap, readOnly, injected);

  useImperativeHandle(ref, () => ({ focus: elementRef.current.focus }));

  useEnabled(onEnable, injected);
  useFocus(elementRef, injected);
  useTimeout(onTimeout, timeout, injected);

  return (
    <Component
      onClick={handleTap}
      onKeyPress={handleKeyPress}
      ref={elementRef}
      {...passThroughProps}
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
   * A set of props injected by the Story renderer
   */
  injected: PropTypes.shape({
    /**
     * If set to false, component will not be focused when being enabled.
     */
    autoFocus: PropTypes.bool.isRequired,
    /**
     * A Flag for indicating if the Element is currently active
     */
    enabled: PropTypes.bool.isRequired,
    /**
     * The location of the Element in the story tree
     */
    key: PropTypes.number.isRequired,
    /**
     * A set of navigation methods
     * @see Navigation Class description
     */
    nav: PropTypes.instanceOf(Navigation).isRequired,
  }),
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
  timeout: PropTypes.number,
};

Element.defaultProps = {
  component: 'div',
  injected: undefined,
  onEnable: noop,
  onTap: null,
  onTimeout: noop,
  readOnly: false,
  timeout: 0,
};

export default Element;
