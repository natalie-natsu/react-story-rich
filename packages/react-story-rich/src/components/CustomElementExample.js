import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { Element } from '@react-story-rich/core';

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
          onClick={this.handleTap}
          onKeyPress={this.handleKeyPress}
          ref={this.ref}
          tabIndex={tabIndex}
        >
          <CardActionArea disabled={!enabled}>
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                {children}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  }
}

CustomElement.propTypes = {
  children: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => ({
  history: state.history,
  location: state.location,
});

export default connect(mapStateToProps)(CustomElement);
