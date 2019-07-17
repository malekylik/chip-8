import { LEAST_SIGNIFICANT_BYTES, MOST_SIGNIFICANT_BYTES } from './const';

export function createOpcode(bytes) {
  return {
    uint8: new Uint8Array(bytes),
    uint16: new Uint16Array([(bytes[MOST_SIGNIFICANT_BYTES] << 8) | bytes[LEAST_SIGNIFICANT_BYTES]]),
  }
}

export function getPrefixValue(opcode) {
  return getLastFourBitsFromMostBytes(opcode);
}

export function getValueWithourPrefix(opcode) {
  return opcode.uint16[0] & 0x0FFF;
}

export function getLeastByte(opcode) {
  return opcode.uint8[LEAST_SIGNIFICANT_BYTES];
}

export function getMostByte(opcode) {
  return opcode.uint8[LEAST_SIGNIFICANT_BYTES];
}

export function getFirstFourBitsFromLeastBytes(opcode) {
  return getLeastByte(opcode) & 0xF;
}

export function getLastFourBitsFromLeastBytes(opcode) {
  return getLeastByte(opcode) >>> 4;
}

export function getFirstFourBitsFromMostBytes(opcode) {
  return getMostByte(opcode) & 0xF;
}

export function getLastFourBitsFromMostBytes(opcode) {
  return getMostByte(opcode) >>> 4;
}

export function getMiddleByte(opcode) {
  return (opcode.uint16[0] >>> 4) & 0x0FF;
}
