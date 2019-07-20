import { MEMORY_BYTES, PROGRAM_START_ADDRESS } from './const';

export function createMemory() {
  const bytes = new ArrayBuffer(MEMORY_BYTES);

  return {
    bytes: new Uint8Array(bytes)
  };
}

export function loadGame(memory, game) {
  for (let i = 0; i < game.length; i++) {
    memory.bytes[PROGRAM_START_ADDRESS + i] = game[i];
  }
}

export function readMemory(memory, start, length) {
  return memory.bytes.subarray(start, start + length);
}

export function readMemoreByte(memory, position) {
  return memory.bytes[position];
}

export function setMemoryByte(memory, position, byte) {
  return memory.bytes[position] = byte;
}
