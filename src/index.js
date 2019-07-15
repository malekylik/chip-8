import React from 'react';
import ReactDOM from 'react-dom';

import './main.css';

class ABC extends React.Component {
    state = { a: 'asd' }
}

ReactDOM.render(<span className='span'>hello</span>, document.getElementById('app'));
