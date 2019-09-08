import { LOOP_MODS_OPTIONS, RESOLUTIONS_MODS } from './const/index';
import { SET_IS_RUNNING, SET_SPEED_MODE, SET_RESOLUTION_MODE, SET_SHOW_DEBBUG_INFO } from './settings.actions';

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_RUNNING: return ({
      ...state,
      isRunning: action.payload.isRunning,
    });
    case SET_SPEED_MODE: return ({
      ...state,
      speedMode: action.payload.speedMode,
    });
    case SET_RESOLUTION_MODE: return ({
      ...state,
      resolution: action.payload.resolution,
    });
    case SET_SHOW_DEBBUG_INFO: return ({
      ...state,
      showDebbugInfo: action.payload.show,
    });
  }

  return state;
}

const initialState = {
  isRunning: false,
  showDebbugInfo: true,
  resolution: RESOLUTIONS_MODS[2],
  speedMode: LOOP_MODS_OPTIONS[0],
};
