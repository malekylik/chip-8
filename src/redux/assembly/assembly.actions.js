import { readOpcode, getOpcodeCountFromRom } from '../../util/index';
import { createOpcode, getOpcodeValue } from '../../chip-8/processor/opcode/opcode';
import { getAssemblerForOpcode } from '../../chip-8/debugger/debugger';
import { fromMemoryToRomAddresses, fromRomToRomAddresses } from '../../chip-8/memory/memory';

export const SET_ASSEMBLY_LINES = '[Assembly] SET_ASSEMBLY_LINES';
export const SET_ASSEMBLY_LINE_NUMBER = '[Assembly] SET_ASSEMBLY_LINE_NUMBER';

export function disassemblyCode(rom) {
  return function (dispatch) {
    const lines = new Array(rom.length);

    for (let i = 0; i < lines.length; i++) {
      const opcode = createOpcode(readOpcode(rom, i));
      lines[i] = {
        address: fromRomToRomAddresses(i),
        opcode: getOpcodeValue(opcode).toString(16).toUpperCase().padStart(4, '0'),
        assembly: getAssemblerForOpcode(opcode),
      };
    }

    dispatch(setAssemblyLines(lines));

    return lines;
  };
}

export function setAssemblyLines(lines) {
  return ({
    type: SET_ASSEMBLY_LINES,
    payload: { lines },
  });
}

export function setAssemblyLineNumber(pc) {
  return ({
    type: SET_ASSEMBLY_LINE_NUMBER,
    payload: { lineNumber: fromMemoryToRomAddresses(pc) },
  });
}
