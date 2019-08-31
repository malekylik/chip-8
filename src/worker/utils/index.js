import { UNLOCK_VALUE, LOCK_CPU_THREAD_VALUE } from '../const/worker';

export function byteIndexToFutexBufferIndex(index) {
  return index >>> 2;
}

export function createFutex(buffer, index) {
  return ({
    buffer: new Int32Array(buffer),
    index,
  });
}

export function wait(futex) {
  Atomics.wait(futex.buffer, futex.index, LOCK_CPU_THREAD_VALUE);
}

export function lock(futex) {
  Atomics.compareExchange(futex.buffer, futex.index, UNLOCK_VALUE, LOCK_CPU_THREAD_VALUE);
}

export function unlock(futex) {
  if(Atomics.compareExchange(futex.buffer, futex.index, LOCK_CPU_THREAD_VALUE, UNLOCK_VALUE) === LOCK_CPU_THREAD_VALUE) {
    Atomics.notify(futex.buffer, futex.index, 1);
  }
}

export function promisifyPostMessage(worker, action) {
  worker.postMessage(action);

  return new Promise((resolve, reject) => {
    const eventListener = (event) => {
      const { data: { eventType, payload, error } } = event;

      if (action.eventType === eventType) {
        worker.removeEventListener('message', eventListener);

        if (!error) {
          resolve(payload);
        } else {
          reject(payload);
        }
      }
    };

    worker.addEventListener('message', eventListener);
  });
}
