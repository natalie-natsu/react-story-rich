import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

/**
 * Pure Component for Card rendering
 * Useful in custom component, otherwise, prefer use CardElement component
 *
 * @param children
 * @param component
 * @param enabled
 * @param onTap
 * @param readOnly
 * @param rest
 * @return {*}
 * @constructor
 */
const Area = ({ children, component, enabled, onTap, readOnly, ...rest }) => {
  if (onTap !== null) {
    return (
      <Card component={component}>
        <CardActionArea {...rest} disabled={!enabled || readOnly}>
          {children}
        </CardActionArea>
      </Card>
    );
  }

  return <Card component={component} {...rest}>{children}</Card>;
};

Area.propTypes = {
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

Area.defaultProps = {
  component: 'div',
  onTap: null,
  readOnly: false,
};

export default Area;
