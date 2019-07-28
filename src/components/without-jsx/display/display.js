import React from 'react';
import PropTypes from 'prop-types';

import Canvas from '../canvas/canvas';

import { fillImageDataWithDisplay } from '../../../chip-8/display/display';

export default class Display extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
    this.imageData = new ImageData(this.props.width, this.props.height);
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.width === nextProps.width &&
      this.props.height === nextProps.height
    ) return false;

    return true;
  }

  updateDisplayData(display) {
    fillImageDataWithDisplay(this.imageData, display, 1);
    this.setImageData();
  }

  setImageData() {
    this.canvasRef.current.setImageData(this.imageData);
  }

  render () {
    const { width, height } = this.props;

    return (
      React.createElement(Canvas, { ref: this.canvasRef, imageData: this.imageData, width, height }, null)
    );
  }
}

Display.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  display: PropTypes.object,
};

Display.defaultProps = {
  width: 64,
  height: 32,
};
