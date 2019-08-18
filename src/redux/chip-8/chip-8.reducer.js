import { SET_PROGRAM_COUNT } from './chip-8.actions';

export default function chip8Reducer(state = initialState, action) {
  switch (action.type) {
    case SET_PROGRAM_COUNT: return ({
      ...state,
      programCounter: action.payload.pc,
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
