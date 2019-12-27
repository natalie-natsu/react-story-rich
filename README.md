## React JS framework for story-rich games.

<img src="https://raw.githubusercontent.com/wasa42/react-story-rich/HEAD/documentation/static/react-story-rich.png" alt="RSR logo">

## Installation
```bash
npm install @react-story-rich/core -S
// or
yarn add @react-story-rich/core
```

## Usage
To create a game with RSR, there are three principles you need to know:

### 1) Only two components
Your story is compose of a `<Story>` component doing the rendering and multiple `<Element>`
components that create the all book.

### 2) Tree navigation
* You navigate from `<Element>` to `<Element>` by dispatching actions like `goForward()`.
* You can use fragments to organize chapters and sequences, but at the end `children` of you story
are flatten to one big array of `<Element>` components
* Then the Story give elements a number you can use as an id  `goTo(6)`
* You can also give unique ids to elements to navigate without knowing the element number.

### 3) One source of truth
RSR can use redux to manage the entire state. To do that, you need to wrap your story with
the `<Provider>` component.

Each time you navigate between elements, an history and a location are updated,
the history being all actions you've done before and the location being the number of the element
you are currently on.

You can also use the data state to store information like health, skills or inventory.

```jsx harmony static
import React from 'react';
import { Element, Story, Provider, goForward, goTo } from '@react-story-rich/core';

function MyStory() {
  const timeout = 1000;
  let count = 0;

  const onTimeout = ({ dispatch }) => dispatch(goForward());
  const loop = ({ dispatch, location }) => {
    count += 1;
    if (count < 3) { dispatch(goTo(location, 0)); }
  };

  return (
    <Provider>
      <Story autoFocus={false} scrollToBottom={false}>
        <Element timeout={timeout} onTimeout={onTimeout}>Hey</Element>
        <Element timeout={timeout} onTimeout={onTimeout}>Oh !</Element>
        <Element onTap={loop}>Let's go !</Element>
      </Story>
    </Provider>
  );
}
```
### [See the full documentation here.](https://wasa42.github.io/react-story-rich)

## TODOs and appreciated improvements
* More examples in the documentation
  * Audio
  * Theme customization
  * Routing
  * Persistence
  * Translations
  * Virtualized Story
  * Deployment on GH Pages/Web, Mobile and OSs
* Accessibility
* XBox controller integration (is that possible ?)
* Issue templates
* Tools for editing and debugging Elements
* Obviously tests (sorry for not implementing them sooner 🤷)
* Add a CI/CD
