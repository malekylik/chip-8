import React from 'react';
import ReactDOM from 'react-dom';

import './main.css';
import { creatProcessor, executeOpcode } from './chip-8/processor/processor';
import { getProgramCounter } from './chip-8/processor/methods';
import { MOCK_GAME, PROGRAM_START_ADDRESS } from './chip-8/processor/const';
import { createOpcode } from './chip-8/processor/opcode/opcode';

class ABC extends React.Component {
  state = { a: 'asd' }
}

ReactDOM.render(<span className='span'>hello</span>, document.getElementById('app'));

const processor = creatProcessor();

function main() {
  requestAnimationFrame(main);

  const I = getProgramCounter(processor) - PROGRAM_START_ADDRESS;

  executeOpcode(processor, createOpcode(MOCK_GAME.subarray(I, I + 2)));

  console.log(`I: ${I}`);
}

main();
