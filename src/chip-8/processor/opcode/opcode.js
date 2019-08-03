import { LEAST_SIGNIFICANT_BYTES, MOST_SIGNIFICANT_BYTES } from './const';

export function createOpcode(bytes) {
  return {
    uint8: new Uint8Array(bytes),
    uint16: new Uint16Array([(bytes[MOST_SIGNIFICANT_BYTES] << 8) | bytes[LEAST_SIGNIFICANT_BYTES]]),
  }
}

export function getOpcodeValue(opcode) {
  return opcode.uint16[0];
}

export function getPrefixValue(opcode) {
  return getLastFourBitsFromMostBytes(opcode);
}

export function getPostfixValue(opcode) {
  return getFirstFourBitsFromLeastBytes(opcode);
}

export function getValueWithourPrefix(opcode) {
  return getOpcodeValue(opcode) & 0x0FFF;
}

export function getLeastByte(opcode) {
  return opcode.uint8[LEAST_SIGNIFICANT_BYTES];
}

export function getMostByte(opcode) {
  return opcode.uint8[MOST_SIGNIFICANT_BYTES];
}

export function getLeftRegisterNumber(opcode) {
  return getFirstFourBitsFromMostBytes(opcode);
}

export function getRightRegisterNumber(opcode) {
  return getLastFourBitsFromLeastBytes(opcode);
}

export function getValueFromOpcode(opcode) {
  return getLeastByte(opcode);
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
  return (getOpcodeValue(opcode) >>> 4) & 0x0FF;
}
