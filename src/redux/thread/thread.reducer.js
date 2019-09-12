import { SET_CPU_THREAD_BLOB_URL, SET_CPU_THREAD_LOADING, SET_CPU_THREAD_LOADED } from './thread.actions';

export default function threadReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CPU_THREAD_BLOB_URL: return ({
      ...state,
      cpuThread: {
        ...state.cpuThread,
        url: action.payload.url
      },
    });
    case SET_CPU_THREAD_LOADING: return ({
      ...state,
      cpuThread: {
        ...state.cpuThread,
        loading: true,
        loaded: false,
      },
    });
    case SET_CPU_THREAD_LOADED: return ({
      ...state,
      cpuThread: {
        ...state.cpuThread,
        loading: false,
        loaded: true,
      },
    });
  }

  return state;
}

const threadInitState = {
  loaded: false,
  loading: false,
  url: null,
};

const initialState = {
  cpuThread: threadInitState,
};
