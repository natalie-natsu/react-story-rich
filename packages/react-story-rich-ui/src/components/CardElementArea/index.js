import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}));

/**
 * Pure Component for Card rendering.
 * Useful in custom component, otherwise, prefer use CardElement component.
 *
 * @param children
 * @param component
 * @param enabled
 * @param hasActions
 * @param onTap
 * @param readOnly
 * @param rest
 * @return {*}
 * @constructor
 */
const CardElementArea = forwardRef(({
  children,
  component,
  enabled,
  hasActions,
  onTap,
  readOnly,
  ...rest
}, ref) => {
  const classes = useStyles();

  if (onTap !== null && !hasActions) {
    return (
      <Card ref={ref} component={component} classes={classes}>
        <CardActionArea {...rest} disabled={!enabled || readOnly}>
          {children}
        </CardActionArea>
      </Card>
    );
  }

  return <Card ref={ref} component={component} classes={classes} {...rest}>{children}</Card>;
});

CardElementArea.propTypes = {
  /**
   * Your own CardContent
   * @see {@link https://material-ui.com/api/card-content/#cardcontent-api| MUI CardContent API}
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   */
  component: PropTypes.elementType,
  /**
   * A Flag for indicating if the Element is currently active
   */
  enabled: PropTypes.bool.isRequired,
  /**
   * If set to true, CardElementArea will not be tap able.
   * Actions will prior onTap
   */
  hasActions: PropTypes.bool,
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

CardElementArea.defaultProps = {
  component: 'div',
  hasActions: false,
  onTap: null,
  readOnly: false,
};

export default CardElementArea;
