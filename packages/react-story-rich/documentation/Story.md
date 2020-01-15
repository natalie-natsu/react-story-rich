````jsx harmony
import React from 'react';
import { Element, Story } from '@react-story-rich/core';

const location = 3;
const history = [
  { route: { from: null, to: 0 } },
  { route: { from: 0, to: 1 } },
  { route: { from: 1, to: 3 } },
];

  <Story autoFocus={false} autoScroll={false} location={location} history={history}>
    <Element> Hello world !</Element>
    <Element>How are you ?</Element>
    <>
      <Element>Euhh...</Element>
      <Element>Fine !</Element>
      <Element>Not going to be shwon any way.</Element>
    </>
  </Story>;
````

### Navigate though Elements
To do so, you'll need to specify a dispatcher to handle the navigation action provided by the Element itself.
We are going redux and react-redux to create a store and connect OurStory + CustomElement to it.

````jsx harmony
import React, { useCallback, useState } from 'react';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { Story, reducers, findByIndex, resetHistory } from '@react-story-rich/core';

// Here a CustomElement already connected to the store
import CustomElement from '../CustomElementExample';

// However, we can also use the given `navigation` prop
// given to the two handlers `onTap` and `onTimeout`.
const Knot = (handleReset) => {
  const timeout = 1000;
  let count = 0;

  // const onTimeout = (navigation, props, event) => { navigation.goForward() };
  const onTimeout = ({ goForward }) => { goForward() };

  const loop = ({ goTo }) => {
    count += 1;

    if (count < 3) {
      goTo(findByIndex(0));
    } else { handleReset(); }
  };

  return (
    <>
      <CustomElement timeout={timeout} onTimeout={onTimeout}>Hey</CustomElement>
      <CustomElement timeout={timeout} onTimeout={onTimeout}>Oh !</CustomElement>
      <CustomElement onTap={loop}>Let&#39;s go !</CustomElement>
    </>
  );
};

// We create the store with the two combined reducers `history` and `location`.
const store = createStore(reducers);

// Then we connect the Story to our store.
// OurStory will get `history` and `location` via props like it should be.
const mapStateToProps = (state) => ({
  history: state.history,
  location: state.location,
});

const OurStory = connect(mapStateToProps)(Story);

const [start, setStart] = useState(false);
const handleClick = useCallback(() => setStart(true), [setStart]);
const handleReset = useCallback(() => {
  setStart(false);
  // Here we use `store.dispatch` because everything is declared in the example
  // but prefer access to `dispatch` via props.
  store.dispatch(resetHistory());
}, [resetHistory, setStart, store.dispatch]);

  <Provider store={store}>
    <>
      {!start && <Button color="primary" onClick={handleClick}>Start</Button>}
      {start && <Button onClick={handleReset}>Reset</Button>}
      {start && (
        <Box mt={2}>
          <OurStory
            autoFocus={false}
            autoScroll={false}
            component={Grid}
            componentProps={{ container: true, spacing: 2 }}
          >
            {Knot(handleReset)}
          </OurStory>
        </Box>
      )}
    </>
  </Provider>
````

### Improve render performance with virtualization
This example is uncompleted, but was worthy to be mentioned either way.

````jsx harmony
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Route, Story, initialHistoryState, reducers } from '@react-story-rich/core';

import Grid from '@material-ui/core/Grid';

// import WindowScroller from 'react-virtualized/WindowScroller';
// import 'react-virtualized/styles.css';

import CustomElement from '../CustomElementExample';

const store = createStore(reducers);

// Modify here NB_OF_EL to test performance
const NB_OF_EL = 9;
const LOCATION = NB_OF_EL - 1;

const history = [...initialHistoryState];
for (let i = 1; i < NB_OF_EL; i += 1) {
  history.push({ route: new Route(i % 3, (i + 1) %  3).toPlainObject() })
}
  <Provider store={store}>
    <Story
      component={Grid}
      componentProps={{ container: true, spacing: 2 }}
      location={LOCATION}
      history={history}
      autoScroll={false}
      autoFocus={false}
    >
      <CustomElement>Hey</CustomElement>
      <CustomElement>Oh !</CustomElement>
      <CustomElement>Let&#39;s go !</CustomElement>
    </Story>
  </Provider>
````
