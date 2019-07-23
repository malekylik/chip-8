export function creatTimer() {
  const bytes = new ArrayBuffer(1);

  return {
    timerValue: new Uint8Array(bytes),
  };
}

export function getTimerValue(timer) {
  return timer.timerValue[0];
}

export function setTimerValue(timer, value) {
  return timer.timerValue[0] = value;
}

export function decrementTimer(timer) {
  return setTimerValue(timer, getTimerValue(timer) - 1);
}

export function updateTimer(timer) {
  if (getTimerValue(timer) > 0) {
    return decrementTimer(timer) === 0;
  }

  return false;
}

export function updateTimerAndDo(timer, callback) {
  if (getTimerValue(timer) > 0) {
    callback();
    return decrementTimer(timer) === 0;
  }

  return false;
}
