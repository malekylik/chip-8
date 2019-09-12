export const selectThreadReducer = state => state.threadReducer;

export const selectCpuThreadUrlBlob = state => selectThreadReducer(state).cpuThread.url;

export const selectCpuThreadLoading = state => selectThreadReducer(state).cpuThread.loading;

export const selectCpuThreadLoaded = state => selectThreadReducer(state).cpuThread.loaded;
