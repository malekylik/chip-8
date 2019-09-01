import { LOOP_MODS_OPTIONS, RESOLUTIONS_MODS } from './const/index';

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
  }

  return state;
}

const initialState = {
  isRunning: false,
  resolution: RESOLUTIONS_MODS[2],
  speedMode: LOOP_MODS_OPTIONS[0],
};
