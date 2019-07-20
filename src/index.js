import React from 'react';
import ReactDOM from 'react-dom';

import './main.css';
import { creatProcessor, executeOpcode } from './chip-8/processor/processor';
import { getProgramCounter } from './chip-8/processor/methods';
import { MOCK_GAME, OPCODE_BYTES } from './chip-8/processor/const';
import { createOpcode } from './chip-8/processor/opcode/opcode';
import { createStack } from './chip-8/stack/stack';
import { createMemory, loadGame, readMemory, loadFonts } from './chip-8/memory/memory';
import { createDisplay } from './chip-8/display/display';
import { FONTS } from './chip-8/display/const/index';

ReactDOM.render(<span className='span'>hello</span>, document.getElementById('app'));

const processor = creatProcessor();
const stack = createStack();
const memory = createMemory();
const display = createDisplay();

loadFonts(memory, FONTS);
loadGame(memory, MOCK_GAME);

function main() {
  requestAnimationFrame(main);

  const PC = getProgramCounter(processor);
  const opcode = createOpcode(readMemory(memory, PC, OPCODE_BYTES));

  executeOpcode(processor, opcode, stack, memory, display);

  console.log(`PC: ${PC}`);
}

main();
