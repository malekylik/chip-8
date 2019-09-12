import { SET_NEW_ROM } from './roms.actions';
import { TEST_ROM, BRIX } from '../../chip-8/processor/const/index';

export default function romsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NEW_ROM: return ({
      ...state,
      roms: state.roms.concat({
        name: action.payload.name,
        rom: action.payload.rom,
      })
    });
  }

  return state;
}

const initialState = {
  roms: [
    {
      name: 'TEST',
      rom: TEST_ROM,
    },
    {
      name: 'BRIX',
      rom: BRIX,
    },
  ]
};
