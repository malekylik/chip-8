import { promisifyPostMessage } from '../../worker/utils/index';
import { createStartLoopAction, createStopLoopAction, createSetLoopModeAction } from '../../worker/actions/actions';
import { LOOP_MODS_OPTIONS } from './const/index';
import { findOptinByValue } from '../../util/index';

export const SET_IS_RUNNING = '[Settings] SET_IS_RUNNING';
export const SET_SPEED_MODE = '[Settings] SET_SPEED_MODE';
export const SET_RESOLUTION_MODE = '[Settings] SET_RESOLUTION_MODE';
export const SET_SHOW_DEBBUG_INFO = '[Settings] SET_SHOW_DEBBUG_INFO';

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

export function setResolutionMode(resolution) {
  return ({
    type: SET_RESOLUTION_MODE,
    payload: { resolution },
  });
}

export function setShowDebbugInfo(show) {
  return ({
    type: SET_SHOW_DEBBUG_INFO,
    payload: { show },
  });
}

export function runCpuThread(cpuThread) {
  return async function (dispatch) {
    await promisifyPostMessage(cpuThread, createStartLoopAction());

    dispatch(setIsRunning(true));

    return true;
  };
}

export function terminateCpuThread(cpuThread) {
  return async function (dispatch) {
    await promisifyPostMessage(cpuThread, createStopLoopAction());

    dispatch(setIsRunning(false));

    return false;
  };
}

export function setCpuThreadSpeedMode(cpuThread, speedModeValue) {
  return async function (dispatch) {
    const [speedModeOption] = await Promise.all([
      (async () => findOptinByValue(LOOP_MODS_OPTIONS, speedModeValue))(),
      promisifyPostMessage(cpuThread, createSetLoopModeAction(speedModeValue))
    ]);

    dispatch(setSpeedMode(speedModeOption));

    return speedModeValue;
  };
}
