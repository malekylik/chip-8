import {
  REGISTERS_COUNT,
  PROGRAM_COUNTER_BYTES,
  PROGRAM_COUNTER,
  CARRY_FLAG_CLEAR,
  CARRY_FLAG_SET
} from './const';
import { PROGRAM_START_ADDRESS } from '../memory/const';
import { getRegisterVX, getRegisterV0, getProgramCounter, getNextInstructionAddress } from './methods';
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
  SHR,
  SHL,
  RND,
  DRW,
  SKP,
  SKNP,
} from './commands';
import { setMemoryByte } from '../memory/memory';
import { getDigit } from '../../util/index';

export function creatProcessor() {
  const registerBytes =  new ArrayBuffer(REGISTERS_COUNT + PROGRAM_COUNTER_BYTES);
  const proccesor = {
    registers: new Uint8Array(registerBytes).subarray(0, REGISTERS_COUNT),
    programCounter: new Uint16Array(registerBytes).subarray(PROGRAM_COUNTER)
  };

  JP(proccesor, PROGRAM_START_ADDRESS);

  return proccesor;
}

export function executeOpcode(proccesor, opcode, stack, memory) {
  const PC = getProgramCounter(proccesor);
  const prefix = getPrefixValue(opcode);

  switch (prefix) {
    case 0x0: {
      const leastByte = getLeastByte(opcode);

      switch(leastByte) {
        case 0xE0: CLR(); break; // TODO: display

        case 0xEE: RET(proccesor, stack); break
      }

      break;
    }

    case 0x1: JP(proccesor, getValueWithourPrefix(opcode)); break;

    case 0x2: CALL(proccesor, stack, getValueFromOpcode(opcode)); break;

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

        case 0x6: SHR(proccesor, getLeftRegisterNumber(opcode), getRegisterVX(proccesor, getRightRegisterNumber(opcode))); break;

        case 0x7:
            setRegisterVF(
              proccesor,
              SUBN(proccesor, getLeftRegisterNumber(opcode), getRegisterVX(proccesor, getRightRegisterNumber(opcode))) > 0x0 ?
              CARRY_FLAG_SET : CARRY_FLAG_CLEAR
            ); break;

        case 0xE: SHL(proccesor, getLeftRegisterNumber(opcode), getRegisterVX(proccesor, getRightRegisterNumber(opcode))); break;
      }

      break;
    }

    case 0x9: SNE(proccesor, getLeftRegisterNumber(opcode), getRegisterVX(proccesor, getRightRegisterNumber(opcode)));

    case 0xA: JP(proccesor, getValueWithourPrefix(opcode));

    case 0xB: JP(proccesor, getValueWithourPrefix(opcode) + getRegisterV0(proccesor));

    case 0xC: RND(proccesor, getLeftRegisterNumber(opcode), getValueFromOpcode(opcode));

    case 0xD: DRW(); // TODO: display

    case 0xE: {
      const postFix = getValueFromOpcode(opcode);

      switch (postFix) {
        case 0x9E: SKP(); break; // TODO: keyboard

        case 0xA1: SKNP(); break; // TODO: keyboard
      }

      break;
    }

    case 0xF: {
      const postFix = getValueFromOpcode(opcode);

      switch (postFix) {
        case 0x07: break; // TODO: delay timer

        case 0x0A: break; // TODO: keyboard

        case 0x15: break; // TODO: delay timer

        case 0x18: break; // TODO: sound timer

        case 0x1E: JP(proccesor, getProgramCounter(proccesor) + getRegisterVX(proccesor, getLeftRegisterNumber(opcode))); break;

        case 0x29: break; // TODO: display

        case 0x33: {
          const registerValue = getRegisterVX(proccesor, getLeftRegisterNumber(opcode));

          setMemoryByte(memory, PC, getDigit(registerValue, 2));
          setMemoryByte(memory, PC + 1, getDigit(registerValue, 1));
          setMemoryByte(memory, PC + 2, getDigit(registerValue, 0));

          break;
        }

        case 0x55: {
          const registerCount = getLeftRegisterNumber(opcode);

          for (let i = 0; i < registerCount; i++) {
            setMemoryByte(memory, PC + i, getRegisterVX(proccesor, i));
          }

          JP(proccesor, PC + registerCount + 1);

          break;
        }

        case 0x65: break; // TODO: I
      }

      break;
    }
  }

  return updateProgramCounter(proccesor, PC);
}

function updateProgramCounter(proccesor, prevPC) {
  const PC = getProgramCounter(proccesor);

  if (prevPC === PC) {
    return JP(proccesor, getNextInstructionAddress(prevPC));
  }

  return PC;
}
