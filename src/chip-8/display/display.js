import { DISPLAY_WIDTH, DISPLAY_HEIGHT, PIXEL_OFF, PIXEL_ON, FONT_SIZE } from './const';

export function createDisplay() {
  const videoBuffer = new ArrayBuffer(DISPLAY_WIDTH * DISPLAY_HEIGHT);

  return {
    buffer: new Uint8Array(videoBuffer),
  };
}

export function xorPixel(display, x, y, value) {
  return Number(!setPixel(display, x, y, getPixel(display, x, y) ^ value));
}

export function getPixel(display, x, y) {
  return display.buffer[DISPLAY_WIDTH * y + x];
}

export function setPixel(display, x, y, value) {
  return display.buffer[DISPLAY_WIDTH * y + x] = value % 1;
}

export function setPixelON(display, x, y) {
  return display.buffer[DISPLAY_WIDTH * y + x] = PIXEL_ON;
}

export function clearPixel(display, x, y) {
  return display.buffer[DISPLAY_WIDTH * y + x] = PIXEL_OFF;
}

export function getFontAddress(fontsStartAddress, font) {
  return fontsStartAddress + (font * FONT_SIZE);
}
