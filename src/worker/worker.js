import { getProgramCounter } from '../chip-8/chip-8';

console.log('hello worker changed');

self.addEventListener('message', (event) => {
  console.log('worker', event);

  const { data: { chip8 } } = event;

  function main () {
    requestAnimationFrame(main);

    console.log('pc', getProgramCounter(chip8));
  }

  main();
})
