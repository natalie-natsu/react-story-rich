````jsx harmony
import React from 'react';
import Element from '@react-story-rich/core/components/Element';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

  // eslint-disable-next-line no-alert
  <Element component={Card} enabled onTap={() => { alert('TAP !'); }}>
    <CardContent>
      <Typography>
        Hey Tap me !
      </Typography>
    </CardContent>
  </Element>;
````
