import React, { useState } from 'react';

import map from 'lodash/map';
import pickBy from 'lodash/pickBy';
import uniqueId from 'lodash/uniqueId';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';

import mediaSrc from './contemplative-reptile.jpg';

const useInteractions = (handleTrigger) => {
  const defaultProps = {
    actions: [
      { children: 'Use agility', onClick: handleTrigger('AG') },
      { children: 'Use force', onClick: handleTrigger('FO') },
      { children: 'Use intelligence', onClick: handleTrigger('INT') },
    ],
    media: { image: mediaSrc, style: { height: 200 } },
    onEnable: handleTrigger('onEnable'),
    onTap: handleTrigger('onTap'),
    onTimeout: handleTrigger('onTimeout'),
    readOnly: true,
    text: true,
  };

  const [states, setStates] = useState({
    actions: defaultProps.actions,
    media: false,
    onEnable: false,
    onTap: false,
    onTimeout: false,
    readOnly: false,
    text: defaultProps.text,
  });

  const handleChange = (name) => (event) => {
    const state = event.target.checked ? defaultProps[name] : false;
    setStates({ ...states, [name]: state });
  };

  const switches = map(states, (state, name) => (
    <Grid component={Grid} item xs={6} sm={3} key={uniqueId(name)}>
      <FormControlLabel
        label={name}
        control={(
          <Switch
            checked={state !== false}
            onChange={handleChange(name)}
            value={name}
            inputProps={{ 'aria-label': `${name} checkbox` }}
          />
      )}
      />
    </Grid>
  ));

  return [switches, pickBy(states, (state) => state !== false)];
};

export default useInteractions;
