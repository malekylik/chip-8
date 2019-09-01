import { promisifyPostMessage } from '../../worker/utils/index';
import { createStartLoopAction } from '../../worker/actions/actions';

export const SET_IS_RUNNING = '[Settings] SET_IS_RUNNING';

export function setIsRunning(isRunning) {
  return ({
    type: SET_IS_RUNNING,
    payload: { isRunning },
  });
}

export function runCpuThread(cpuThread) {
  return async function (dispatch) {
    await promisifyPostMessage(cpuThread, createStartLoopAction());

    dispatch(setIsRunning(true));

    return true;
  };
}
