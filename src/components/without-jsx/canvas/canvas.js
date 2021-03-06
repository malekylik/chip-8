import React from 'react';
import PropTypes from 'prop-types';

export default class Canvas extends React.Component {
  canvasRef = React.createRef();
  ctx = null;

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('2d');
    this.setImageBinaries(this.props.imageData);
  }

  componentWillReceiveProps(nextProps) {
    this.setImageBinaries(nextProps.imageData);
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.width === nextProps.width &&
      this.props.height === nextProps.height
    ) return false;

    return true;
  }

  setImageBinaries(imageData) {
    if (imageData) {
      this.ctx.putImageData(imageData, 0, 0);
    }
  }

  render() {
    const { width, height, onKeyDown, onKeyUp, onBlur } = this.props;

    return (
      React.createElement('canvas', {
        ref: this.canvasRef,
        tabIndex: 0,
        width,
        height,
        onKeyDown,
        onKeyUp,
        onBlur,
      }, null)
    );
  }
}

Canvas.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  imageData: PropTypes.object,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
  onBlur: PropTypes.func,
};

Canvas.defaultProps = {
  width: 300,
  height: 150,
}
