import { SHADER_TYPES } from './const/index';
import { ENABLED_PROGRAM, DISABLED_PROGRAM } from './const/index';
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

  return createProgram(program, true, false, false);
}

export function createProgram(nativeProgram, isLinked, isUsed, isDeleted) {
  return ({
    nativeProgram,
    isLinked,
    isUsed,
    isDeleted,
  });
}

export function getNativeProgram(program) {
  return program.nativeProgram;
}

export function useProgram(gl, program) {
  gl.useProgram(getNativeProgram(program));
  setProgramUsed(program, ENABLED_PROGRAM);
}

export function validateProgram(gl, program) {
  const nativeProgram = getNativeProgram(program);

  gl.validateProgram(nativeProgram);

  if (!gl.getProgramParameter(nativeProgram, gl.VALIDATE_STATUS)) {
    return gl.getProgramInfoLog(nativeProgram);
  }

  return '';
}

function setProgramUsed(program, value) {
  return program.isUsed = value;
}
