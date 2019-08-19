import { createSelector } from 'reselect';

import { min, max } from '../../util/index';

export const selectAssemblerReducer = state => state.assemblyReducer;

export const selectAssembyLines = state => selectAssemblerReducer(state).assemblyLines;

export const selectLineNumber = state => selectAssemblerReducer(state).lineNumber;

export const selectAssemblyCount = state => selectAssemblerReducer(state).count;

export const selectSubAssemblyLines = createSelector(
  selectAssembyLines,
  selectLineNumber,
  selectAssemblyCount,
  (lines, lineNumber, count) => {
    const start = max(0, lineNumber - ((count / 2) | 0));

    return lines.slice(start, min(lines.length, start + count));
  },
);
