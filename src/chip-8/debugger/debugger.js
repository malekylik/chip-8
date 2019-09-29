import {
  getPostfixValue,
  getPrefixValue,
  getLeastByte,
  getValueWithourPrefix,
  getValueFromOpcode,
  getLeftRegisterNumber ,
  getRightRegisterNumber,
} from '../processor/opcode/opcode';

export function getAssemblerForOpcode(opcode) {
  const prefix = getPrefixValue(opcode);

  switch (prefix) {
    case 0x0: {
      const leastByte = getLeastByte(opcode);

      switch(leastByte) {
        case 0xE0: return 'CLS';

        case 0xEE: return 'RET';
      }

      break;
    }

    case 0x1: return `JP ${getValueWithourPrefix(opcode)}`;

    case 0x2: return `CALL ${getValueWithourPrefix(opcode)}`;

    case 0x3: return `SE R${getLeftRegisterNumber(opcode)}, ${getValueFromOpcode(opcode)}`;

    case 0x4: return `SNE R${getLeftRegisterNumber(opcode)}, ${getValueFromOpcode(opcode)}`;

    case 0x5: return `SE R${getLeftRegisterNumber(opcode)}, R${getRightRegisterNumber(opcode)}`;

    case 0x6: return `LD R${getLeftRegisterNumber(opcode)}, ${getValueFromOpcode(opcode)}`;

    case 0x7: return `ADD R${getLeftRegisterNumber(opcode)}, ${getValueFromOpcode(opcode)}`;

    case 0x8: {
      const postFix = getPostfixValue(opcode);

      switch (postFix) {
        case 0x0: return `LD R${getLeftRegisterNumber(opcode)}, R${getRightRegisterNumber(opcode)}`;

        case 0x1: return `OR R${getLeftRegisterNumber(opcode)}, R${getRightRegisterNumber(opcode)}`;

        case 0x2: return `AND R${getLeftRegisterNumber(opcode)}, R${getRightRegisterNumber(opcode)}`;

        case 0x3: return `XOR R${getLeftRegisterNumber(opcode)}, R${getRightRegisterNumber(opcode)}`;

        case 0x4: return `ADD R${getLeftRegisterNumber(opcode)}, R${getRightRegisterNumber(opcode)}`;

        case 0x5: return `SUB R${getLeftRegisterNumber(opcode)}, R${getRightRegisterNumber(opcode)}`;

        case 0x6: return `SHR R${getLeftRegisterNumber(opcode)}, R${getRightRegisterNumber(opcode)}`;

        case 0x7: return `SUBN R${getLeftRegisterNumber(opcode)}, R${getRightRegisterNumber(opcode)}`;

        case 0xE: return `SHL R${getLeftRegisterNumber(opcode)}, R${getRightRegisterNumber(opcode)}`;
      }

      break;
    }

    case 0x9: return `SNE R${getLeftRegisterNumber(opcode)}, R${getRightRegisterNumber(opcode)}`;

    case 0xA: return `LD I, ${getValueWithourPrefix(opcode)}`;

    case 0xB: return `JP R0, ${getValueWithourPrefix(opcode)}`;

    case 0xC: return `RND RX, ${getValueFromOpcode(opcode)}`;

    case 0xD: return `DRW R${getLeftRegisterNumber(opcode)}, R${getRightRegisterNumber(opcode)}, ${getPostfixValue(opcode)}`;

    case 0xE: {
      const postFix = getValueFromOpcode(opcode);

      switch (postFix) {
        case 0x9E: return `SKP R${getLeftRegisterNumber(opcode)}`;

        case 0xA1: return `SKNP R${getLeftRegisterNumber(opcode)}`;
      }

      break;
    }

    case 0xF: {
      const postFix = getValueFromOpcode(opcode);

      switch (postFix) {
        case 0x07: return `LD R${getLeftRegisterNumber(opcode)}, DT`;

        case 0x0A: return `LD R${getLeftRegisterNumber(opcode)}, K`;

        case 0x15: return `LD DT, R${getLeftRegisterNumber(opcode)}`;

        case 0x18: return `LD ST, R${getLeftRegisterNumber(opcode)}`;

        case 0x1E: return `ADD I, R${getLeftRegisterNumber(opcode)}`;

        case 0x29: return `LD F, R${getLeftRegisterNumber(opcode)}`;

        case 0x33: return `BCD R${getLeftRegisterNumber(opcode)}`;

        case 0x55: return `LD [I], R${getLeftRegisterNumber(opcode)}`;

        case 0x65: return `LD R${getLeftRegisterNumber(opcode)}, [I]`;
      }

      break;
    }
  }

  return 'UNKNOWN OPCODE';
}