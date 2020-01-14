import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import isEmpty from 'lodash/isEmpty';

import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

/**
 * A Break is an Element that goForward() instantly after mounting.
 * It's a pure UI Element since it doesn't implements feature
 * in opposition to CardElement and his QTE thing.
 *
 * Inherits from https://material-ui.com/components/box/#api | Box API
 *
 * @param children
 * @param divider
 * @param dividerProps
 * @param navigation
 * @param timeout
 * @param title
 * @param titleProps
 * @param rest
 * @return {*}
 * @constructor
 */
const Break = forwardRef(({
  boxProps,
  children,
  divider,
  dividerProps,
  enabled,
  navigation,
  timeout,
  title,
  titleProps,
}, ref) => {
  useEffect(() => {
    if (!timeout && enabled) { navigation.goForward(); }
  }, [enabled, navigation, timeout]);

  return (
    <Box mb={2} {...boxProps} ref={ref}>
      {!isEmpty(title) && (
        <Typography
          component="h4"
          gutterBottom
          variant="h4"
          {...titleProps}
        >
          {title}
        </Typography>
      )}
      {divider && <Divider variant="fullWidth" {...dividerProps} />}
      {children}
    </Box>
  );
});

Break.propTypes = {
  boxProps: PropTypes.object,
  children: PropTypes.node,
  divider: PropTypes.bool,
  dividerProps: PropTypes.object,
  /**
   * @ignore
   */
  enabled: PropTypes.bool,
  /**
   * @ignore
   */
  navigation: PropTypes.shape({
    goBackward: PropTypes.func.isRequired,
    goForward: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    rewindTo: PropTypes.func.isRequired,
  }).isRequired,
  timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.func]).isRequired,
  title: PropTypes.string,
  titleProps: PropTypes.object,
};

Break.defaultProps = {
  boxProps: {},
  children: null,
  divider: true,
  dividerProps: {},
  enabled: false,
  title: '',
  titleProps: {},
};

export default Break;
