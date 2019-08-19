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

import './keyboard-state.css';

const KeyboardState = ({ keyboard }) => {
  const key1ClassName = classNames({ 'keyboard_key--press': isKeyPress(keyboard, KEY_1) });
  const key2ClassName = classNames({ 'keyboard_key--press': isKeyPress(keyboard, KEY_2) });
  const key3ClassName = classNames({ 'keyboard_key--press': isKeyPress(keyboard, KEY_3) });
  const keyCClassName = classNames({ 'keyboard_key--press': isKeyPress(keyboard, KEY_C) });

  const key4ClassName = classNames({ 'keyboard_key--press': isKeyPress(keyboard, KEY_4) });
  const key5ClassName = classNames({ 'keyboard_key--press': isKeyPress(keyboard, KEY_5) });
  const key6ClassName = classNames({ 'keyboard_key--press': isKeyPress(keyboard, KEY_6) });
  const keyDClassName = classNames({ 'keyboard_key--press': isKeyPress(keyboard, KEY_D) });

  const key7ClassName = classNames({ 'keyboard_key--press': isKeyPress(keyboard, KEY_7) });
  const key8ClassName = classNames({ 'keyboard_key--press': isKeyPress(keyboard, KEY_8) });
  const key9ClassName = classNames({ 'keyboard_key--press': isKeyPress(keyboard, KEY_9) });
  const keyEClassName = classNames({ 'keyboard_key--press': isKeyPress(keyboard, KEY_E) });

  const keyAClassName = classNames({ 'keyboard_key--press': isKeyPress(keyboard, KEY_A) });
  const key0ClassName = classNames({ 'keyboard_key--press': isKeyPress(keyboard, KEY_0) });
  const keyBClassName = classNames({ 'keyboard_key--press': isKeyPress(keyboard, KEY_B) });
  const keyFClassName = classNames({ 'keyboard_key--press': isKeyPress(keyboard, KEY_F) });

  return (
    React.createElement('div', { className: 'keyboard' },
      React.createElement('span', { className: key1ClassName }, '1'),
      React.createElement('span', { className: key2ClassName }, '2'),
      React.createElement('span', { className: key3ClassName }, '3'),
      React.createElement('span', { className: keyCClassName }, 'C'),

      React.createElement('span', { className: key4ClassName }, '4'),
      React.createElement('span', { className: key5ClassName }, '5'),
      React.createElement('span', { className: key6ClassName }, '6'),
      React.createElement('span', { className: keyDClassName }, 'D'),

      React.createElement('span', { className: key7ClassName }, '7'),
      React.createElement('span', { className: key8ClassName }, '8'),
      React.createElement('span', { className: key9ClassName }, '9'),
      React.createElement('span', { className: keyEClassName }, 'E'),

      React.createElement('span', { className: keyAClassName }, 'A'),
      React.createElement('span', { className: key0ClassName }, '0'),
      React.createElement('span', { className: keyBClassName }, 'B'),
      React.createElement('span', { className: keyFClassName }, 'F'),
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
