````jsx harmony
import React, { forwardRef, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Layout from '@react-story-rich/ui/Layout';
import { Provider, Story, Element, goForward, goTo } from '@react-story-rich/core';

// forwardRef is important otherwise component will not be auto focused (+ throwing a warning)
const CustomElement = forwardRef(({ children, forwardProps, ...rest }, ref) =>  (
  <Grid sm={4} item>
    <Card ref={ref} {...rest}>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {children}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
));

CustomElement.propTypes = {
  children: PropTypes.node.isRequired,
};

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
      <Element component={CustomElement} timeout={timeout} onTimeout={onTimeout}>Hey</Element>
      <Element component={CustomElement} timeout={timeout} onTimeout={onTimeout}>Oh !</Element>
      <Element component={CustomElement} onTap={loop}>Let&#39;s go !</Element>
    </>
  );
}

const [start, setStart] = useState(false);
const handleClick = useCallback(() => setStart(true), [setStart]);

  <Provider>
    <Layout>
      <Container>
        {!start && <Button variant="contained" color="primary" onClick={handleClick}>Start</Button>}
        {start && (
          <Story component={Grid} container spacing={2} scrollToBottom={false}>
            {SmallSequence()}
          </Story>
        )}
      </Container>
    </Layout>
  </Provider>
````
