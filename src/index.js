import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';

import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

import App from './components/without-jsx/app/app';
import Carousel from './components/without-jsx/carousel/Carousel';
import appReducer from './redux/redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  appReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

// const elem = [
//   <div key={1} style={{ width: '25px', backgroundColor: 'red',   marginRight: '4px'                    }}>1</div>,
//   <div key={2} style={{ width: '25px', backgroundColor: 'green', marginLeft: '4px', marginRight: '4px' }}>2</div>,
//   <div key={3} style={{ width: '25px', backgroundColor: 'blue',  marginLeft: '4px', marginRight: '4px' }}>3</div>,
//   <div key={4} style={{ width: '25px', backgroundColor: 'grey',  marginLeft: '4px', marginRight: '4px' }}>4</div>,
//   <div key={5} style={{ width: '25px', backgroundColor: 'brown', marginLeft: '4px', marginRight: '4px' }}>5</div>,
//   <div key={6} style={{ width: '25px', backgroundColor: 'red',   marginLeft: '4px', marginRight: '4px' }}>6</div>,
//   <div key={7} style={{ width: '25px', backgroundColor: 'green', marginLeft: '4px', marginRight: '4px' }}>7</div>,
//   <div key={8} style={{ width: '25px', backgroundColor: 'blue',  marginLeft: '4px', marginRight: '4px' }}>8</div>,
//   <div key={9} style={{ width: '25px', backgroundColor: 'grey',  marginLeft: '4px', marginRight: '4px' }}>9</div>,
//   <div key={10} style={{ width: '25px', backgroundColor: 'brown', marginLeft: '4px'                     }}>10</div>,
// ];

const elem = [
  <div key={1} style={{ width: '150px', backgroundColor: 'red',   marginRight: '4px'                    }}>1</div>,
  <div key={2} style={{ width: '150px', backgroundColor: 'green', marginLeft: '4px', marginRight: '4px' }}>2</div>,
  <div key={3} style={{ width: '150px', backgroundColor: 'blue',  marginLeft: '4px', marginRight: '4px' }}>3</div>,
  <div key={4} style={{ width: '150px', backgroundColor: 'grey',  marginLeft: '4px', marginRight: '4px' }}>4</div>,
  <div key={5} style={{ width: '150px', backgroundColor: 'brown', marginLeft: '4px'                     }}>5</div>,
];

// const elem = [
//   <div key={1} style={{ width: '100px', backgroundColor: 'red',   marginRight: '4px'                    }}>1</div>,
//   <div key={2} style={{ width: '150px', backgroundColor: 'green', marginLeft: '4px', marginRight: '4px' }}>2</div>,
//   <div key={3} style={{ width: '200px', backgroundColor: 'blue',  marginLeft: '4px', marginRight: '4px' }}>3</div>,
//   <div key={4} style={{ width: '120px', backgroundColor: 'grey',  marginLeft: '4px', marginRight: '4px' }}>4</div>,
//   <div key={5} style={{ width: '130px', backgroundColor: 'brown', marginLeft: '4px'                     }}>5</div>,
// ];

// const elem = [
//   <div key={1} style={{ width: '100px', backgroundColor: 'red' }}>1</div>,
//   <div key={2} style={{ width: '150px', backgroundColor: 'green' }}>2</div>,
//   <div key={3} style={{ width: '200px', backgroundColor: 'blue' }}>3</div>,
//   <div key={4} style={{ width: '120px', backgroundColor: 'grey' }}>4</div>,
//   <div key={5} style={{ width: '130px', backgroundColor: 'brown', }}>5</div>,
// ];

ReactDOM.render(
  React.createElement(Provider, { store },
    <Carousel>{elem}</Carousel>
  ), document.getElementById('app'));
