export const selectThreadReducer = state => state.threadReducer;

export const selectCpuThreadUrlBlob = state => selectThreadReducer(state).cpuThread.url;
