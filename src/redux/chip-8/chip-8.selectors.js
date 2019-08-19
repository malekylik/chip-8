export const selectChip8Reducer = state => state.chip8Reducer;

export const selectProgramCounter = state => selectChip8Reducer(state).programCounter;

export const selectRegisterI = state => selectChip8Reducer(state).registerI;

export const selectSoundTimer = state => selectChip8Reducer(state).soundTimer;

export const selectDelayTimer = state => selectChip8Reducer(state).delayTimer;

export const selectStackPointer = state => selectChip8Reducer(state).stackPointer;

export const selectStackValues = state => selectChip8Reducer(state).stackValues;

export const selectRegisters = state => selectChip8Reducer(state).registers;

export const keyPressCount = state => selectChip8Reducer(state).keyPressCount;
