import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';

import { Element } from '@react-story-rich/core';

import Area from './Area';
import Actions from './Actions';
import LinearDeterminate from './LinearDeterminate';

/**
 * `import CardElement from '@react-story-rich/ui/CardElement';`
 *
 * Use Material UI card component to display a beautiful Element adapted to react-story-rich usage.
 *
 * See https://wasa42.github.io/react-story-rich/#element for demo and example.
 */
class CardElement extends Element {
  render() {
    const {
      actions,
      autoFocus,
      cardActionAreaProps,
      cardActionsProps,
      cardProps,
      children,
      classes,
      enabled,
      media,
      onTap,
      progressProps,
      readOnly,
      tabIndex,
      text,
      textProps,
      timeout,
    } = this.props;

    const hasActions = actions.length > 0;
    const hasLinear = hasActions && !!timeout;
    const navigation = hasActions && this._getNavigation();

    return (
      <div className={classes.root}>
        <Card
          autoFocus={autoFocus}
          data-index={this.index}
          data-disabled={!enabled}
          onClick={this.handleTap}
          onKeyPress={this.handleKeyPress}
          ref={this.ref}
          tabIndex={tabIndex}
          {...cardProps}
        >
          <Area
            onTap={onTap}
            enabled={enabled}
            media={media}
            readOnly={readOnly}
            text={text}
            textProps={textProps}
            {...cardActionAreaProps}
          >
            {children}
          </Area>

          {hasActions && (
            <Actions
              actions={actions}
              elementProps={this.props}
              enabled={enabled}
              index={this.index}
              navigation={navigation}
              {...cardActionsProps}
            />
          )}

          {hasLinear && (
            <LinearDeterminate
              timeout={timeout}
              enabled={enabled}
              {...progressProps}
            />
          )}
        </Card>
      </div>
    );
  }
}

CardElement.propTypes = {
  /**
   * Array of Material UI Button props object
   * @see {@link https://material-ui.com/api/button/#button-api | MUI Button API}
   */
  actions: PropTypes.arrayOf(PropTypes.object),
  /**
   * @ignore
   * If set to false, component will not be focused when being enabled.
   */
  autoFocus: PropTypes.bool,
  /**
   * Object of Material UI CardActionArea props
   * @see {@link https://material-ui.com/api/card-action-area/#cardactionarea-api | MUI CardActionArea API}
   */
  cardActionAreaProps: PropTypes.object,
  /**
   * Object of Material UI CardActionArea props
   * @see {@link https://material-ui.com/api/card-actions/#cardactions-api | MUI CardAction API}
   */
  cardActionsProps: PropTypes.object,
  /**
   * Object of Material UI CardActionArea props
   * @see {@link https://material-ui.com/api/card/#card-api | MUI Card API}
   */
  cardProps: PropTypes.object,
  /**
   * Your own content displayed in a CardContent component
   * @see {@link https://material-ui.com/components/cards/#card | MUI Card demo}
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   */
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  /**
   * Object of Material UI CardMedia props
   * @see {@link https://material-ui.com/api/card-media/#cardmedia-api | MUI CardMedia API}
   */
  media: PropTypes.object,
  /**
   * Object of Material UI LinearProgress props
   * @see {@link https://material-ui.com/api/linear-progress/#linearprogress-api | MUI LinearProgress API}
   */
  progressProps: PropTypes.object,
  /**
   * @ignore
   */
  tabIndex: PropTypes.number,
  /**
   * If true, will render children directly in a Material UI Typography component
   */
  text: PropTypes.bool,
  /**
   * Object of Material UI Typography props
   * @see {@link https://material-ui.com/api/typography/#typography-api | MUI Typography API}
   */
  textProps: PropTypes.object,
};

CardElement.defaultProps = {
  ...Element.defaultProps,
  actions: [],
  cardActionAreaProps: {},
  cardActionsProps: {},
  cardProps: {},
  media: null,
  progressProps: {},
  text: false,
  textProps: {},
};

const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
});

export default withStyles(styles)(CardElement);
