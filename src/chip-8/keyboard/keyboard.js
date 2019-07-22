import { KEYBOARD_KEYS_COUNT, KEYBOARD_MAP, KEY_UNPRESS_VALUE, KEY_PRESS_VALUE } from './const/index';

export function createKeyboard() {
  const keyboardBytes = new ArrayBuffer(KEYBOARD_KEYS_COUNT);

  return {
    keyboard: new Uint8Array(keyboardBytes),
    keyboardMap: Uint8Array.from(KEYBOARD_MAP)
  };
}

export function getKeyValue(keyboard, key) {
  return keyboard.keyboard[mapFromRealKeyboardToChip8Keyboard(key)];
}

export function isKeyPress(keyboard, key) {
  return getKeyValue(keyboard, key) === KEY_PRESS_VALUE;
}

export function isKeyUnpress(keyboard, key) {
  return getKeyValue(keyboard, key) === KEY_UNPRESS_VALUE;
}

function mapFromRealKeyboardToChip8Keyboard(keyboard, key) {
  return keyboard.keyboardMap[key];
}
