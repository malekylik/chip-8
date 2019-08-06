import { SHADER_TYPES } from './const/index';

export function createShader(gl, type, shaderSrc) {
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

  return shader;
}

function getGLShaderType(gl, type) {
  switch (type) {
    case SHADER_TYPES.vertexShader: return gl.VERTEX_SHADER;
    case SHADER_TYPES.fragmentShader: return gl.FRAGMENT_SHADER;
  }

  return SHADER_TYPES.unknown;
}
