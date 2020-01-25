/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';

import useTap from '../../../hooks/useTap';
import useFocus from '../../../hooks/useFocus';

const BreakElement = forwardRef(({ onTap, injected, ...passThroughProps }, ref) => {
  const elementRef = useRef(null);
  const [handleTap, handleKeyPress] = useTap(onTap, false, injected);

  useImperativeHandle(ref, () => ({ focus: elementRef.current.focus }));

  useFocus(elementRef, injected);

  return (
    <hr
      disabled={!injected.enabled}
      onClick={handleTap}
      onKeyPress={handleKeyPress}
      ref={elementRef}
      role="button"
      {...passThroughProps}
    />
  );
});

BreakElement.propTypes = {
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
    nav: PropTypes.object.isRequired,
  }).isRequired,
  /**
   * Callback triggered when Element is enabled and is clicked or key pressed.
   */
  onTap: PropTypes.func,
};

BreakElement.defaultProps = {
  onTap: null,
};

export default BreakElement;
