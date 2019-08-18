import {
  SET_PROGRAM_COUNT,
  SET_REGISTER_I,
  SET_SOUND_TIMER,
  SET_DELAY_TIMER,
  SET_STACK_POINTER,
  SET_STACK_VALUES,
  SET_REGISTERS,
} from './chip-8.actions';

export default function chip8Reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROGRAM_COUNT: return ({
      ...state,
      programCounter: action.payload.pc,
    });
    case SET_REGISTER_I: return ({
      ...state,
      registerI: action.payload.registerI,
    });
    case SET_SOUND_TIMER: return ({
      ...state,
      soundTimer: action.payload.soundTimer,
    });
    case SET_DELAY_TIMER: return ({
      ...state,
      delayTimer: action.payload.delayTimer,
    });
    case SET_STACK_POINTER: return ({
      ...state,
      stackPointer: action.payload.stackPointer,
    });
    case SET_STACK_VALUES: return ({
      ...state,
      stackValues: action.payload.stackValues,
    });
    case SET_REGISTERS: return ({
      ...state,
      registers: action.payload.registers,
    });
  }

  return state;
}

const initialState = {
  registers: [],
  registerI: 0,
  delayTimer: 0,
  soundTimer: 0,
  programCounter: 0,
  stackPointer: 0,
  stackValues: [],
};
