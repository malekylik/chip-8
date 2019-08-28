import { CPU_THREAD_ACTIONS } from './const/actions';
import { executeNextCycly, getProgramCounter } from '../chip-8/chip-8';

console.log('hello worker changed');

let threadChip8 = null;
let clearInterval = () => {};

self.addEventListener('message', (event) => {
  const { data: { eventType, payload } } = event;

  console.log('eventType', eventType);
  console.log('data', payload);

  switch (eventType) {
    case CPU_THREAD_ACTIONS.INIT: threadChip8 = payload.chip8; break;
    case CPU_THREAD_ACTIONS.RUN_LOOP: {
      clearInterval();

      runLoop();

      break;
    }
  }
});

function runLoop() {
  clearInterval = setInterval(main, 1000 / 60);

  main();
}

function main() {
  console.log('pc', getProgramCounter(threadChip8));

  executeNextCycly(threadChip8);
}
