export function getDigit(value, digit) {
  return ((value % (Math.pow(10, digit + 1))) / Math.pow(10, digit)) | 0;
}
