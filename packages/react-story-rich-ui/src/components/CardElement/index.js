import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';

import noop from 'lodash/noop';

import Navigation from '@react-story-rich/core/classes/Navigation';
import useChunk from '@react-story-rich/core/hooks/useChunk';
import useEnabled from '@react-story-rich/core/hooks/useEnabled';
import useFocus from '@react-story-rich/core/hooks/useFocus';
import useTap from '@react-story-rich/core/hooks/useTap';

import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import useActions from '../../hooks/useActions';
import useProgress from '../../hooks/useProgress';

import CardElementArea from '../CardElementArea';

const useStyles = makeStyles((theme) => ({
  cardContent: {
    '&:last-child': {
      padding: theme.spacing(2),
    },
  },
}));

const CardElement = forwardRef((props, ref) => {
  const classes = useStyles();

  const {
    actions,
    children,
    chunk,
    injected,
    media,
    onEnable,
    onTap,
    onTimeout,
    readOnly,
    text,
    typographyProps,
    timeout,
    ...passThroughProps
  } = props;

  const elementRef = useRef(null);
  const [handleTap, handleKeyPress] = useTap(onTap, readOnly, injected);
  const [hasActions, Actions] = useActions(actions, injected);
  const [hasProgress, Progress] = useProgress(onTimeout, timeout, injected, hasActions);

  useImperativeHandle(ref, () => ({ focus: elementRef.current.focus }));

  useChunk(chunk, injected);
  useEnabled(onEnable, injected);
  useFocus(elementRef, injected);

  return (
    <CardElementArea
      enabled={injected.enabled}
      hasActions={hasActions}
      onTap={onTap}
      onClick={handleTap}
      onKeyPress={handleKeyPress}
      readOnly={readOnly}
      ref={elementRef}
      tabIndex={injected.tabIndex}
      {...passThroughProps}
    >
      {media && <CardMedia {...media} />}
      <CardContent className={classes.cardContent}>
        {text ? <Typography align="center" {...typographyProps}>{children}</Typography> : children}
      </CardContent>
      {hasActions && <CardActions>{Actions}</CardActions>}
      {hasProgress && Progress}
    </CardElementArea>
  );
});

CardElement.propTypes = {
  /**
   * Array of Material UI Button props object
   * @see {@link https://material-ui.com/api/button/#button-api | MUI Button API}
   */
  actions: PropTypes.arrayOf(PropTypes.object),
  /**
   * Your own content displayed in a CardContent component
   * @see {@link https://material-ui.com/components/cards/#card | MUI Card demo}
   */
  children: PropTypes.node.isRequired,
  /**
   * Chunk of locations to reduce the cost of navigation in big story trees.
   * For example, if you know all possible next locations to this element
   * you can use that collection to improve the search.
   *
   * Of course prefer goForward(skip) nav action for the best performance.
   */
  chunk: PropTypes.array,
  /**
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
   * Object of Material UI CardMedia props
   * @see {@link https://material-ui.com/api/card-media/#cardmedia-api | MUI CardMedia API}
   */
  media: PropTypes.object,
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
   * If true, will render children directly in a Material UI Typography component
   */
  text: PropTypes.bool,
  /**
   * The delay *onTimeout* will be waiting before being triggered.
   */
  timeout: PropTypes.number,
  /**
   * Object of Material UI Typography props
   * @see {@link https://material-ui.com/api/typography/#typography-api | MUI Typography API}
   */
  typographyProps: PropTypes.object,
};

CardElement.defaultProps = {
  actions: [],
  chunk: [],
  injected: undefined,
  media: null,
  onEnable: noop,
  onTap: null,
  onTimeout: noop,
  readOnly: false,
  text: false,
  timeout: 0,
  typographyProps: {},
};

export default CardElement;
