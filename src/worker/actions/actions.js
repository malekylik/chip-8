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
