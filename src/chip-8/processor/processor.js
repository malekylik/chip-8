import { REGISTERS_COUNT, CARRY_FLAG_CLEAR, CARRY_FLAG_SET } from './const';
import {
  getPostfixValue,
  getPrefixValue,
  getLeastByte,
  getValueWithourPrefix,
  getValueFromOpcode,
  getLeftRegisterNumber ,
  getRightRegisterNumber
} from './opcode/opcode';

export function creatProcessor() {
  const registerBytes =  new ArrayBuffer(REGISTERS_COUNT);
  const programCounterBytes = new ArrayBuffer(2);

  return {
    registers: new Uint8Array(registerBytes),
    programCounter: new Uint16Array(programCounterBytes)
  };
}

export function executeOpcode(proccesor, opcode) {
  const prefix = getPrefixValue(opcode);

  switch (prefix) {
    case 0x0: {
      const leastByte = getLeastByte(opcode);

      switch(leastByte) {
        case 0xE0: break; // TODO: display
        case 0xEE: break // TODO: stack
      }

      break;
    }

    case 0x1: {
      const address = getValueWithourPrefix(opcode);
      setProgramCounter(proccesor, address);

      break;
    }

    case 0x2: break; // TODO: stack
    case 0x3: {
      if (getRegisterVX(proccesor, getLeftRegisterNumber(opcode)) === getValueFromOpcode(opcode)) {
        incrimentProgramCounterBy2(proccesor);
      }

      break;
    }

    case 0x4: {
      if (getRegisterVX(proccesor, getLeftRegisterNumber(opcode)) !== getValueFromOpcode(opcode)) {
        incrimentProgramCounterBy2(proccesor);
      }

      break;
    }

    case 0x5: {
      if (getLeftRegisterNumber(opcode) === getRightRegisterNumber(opcode)) {
        incrimentProgramCounterBy2(proccesor);
      }

      break;
    }

    case 0x6: setRegisterVX(proccesor, getLeftRegisterNumber(opcode), getValueFromOpcode(opcode)); break;

    case 0x7: incrimentRegisterVXBy(proccesor, getLeftRegisterNumber(opcode), getValueFromOpcode(opcode)); break;

    case 0x8: {
      const postFix = getPostfixValue(opcode);

      switch (postFix) {
        case 0x0: movRegisters(proccesor, getLeftRegisterNumber(opcode), getRightRegisterNumber(opcode)); break;

        case 0x1: orTwoRegisters(proccesor, getLeftRegisterNumber(opcode), getRightRegisterNumber(opcode)); break;

        case 0x2: andTwoRegisters(proccesor, getLeftRegisterNumber(opcode), getRightRegisterNumber(opcode)); break;

        case 0x3: xorTwoRegisters(proccesor, getLeftRegisterNumber(opcode), getRightRegisterNumber(opcode)); break;

        case 0x4: {
          const carryFlag = sumTwoRegisters(proccesor, getLeftRegisterNumber(opcode), getRightRegisterNumber(opcode)) > 0xFF ?
            CARRY_FLAG_SET : CARRY_FLAG_CLEAR;
          setRegisterVF(proccesor, carryFlag);

          break;
        }

        case 0x5: {
          const isXGreaterY = getRegisterVX(proccesor, getLeftRegisterNumber(opcode)) > getRegisterVX(proccesor, getRightRegisterNumber(opcode));
          const carryFlag = isXGreaterY ? CARRY_FLAG_SET : CARRY_FLAG_CLEAR;

          if (carryFlag) {
            subTwoRegisters(proccesor, getLeftRegisterNumber(opcode), getRightRegisterNumber(opcode));
          } else {
            subTwoRegisters(proccesor, getRightRegisterNumber(opcode), getLeftRegisterNumber(opcode));
          }

          setRegisterVF(proccesor, carryFlag);

          break;
        }
      }

      break;
    }
  }
}

export function movRegisters(proccesor, registerTo, registerFrom) {
  return setRegisterVX(proccesor, registerTo, getRegisterVX(proccesor, registerFrom));
}

export function orTwoRegisters(proccesor, registerX, registerY) {
  return setRegisterVX(proccesor, registerX, getRegisterVX(proccesor, registerX) | getRegisterVX(proccesor, registerY));
}

export function andTwoRegisters(proccesor, registerX, registerY) {
  return setRegisterVX(proccesor, registerX, getRegisterVX(proccesor, registerX) & getRegisterVX(proccesor, registerY));
}

export function xorTwoRegisters(proccesor, registerX, registerY) {
  return setRegisterVX(proccesor, registerX, getRegisterVX(proccesor, registerX) ^ getRegisterVX(proccesor, registerY));
}

export function sumTwoRegisters(proccesor, registerX, registerY) {
  return setRegisterVX(proccesor, registerX, getRegisterVX(proccesor, registerX) + getRegisterVX(proccesor, registerY));
}

export function subTwoRegisters(proccesor, registerX, registerY) {
  return setRegisterVX(proccesor, registerX, getRegisterVX(proccesor, registerX) - getRegisterVX(proccesor, registerY));
}

export function incrimentProgramCounterBy2(proccesor) {
  return incrimentRegisterVXBy(proccesor, getProgramCounter(proccesor), 2);
}

export function incrimentRegisterVXBy(proccesor, register, value) {
  return setRegisterVX(proccesor, register, getRegisterVX(proccesor, register) + value);
}

export function getProgramCounter(proccesor) {
  return proccesor.programCounter[0];
}

export function setProgramCounter(proccesor, value) {
  return proccesor.programCounter[0] = value;
}

export function getRegisterV0(proccesor) {
  return proccesor.registers[REGISTERS_MAP.V0];
};

export function setRegisterV0(proccesor, value) {
  return proccesor.registers[REGISTERS_MAP.V0] = value;
};

export function getRegisterV1(proccesor) {
  return proccesor.registers[REGISTERS_MAP.V1];
};

export function setRegisterV1(proccesor, value) {
  return proccesor.registers[REGISTERS_MAP.V1] = value;
};

export function getRegisterV2(proccesor) {
  return proccesor.registers[REGISTERS_MAP.V2];
};

export function setRegisterV2(proccesor, value) {
  return proccesor.registers[REGISTERS_MAP.V2] = value;
};

export function getRegisterV3(proccesor) {
  return proccesor.registers[REGISTERS_MAP.V3];
};

export function setRegisterV3(proccesor, value) {
  return proccesor.registers[REGISTERS_MAP.V3] = value;
};

export function getRegisterV4(proccesor) {
  return proccesor.registers[REGISTERS_MAP.V4];
};

export function setRegisterV4(proccesor, value) {
  return proccesor.registers[REGISTERS_MAP.V4] = value;
};

export function getRegisterV5(proccesor) {
  return proccesor.registers[REGISTERS_MAP.V5];
};

export function setRegisterV5(proccesor, value) {
  return proccesor.registers[REGISTERS_MAP.V5] = value;
};

export function getRegisterV6(proccesor) {
  return proccesor.registers[REGISTERS_MAP.V6];
};

export function setRegisterV6(proccesor, value) {
  return proccesor.registers[REGISTERS_MAP.V6] = value;
};

export function getRegisterV7(proccesor) {
  return proccesor.registers[REGISTERS_MAP.V7];
};

export function setRegisterV7(proccesor, value) {
  return proccesor.registers[REGISTERS_MAP.V7] = value;
};

export function getRegisterV8(proccesor) {
  return proccesor.registers[REGISTERS_MAP.V8];
};

export function setRegisterV8(proccesor, value) {
  return proccesor.registers[REGISTERS_MAP.V8] = value;
};

export function getRegisterV9(proccesor) {
  return proccesor.registers[REGISTERS_MAP.V9];
};

export function setRegisterV9(proccesor, value) {
  return proccesor.registers[REGISTERS_MAP.V9] = value;
};

export function getRegisterVA(proccesor) {
  return proccesor.registers[REGISTERS_MAP.VA];
};

export function setRegisterVA(proccesor, value) {
  return proccesor.registers[REGISTERS_MAP.VA] = value;
};

export function getRegisterVB(proccesor) {
  return proccesor.registers[REGISTERS_MAP.VB];
};

export function setRegisterVB(proccesor, value) {
  return proccesor.registers[REGISTERS_MAP.VB] = value;
};

export function getRegisterVC(proccesor) {
  return proccesor.registers[REGISTERS_MAP.VC];
};

export function setRegisterVC(proccesor, value) {
  return proccesor.registers[REGISTERS_MAP.VC] = value;
};

export function getRegisterVE(proccesor) {
  return proccesor.registers[REGISTERS_MAP.VE];
};

export function setRegisterVE(proccesor, value) {
  return proccesor.registers[REGISTERS_MAP.VE] = value;
};

export function getRegisterVF(proccesor) {
  return proccesor.registers[REGISTERS_MAP.VF];
};

export function setRegisterVF(proccesor, value) {
  return proccesor.registers[REGISTERS_MAP.VF] = value;
};

export function getRegisterVX(proccesor, register) {
  return proccesor.registers[register];
};

export function setRegisterVX(proccesor, register, value) {
  return proccesor.registers[register] = value;
};
