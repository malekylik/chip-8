import { combineReducers } from 'redux';

import assemblyReducer from './assembly/assembly.reducer';
import chip8Reducer from './chip-8/chip-8.reducer';
import shaderReducer from './shader/shader.reducer';
import settingsReducer from './settings/settings.reducer';

const appReducer = combineReducers({
  assemblyReducer,
  chip8Reducer,
  shaderReducer,
  settingsReducer,
});

export default appReducer;
