import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import toElement from './toElement';

import useProps from './hooks/useProps';
import useEnabled from './hooks/useEnabled';
import useTimeout from './hooks/useTimeout';
import useTap from './hooks/useTap';

const Element = forwardRef((props, ref) => {
  console.log(props);
  const [injectedProps, extraProps, passThroughProps] = useProps(props, this.propTypes);
  const [handleTap, handleKeyPress] = useTap(injectedProps, extraProps);

  useEnabled(injectedProps, extraProps);
  useTimeout(injectedProps, extraProps);

  return (
    <component
      onClick={handleTap}
      onKeyPress={handleKeyPress}
      ref={ref}
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
