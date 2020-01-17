````jsx harmony
import React, {useCallback,useMemo, useState }from 'react';

import { createStore, compose, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import map from 'lodash/map';
import pickBy from 'lodash/pickBy';
import uniqueId from 'lodash/uniqueId';

import Story from '@react-story-rich/core/components/Story';
import reducers from '@react-story-rich/core/reducers';
import mapStateToProps from '@react-story-rich/core/reducers/mapStateToProps';
import { resetHistory } from '@react-story-rich/core/reducers/history';

import CardElement from '@react-story-rich/ui/components/CardElement';

import {makeStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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

  const handleChange = name => event => {
    const state = event.target.checked ? defaultProps[name] : false;
    setStates({ ...states, [name]: state });
  };

  const switches = map(states, (state, name) => (
    <Grid component={Grid} item xs={6} sm={3} key={uniqueId(name)}>
      <FormControlLabel label={name} control={
        <Switch
          checked={state !== false}
          onChange={handleChange(name)}
          value={name}
          inputProps={{ 'aria-label': `${name} checkbox` }}
        />
      } />
    </Grid>
  ));

  return [switches, pickBy(states, (state) => state !== false)];
};

const useStyles = makeStyles((theme) => ({
  interactions: {
    padding: theme.spacing(1, 2),
  },
}));

const OurStory = connect(mapStateToProps)(({ history, dispatch }) => {
  const classes = useStyles();
  const handleReset = useCallback(() => dispatch(resetHistory()), [dispatch, resetHistory]);
  const resetAction = useMemo(() => ({ children: 'Reset', onClick: handleReset }), [handleReset]);

  const [switches, propsByStates] = useInteractions((name) => ({ goForward }) => {
    if (name === 'INT') { goForward(1); } else { goForward(); }
  });

  return (
    <>
      <Story
        autoFocus={false}
        autoScroll={false}
        dispatch={dispatch}
        history={history}
      >
        <CardElement {...propsByStates} timeout={propsByStates.onTimeout ? 10000 : 0}>
          Master said that these woods were home to many monsters,
          slaying even the most seasoned adventurers,
          but I never thought I would come across such a beast.
          Of a bewitched green, its scales reflected the mystical lights of the forest
          and of his lair I was going to meet it. O dragon, what could I have done to you?
        </CardElement>
        <CardElement text actions={[resetAction]}>
          A big flash sucks you towards nothingness.
          The dragon was as strong as you were reckless.
        </CardElement>
        <CardElement text actions={[resetAction]}>
          With an ounce of intelligence, you can discern the true from the false.
          This dragon was only the fruit of your imagination.
        </CardElement>
      </Story>
      <Grid container component={Paper} className={classes.interactions}>
        {switches}
      </Grid>
    </>
  );
});

const middleWares = [thunk, logger];
const store = createStore(reducers, compose(applyMiddleware(...middleWares)));

const App = () => (
  <Provider store={store}>
    <OurStory />
  </Provider>
);

  <App />
````
