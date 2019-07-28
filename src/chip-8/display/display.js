import { DISPLAY_WIDTH, DISPLAY_HEIGHT, PIXEL_OFF, PIXEL_ON, FONT_SIZE } from './const';
import { putPixel } from '../../util/canvas';

export function createDisplay() {
  const videoBuffer = new ArrayBuffer(DISPLAY_WIDTH * DISPLAY_HEIGHT);

  return {
    buffer: new Uint8Array(videoBuffer),
  };
}

export function xorPixel(display, x, y, value) {
  const isErased = Number(Boolean(value) && Boolean(getPixel(display, x, y)));

  setPixel(display, x, y, getPixel(display, x, y) ^ value);

  return isErased
}

export function getPixel(display, x, y) {
  return display.buffer[DISPLAY_WIDTH * y + x];
}

export function setPixel(display, x, y, value) {
  return display.buffer[DISPLAY_WIDTH * y + x] = value;
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

export function fillImageDataWithDisplay(imageData, display, scale) {
  for (let i = 0; i < DISPLAY_HEIGHT * scale; i++) {
    for (let j = 0; j < DISPLAY_WIDTH * scale; j++) {
      putPixel(imageData, j, i, getPixel(display, (j / scale) | 0, (i / scale) | 0));
    }
  }

  return imageData;
}
