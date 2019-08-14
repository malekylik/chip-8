import { SET_ASSEMBLY_LINES, SET_ASSEMBLY_LINE_NUMBER } from './assembly.actions';

export default function assemblyReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ASSEMBLY_LINES: return ({
      ...state,
      assemblyLines: [...action.payload.lines],
    });
    case SET_ASSEMBLY_LINE_NUMBER: return ({
      ...state,
      lineNumber: action.payload.lineNumber,
    });
  }

  return state;
}

const initialState = {
  assemblyLines: [],
  lineNumber: 0,
  count: 15,
};
