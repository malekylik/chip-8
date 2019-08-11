import { combineReducers } from 'redux';

import assemblyReducer from './assembly/assembly.reducer';

const appReducer = combineReducers({
  assemblyReducer,
});

export default appReducer;
