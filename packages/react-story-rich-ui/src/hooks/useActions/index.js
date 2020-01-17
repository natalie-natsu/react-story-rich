import React, { useMemo } from 'react';
import Button from '@material-ui/core/Button';

const useActions = (actions, { enabled, index, nav }) => useMemo(() => {
  const hasActions = actions.length > 0;
  const Actions = [];

  if (hasActions) {
    actions.map(({ onClick, ...rest }, i) => Actions.push(
      <Button
        disabled={!enabled}
        color="primary"
        key={`react-story-rich-element_${index}-action_${i}`}
        onClick={(event) => onClick(nav, event)}
        {...rest}
      />,
    ));
  }

  return [hasActions, Actions];
}, [actions, enabled, index, nav]);

export default useActions;
