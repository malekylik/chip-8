import { combineReducers } from 'redux';

import assemblyReducer from './assembly/assembly.reducer';
import chip8Reducer from './chip-8/chip-8.reducer';
import shaderReducer from './shader/shader.reducer';

const appReducer = combineReducers({
  assemblyReducer,
  chip8Reducer,
  shaderReducer,
});

export default appReducer;
