import { CPU_THREAD_ACTIONS } from '../const/actions';

export function createInitAction(chip8, error = false) {
  return ({
    eventType: CPU_THREAD_ACTIONS.INIT,
    payload: { chip8 },
    error,
  });
}

export function createStartLoopAction(error = false) {
  return ({
    eventType: CPU_THREAD_ACTIONS.RUN_LOOP,
    payload: null,
    error,
  });
}

export function createSetLoopModeAction(mode, error = false) {
  return ({
    eventType: CPU_THREAD_ACTIONS.SET_LOOP_MODE,
    payload: { mode },
    error,
  });
}

export function createExecuteNextInstructionAction(error = false) {
  return ({
    eventType: CPU_THREAD_ACTIONS.EXECUTE_NEXT_INSTRUCTION,
    payload: null,
    error,
  });
}

export function createStopLoopAction(error) {
  return ({
    eventType: CPU_THREAD_ACTIONS.STOP_LOOP,
    payload: null,
    error,
  });
}
