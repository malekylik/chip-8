import { LEAST_SIGNIFICANT_BYTES, MOST_SIGNIFICANT_BYTES } from './const';

export function createOpcode(bytes) {
  return {
    uint8: new Uint8Array(bytes),
    uint16: new Uint16Array(bytes),
  }
}

export function getPrefixValue(opcode) {
  return opcode.uint8[MOST_SIGNIFICANT_BYTES] & 0xF;
}

export function getLeastByte(opcode) {
  return opcode.uint8[LEAST_SIGNIFICANT_BYTES];
}
