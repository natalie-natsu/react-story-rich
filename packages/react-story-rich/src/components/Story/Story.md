````jsx harmony
import React from 'react';
import Story from '@react-story-rich/core/components/Story';
import Element from '@react-story-rich/core/components/Element';

const location = 3;
const history = [
  { from: 0, to: 1 },
  { from: 1, to: 3 },
];

  <Story location={location} history={history} scrollToBottom={false} autoFocus={false}>
    <Element> Hello world !</Element>
    <Element>How are you ?</Element>
    <>
      <Element>Euhh...</Element>
      <Element>Fine !</Element>
      <Element>Not going to be shwon any way.</Element>
    </>
  </Story>;
````
