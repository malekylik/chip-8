import { DISPLAY_WIDTH, DISPLAY_HEIGHT, PIXEL_OFF, PIXEL_ON } from './const';

export function creatDisplay() {
  const videoBuffer = new ArrayBuffer(DISPLAY_WIDTH * DISPLAY_HEIGHT);

  return {
    buffer: new Uint8Array(videoBuffer),
  };
}

export function setPixel(display, x, y) {
  display.buffer[DISPLAY_WIDTH * y + x] = PIXEL_ON;
}

export function clearPixel(display, x, y) {
  display.buffer[DISPLAY_WIDTH * y + x] = PIXEL_OFF;
}
