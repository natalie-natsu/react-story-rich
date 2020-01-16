import { Fragment, useMemo } from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';

const useArea = ({ enabled }, { onTap, readOnly }) => useMemo(() => {
  if (enabled && !readOnly && onTap !== null) {
    return CardActionArea;
  }

  return Fragment;
}, [enabled, onTap, readOnly]);

export default useArea;
