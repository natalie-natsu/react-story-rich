import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

import { Element, toElement } from '@react-story-rich/core';
import useEnabled from '@react-story-rich/core/hooks/useEnabled';
import useProps from '@react-story-rich/core/hooks/useProps';
import useTap from '@react-story-rich/core/hooks/useTap';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import useArea from '../hooks/useArea';
import useActions from '../hooks/useActions';
import useProgress from '../hooks/useProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    '&:last-child': {
      padding: theme.spacing(2),
    },
  },
}));

const CardElement = forwardRef((props, ref) => {
  const classes = useStyles();

  const [injectedProps, extraProps, passThroughProps] = useProps(props, this.propTypes);
  const [handleTap, handleKeyPress] = useTap(injectedProps, extraProps);

  const Area = useArea(injectedProps, extraProps);
  const [hasActions, Actions] = useActions(injectedProps, extraProps);
  const [hasProgress, Progress] = useProgress(injectedProps, extraProps);

  useEnabled(injectedProps, extraProps);

  return (
    <Card
      ref={ref}
      className={classes.root}
      onClick={handleTap}
      onKeyPress={handleKeyPress}
      tabIndex={tabIndex}
      {...passThroughProps}
    >
      <Area>
        {media && <CardMedia {...media} />}
        <CardContent className={classes.cardContent}>
          {text ? <Typography {...textProps}>{children}</Typography> : children}
        </CardContent>
      </Area>
      {hasActions && <CardActions>{Actions}</CardActions>}
      {hasProgress && Progress}
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
   * Object of Material UI CardActionArea props
   * @see {@link https://material-ui.com/api/card-action-area/#cardactionarea-api | MUI CardActionArea API}
   */
  cardActionAreaProps: PropTypes.object,
  /**
   * Object of Material UI CardActionArea props
   * @see {@link https://material-ui.com/api/card-actions/#cardactions-api | MUI CardAction API}
   */
  cardActionsProps: PropTypes.object,
  /**
   * Object of Material UI CardActionArea props
   * @see {@link https://material-ui.com/api/card/#card-api | MUI Card API}
   */
  cardProps: PropTypes.object,
  /**
   * Your own content displayed in a CardContent component
   * @see {@link https://material-ui.com/components/cards/#card | MUI Card demo}
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   */
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
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
   * @ignore
   */
  tabIndex: PropTypes.number,
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
  ...Element.defaultProps,
  actions: [],
  cardActionAreaProps: {},
  cardActionsProps: {},
  cardProps: {},
  media: null,
  progressProps: {},
  text: false,
  textProps: {},
};

export default toElement()(CardElement);
