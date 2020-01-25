import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import isEmpty from 'lodash/isEmpty';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import useTap from '@react-story-rich/core/hooks/useTap';
import useFocus from '@react-story-rich/core/hooks/useFocus';

const fontSpacings = {
  inherit: undefined,
  small: 2,
  medium: 3,
  large: 4,
  xl: 5,
};

const useStyles = makeStyles((theme) => ({
  root: ({ fontFamily, fontSize }) => ({
    marginBottom: theme.spacing(2),
    fontSize: theme.spacing(fontSpacings[fontSize]),
    '&.useFont': { fontFamily },
  }),
}));

const ButtonElement = forwardRef(({
  children,
  className,
  fontFamily,
  fontSize,
  onTap,
  readOnly,
  injected,
  ...passThroughProps
}, ref) => {
  const classes = useStyles({ fontFamily, fontSize });

  const elementRef = useRef(null);
  const [handleTap, handleKeyPress] = useTap(onTap, readOnly, injected);

  useImperativeHandle(ref, () => ({ focus: elementRef.current.focus }));

  useFocus(elementRef, injected);

  return (
    <Button
      className={clsx(classes.root, className, { useFont: !isEmpty(fontFamily) })}
      disabled={!injected.enabled}
      fullWidth
      onClick={handleTap}
      onKeyPress={handleKeyPress}
      ref={elementRef}
      variant="outlined"
      {...passThroughProps}
    >
      {children}
    </Button>
  );
});

ButtonElement.propTypes = {
  /**
   * Your own content displayed in a CardContent component
   * @see {@link https://material-ui.com/components/cards/#card | MUI Card demo}
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * A special font family to use
   */
  fontFamily: PropTypes.string,
  /**
   * The size of the font
   */
  fontSize: PropTypes.oneOf(['inherit', 'small', 'medium', 'large', 'xl']),
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
  /**
   * If set to true, the enabled Element cannot be "tapped" but *onTimeout* can still be called.
   * Useful if you want to wait for an audio to finish before making tapping possible.
   *
   * Note that a component with a noop onTap is considered as readOnly: true
   */
  readOnly: PropTypes.bool,
};

ButtonElement.defaultProps = {
  className: '',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  onTap: null,
  readOnly: false,
};

export default ButtonElement;
