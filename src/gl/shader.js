import { SHADER_TYPES } from './const/index';

export function createGLShader(gl, type, shaderSrc) {
  const glType = getGLShaderType(gl, type);

  if (glType === SHADER_TYPES.unknown) console.warn(`Unknown shader type: ${type}`);

  const shader = gl.createShader(glType);

  if (shader === 0) console.warn('Fail to create shader');

  gl.shaderSource(shader, shaderSrc);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader);

    console.warn(`Fail to compile shader: ${message}`);

    gl.deleteShader(shader);

    return null;
  }

  return createShader(type, glType, shader, shaderSrc, true, false);
}

function getGLShaderType(gl, type) {
  switch (type) {
    case SHADER_TYPES.vertexShader: return gl.VERTEX_SHADER;
    case SHADER_TYPES.fragmentShader: return gl.FRAGMENT_SHADER;
  }

  return SHADER_TYPES.unknown;
}

export function createShader(type, nativeTypy, nativeShader, source, isCompiled, isDeleted) {
  return ({
    type,
    nativeTypy,
    nativeShader,
    source,
    isCompiled,
    isDeleted,
  });
}

export function deleteShader(gl, shader) {
  gl.deleteShader(getNativeShader(shader));
  setIsDelete(shader, true);
}

export function getShaderType(shader) {
  return shader.type;
}

export function getNativeShader(shader) {
  return shader.nativeShader;
}

function setIsDelete(shader, value) {
  return shader.isDeleted = value;
}
