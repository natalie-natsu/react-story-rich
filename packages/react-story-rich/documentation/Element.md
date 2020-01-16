````jsx harmony
import React, { useState }from 'react';
import Button from '@material-ui/core/Button';
import CardElement from '@react-story-rich/core/CardElement';

  const [tapped, setTapped] = useState(false);
  const [enabled, setEnabled] = useState(true);

  const handleReset = () => {
    setTapped(false);
    setEnabled(true);
  };

  const handleTimeout = () => { setEnabled(false); };

  <>
    <CardElement text enabled onTap={() => setTapped((prevState) => !prevState)}>
      {tapped ? 'Well tap !' : 'Hey Tap me !'}
    </CardElement>
  
    <CardElement
      actions={[{
        children: 'Bow to say hi',
        onClick: handleTimeout,
      }, {
        children: 'Kill it',
        onClick: handleTimeout,
      },]}
      enabled={enabled}
      onTimeout={handleTimeout}
      text
      timeout={10000}
    >
      {enabled && `A magnificent blue lobster appears, like the Apollo of the Oceans.
      His whiskers wiggle and his pliers snap frantically.
      Your stomach is empty. What do you want to do ?
      `}
      {!enabled && `You hardly have time to move as its magnificence disappears under your eyes !
      It was just a mirage caused by your appetite...
      `}
    </CardElement>
    <Button disabled={enabled} onClick={handleReset}>Reset</Button>
  </>
````
