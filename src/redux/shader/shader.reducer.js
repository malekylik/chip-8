import { SET_LOADING_SHADER, SET_LOADED_SHADER, SET_SHADERS } from './shader.actions';

export default function shaderReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_SHADER: return ({
      ...state,
      loading: true,
      loaded: false,
    });
    case SET_LOADED_SHADER: return ({
      ...state,
      loading: false,
      loaded: true,
    });
    case SET_SHADERS: return ({
      ...state,
      vertSource: action.payload.vert,
      fragSource: action.payload.frag,
    });
  }

  return state;
}

const initialState = {
  loaded: false,
  loading: false,
  vertSource: '',
  fragSource: '',
};
