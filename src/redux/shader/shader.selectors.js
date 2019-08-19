export const selectShaderReducer = state => state.shaderReducer;

export const selectVertShader = state => selectShaderReducer(state).vertSource;

export const selectFragShader = state => selectShaderReducer(state).fragSource;

export const selectLoadingShaders = state => selectShaderReducer(state).loading;
