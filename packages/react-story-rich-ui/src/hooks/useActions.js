import React, { useMemo } from 'react';
import Button from '@material-ui/core/Button';

const useActions = (injectedProps, extraProps) => useMemo(() => {
  const { enabled, index } = injectedProps;
  const { actions } = extraProps;

  const hasActions = actions.length > 0;
  const Actions = [];

  if (hasActions) {
    actions.map(({ onClick, ...rest }, i) => Actions.push(
      <Button
        disabled={!enabled}
        color="primary"
        key={`react-story-rich-element_${index}-action_${i}`}
        onClick={(e) => onClick(injectedProps, extraProps, e)}
        {...rest}
      />,
    ));
  }

  return [hasActions, Actions];
}, [injectedProps, extraProps]);

export default useActions;
