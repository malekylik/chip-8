import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { connect } from 'react-redux';

import { isKeyPress } from '../../../chip-8/keyboard/keyboard';
import {
  KEY_1,
  KEY_2,
  KEY_3,
  KEY_C,

  KEY_4,
  KEY_5,
  KEY_6,
  KEY_D,

  KEY_7,
  KEY_8,
  KEY_9,
  KEY_E,

  KEY_A,
  KEY_0,
  KEY_B,
  KEY_F,
} from '../../../chip-8/keyboard/const/index.js';
import { keyPressCount } from '../../../redux/chip-8/chip-8.selectors';

import './keyboard-state.less';

const label1 = (<span className='key__label'>1</span>);
const label2 = (<span className='key__label'>2</span>);
const label3 = (<span className='key__label'>3</span>);
const labelC = (<span className='key__label'>C</span>);

const label4 = (<span className='key__label'>4</span>);
const label5 = (<span className='key__label'>5</span>);
const label6 = (<span className='key__label'>6</span>);
const labelD = (<span className='key__label'>D</span>);

const label7 = (<span className='key__label'>7</span>);
const label8 = (<span className='key__label'>8</span>);
const label9 = (<span className='key__label'>9</span>);
const labelE = (<span className='key__label'>E</span>);

const labelA = (<span className='key__label'>A</span>);
const label0 = (<span className='key__label'>0</span>);
const labelB = (<span className='key__label'>B</span>);
const labelF = (<span className='key__label'>F</span>);

const KeyboardState = ({ keyboard }) => {
  const key1ClassName = classNames('keyboard__key', { 'keyboard__key--press': isKeyPress(keyboard, KEY_1) });
  const key2ClassName = classNames('keyboard__key', { 'keyboard__key--press': isKeyPress(keyboard, KEY_2) });
  const key3ClassName = classNames('keyboard__key', { 'keyboard__key--press': isKeyPress(keyboard, KEY_3) });
  const keyCClassName = classNames('keyboard__key', { 'keyboard__key--press': isKeyPress(keyboard, KEY_C) });

  const key4ClassName = classNames('keyboard__key', { 'keyboard__key--press': isKeyPress(keyboard, KEY_4) });
  const key5ClassName = classNames('keyboard__key', { 'keyboard__key--press': isKeyPress(keyboard, KEY_5) });
  const key6ClassName = classNames('keyboard__key', { 'keyboard__key--press': isKeyPress(keyboard, KEY_6) });
  const keyDClassName = classNames('keyboard__key', { 'keyboard__key--press': isKeyPress(keyboard, KEY_D) });

  const key7ClassName = classNames('keyboard__key', { 'keyboard__key--press': isKeyPress(keyboard, KEY_7) });
  const key8ClassName = classNames('keyboard__key', { 'keyboard__key--press': isKeyPress(keyboard, KEY_8) });
  const key9ClassName = classNames('keyboard__key', { 'keyboard__key--press': isKeyPress(keyboard, KEY_9) });
  const keyEClassName = classNames('keyboard__key', { 'keyboard__key--press': isKeyPress(keyboard, KEY_E) });

  const keyAClassName = classNames('keyboard__key', { 'keyboard__key--press': isKeyPress(keyboard, KEY_A) });
  const key0ClassName = classNames('keyboard__key', { 'keyboard__key--press': isKeyPress(keyboard, KEY_0) });
  const keyBClassName = classNames('keyboard__key', { 'keyboard__key--press': isKeyPress(keyboard, KEY_B) });
  const keyFClassName = classNames('keyboard__key', { 'keyboard__key--press': isKeyPress(keyboard, KEY_F) });

  return (
    React.createElement('div', { className: 'keyboard' },
      React.createElement('ul', { className: 'keyboard__row' },
        React.createElement('li', { className: key1ClassName }, label1),
        React.createElement('li', { className: key2ClassName }, label2),
        React.createElement('li', { className: key3ClassName }, label3),
        React.createElement('li', { className: keyCClassName }, labelC),
      ),
      React.createElement('ul', { className: 'keyboard__row' },
        React.createElement('li', { className: key4ClassName }, label4),
        React.createElement('li', { className: key5ClassName }, label5),
        React.createElement('li', { className: key6ClassName }, label6),
        React.createElement('li', { className: keyDClassName }, labelD),
      ),
      React.createElement('ul', { className: 'keyboard__row' },
        React.createElement('li', { className: key7ClassName }, label7),
        React.createElement('li', { className: key8ClassName }, label8),
        React.createElement('li', { className: key9ClassName }, label9),
        React.createElement('li', { className: keyEClassName }, labelE),
      ),
      React.createElement('ul', { className: 'keyboard__row' },
        React.createElement('li', { className: keyAClassName }, labelA),
        React.createElement('li', { className: key0ClassName }, label0),
        React.createElement('li', { className: keyBClassName }, labelB),
        React.createElement('li', { className: keyFClassName }, labelF),
      )
    )
  );
};

KeyboardState.propTypes = {
  keyboard: PropTypes.object.isRequired,
  keyPressCount: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return ({
    keyPressCount: keyPressCount(state),
  });
}

export default connect(mapStateToProps)(KeyboardState);
