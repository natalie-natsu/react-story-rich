import React, { useMemo } from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

const useArea = (onTap, readOnly, { enabled }) => useMemo(() => {
  if (onTap !== null) {
    return (children, ...rest) => (
      <CardActionArea {...rest} disabled={!enabled || readOnly}>
        {children}
      </CardActionArea>
    );
  }

  return (children, ...rest) => <Card {...rest}>{children}</Card>;
}, [enabled, onTap, readOnly]);

export default useArea;
