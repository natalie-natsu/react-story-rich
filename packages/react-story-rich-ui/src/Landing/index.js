import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    minHeight: '100vh',
  },
  banner: {
    maxWidth: '100%',
    maxHeight: 280,
    marginBottom: theme.spacing(2),
  },
}));

const Landing = forwardRef(({ banner, bannerProps, children, name, ...rest }, ref) => {
  const classes = useStyles();

  return (
    <div ref={ref} className={classes.root} {...rest}>
      <Container maxWidth="sm">
        {banner && <img src={banner} alt={name} className={classes.banner} {...bannerProps} />}
        {children}
      </Container>
    </div>
  );
});

Landing.propTypes = {
  /**
   * A link to your banner image.
   */
  banner: PropTypes.string,
  /**
   * Props spread to the banner image.
   */
  bannerProps: PropTypes.object,
  /**
   * A node of your content.
   */
  children: PropTypes.node.isRequired,
  /**
   * The name of your project (good for accessibility).
   */
  name: PropTypes.string.isRequired,
};

Landing.defaultProps = {
  banner: null,
  bannerProps: {},
};

export default Landing;
