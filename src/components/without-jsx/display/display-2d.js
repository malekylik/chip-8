import React from 'react';
import PropTypes from 'prop-types';

import Canvas from '../canvas/canvas';

import { fillImageDataWithDisplay, scaleDisplay } from '../../../chip-8/display/display';

export default class Display extends React.Component {
  constructor(props) {
    super(props);

    const { width, height } = scaleDisplay(props.scale);

    this.canvasRef = React.createRef();
    this.imageData = new ImageData(width, height);
  }

  componentDidMount() {
    const { display } = this.props;

    fillImageDataWithDisplay(this.imageData, display, this.props.scale);
    this.setImageData(display);
  }

  componentDidUpdate(prevProps) {
    const { scale } = this.props;

    if (prevProps.scale !== scale) {
      const { width, height } = scaleDisplay(scale);
      const { display } = this.props;

      this.imageData = new ImageData(width, height);
      fillImageDataWithDisplay(this.imageData, display, scale);
      this.setImageData(display);
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.scale === nextProps.scale) return false;

    return true;
  }

  updateDisplayData(display) {
    fillImageDataWithDisplay(this.imageData, display, this.props.scale);
    this.setImageData(this.props.display);
  }

  setImageData(display) {
    this.canvasRef.current.setImageBinaries(this.imageData);
  }

  render () {
    const { onKeyDown, onKeyUp, onBlur } = this.props;
    const { width, height } = scaleDisplay(this.props.scale);

    return (
      React.createElement(Canvas, {
        ref: this.canvasRef,
        imageData: this.imageData,
        width,
        height,
        onKeyDown,
        onKeyUp,
        onBlur,
      }, null)
    );
  }
}

Display.propTypes = {
  scale: PropTypes.number,
  display: PropTypes.object,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onBlur: PropTypes.func,
};

Display.defaultProps = {
  scale: 1,
};
