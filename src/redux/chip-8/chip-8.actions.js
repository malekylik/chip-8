export const SET_PROGRAM_COUNT = '[Chip-8] SET_PROGRAM_COUNTER';
export const SET_REGISTER_I = '[Chip-8] SET_REGISTER_I';
export const SET_SOUND_TIMER = '[Chip-8] SET_SOUND_TIMER';
export const SET_DELAY_TIMER = '[Chip-8] SET_DELAY_TIMER';
export const SET_STACK_POINTER = '[Chip-8] SET_STACK_POINTER';
export const SET_STACK_VALUES = '[Chip-8] SET_STACK_VALUES';
export const SET_REGISTERS = '[Chip-8] SET_REGISTERS';
export const INCREMENT_KEY_PRESS_COUNT = '[Chip-8] INCREMENT_KEY_PRESS_COUNT';
export const DECREMENT_KEY_PRESS_COUNT = '[Chip-8] DECREMENT_KEY_PRESS_COUNT';
export const RESET_KEY_PRESS_COUNT = '[Chip-8] RESET_KEY_PRESS_COUNT';

export function setProgramCounter(pc) {
  return ({
    type: SET_PROGRAM_COUNT,
    payload: { pc },
  });
}

export function setRegisterI(registerI) {
  return ({
    type: SET_REGISTER_I,
    payload: { registerI },
  });
}

export function setSoundTimer(soundTimer) {
  return ({
    type: SET_SOUND_TIMER,
    payload: { soundTimer },
  });
}

export function setDelayTimer(delayTimer) {
  return ({
    type: SET_DELAY_TIMER,
    payload: { delayTimer },
  });
}

export function setStackPointer(stackPointer) {
  return ({
    type: SET_STACK_POINTER,
    payload: { stackPointer },
  });
}

export function setStackValues(stackValues) {
  return ({
    type: SET_STACK_VALUES,
    payload: { stackValues },
  });
}

export function setRegisters(registers) {
  return ({
    type: SET_REGISTERS,
    payload: { registers },
  });
}

export function incrementKeyPressCount() {
  return ({
    type: INCREMENT_KEY_PRESS_COUNT,
  });
}

export function decrementKeyPressCount() {
  return ({
    type: DECREMENT_KEY_PRESS_COUNT,
  });
}

export function resetKeyPressCount() {
  return ({
    type: RESET_KEY_PRESS_COUNT,
  });
}
