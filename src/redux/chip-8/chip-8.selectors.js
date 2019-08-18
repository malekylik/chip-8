export const selectChip8Reducer = state => state.chip8Reducer;

export const selectProgramCounter = state => selectChip8Reducer(state).programCounter;
