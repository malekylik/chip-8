import React from 'react';
import PropTypes from 'prop-types';

export default class Canvas extends React.Component {
  canvasRef = React.createRef();
  ctx = null;

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');
    this.setImageData(this.props.imageData);
  }

  componentWillReceiveProps(nextProps) {
    this.setImageData(nextProps.imageData);
  }

  setImageData(imageData) {
    if (imageData) {
      this.ctx.putImageData(imageData, 0, 0);
    }
  }

  render() {
    const { width, height } = this.props;

    return (
      React.createElement('canvas', { width, height, ref: this.canvasRef }, null)
    );
  }
}

Canvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  imageData: PropTypes.object,
};

Canvas.defaultProps = {
  width: 300,
  height: 150,
}
