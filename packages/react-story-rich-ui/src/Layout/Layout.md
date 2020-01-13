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
import { Provider, Story, Element } from '@react-story-rich/core';

class CustomElement extends Element {
  render() {
    const { _id, autoFocus, children, enabled, label, tabIndex } = this.props;
console.log(this);

    return (
      <Grid sm={4} item>
        <Card
          autoFocus={autoFocus}
          data-id={_id}
          data-index={this.index}
          data-label={label}
          data-disabled={!enabled}
          onClick={this._handleTap}
          onKeyPress={this._handleKeyPress}
          ref={this.ref}
          tabIndex={tabIndex}
        >
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              {children}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ) 
  }
}


CustomElement.propTypes = {
  children: PropTypes.node.isRequired,
};

const location = 3;
const history = [
  { from: 0, to: 1 },
  { from: 1, to: 3 },
];


const Knot = () => {
  const timeout = 1000;
  let count = 0;

  const onTimeout = () => { this.goForward() };
  const loop = () => {
    count += 1;
    if (count < 3) { this.goTo(() => 0); }
  };

  return (
    <>
      <CustomElement timeout={timeout} onTimeout={onTimeout}>Hey</CustomElement>
      <CustomElement timeout={timeout} onTimeout={onTimeout}>Oh !</CustomElement>
      <CustomElement onTap={loop}>Let&#39;s go !</CustomElement>
    </>
  );
};

const [start, setStart] = useState(false);
const handleClick = useCallback(() => setStart(true), [setStart]);

  <Provider>
    <Layout>
      <Container>
        {!start && <Button variant="contained" color="primary" onClick={handleClick}>Start</Button>}
        {start && (
          <Story
            component={Grid}
            componentProps={{ container: true, spacing: 2 }}
            autoScroll={false}
            autoFocus={false}
          >
            {Knot()}
          </Story>
        )}
      </Container>
    </Layout>
  </Provider>
````
