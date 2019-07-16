import React from 'react';
import ReactDOM from 'react-dom';

import './main.css';
import { creatProcessor, executeOpcode } from './chip-8/processor/processor';
import { MOCK_GAME } from './chip-8/processor/const';
import { createOpcode } from './chip-8/processor/opcode/opcode';

class ABC extends React.Component {
  state = { a: 'asd' }
}

ReactDOM.render(<span className='span'>hello</span>, document.getElementById('app'));

const processor = creatProcessor();

for (let i = 0; i + 2 < MOCK_GAME.length; i += 2) {
  executeOpcode(processor, createOpcode(MOCK_GAME.subarray(i, i + 2)));
}
