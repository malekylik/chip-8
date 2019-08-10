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

export function fitDisplayIntoRect(width, height) {
  let scaledWidth = 0;
  let scaledHeight = 0;

  if (DISPLAY_WIDTH < width) {
    scaledWidth = width - (width % DISPLAY_WIDTH);
  } else {
    const scale = DISPLAY_WIDTH / width;

    scaledWidth = DISPLAY_WIDTH / (Number.isInteger(scale) ? scale : (scale << 1));
  }

  if (DISPLAY_HEIGHT < height) {
    scaledHeight = height - (height % DISPLAY_HEIGHT);
  } else {
    const scale = DISPLAY_HEIGHT / height;

    scaledHeight = DISPLAY_HEIGHT / (Number.isInteger(scale) ? scale : (scale << 1));
  }

  return ({
    width: scaledWidth,
    height: scaledHeight,
  });
}

export function getScaleFactor(width) {
  const { width: scaleWidth } = fitDisplayIntoRect(width, 0);

  return scaleWidth / DISPLAY_WIDTH;
}

export function scaleDisplay(scale) {
  return ({
    width: DISPLAY_WIDTH * scale,
    height: DISPLAY_HEIGHT * scale,
  })
}

export function getPixels(display) {
  return display.buffer;
}
