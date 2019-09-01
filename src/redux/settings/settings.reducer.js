import { LOOP_MODS_OPTIONS, RESOLUTIONS_MODS } from './const/index';
import { SET_IS_RUNNING } from './settings.actions';

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_RUNNING: return ({
      ...state,
      isRunning: action.payload.isRunning,
    });
  }

  return state;
}

const initialState = {
  isRunning: false,
  resolution: RESOLUTIONS_MODS[2],
  speedMode: LOOP_MODS_OPTIONS[0],
};
