import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import isFunction from 'lodash/isFunction';

import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const Actions = ({ actions, elementProps, enabled, index, navigation, ...rest }) => {
  const handleActionClick = useCallback((onClick) => (event) => {
    if (isFunction(onClick)) { onClick(navigation, elementProps, event); }
  }, [elementProps, navigation]);

  return (
    <CardActions {...rest}>
      {actions.map(({ onClick, ...actionRest }, i) => (
        <Button
          key={`element-${index}-action-${i}`}
          color="primary"
          onClick={handleActionClick(onClick)}
          onKeyPress={handleActionClick(onClick)}
          disabled={!enabled}
          {...actionRest}
        />
      ))}
    </CardActions>
  );
};

Actions.propTypes = {
  /**
   * Array of Material UI Button props object
   * @see {@link https://material-ui.com/api/button/#button-api | MUI Button API}
   */
  actions: PropTypes.arrayOf(PropTypes.object),
  /**
   * @ignore
   */
  elementProps: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  enabled: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  index: PropTypes.number,
  /**
   * A set of methods to navigate through the elements tree.
   */
  navigation: PropTypes.objectOf(PropTypes.func).isRequired,
};

Actions.defaultProps = {
  actions: [],
  index: undefined,
};

export default Actions;
