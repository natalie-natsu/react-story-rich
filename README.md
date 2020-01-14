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
````jsx harmony
import React from 'react';

import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

import { Story, reducers } from '@react-story-rich/core';
import CustomElementExample from '@react-story-rich/core/components/CustomElementExample';

import Grid from '@material-ui/core/Grid';

const mapStateToProps = (state) => ({
  history: state.history,
  location: state.location,
});

const LYRICS = {
  Intro: [
    `Hey,`, `ho,`, `let's go,`,
    `Hey,`, `ho,`, `let's go,`,
    `Hey,`, `ho,`, `let's go,`,
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
    `Hey,`, `ho,`, `let's go,`,
    `Shoot 'em in the back now`,
    `What they want, I don't know`,
    `They're all revved up and ready to go`,
  ],
};

const handleTimeout = ({ goForward }) => { goForward() };
const handleTap = ({ goForward }) => { goForward() };

const Intro = () => LYRICS.Intro.map((text, i) => (
  <CustomElementExample timeout={750} onTimeout={handleTimeout} key={`Intro-${i}`}>
    {text}
  </CustomElementExample>
));

const Verse = () => LYRICS.Verse.map((text, i) => (
  <CustomElementExample timeout={1500} onTimeout={handleTimeout} key={`Verse-${i}`}>
    {text}
  </CustomElementExample>
));

const Chorus = () => LYRICS.Chorus.map((text, i) => (
  <CustomElementExample timeout={750} onTimeout={handleTimeout} key={`Chorus-${i}`}>
    {text}
  </CustomElementExample>
));

const OurStory = connect(mapStateToProps)(({ history, location }) => {
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
        Imagine you found the box of your old video games.
      </CustomElementExample>
      <CustomElementExample onTap={handleTap}>
        At the very bottom, you see the Tony Hawk PS1 game.
      </CustomElementExample>
      <CustomElementExample onTap={handleTap}>
        You remember having fun with your friends on it,
        so you bring back to life your old console.
      </CustomElementExample>
      <CustomElementExample onTap={handleTap}>
        You remember those good old punk rock music when suddenly
        you hear the saturated sound of guitars.
      </CustomElementExample>
      <>
        {Intro()}
        {Verse()}
        {Chorus()}
      </>
      <CustomElementExample onTap={handleTap}>
        It was a good memory to remember
      </CustomElementExample>
      <CustomElementExample readOnly>
        Hop it was a good memory to share
      </CustomElementExample>
    </Story>
  );
});

const store = createStore(reducers);

const App = () => (
  <Provider store={store}>
    <OurStory />
  </Provider>
);

  <App />
````

## Links
* A non existing link about @react-story-rich

### About alternative to @react-story-rich
* [Ink language](https://github.com/inkle/ink)
* [Twine tool](https://twinery.org/)
* [Tutorial to combine Ink with React](https://medium.com/journocoders/create-a-news-game-with-ink-react-and-redux-part-i-scripting-in-inky-fba5f681601c)
* [Myself knowing no one is going to read this](https://i.kym-cdn.com/entries/icons/original/000/026/489/crying.jpg)
