import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { createGLShader, deleteShader } from '../../../gl/shader';
import { createGLProgram, useProgram } from '../../../gl/program';
import { SHADER_TYPES } from '../../../gl/const/index';
import { DISPLAY_WIDTH, DISPLAY_HEIGHT } from '../../../chip-8/display/const/index';
import { selectVertShader, selectFragShader } from '../../../redux/shader/shader.selectors';

class CanvasGL extends React.Component {
  canvasRef = React.createRef();
  gl = null;
  program = null;
  texture = null;

  initGL() {
    const { vertShader: vert, fragShader: frag } = this.props;
    const { gl } = this;

    const VERTEX_ATTRIB_LOCATION = 0;
    const TEX_COORD_ATTRIB_LOCATION = 1;

    const VERTEX_COMPONENTS_COUNT = 3;
    const TEX_CORD_COMPONENTS_COUNT = 2;
    const TOTAL_COMPONENTS_COUNT = VERTEX_COMPONENTS_COUNT + TEX_CORD_COMPONENTS_COUNT;

    gl.viewport(0, 0, this.props.width, this.props.height);
    gl.clearColor(0, 0, 0, 0);

    const vertShader = createGLShader(gl, SHADER_TYPES.vertexShader, vert);
    const fragShader = createGLShader(gl, SHADER_TYPES.fragmentShader, frag);

    const program = createGLProgram(gl, vertShader, fragShader);

    deleteShader(gl, vertShader);
    deleteShader(gl, fragShader);

    const texUniformLocation = gl.getUniformLocation(program.nativeProgram, 's_texture');

    useProgram(gl, program);

    const buffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, triangle, gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indecies, gl.STATIC_DRAW);

    gl.vertexAttribPointer(VERTEX_ATTRIB_LOCATION, VERTEX_COMPONENTS_COUNT, gl.FLOAT, false, TOTAL_COMPONENTS_COUNT * Float32Array.BYTES_PER_ELEMENT, 0);
    gl.vertexAttribPointer(TEX_COORD_ATTRIB_LOCATION, TEX_CORD_COMPONENTS_COUNT, gl.FLOAT, false, TOTAL_COMPONENTS_COUNT * Float32Array.BYTES_PER_ELEMENT, VERTEX_COMPONENTS_COUNT * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(VERTEX_ATTRIB_LOCATION);
    gl.enableVertexAttribArray(TEX_COORD_ATTRIB_LOCATION);

    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    gl.activeTexture(gl.TEXTURE0);

    gl.uniform1i(texUniformLocation, 0);

    this.texture = texture;
    this.program = program;
  }

  componentDidMount() {
    this.gl = this.canvasRef.current.getContext('webgl2');

    this.initGL();
    this.setImageBinaries(this.props.displayBuffer);
  }

  componentWillReceiveProps(nextProps) {
    this.setImageBinaries(nextProps.displayBuffer);
  }

  shouldComponentUpdate(nextProps) {
    if (
      this.props.width === nextProps.width &&
      this.props.height === nextProps.height
    ) return false;

    return true;
  }

  setImageBinaries(displayBuffer) {
    const { gl } = this;

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.R8, DISPLAY_WIDTH, DISPLAY_HEIGHT, 0, gl.RED, gl.UNSIGNED_BYTE, displayBuffer);
    gl.drawElements(gl.TRIANGLES, indecies.length, gl.UNSIGNED_SHORT, 0);
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
  displayBuffer: PropTypes.object.isRequired,
  vertShader: PropTypes.string.isRequired,
  fragShader: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  onKeyDown: PropTypes.func,
  onKeyUp: PropTypes.func,
};

CanvasGL.defaultProps = {
  width: 300,
  height: 150,
};

const triangle = Float32Array.from([
  // first triangle
  -1.0, 1.0, 0.0, // top-left v0
  0.0, 0.0, // texCoord v0

  1.0, 1.0, 0.0, // top-right v1
  1.0, 0.0, // texCoord v1

  -1.0, -1.0, 0.0, // bottom-left v2
  0.0, 1.0, // texCoord v2

  // second triangle
  1.0, 1.0, 0.0, // top-rigth v1
  1.0, 0.0, // texCoord v1

  1.0, -1.0, 0.0, // bottom-right v4
  1.0, 1.0, // texCoord v4

  -1.0, -1.0, 0.0, // bottom-left v2
  0.0, 1.0, // texCoord v2
]);

const indecies = Uint16Array.from([
  0, 1, 2,
  1, 4, 2,
]);

function mapStateToProps(state) {
  return ({
    vertShader: selectVertShader(state),
    fragShader: selectFragShader(state),
  });
}

export default connect(mapStateToProps, null, null, { forwardRef: true })(CanvasGL);
