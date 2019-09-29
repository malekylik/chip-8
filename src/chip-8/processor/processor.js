import {
  REGISTERS_COUNT,
  PROGRAM_COUNTER_BYTES,
  PROGRAM_COUNTER,
  I_REGISTER,
  I_REGISTER_BYTES,
  CARRY_FLAG_CLEAR,
  CARRY_FLAG_SET
} from './const';
import { PROGRAM_START_ADDRESS, FONTS_START_ADDRESS } from '../memory/const';
import {
  getRegisterVX,
  getRegisterV0,
  setRegisterVF,
  getProgramCounter,
  getNextInstructionAddress,
  getIRegister,
  setIRegister,
} from './methods';
import {
  getPostfixValue,
  getPrefixValue,
  getLeastByte,
  getValueWithourPrefix,
  getValueFromOpcode,
  getLeftRegisterNumber ,
  getRightRegisterNumber,
} from './opcode/opcode';
import {
  CLR,
  RET,
  JP,
  CALL,
  SE,
  SNE,
  LD,
  ADD,
  OR,
  AND,
  XOR,
  SUB,
  SUBN,
  SHR,
  SHL,
  RND,
  DRW,
  SKP,
  SKNP,
} from './commands';
import { readMemoreByte, setMemoryByte } from '../memory/memory';
import { getDigit } from '../../util/index';
import { getFontAddress } from '../display/display';
import { setDelayTimerValue, setSoundTimerValue, getDelayTimerValue } from '../timer/timer';
import { isAnyKeyPress } from '../keyboard/keyboard';

export function creatProcessor() {
  const registerBytes =  new ArrayBuffer(REGISTERS_COUNT + PROGRAM_COUNTER_BYTES + I_REGISTER_BYTES);

  return createProccessorFromMemory(registerBytes);
}

export function creatSharedProcessor() {
  const registerBytes =  new SharedArrayBuffer(REGISTERS_COUNT + PROGRAM_COUNTER_BYTES + I_REGISTER_BYTES);

  return createProccessorFromMemory(registerBytes);
}

export function executeOpcode(proccesor, opcode, stack, memory, display, keyboard) {
  const PC = getProgramCounter(proccesor);
  const prefix = getPrefixValue(opcode);

  JP(proccesor, getNextInstructionAddress(PC));

  switch (prefix) {
    case 0x0: {
      const leastByte = getLeastByte(opcode);

      switch(leastByte) {
        case 0xE0: CLR(display);  break;

        case 0xEE: RET(proccesor, stack); break;
      }

      break;
    }

    case 0x1: JP(proccesor, getValueWithourPrefix(opcode)); break;

    case 0x2: CALL(proccesor, stack, getValueWithourPrefix(opcode)); break;

    case 0x3: SE(proccesor, getLeftRegisterNumber(opcode), getValueFromOpcode(opcode)); break;

    case 0x4: SNE(proccesor, getLeftRegisterNumber(opcode), getValueFromOpcode(opcode)); break;

    case 0x5: SE(proccesor, getLeftRegisterNumber(opcode), getRegisterVX(proccesor, getRightRegisterNumber(opcode))); break;

    case 0x6: LD(proccesor, getLeftRegisterNumber(opcode), getValueFromOpcode(opcode)); break;

    case 0x7: ADD(proccesor, getLeftRegisterNumber(opcode), getValueFromOpcode(opcode)); break;

    case 0x8: {
      const postFix = getPostfixValue(opcode);

      switch (postFix) {
        case 0x0: LD(proccesor, getLeftRegisterNumber(opcode), getRegisterVX(proccesor, getRightRegisterNumber(opcode))); break;

        case 0x1: OR(proccesor, getLeftRegisterNumber(opcode), getRightRegisterNumber(opcode)); break;

        case 0x2: AND(proccesor, getLeftRegisterNumber(opcode), getRightRegisterNumber(opcode)); break;

        case 0x3: XOR(proccesor, getLeftRegisterNumber(opcode), getRightRegisterNumber(opcode)); break;

        case 0x4:
          setRegisterVF(
            proccesor,
            ADD(proccesor, getLeftRegisterNumber(opcode), getRegisterVX(proccesor, getRightRegisterNumber(opcode))) > 0xFF ?
            CARRY_FLAG_SET : CARRY_FLAG_CLEAR
          ); break;

        case 0x5:
            setRegisterVF(
              proccesor,
              SUB(proccesor, getLeftRegisterNumber(opcode), getRegisterVX(proccesor, getRightRegisterNumber(opcode))) > 0x0 ?
              CARRY_FLAG_SET : CARRY_FLAG_CLEAR
            ); break;

        case 0x6: SHR(proccesor, getLeftRegisterNumber(opcode), getRegisterVX(proccesor, getLeftRegisterNumber(opcode)));  break;

        case 0x7:
            setRegisterVF(
              proccesor,
              SUBN(proccesor, getLeftRegisterNumber(opcode), getRegisterVX(proccesor, getRightRegisterNumber(opcode))) > 0x0 ?
              CARRY_FLAG_SET : CARRY_FLAG_CLEAR
            ); break;

        case 0xE: SHL(proccesor, getLeftRegisterNumber(opcode), getRegisterVX(proccesor, getLeftRegisterNumber(opcode))); break;
      }

      break;
    }

    case 0x9: SNE(proccesor, getLeftRegisterNumber(opcode), getRegisterVX(proccesor, getRightRegisterNumber(opcode))); break;

    case 0xA: setIRegister(proccesor, getValueWithourPrefix(opcode)); break;

    case 0xB: JP(proccesor, getValueWithourPrefix(opcode) + getRegisterV0(proccesor)); break;

    case 0xC: RND(proccesor, getLeftRegisterNumber(opcode), getValueFromOpcode(opcode)); break;

    case 0xD:
      setRegisterVF(proccesor,
        DRW(
          display,
          getRegisterVX(proccesor, getLeftRegisterNumber(opcode)),
          getRegisterVX(proccesor, getRightRegisterNumber(opcode)),
          memory,
          getIRegister(proccesor),
          getPostfixValue(opcode)
        )
      );
      break;

    case 0xE: {
      const postFix = getValueFromOpcode(opcode);

      switch (postFix) {
        case 0x9E: SKP(proccesor, keyboard, getRegisterVX(proccesor, getLeftRegisterNumber(opcode))); break;

        case 0xA1: SKNP(proccesor, keyboard, getRegisterVX(proccesor, getLeftRegisterNumber(opcode))); break;
      }

      break;
    }

    case 0xF: {
      const postFix = getValueFromOpcode(opcode);

      switch (postFix) {
        case 0x07: LD(proccesor, getLeftRegisterNumber(opcode), getDelayTimerValue(memory)); break;

        case 0x0A: {
            const pressKeyNumber = isAnyKeyPress(keyboard);

            if (pressKeyNumber !== -1) {
              LD(proccesor, getLeftRegisterNumber(opcode), pressKeyNumber);
            } else {
              JP(proccesor, PC);
            }

           break;
        }

        case 0x15: setDelayTimerValue(memory, getRegisterVX(proccesor, getLeftRegisterNumber(opcode))); break;

        case 0x18: setSoundTimerValue(memory, getRegisterVX(proccesor, getLeftRegisterNumber(opcode))); break;

        case 0x1E: setIRegister(proccesor, getIRegister(proccesor) + getRegisterVX(proccesor, getLeftRegisterNumber(opcode))); break;

        case 0x29: setIRegister(proccesor, getFontAddress(FONTS_START_ADDRESS, getRegisterVX(proccesor, getLeftRegisterNumber(opcode)))); break;

        case 0x33: {
          const registerValue = getRegisterVX(proccesor, getLeftRegisterNumber(opcode));
          const I = getIRegister(proccesor);

          setMemoryByte(memory, I + 2, getDigit(registerValue, 0));
          setMemoryByte(memory, I + 1, getDigit(registerValue, 1));
          setMemoryByte(memory, I, getDigit(registerValue, 2));

          break;
        }

        case 0x55: {
          const registerCount = getLeftRegisterNumber(opcode);
          const I = getIRegister(proccesor);

          for (let i = 0; i <= registerCount; i++) {
            setMemoryByte(memory, I + i, getRegisterVX(proccesor, i));
          }

          break;
        }

        case 0x65: {
          const registerCount = getLeftRegisterNumber(opcode);
          const I = getIRegister(proccesor);

          for (let i = 0; i <= registerCount; i++) {
            LD(proccesor, i, readMemoreByte(memory, I + i));
          }

          break;
        }
      }

      break;
    }
  }

  return getProgramCounter(proccesor);
}

function createProccessorFromMemory(memory) {
  const proccesor = {
    registers: new Uint8Array(memory).subarray(0, REGISTERS_COUNT),
    programCounter: new Uint16Array(memory).subarray(PROGRAM_COUNTER, I_REGISTER),
    I: new Uint16Array(memory).subarray(I_REGISTER),
  };

  JP(proccesor, PROGRAM_START_ADDRESS);

  return proccesor;
}
