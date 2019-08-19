export const SET_LOADING_SHADER = '[Shader] SET_LOADING_SHADER';
export const SET_LOADED_SHADER = '[Shader] SET_LOADED_SHADER';
export const SET_SHADERS = '[Shader] SET_SHADERS';

export function loadShaders(vertURL, fragURL) {
  return async function (dispatch) {
    dispatch(setLoadingShader());

    const shaderRequests = await Promise.all([
      fetch(vertURL),
      fetch(fragURL),
    ]);
    const shaders = await Promise.all(shaderRequests.map(shader => shader.text()));

    dispatch(setShaders(shaders[0], shaders[1]));
    dispatch(resetLoadingShader());

    return shaders;
  }
}

export function setLoadingShader() {
  return ({
    type: SET_LOADING_SHADER,
  });
}

export function resetLoadingShader() {
  return ({
    type: SET_LOADED_SHADER,
  });
}

export function setShaders(vert, frag) {
  return ({
    type: SET_SHADERS,
    payload: { vert, frag }
  });
}
