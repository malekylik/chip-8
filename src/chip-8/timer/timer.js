import { DELAY_TIMER_ADDRESS, SOUND_TIMRE_ADDRESS } from './const/index';
import { readMemoreByte, setMemoryByte } from '../memory/memory';

export function getDelayTimerValue(memory) {
  return readMemoreByte(memory, DELAY_TIMER_ADDRESS);
}

export function getSoundTimerValue(memory) {
  return readMemoreByte(memory, SOUND_TIMRE_ADDRESS);
}

export function setDelayTimerValue(memory, value) {
  return setMemoryByte(memory, DELAY_TIMER_ADDRESS, value);
}

export function setSoundTimerValue(memory, value) {
  return setMemoryByte(memory, SOUND_TIMRE_ADDRESS, value);
}

export function updateDelayTimer(memory) {
  if (getDelayTimerValue(memory) > 0) {
    return setDelayTimerValue(memory, getDelayTimerValue(memory) - 1) === 0;
  }

  return false;
}

export function updateSoundTimer(memory, callback) {
  if (getSoundTimerValue(memory) > 0) {
    // callback();
    return setSoundTimerValue(memory, getSoundTimerValue(memory) - 1) === 0;
  }

  return false;
}
