export function putPixel(buffer, x, y, value) {
  const color = value * 255;

  let offset = 4 * x + buffer.width * 4 * y;
  buffer.data[offset++] = color;
  buffer.data[offset++] = color;
  buffer.data[offset++] = color;
  buffer.data[offset++] = 255;
}
