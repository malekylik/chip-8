import { CPU_THREAD_ACTIONS } from '../const/actions';

export function createInitAction(chip8) {
  return ({
    eventType: CPU_THREAD_ACTIONS.INIT,
    payload: { chip8 }
  });
}

export function createStartLoopAction() {
  return ({
    eventType: CPU_THREAD_ACTIONS.RUN_LOOP,
  });
}

export function createSetLoopModeAction(mode) {
  return ({
    eventType: CPU_THREAD_ACTIONS.SET_LOOP_MODE,
    payload: { mode }
  });
}

export function createExecuteNextInstructionAction() {
  return ({
    eventType: CPU_THREAD_ACTIONS.EXECUTE_NEXT_INSTRUCTION,
  });
}

export function createStopLoopAction() {
  return ({
    eventType: CPU_THREAD_ACTIONS.STOP_LOOP,
  });
}
