````jsx harmony
import React from 'react';
import Story from '@react-story-rich/core/components/Story';
import Element from '@react-story-rich/core/components/Element';

const location = 3;
const history = [
  { from: 0, to: 1 },
  { from: 1, to: 3 },
];

  <Story autoFocus={false} autoScroll={false} location={location} history={history}>
    <Element> Hello world !</Element>
    <Element>How are you ?</Element>
    <>
      <Element>Euhh...</Element>
      <Element>Fine !</Element>
      <Element>Not going to be shwon any way.</Element>
    </>
  </Story>;
````

### Virtualized Story (work in progress)
If someone would like to contribute by pushing an example with react-virtualized,
it will be very appreciated :-)

````jsx harmony
import React from 'react';
import Story from '@react-story-rich/core/components/Story';
import Element from '@react-story-rich/core/components/Element';

import Layout from '@react-story-rich/ui/Layout';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// import WindowScroller from 'react-virtualized/WindowScroller';
// import 'react-virtualized/styles.css';

class CustomElement extends Element {
  render() {
    const { _id, autoFocus, children, enabled, label, tabIndex } = this.props;

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

const nbOfEl = 9;
const location = nbOfEl - 1;
const history = [];

for (let i = 0; i < nbOfEl; i += 1) {
  history.push({ from: i % 3, to: (i + 1) %  3 })
}

  <Layout>
    <Container>
      <Story
        component={Grid}
        componentProps={{ container: true, spacing: 2 }}
        location={location}
        history={history}
        autoScroll={false}
        autoFocus={false}
      >
        <CustomElement>Hey</CustomElement>
        <CustomElement>Oh !</CustomElement>
        <CustomElement>Let&#39;s go !</CustomElement>
     </Story>
   </Container>
  </Layout>
````
