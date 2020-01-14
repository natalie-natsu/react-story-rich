<img src="https://raw.githubusercontent.com/wasa42/react-story-rich/HEAD/logo.png" alt="@react-story-rich logo">

@react-story-rich is made for people having knowledge in JavaScript and React
who doesn't want to lean a "proxy" language to make a narrative game.
If it is not your case, you can find in this doc
[links to well known libraries or tools](#Links)
with the same topic.

## Installation
```bash
npm install @react-story-rich/core -S
// or
yarn add @react-story-rich/core
```

## Usage
Your story is composed of Core Components:
 * One `<Story>` component doing the rendering
 * Multiple `<Element>`components creating the all book

[See more information about Core Components.](https://wasa42.github.io/react-story-rich/#section-core-components)

* You navigate from `<Element>` to `<Element>` by dispatching actions like `goForward()`
* You can use Fragments and Knot to organize chapters and sequences

[See more information about Navigation.](https://wasa42.github.io/react-story-rich/#element)

## Example
Here a non exhaustive example of a mini scene.
It involves connecting a Story to a store and use CustomElement components
either provided by composition or inheritance.

````jsx harmony
import React from 'react';

import { createStore, compose, applyMiddleware } from 'redux';
import { connect, Provider } from 'react-redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';

import Break from '@react-story-rich/ui/Break';
import { Element, Story, reducers } from '@react-story-rich/core';
import CustomElementExample from '@react-story-rich/core/components/CustomElementExample';

import Grid from '@material-ui/core/Grid';

const mapStateToProps = (state) => ({
  history: state.history,
  location: state.location,
});

const LYRICS = {
  Intro: [
    `Hey, ho, let's go !`,
    `Hey, ho, let's go !`,
    `Hey, ho, let's go !`,
  ],
  Verse: [
    `They're formin' in a straight line`,
    `They're goin' through a tight wind`,
    `The kids are losin' their minds`,
    `The Blitzkrieg Bop`,
    `They're pilin' in the back seat`,
    `They're generatin' steam heat`,
    `Pulsatin' to the back beat`,
    `The Blitzkrieg Bop`,
  ],
  Chorus: [
    `Hey, ho, let's go !`,
    `Shoot 'em in the back now`,
    `What they want, I don't know`,
    `They're all revved up ready to go`,
  ],
};

const handleTimeout = ({ goForward }) => { goForward() };
const handleTap = ({ goForward }) => { goForward() };

const Lyrics = () => [...LYRICS.Intro, ...LYRICS.Verse, ...LYRICS.Chorus].map((text, i) => (
  <CustomElementExample timeout={1500} onTimeout={handleTimeout} key={`LYRICS-${i}`}>
    {text}
  </CustomElementExample>
));

const OurStory = connect(mapStateToProps)(({ history, location, dispatch }) => {
  return (
    <Story
      autoFocus={false}
      autoScroll={false}
      component={Grid}
      componentProps={{ container: true, spacing: 2 }}
      history={history}
      location={location}
    >
      <CustomElementExample onTap={handleTap}>
        Imagine you found a box of your old video games.
      </CustomElementExample>
      <CustomElementExample onTap={handleTap}>
        At the very bottom, you see the Tony Hawk PS1 game.
      </CustomElementExample>
      <CustomElementExample onTap={handleTap}>
        You remember having fun with your friends on it,
        so you bring back to life your old console.
      </CustomElementExample>
      <CustomElementExample onTap={handleTap} gridProps={{ sm: 12 }}>
        You remember those good old punk rock music when suddenly
        you hear the saturated sound of guitars.
      </CustomElementExample>
      <Element
        boxProps={{ component: Grid, item: true, xs: 12}}
        component={Break}
        divider={false}
        dispatch={dispatch}
      />
      {Lyrics()}
      <Element
        boxProps={{ component: Grid, item: true, xs: 12}}
        component={Break}
        divider={false}
        dispatch={dispatch}
      />
      <CustomElementExample onTap={handleTap} gridProps={{ sm: 6 }}>
        It was a good memory to remember.
      </CustomElementExample>
      <CustomElementExample readOnly gridProps={{ sm: 6 }}>
        Hope it was a good one to share.
      </CustomElementExample>
    </Story>
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

## Links
* [So What About Inheritance? issue](https://github.com/WaSa42/react-story-rich/issues/5)
* A non existing link about @react-story-rich

### About alternative or non relative to @react-story-rich
* [Ink language](https://github.com/inkle/ink)
* [Twine tool](https://twinery.org/)
* [Tutorial to combine Ink with React](https://medium.com/journocoders/create-a-news-game-with-ink-react-and-redux-part-i-scripting-in-inky-fba5f681601c)
* [Myself knowing no one is going to read this](https://i.kym-cdn.com/entries/icons/original/000/026/489/crying.jpg)
