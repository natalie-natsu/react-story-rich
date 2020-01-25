import React, { useMemo, useRef } from 'react';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  root: {
    whiteSpace: 'nowrap',
  },
});

const useActions = (actions, { enabled, location, nav }) => {
  const classes = useStyles();
  const actionRef = useRef(null);

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
          onClick={(event) => onClick(nav, event)}
          ref={i === 0 ? actionRef : undefined}
          {...rest}
        />,
      ));
    }

    return [hasActions, Actions, actionRef];
  }, [actions, classes, enabled, location, nav]);
};

export default useActions;
