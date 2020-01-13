import React from 'react';
import PropTypes from 'prop-types';

const Knot = ({ _id, children, isPiped, title }) => <>{children}</>;

Knot.propTypes = {
  _id: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  isPiped: PropTypes.bool,
  title: PropTypes.string,
};

Knot.defaultProps = {
  isPiped: false,
  title: null,
};

export default Knot;
