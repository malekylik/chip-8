import { CPU_THREAD_ACTIONS } from './const/actions';
import { LOOP_MODS } from './const/mode';
import { SYNC_INDEX } from './const/worker';
import { executeNextCycly, getMemory } from '../chip-8/chip-8';
import { getBytesFromMemory } from '../chip-8/memory/memory';
import { createFutex, wait } from './utils/index';
import {
  createInitAction,
  createStartLoopAction,
  createSetLoopModeAction,
  createExecuteNextInstructionAction,
  createStopLoopAction,
} from './actions/actions';

let threadChip8 = null;
let clearThreadInterval = () => {};
let loopMode = LOOP_MODS.DEFAULT_SPEED_MODE;
let futex = null;

self.addEventListener('message', (event) => {
  const { data: { eventType, payload } } = event;

  switch (eventType) {
    case CPU_THREAD_ACTIONS.INIT: {
      threadChip8 = payload.chip8;
      futex = createFutex(getBytesFromMemory(getMemory(threadChip8)).buffer, SYNC_INDEX);

      self.postMessage(createInitAction(threadChip8, false));

      break;
    }
    case CPU_THREAD_ACTIONS.RUN_LOOP: {
      clearThreadInterval();

      runLoop(loopMode);

      self.postMessage(createStartLoopAction(false));

      break;
    }
    case CPU_THREAD_ACTIONS.SET_LOOP_MODE: {
      loopMode = payload.mode;

      self.postMessage(createSetLoopModeAction(payload.mode, false));

      break;
    }
    case CPU_THREAD_ACTIONS.EXECUTE_NEXT_INSTRUCTION: {
      executeNextCycly(threadChip8);

      self.postMessage(createExecuteNextInstructionAction(false));

      break;
    }
    case CPU_THREAD_ACTIONS.STOP_LOOP: {
      clearThreadInterval();

      self.postMessage(createStopLoopAction(false));

      break;
    }
  }
});

function runLoop(speed) {
  clearThreadInterval = createClearInterval(setInterval(main, speed));

  main();
}

function main() {
  wait(futex);
  executeNextCycly(threadChip8);
}

function createClearInterval(id) {
  return function () {
    clearInterval(id);
  }
}
