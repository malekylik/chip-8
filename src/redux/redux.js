import { combineReducers } from 'redux';

import assemblyReducer from './assembly/assembly.reducer';
import chip8Reducer from './chip-8/chip-8.reducer';

const appReducer = combineReducers({
  assemblyReducer,
  chip8Reducer,
});

export default appReducer;
