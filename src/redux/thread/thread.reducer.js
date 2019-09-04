import { SET_CPU_THREAD_BLOB_URL } from './thread.actions';

export default function threadReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CPU_THREAD_BLOB_URL: return ({
      ...state,
      cpuThread: {
        ...state.cpuThread,
        url: action.payload.url
      },
    });
  }

  return state;
}

const threadInitState = {
  url: null,
};

const initialState = {
  cpuThread: threadInitState,
};
