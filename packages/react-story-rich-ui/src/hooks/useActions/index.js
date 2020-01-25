import React, { createRef, useMemo, useRef } from 'react';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  root: {
    whiteSpace: 'nowrap',
  },
});

const useActions = (actions = [], { enabled, location, nav }, extraProps = {}) => {
  const classes = useStyles();
  const actionRefs = useRef(actions.map(() => createRef()));

  return useMemo(() => {
    const hasActions = actions.length > 0;
    const Actions = [];

    if (hasActions) {
      actions.map(({ onClick, ...rest }, i) => Actions.push(
        <Button
          classes={classes}
          disabled={!enabled}
          color="primary"
          key={`${location}.action.${i}`}
          onClick={(event) => onClick(nav, extraProps, event)}
          ref={actionRefs.current[i]}
          {...rest}
        />,
      ));
    }

    return [hasActions, Actions, actionRefs.current[0], actionRefs];
  }, [actions, classes, enabled, extraProps, location, nav]);
};

export default useActions;
