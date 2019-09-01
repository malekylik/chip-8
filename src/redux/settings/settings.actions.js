import { promisifyPostMessage } from '../../worker/utils/index';
import { createStartLoopAction, createSetLoopModeAction } from '../../worker/actions/actions';
import { LOOP_MODS_OPTIONS } from './const/index';

export const SET_IS_RUNNING = '[Settings] SET_IS_RUNNING';
export const SET_SPEED_MODE = '[Settings] SET_SPEED_MODE';

export function setIsRunning(isRunning) {
  return ({
    type: SET_IS_RUNNING,
    payload: { isRunning },
  });
}

export function setSpeedMode(speedMode) {
  return ({
    type: SET_SPEED_MODE,
    payload: { speedMode },
  });
}

export function runCpuThread(cpuThread) {
  return async function (dispatch) {
    await promisifyPostMessage(cpuThread, createStartLoopAction());

    dispatch(setIsRunning(true));

    return true;
  };
}

export function setCpuThreadSpeedMode(cpuThread, speedModeValue) {
  return async function (dispatch) {
    const [speedModeOption] = await Promise.all([
      (async () => LOOP_MODS_OPTIONS.find(({ value }) => value === speedModeValue))(),
      promisifyPostMessage(cpuThread, createSetLoopModeAction(speedModeValue))
    ]);

    dispatch(setSpeedMode(speedModeOption));

    return speedModeValue;
  };
}
