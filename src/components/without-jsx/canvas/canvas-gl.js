import React from 'react';
import PropTypes from 'prop-types';

import { createGLShader } from '../../../gl/shader';
import { createGLProgram, useProgram } from '../../../gl/program';
import { SHADER_TYPES } from '../../../gl/const/index';

const triangle = Float32Array.from([
  // first triangle
  -1.0, 1.0, 0.0, // top-left v0
  0.0, 1.0, // texCoord v0

  1.0, 1.0, 0.0, // top-right v1
  1.0, 1.0, // texCoord v1

  -1.0, -1.0, 0.0, // bottom-left v2
  0.0, 0.0, // texCoord v2

  // second triangle
  1.0, 1.0, 0.0, // top-rigth v1
  1.0, 1.0, // texCoord v1

  1.0, -1.0, 0.0, // bottom-right v4
  1.0, 0.0, // texCoord v4

  -1.0, -1.0, 0.0, // bottom-left v2
  0.0, 0.0, // texCoord v2
]);

const indecies = Uint16Array.from([
  0, 1, 2,
  1, 4, 2,
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

      const textUniformLocation = gl.getUniformLocation(program.nativeProgram, 's_texture');

      useProgram(gl, program);

      const buffer = gl.createBuffer();
      const indexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, triangle, gl.STATIC_DRAW);

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indecies, gl.STATIC_DRAW);

      gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
      gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
      gl.enableVertexAttribArray(0);
      gl.enableVertexAttribArray(1);

      gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, 64, 32, 0, gl.RED, gl.UNSIGNED_BYTE, this.props.imageData);

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

      gl.activeTexture(gl.TEXTURE0);

      gl.uniform1i(textUniformLocation, 0);
      //   glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER,
      //   GL_NEAREST);

      gl.drawElements(gl.TRIANGLES, indecies.length, gl.UNSIGNED_SHORT, 0);

      this.texture = texture;
      this.program = program;
      this.textUniformLocation = textUniformLocation;
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
    const { ctx: gl } = this;

    if (this.texture) {
      gl.clear(gl.COLOR_BUFFER_BIT);
      // useProgram(gl, this.program);

      // gl.bindTexture(gl.TEXTURE_2D, this.texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, 64, 32, 0, gl.RED, gl.UNSIGNED_BYTE, imageData);
      gl.drawElements(gl.TRIANGLES, indecies.length, gl.UNSIGNED_SHORT, 0);
    }

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
