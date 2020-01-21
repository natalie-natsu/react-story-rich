import React, { useMemo } from 'react';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
  root: {
    whiteSpace: 'nowrap',
  },
});

const useActions = (actions, { enabled, index, nav }) => {
  const classes = useStyles();

  return useMemo(() => {
    const hasActions = actions.length > 0;
    const Actions = [];

    if (hasActions) {
      actions.map(({ onClick, ...rest }, i) => Actions.push(
        <Button
          classes={classes}
          disabled={!enabled}
          color="primary"
          key={`react-story-rich-element_${index}-action_${i}`}
          onClick={(event) => onClick(nav, event)}
          {...rest}
        />,
      ));
    }

    return [hasActions, Actions];
  }, [actions, classes, enabled, index, nav]);
};

export default useActions;
