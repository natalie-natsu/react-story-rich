import React from 'react';
import PropTypes from 'prop-types';
import { connect, Provider as ReduxProvider } from 'react-redux';

import store from '../store';
import ElementPresentational from '../components/Element';
import StoryPresentational from '../components/Story';
import mapStateToProps from './mapStateToProps';

export const Element = connect(mapStateToProps)(ElementPresentational);
export const Story = connect(mapStateToProps)(StoryPresentational);

export const Provider = ({ children }) => (<ReduxProvider store={store}>{children}</ReduxProvider>);
Provider.propTypes = { children: PropTypes.node.isRequired };
