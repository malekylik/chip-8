export const SET_CPU_THREAD_BLOB_URL = '[Thread] SET_CPU_THREAD_BLOB_URL';

export function setCpuThreadBlobUrl(url) {
  return ({
    type: SET_CPU_THREAD_BLOB_URL,
    payload: { url },
  });
}
