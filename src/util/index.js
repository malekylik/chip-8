import { OPCODE_BYTES } from '../chip-8/processor/const/index';

export function getDigit(value, digit) {
  return ((value % (Math.pow(10, digit + 1))) / Math.pow(10, digit)) | 0;
}

export function getBinDigit(value, digit) {
  return (value >>> digit) & 0x1;
}

export function readOpcode(rom, start) {
  return rom.subarray(start, start + OPCODE_BYTES);
}

export function getOpcodeCountFromRom(rom) {
  return (rom.length / OPCODE_BYTES) | 0;
}

export function min(a, b) {
  return a < b ? a : b;
}

export function max(a, b) {
  return a < b ? b : a;
}
