import { DISPLAY_WIDTH, DISPLAY_HEIGHT } from './const';

export function creatDisplay() {
  const videoBuffer = new ArrayBuffer(DISPLAY_WIDTH * DISPLAY_HEIGHT);

  return {
    buffer: new Uint8Array(videoBuffer),
  };
}

