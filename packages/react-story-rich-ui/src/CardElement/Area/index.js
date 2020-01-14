import React, { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';

import isFunction from 'lodash/isFunction';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  cardContent: {
    '&:last-child': {
      padding: theme.spacing(2),
    },
  },
}));

const Area = ({ children, enabled, media, onTap, readOnly, text, textProps, ...rest }) => {
  const classes = useStyles();

  const Component = useMemo(() => {
    if (enabled && isFunction(onTap) && !readOnly) { return CardActionArea; }

    return Fragment;
  }, [enabled, onTap, readOnly]);

  return (
    <Component {...rest}>
      {media && <CardMedia {...media} />}
      <CardContent className={classes.cardContent}>
        {text ? <Typography {...textProps}>{children}</Typography> : children}
      </CardContent>
    </Component>
  );
};

Area.propTypes = {
  /**
   * Your own content displayed in a CardContent component
   * @see {@link https://material-ui.com/components/cards/#card | MUI Card demo}
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   */
  enabled: PropTypes.bool.isRequired,
  /**
   * Object of Material UI CardMedia props
   * @see {@link https://material-ui.com/api/card-media/#cardmedia-api | MUI CardMedia API}
   */
  media: PropTypes.object,
  /**
   * Callback triggered when Element is enabled and is clicked or key pressed.
   */
  onTap: PropTypes.func,
  /**
   * If set to true, the enabled Element cannot be "tapped" but *onTimeout* can still be called.
   * Useful if you want to wait for an audio to finish before making tapping possible.
   */
  readOnly: PropTypes.bool,
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

Area.defaultProps = {
  media: null,
  onTap: undefined,
  readOnly: false,
  text: false,
  textProps: {},
};

export default Area;
