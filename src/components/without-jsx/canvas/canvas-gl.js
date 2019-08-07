import React from 'react';
import PropTypes from 'prop-types';

import { createGLShader } from '../../../gl/shader';
import { createGLProgram, useProgram } from '../../../gl/program';
import { SHADER_TYPES } from '../../../gl/const/index';

const triangle = Float32Array.from([
  0.0, 0.5, 0.0,
  1.0, 0.0, 0.0,

  -0.5, -0.5, 0.0,
  0.0, 1.0, 0.0,

  0.5, -0.5, 0.0,
  0.0, 0.0, 0.5,

]);

export default class CanvasGL extends React.Component {
  canvasRef = React.createRef();
  ctx = null;

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext('webgl2');
    // this.setImageData(this.props.imageData);

    const { ctx: gl } = this;

    Promise.all([
      fetch('./src/assets/shaders/main.vert'),
      fetch('./src/assets/shaders/main.frag')
    ]
    ).then(([vert, frag]) => Promise.all([vert.text(), frag.text()]))
    .then(([vert, frag]) => {
      console.log(vert, frag)

      gl.viewport(0, 0, this.props.width, this.props.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      const vertShader = createGLShader(gl, SHADER_TYPES.vertexShader, vert);
      const fragShader = createGLShader(gl, SHADER_TYPES.fragmentShader, frag);
      
      const program = createGLProgram(gl, vertShader, fragShader);

      useProgram(gl, program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, triangle, gl.STATIC_DRAW);

      gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
      gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
      gl.enableVertexAttribArray(0);
      gl.enableVertexAttribArray(1);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    });
  }

  componentWillReceiveProps(nextProps) {
    // this.setImageData(nextProps.imageData);
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.width === nextProps.width &&
      this.props.height === nextProps.height
    ) return false;

    return true;
  }

  setImageData(imageData) {
    const { ctx } = this;

    // ctx.texImage2D(
    //   ctx.TEXTURE_2D,
    //   0,
    //   ctx.R8,
    //   64,
    //   32,
    //   0,
    //   ctx.RED,
    //   ctx.UNSIGNED_BYTE,
    //   imageData,
    //   0);
    // if (imageData) {
    //   this.ctx.putImageData(imageData, 0, 0);
    // }
  }

  render() {
    const { width, height, onKeyDown, onKeyUp } = this.props;

    return (
      React.createElement('canvas', {
        ref: this.canvasRef,
        tabIndex: 0,
        width,
        height,
        onKeyDown,
        onKeyUp,
      }, null)
    );
  }
}

CanvasGL.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  imageData: PropTypes.object,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
};

CanvasGL.defaultProps = {
  width: 300,
  height: 150,
}
