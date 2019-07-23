import { creatProcessor, executeOpcode } from './processor/processor';
import { getProgramCounter } from './processor/methods';
import { creatTimer, updateTimer, updateTimerAndDo } from './timer/timer';
import { createKeyboard } from './keyboard/keyboard';
import { createOpcode } from './processor/opcode/opcode';
import { createStack } from './stack/stack';
import { createMemory, loadGame, loadFonts, readOpcode } from './memory/memory';
import { createDisplay } from './display/display';
import { FONTS } from './display/const/index';

export function createChip8(game) {
  const chip8 = ({
    processor: creatProcessor(),

    stack: createStack(),
    memory: createMemory(),

    display: createDisplay(),
    delayTimer: creatTimer(),

    soundTimer: creatTimer(),
    onSoundTime: noop,

    keyboard: createKeyboard(),
  });

  loadFonts(chip8.memory, FONTS);

  if (game) {
    loadRom(chip8, game);
  }

  return chip8;
}

export function loadRom(chip8, game) {
  loadGame(chip8.memory, game);
}

export function executeNextCycly(chip8) {
  const opcode = createOpcode(readOpcode(chip8.memory, getProgramCounter(chip8.processor)));

  const PC = executeOpcode(
    chip8.processor,
    opcode,
    chip8.stack,
    chip8.memory,
    chip8.display,
    chip8.delayTimer,
    chip8.soundTimer,
    chip8.keyboard
  );

  updateTimer(chip8.delayTimer);
  updateTimerAndDo(chip8.soundTimer, chip8.onSoundTime);

  return PC;
}

export function getDisplay(chip8) {
  return chip8.display;
}

function noop() {}
