import { SHADER_TYPES } from './const/index';
import { getShaderType, getNativeShader } from './shader';

export function createGLProgram(gl, vertShader, fragShader) {
  const program = gl.createProgram();

  if (getShaderType(vertShader) !== SHADER_TYPES.vertexShader) console.warn('Invalid vertex shader type');
  if (getShaderType(fragShader) !== SHADER_TYPES.fragmentShader) console.warn('Invalid fragment shader type');

  gl.attachShader(program, getNativeShader(vertShader));
  gl.attachShader(program, getNativeShader(fragShader));

  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(program);

    console.warn(`Fail to link program: ${info}`);

    gl.deleteProgram(program);

    return null;
  }

  return createProgram(program, true, false);
}

export function createProgram(nativeProgram, isLinked, isDeleted) {
  return ({
    nativeProgram,
    isLinked,
    isDeleted,
  });
}

export function getNativeProgram(program) {
  return program.nativeProgram;
}
