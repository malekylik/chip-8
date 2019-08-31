import { LOOP_MODS } from '../../worker/const/mode';

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
  }

  return state;
}

const initialState = {
  isRunning: false,
  resolution: 10,
  speedMode: LOOP_MODS.DEFAULT_SPEED_MODE,
};
