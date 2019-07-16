import { LEAST_SIGNIFICANT_BYTES, MOST_SIGNIFICANT_BYTES } from './const';

export function createOpcode(bytes) {
  return {
    uint8: new Uint8Array(bytes),
    uint16: new Uint16Array([bytes[0] | (bytes[1] << 8)]),
  }
}

export function getPrefixValue(opcode) {
  return opcode.uint8[MOST_SIGNIFICANT_BYTES] & 0xF;
}

export function getValueWithourPrefix(opcode) {
  return opcode.uint16[0] & 0x0FFF;
}

export function getLeastByte(opcode) {
  return opcode.uint8[LEAST_SIGNIFICANT_BYTES];
}
