import { SET_ASSEMBLY_LINES } from './assembly.actions';

export default function assemblyReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ASSEMBLY_LINES: return {
      ...state,
      assemblyLines: [...action.payload.lines],
    };
  }

  return state;
}

const initialState = {
  assemblyLines: [],
  lineNumber: 0,
  count: 15,
};
