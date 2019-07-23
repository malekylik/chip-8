import {
  getRegisterVX,
  getProgramCounter,
  setProgramCounter,
  setRegisterVX,
  setRegisterVF,
  incrimentProgramCounterBy2,
  incrimentProgramCounterBy4,
  incrimentRegisterVXBy,
  decrementRegisterVXBy,
  shiftRihgtRegister,
  shiftLeftRegister,
  getNextInstructionAddress,
} from './methods';
import { push, pop } from '../stack/stack';
import { DISPLAY_WIDTH, DISPLAY_HEIGHT } from '../display/const/index';
import { clearPixel, xorPixel } from '../display/display';
import { readMemoreByte } from '../memory/memory';
import { isKeyUnpress, isKeyPress } from '../keyboard/keyboard';
import { getBinDigit } from '../../util/index';

export function CLR(display) {
  for (let i = 0; i < DISPLAY_HEIGHT; i++) {
    for (let j = 0; j < DISPLAY_WIDTH; j++) {
      clearPixel(display, j, i);
    }
  }
}

export function RET(proccesor, stack) {
  JP(proccesor, getNextInstructionAddress(pop(stack)));
}

export function JP(proccesor, address) {
  return setProgramCounter(proccesor, address);
}

export function CALL(proccesor, stack, address) {
  push(stack, getProgramCounter(proccesor));
  JP(proccesor, address);
}

export function SE(proccesor, register, value) {
  if (getRegisterVX(proccesor, register) === value) {
    incrimentProgramCounterBy4(proccesor);
  } else {
    incrimentProgramCounterBy2(proccesor);
  }
}

export function SNE(proccesor, register, value) {
  if (getRegisterVX(proccesor, register) !== value) {
    incrimentProgramCounterBy4(proccesor);
  } else {
    incrimentProgramCounterBy2(proccesor);
  }
}

export function LD(proccesor, register, value) {
  return setRegisterVX(proccesor, register, value);
}

export function ADD(proccesor, register, value) {
  return incrimentRegisterVXBy(proccesor, register, value);
}

export function OR(proccesor, registerX, registerY) {
  return setRegisterVX(proccesor, registerX, getRegisterVX(proccesor, registerX) | getRegisterVX(proccesor, registerY));
}

export function AND(proccesor, registerX, registerY) {
  return setRegisterVX(proccesor, registerX, getRegisterVX(proccesor, registerX) & getRegisterVX(proccesor, registerY));
}

export function XOR(proccesor, registerX, registerY) {
  return setRegisterVX(proccesor, registerX, getRegisterVX(proccesor, registerX) ^ getRegisterVX(proccesor, registerY));
}

export function SUB(proccesor, register, value) {
  return decrementRegisterVXBy(proccesor, register, value);
}

export function SHR(proccesor, register, value) {
  setRegisterVF(proccesor, value & 0x1);
  return shiftRihgtRegister(proccesor, register, value);
}

export function SUBN(proccesor, register, value) {
  return setRegisterVX(proccesor, register, value - getRegisterVX(proccesor, register));
}

export function SHL(proccesor, register, value) {
  setRegisterVF(proccesor, value >> 7);
  return shiftLeftRegister(proccesor, register, value);
}

export function RND(proccesor, register, mask) {
  return setRegisterVX(proccesor, register, ((Math.random() * 255) | 0) & mask);
}

export function DRW(display, x, y, memory, I, n) {
  let eraseCount = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < 8; j++) {
      eraseCount += xorPixel(
        display,
        (x + j) % DISPLAY_WIDTH,
        (y + i) % DISPLAY_HEIGHT,
        getBinDigit(readMemoreByte(memory, I + i), 7 - j)
      );
    }
  }

  return eraseCount & 0x1;
}

export function SKP(proccesor, keyboard, key) {
  if(isKeyPress(keyboard, key)) {
    incrimentProgramCounterBy4(proccesor);
  } else {
    incrimentProgramCounterBy2(proccesor);
  }
}

export function SKNP(proccesor, keyboard, key) {
  if(isKeyUnpress(keyboard, key)) {
    incrimentProgramCounterBy4(proccesor);
  } else {
    incrimentProgramCounterBy2(proccesor);
  }
}
