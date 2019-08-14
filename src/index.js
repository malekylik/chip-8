import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import App from './components/without-jsx/app/app';
import appReducer from './redux/redux';

import './main.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  appReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

ReactDOM.render(
  React.createElement(Provider, { store },
    React.createElement(App, null, null)
  )
, document.getElementById('app'));
