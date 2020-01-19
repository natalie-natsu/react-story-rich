<img src="https://raw.githubusercontent.com/wasa42/react-story-rich/HEAD/documentation/assets/logo.png" alt="@react-story-rich logo">

**@react-story-rich renders components according to the history of user actions.** <br/>
These components are made to navigate from one to another and create a line of event in the DOM.

```bash
npm install @react-story-rich/core -S
// or
yarn add @react-story-rich/core
```

<img src="https://raw.githubusercontent.com/wasa42/react-story-rich/HEAD/documentation/assets/example.gif" alt="Example of a CardElement from @react-story-rich">

```jsx harmony
import React, { useCallback } from 'react';

import { createStore, compose, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import Story from '@react-story-rich/core/components/Story';
import Tree from '@react-story-rich/core/classes/Tree';

import reducers from '@react-story-rich/core/reducers';
import { resetHistory } from '@react-story-rich/core/reducers/history';
import mapStateToProps from '@react-story-rich/core/reducers/mapStateToProps';

import CardElement from '@react-story-rich/ui/components/CardElement';
import Button from '@material-ui/core/Button';

const root = [
  {
    children: `Master said that these woods were home to many monsters,
    slaying even the most seasoned adventurers,
    but I never thought I would come across such a beast.
    Of a bewitched green, its scales reflected the mystical lights of the forest
    and of his lair I was going to meet it. O dragon, what could I have done to you?`,
    text: true,
    actions: [
      { children: 'Attack', onClick: (nav) => nav.goForward() },
      { children: 'Observe', onClick: (nav) => nav.goForward(1) },
    ],
  },

  `A big flash sucks you towards nothingness.
   The dragon was as strong as you were reckless.`,

  `With an ounce of intelligence, you can discern the true from the false.
   This dragon was only the fruit of your imagination.`,
];

const OurStory = connect(mapStateToProps)(({ history, dispatch }) => {
  const handleReset = useCallback(() => dispatch(resetHistory()), [dispatch, resetHistory]);

  return (
    <>
      <Story
        autoFocus={false}
        autoScroll={false}
        defaultNodeComponent={CardElement}
        dispatch={dispatch}
        history={history}
        tree={new Tree(root)}
      />
      <Button onClick={handleReset}>Reset</Button>
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
```
[See CardElement styled component for more information.](https://wasa42.github.io/react-story-rich/#cardelement)
