export function getDigit(value, digit) {
  return ((value % (Math.pow(10, digit + 1))) / Math.pow(10, digit)) | 0;
}

export function getBinDigit(value, digit) {
  return (value >>> digit) & 0x1;
}

export function joinHighAlignedBytes(bytes) {
  return (bytes[MOST_SIGNIFICANT_BYTES] << 8) | bytes[LEAST_SIGNIFICANT_BYTES];
}
