import React, { forwardRef, Fragment, useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import isFunction from '../helpers/isFunction';

const INTERVAL = 200;
const PROGRESS_COMPLETED_VALUE = 100;

function LinearDeterminate({ enabled, timeout }) {
  const diff = useMemo(() => PROGRESS_COMPLETED_VALUE / (timeout / INTERVAL), [timeout]);

  const [completed, setCompleted] = React.useState(enabled ? 0 : PROGRESS_COMPLETED_VALUE);
  const [timer, setTimer] = React.useState();

  const progress = useCallback(() => {
    setCompleted((oldCompleted) => Math.min(oldCompleted + diff, PROGRESS_COMPLETED_VALUE));
  }, [diff]);

  useEffect(() => {
    if (!timer) { setTimer(setInterval(progress, INTERVAL)); }

    return () => { clearInterval(timer); };
  }, [progress, timer]);

  useEffect(() => {
    if (completed === PROGRESS_COMPLETED_VALUE) { clearInterval(timer); }
  }, [completed, timer]);

  useEffect(() => {
    setCompleted(enabled ? 0 : PROGRESS_COMPLETED_VALUE);
  }, [enabled]);

  return <LinearProgress variant="determinate" value={completed} />;
}

LinearDeterminate.propTypes = {
  enabled: PropTypes.bool.isRequired,
  timeout: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    '&:last-child': {
      padding: theme.spacing(2),
    },
  },
}));

/**
 * `import Element from '@react-story-rich/ui/CardElement';`
 *
 * Use Material UI card component to display a beautiful Element adapted to react-story-rich usage.
 * @type {React.ForwardRefExoticComponent<React.PropsWithoutRef<{}> & React.RefAttributes<unknown>>}
 */
const CardElement = forwardRef((props, ref) => {
  const {
    actions,
    children,
    forwardProps,
    media,
    progressProps,
    qte,
    text,
    textProps,
    ...rest
  } = props;

  const {
    dispatch,
    elementNumber,
    enabled,
    onTap,
    readOnly,
    timeout,
  } = forwardProps;

  const classes = useStyles();

  const qteTimeout = useMemo(
    () => (isFunction(timeout) ? timeout(props) : timeout),
    [props, timeout],
  );

  const handleActionClick = useCallback((onClick) => (e) => {
    if (isFunction(onClick)) { onClick(dispatch, props, e); }
  }, [dispatch, props]);

  const Area = useMemo(() => {
    if (enabled && isFunction(onTap) && !readOnly) { return CardActionArea; }

    return Fragment;
  }, [enabled, onTap, readOnly]);

  return (
    <Card ref={ref} className={classes.card} {...rest}>
      <Area>
        {media && <CardMedia {...media} />}
        <CardContent className={classes.cardContent}>
          {text ? (
            <Typography {...textProps}>
              {children}
            </Typography>
          ) : children}
        </CardContent>
      </Area>
      {actions.length > 0 && (
        <CardActions>
          {actions.map(({ onClick, ...actionRest }, i) => (
            <Button
              key={`element-${elementNumber}-action-${i}`}
              color="primary"
              onClick={handleActionClick(onClick)}
              onKeyPress={handleActionClick(onClick)}
              disabled={!enabled}
              {...actionRest}
            />
          ))}
        </CardActions>
      )}
      {qte ? <LinearDeterminate timeout={qteTimeout} enabled={enabled} /> : null}
    </Card>
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
   * @ignore
   */
  forwardProps: PropTypes.shape({
    dispatch: PropTypes.func,
    elementNumber: PropTypes.number,
    enabled: PropTypes.bool,
    onTap: PropTypes.func,
    readOnly: PropTypes.bool,
    timeout: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  }),
  /**
   * Object of Material UI CardMedia props
   * @see {@link https://material-ui.com/api/card-media/#cardmedia-api | MUI CardMedia API}
   */
  media: PropTypes.object,
  /**
   * Object of Material UI LinearProgress props
   * @see {@link https://material-ui.com/api/linear-progress/#linearprogress-api | MUI LinearProgress API}
   */
  progressProps: PropTypes.object,
  /**
   * If true, display a LinearDeterminateProgress component using timeout props as reference
   */
  qte: PropTypes.bool,
  /**
   * If true, will render children directly in a Material UI Typography component
   */
  text: PropTypes.bool,
  /**
   * Object of Material UI Typography props
   * @see {@link https://material-ui.com/api/typography/#typography-api | MUI Typography API}
   */
  textProps: PropTypes.object,
};

CardElement.defaultProps = {
  actions: [],
  forwardProps: {},
  media: null,
  progressProps: {},
  qte: false,
  text: false,
  textProps: {},
};

export default CardElement;
