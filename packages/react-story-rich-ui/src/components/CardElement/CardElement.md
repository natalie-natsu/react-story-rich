````jsx harmony
import React, { useCallback } from 'react';

import { createStore, compose, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import Story from '@react-story-rich/core/components/Story';
import Tree from '@react-story-rich/core/classes/Tree';
import { resetHistory } from '@react-story-rich/core/reducers/history';
import reducers from '@react-story-rich/core/reducers';
import mapStateToProps from '@react-story-rich/core/reducers/mapStateToProps';

import CardElement from '@react-story-rich/ui/components/CardElement';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import useInteractions from '../../hooks/useInteractions';

const useStyles = makeStyles((theme) => ({
  interactions: {
    padding: theme.spacing(1, 2),
  },
}));

const OurStory = connect(mapStateToProps)(({ history, dispatch }) => {
  const classes = useStyles();
  const handleReset = useCallback(() => dispatch(resetHistory()), [dispatch, resetHistory]);

  const [switches, propsByStates] = useInteractions((name) => ({ goForward }) => {
    if (name === 'INT') { goForward(1); } else { goForward(); }
  });

  const root = [
    {
      children: `Master said that these woods were home to many monsters,
      slaying even the most seasoned adventurers,
      but I never thought I would come across such a beast.
      Of a bewitched green, its scales reflected the mystical lights of the forest
      and of his lair I was going to meet it. O dragon, what could I have done to you?`,
      timeout: propsByStates.onTimeout ? 10000 : 0,
      ...propsByStates,
    },
  
    `A big flash sucks you towards nothingness.
     The dragon was as strong as you were reckless.`,
  
    `With an ounce of intelligence, you can discern the true from the false.
     This dragon was only the fruit of your imagination.`,
  ];

  return (
    <>
      <Story
        autoFocus={false}
        autoScroll={false}
        dispatch={dispatch}
        history={history}
        nodeComponent={CardElement}
        tree={new Tree(root)}
      />
      <Grid container component={Paper} className={classes.interactions}>
        {switches}
        <Grid item xs={6} sm={3}>
          <Button variant="contained" color="primary" size="small" onClick={handleReset}>Reset</Button>
        </Grid>
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
