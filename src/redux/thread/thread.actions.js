export const SET_CPU_THREAD_BLOB_URL = '[Thread] SET_CPU_THREAD_BLOB_URL';
export const SET_CPU_THREAD_LOADING = '[Thread] SET_CPU_THREAD_LOADING';
export const SET_CPU_THREAD_LOADED = '[Thread] SET_CPU_THREAD_LOADED';

export function loadCpuThread(url) {
  return async function (dispatch) {
    dispatch(setCpuThreadLoading());

    const workerBlob = await (await fetch(url)).blob();
    const workerUrl = URL.createObjectURL(workerBlob);

    dispatch(setCpuThreadBlobUrl(workerUrl));
    dispatch(resetCpuThreadLoading());

    return workerUrl;
  }
}

export function setCpuThreadBlobUrl(url) {
  return ({
    type: SET_CPU_THREAD_BLOB_URL,
    payload: { url },
  });
}

export function setCpuThreadLoading() {
  return ({
    type: SET_CPU_THREAD_LOADING,
  });
}

export function resetCpuThreadLoading() {
  return ({
    type: SET_CPU_THREAD_LOADED,
  });
}
