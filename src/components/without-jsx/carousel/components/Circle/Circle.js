import React from 'react';

import './Circle.less';

const Circle = (props) => {
  const { onClick } = props;
  
  return (
    <span className='circle' onClick={onClick}></span>
  );
};

export default Circle;
