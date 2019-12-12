Try to click on "Let's go !"

```jsx harmony
import React from 'react';
import { Element, Story, Provider, goForward, goTo } from '@react-story-rich/core';

function SmallSequence() {
  const timeout = 1000;
  let count = 0;

  const onTimeout = ({ dispatch }) => dispatch(goForward());
  const loop = ({ dispatch, location }) => {
    count += 1;
    if (count < 3) { dispatch(goTo(location, 0)); }
  };

  return (
    <>
      <Element component="p" timeout={timeout} onTimeout={onTimeout}>Hey</Element>
      <Element component="p" timeout={timeout} onTimeout={onTimeout}>Oh !</Element>
      <Element component="p" onTap={loop}>Let&#39;s go !</Element>
    </>
  );
}

  <Provider>
    <Story autoFocus={false} scrollToBottom={false}>
      {SmallSequence()}
    </Story>
  </Provider>;
```
