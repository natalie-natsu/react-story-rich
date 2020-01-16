import { useMemo } from 'react';
import { getElementInjectedProps } from '../toElement';

import pick from 'lodash/pick';
import omit from 'lodash/omit';

const useProps = (props, propTypes = {}) => useMemo(() => {
  const injectedProps = getElementInjectedProps(props);
  const extraProps = pick(props, Object.keys(propTypes));
  const passThroughProps = omit(props, [...Object.keys(injectedProps), ...Object.keys(propTypes)]);

  return [injectedProps, extraProps, passThroughProps];
}, [props, propTypes]);

export default useProps;
