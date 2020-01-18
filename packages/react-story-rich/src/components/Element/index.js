import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import Navigation from '../../classes/Navigation';

import useEnabled from '../../hooks/useEnabled';
import useTimeout from '../../hooks/useTimeout';
import useTap from '../../hooks/useTap';
import useFocus from '../../hooks/useFocus';
import useChunk from '../../hooks/useChunk';

const Element = forwardRef((props, ref) => {
  const {
    chunk,
    component: Component,
    injected,
    onEnable,
    onTap,
    onTimeout,
    readOnly,
    timeout,
    ...passThroughProps
  } = props;

  const elementRef = useFocus(ref, injected);
  const [handleTap, handleKeyPress] = useTap(onTap, readOnly, injected);

  useChunk(chunk, injected);
  useEnabled(onEnable, injected);
  useTimeout(onTimeout, timeout, injected);

  return (
    <Component
      onClick={handleTap}
      onKeyPress={handleKeyPress}
      ref={elementRef}
      tabIndex={injected.tabIndex}
      {...passThroughProps}
    />
  );
});

Element.propTypes = {
  /**
   * Chunk of locations to reduce the cost of navigation in big story trees.
   * For example, if you know all possible next locations to this element
   * you can use that collection to improve the search.
   *
   * Of course prefer goForward(skip) nav action for the best performance.
   */
  chunk: PropTypes.array,
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
    index: PropTypes.number.isRequired,
    /**
     * A set of navigation methods
     * @see Navigation Class description
     */
    nav: PropTypes.instanceOf(Navigation).isRequired,
    /**
     * The location of the Element in the DOM tree or (index of Element in history + 1)
     */
    tabIndex: PropTypes.number.isRequired,
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
  chunk: [],
  component: 'div',
  injected: undefined,
  onEnable: noop,
  onTap: null,
  onTimeout: noop,
  readOnly: false,
  timeout: 0,
};

export default Element;
