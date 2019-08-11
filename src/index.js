import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/without-jsx/app/app';
import appReducer from './redux/redux';

import './main.css';

const store = createStore(
  appReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  React.createElement(Provider, { store },
    React.createElement(App, null, null)
  )
, document.getElementById('app'));
