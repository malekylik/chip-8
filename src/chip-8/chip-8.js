import { creatProcessor, executeOpcode } from './processor/processor';
import {
  getProgramCounter as getProgramCounterFromProcessor,
  getRegisters as getRegistersFromProcessor,
  getIRegister as getIRegisterFromProcessor,
} from './processor/methods';
import {
  updateDelayTimer,
  updateSoundTimer,
  getDelayTimerValue as getDelayTimerValueFromMemory,
  getSoundTimerValue as getSoundTimerValueFromMemory,
} from './timer/timer';
import {
  getStackPointer as getStackPointerFromStack,
  getStackValues as getStackValuesFromStack,
} from './stack/stack';
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
  const opcode = createOpcode(readOpcode(chip8.memory, getProgramCounter(chip8)));

  const PC = executeOpcode(
    chip8.processor,
    opcode,
    chip8.stack,
    chip8.memory,
    chip8.display,
    chip8.keyboard
  );

  updateDelayTimer(chip8.memory);
  updateSoundTimer(chip8.memory, chip8.onSoundTime);

  return PC;
}

export function getDisplay(chip8) {
  return chip8.display;
}

export function getProcessor(chip8) {
  return chip8.processor;
}

export function getMemory(chip8) {
  return chip8.memory;
}

export function getStack(chip8) {
  return chip8.stack;
}

export function getRegisters(chip8) {
  return getRegistersFromProcessor(getProcessor(chip8));
}

export function getIRegister(chip8) {
  return getIRegisterFromProcessor(getProcessor(chip8));
}

export function getProgramCounter(chip8) {
  return getProgramCounterFromProcessor(getProcessor(chip8));
}

export function getDelayTimerValue(chip8) {
  return getDelayTimerValueFromMemory(getMemory(chip8));
}

export function getSoundTimerValue(chip8) {
  return getSoundTimerValueFromMemory(getMemory(chip8));
}

export function getStackPointer(chip8) {
  return getStackPointerFromStack(getStack(chip8))
}

export function getStackValues(chip8) {
  return getStackValuesFromStack(getStack(chip8))
}

function noop() {}
