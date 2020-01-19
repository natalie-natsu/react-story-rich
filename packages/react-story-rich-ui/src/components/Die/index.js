import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import isEmpty from 'lodash/isEmpty';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { makeStyles, useTheme } from '@material-ui/core/styles';

export const roll = (sides = 20) => {
  if (Number(sides) < 1) { throw Error(`A Die needs a positive number of sides. Got ${sides}`); }
  return Math.floor(Math.random() * Number(sides) + 1);
};

const useStyles = makeStyles((theme) => ({
  root: ({ size, color }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    width: theme.spacing(size),
    height: theme.spacing(size),

    padding: theme.spacing(1),

    color,
    backgroundColor: theme.palette.background.paper,

    borderColor: color,
    borderRadius: theme.typography.round(size * 0.6),
  }),
  label: ({ size }) => ({
    fontFamily: 'Courier',
    fontSize: theme.typography.round(size),
    height: theme.typography.round(size),
    lineHeight: `${theme.typography.round(size)}px`,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
  value: ({ size }) => ({
    fontSize: theme.typography.round(size * 3.5),
    fontWeight: theme.typography.fontWeightBold,
    textAlign: 'center',
  }),
  details: ({ size }) => ({
    fontFamily: 'Courier',
    fontSize: theme.typography.round(size),
    height: theme.typography.round(size),
    lineHeight: `${theme.typography.round(size)}px`,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
}));

const Die = ({
  className,
  color,
  details,
  query,
  sides,
  size,
  value,
  ...passThroughProps
}) => {
  const theme = useTheme();
  const { primary } = theme.palette.text;
  const dieColor = useMemo(() => (isEmpty(color) ? primary : color), [color, primary]);
  const classes = useStyles({ color: dieColor, size });

  const label = useMemo(() => (isEmpty(query) ? `1d${sides}` : query), [query, sides]);

  return (
    <Paper
      component={Paper}
      variant="outlined"
      className={clsx(classes.root, className)}
      {...passThroughProps}
    >
      <Typography className={classes.label}>{label}</Typography>
      <Typography className={classes.value}>{value}</Typography>
      <Typography className={classes.details}>{details}</Typography>
    </Paper>
  );
};

Die.propTypes = {
  /**
   * @ignore
   */
  className: PropTypes.string,
  color: PropTypes.string,
  details: PropTypes.string,
  query: PropTypes.string,
  sides: PropTypes.number,
  size: PropTypes.number,
  value: PropTypes.number,
};

Die.defaultProps = {
  className: '',
  color: '',
  details: '',
  query: '',
  sides: 20,
  size: 16,
  value: roll(20),
};

export default Die;
