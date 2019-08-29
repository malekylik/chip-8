import { CPU_THREAD_ACTIONS } from './const/actions';
import { LOOP_MODS } from './const/mode';
import { executeNextCycly, getProgramCounter } from '../chip-8/chip-8';

console.log('hello worker changed');

let threadChip8 = null;
let clearInterval = () => {};
let loopMode = LOOP_MODS.DEFAULT_SPEED_MODE;

self.addEventListener('message', (event) => {
  const { data: { eventType, payload } } = event;

  console.log('eventType', eventType);
  console.log('data', payload);

  switch (eventType) {
    case CPU_THREAD_ACTIONS.INIT: threadChip8 = payload.chip8; break;
    case CPU_THREAD_ACTIONS.RUN_LOOP: {
      clearInterval(loopMode);

      runLoop(payload.mode);

      break;
    }
    case CPU_THREAD_ACTIONS.SET_LOOP_MODE: loopMode = payload.mode; break;
  }
});

function runLoop(speed) {
  clearInterval = setInterval(main, speed);

  main();
}

function main() {
  console.log('pc', getProgramCounter(threadChip8));

  executeNextCycly(threadChip8);
}
