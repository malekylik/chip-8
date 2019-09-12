export const selectRomsReducer = state => state.romsReducer;

export const selectAllRoms = state => selectRomsReducer(state).roms;
