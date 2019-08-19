import { MEMORY_BYTES, FONTS_START_ADDRESS, PROGRAM_START_ADDRESS } from './const';
import { OPCODE_BYTES } from '../processor/const/index';

export function createMemory() {
  const bytes = new ArrayBuffer(MEMORY_BYTES);

  return {
    bytes: new Uint8Array(bytes)
  };
}

export function loadFonts(memory, fonts) {
  setMemoryBytes(memory, FONTS_START_ADDRESS, fonts);
}

export function loadGame(memory, game) {
  setMemoryBytes(memory, PROGRAM_START_ADDRESS, game);
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

export function setMemoryBytes(memory, position, bytes) {
  for (let i = 0; i < memory.bytes.length && i < bytes.length; i++) {
    memory.bytes[position + i] = bytes[i];
  }
}

export function readOpcode(memory, start) {
  return readMemory(memory, start, OPCODE_BYTES);
}

export function fromMemoryToRomAddresses(memoryAddress) {
  return memoryAddress - PROGRAM_START_ADDRESS;
}

export function fromRomToRomAddresses(memoryAddress) {
  return memoryAddress + PROGRAM_START_ADDRESS;
}
