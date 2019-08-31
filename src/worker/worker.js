import { CPU_THREAD_ACTIONS } from './const/actions';
import { LOOP_MODS } from './const/mode';
import { executeNextCycly, getMemory } from '../chip-8/chip-8';
import { CPU_THREAD_SYNC } from '../chip-8/memory/const/index';
import { getBytesFromMemory } from '../chip-8/memory/memory';
import { byteIndexToFutexBufferIndex, createFutex, wait } from './utils/index';
import {
  createInitAction,
  createStartLoopAction,
  createSetLoopModeAction,
  createExecuteNextInstructionAction,
  createStopLoopAction,
} from './actions/actions';

const syncIndex = byteIndexToFutexBufferIndex(CPU_THREAD_SYNC);

let threadChip8 = null;
let clearInterval = () => {};
let loopMode = LOOP_MODS.DEFAULT_SPEED_MODE;
let futex = null;

self.addEventListener('message', (event) => {
  const { data: { eventType, payload } } = event;

  console.log('eventType', eventType);
  console.log('data', payload);

  switch (eventType) {
    case CPU_THREAD_ACTIONS.INIT: {
      threadChip8 = payload.chip8;
      futex = createFutex(getBytesFromMemory(getMemory(threadChip8)).buffer, syncIndex);

      self.postMessage(createInitAction(threadChip8, false));

      break;
    }
    case CPU_THREAD_ACTIONS.RUN_LOOP: {
      clearInterval();

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
      clearInterval();

      self.postMessage(createStopLoopAction(false));

      break;
    }
  }
});

function runLoop(speed) {
  clearInterval = setInterval(main, speed);

  main();
}

function main() {
  wait(futex);
  executeNextCycly(threadChip8);
}
