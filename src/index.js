import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/without-jsx/app/app';

import './main.css';

ReactDOM.render(React.createElement(App, null, null), document.getElementById('app'));
