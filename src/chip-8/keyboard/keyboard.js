import { KEYBOARD_KEYS_COUNT, KEYBOARD_MAP, KEY_UNPRESS_VALUE, KEY_PRESS_VALUE } from './const/index';

export function createKeyboard() {
  const keyboardBytes = new ArrayBuffer(KEYBOARD_KEYS_COUNT);

  return {
    keyboard: new Uint8Array(keyboardBytes),
    keyboardMap: { ...KEYBOARD_MAP },
    keyboardKeys: Object.keys(KEYBOARD_MAP)
  };
}

export function createSharedKeyboard() {
  const keyboardBytes = new SharedArrayBuffer(KEYBOARD_KEYS_COUNT);

  return {
    keyboard: new Uint8Array(keyboardBytes),
    keyboardMap: { ...KEYBOARD_MAP },
    keyboardKeys: Object.keys(KEYBOARD_MAP)
  };
}

export function getKeyValue(keyboard, keyCode) {
  return keyboard.keyboard[keyCode];
}

export function pressKey(keyboard, key) {
  return keyboard.keyboard[mapFromRealKeyboardToChip8Keyboard(keyboard, key)] = KEY_PRESS_VALUE;
}

export function releaseKey(keyboard, key) {
  return keyboard.keyboard[mapFromRealKeyboardToChip8Keyboard(keyboard, key)] = KEY_UNPRESS_VALUE;
}

export function isKeyExist(keyboard, key) {
  const { keyboardKeys } = keyboard;

  for (let i = 0; i < keyboardKeys.length; i++) {
    if (keyboardKeys[i] === key) return true;
  }

  return false;
}

export function isKeyPress(keyboard, keyCode) {
  return getKeyValue(keyboard, keyCode) === KEY_PRESS_VALUE;
}

export function isKeyUnpress(keyboard, keyCode) {
  return getKeyValue(keyboard, keyCode) === KEY_UNPRESS_VALUE;
}

export function isAnyKeyPress(keyboard) {
  const keyboardValues = keyboard.keyboard;

  for (let i = 0; i < keyboardValues.length; i++) {
    if (keyboardValues[i] === KEY_PRESS_VALUE) {
      return i;
    }
  }

  return -1;
}

function mapFromRealKeyboardToChip8Keyboard(keyboard, key) {
  return keyboard.keyboardMap[key];
}
