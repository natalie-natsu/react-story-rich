```jsx harmony
import React, { forwardRef, useCallback, useState } from 'react';

import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import { Provider, Story, Element, goForward } from '@react-story-rich/core';

import Layout from '@react-story-rich/ui/Layout';
import CardElement from '@react-story-rich/ui/CardElement';

const [start, setStart] = useState(false);
const handleClick = useCallback(() => setStart(true), [setStart]);

const actions = [{
  children: 'Choose me!',
  onClick: (dispatch) => dispatch(goForward()),
}, {
  children: 'Or me!',
  onClick: (dispatch) => dispatch(goForward(1)),
}, {
  children: 'Whatever...',
  onClick: (dispatch) => dispatch(goForward(2)),
}];

const onTimeout =  () => alert('You couldn\'t choose, didn\'t you?');

const QTEComponent = forwardRef((props, ref) => (
  <CardElement text qte ref={ref} {...props}>
    Now there're actions!
  </CardElement>
));

  <Layout>
    <Container>
      {!start && <Button variant="contained" color="primary" onClick={handleClick}>Start</Button>}
      {start && (
        <Provider>
        <Story scrollToBottom={false}>
          <Element
            component={QTEComponent}
            timeout={10000}
            actions={actions}
            onTimeout={onTimeout}
          />
          <>
            <Element component={CardElement} text>Yeah!</Element>
            <Element component={CardElement} text>You choose... poorly!</Element>
            <Element component={CardElement} text>Ok ok.</Element>
          </>
        </Story>
        </Provider>
      )}
    </Container>
  </Layout>
```
