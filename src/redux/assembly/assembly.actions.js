import { readOpcode, getOpcodeCountFromRom } from '../../util/index';
import { getNextInstructionAddress } from '../../chip-8/processor/methods';
import { createOpcode, getOpcodeValue } from '../../chip-8/processor/opcode/opcode';
import { getAssemblerForOpcode } from '../../chip-8/debugger/debugger';
import { fromMemoryToRomAddresses, fromRomToRomAddresses } from '../../chip-8/memory/memory';
import { OPCODE_BYTES } from '../../chip-8/processor/const/index';

export const SET_ASSEMBLY_LINES = '[Assembly] SET_ASSEMBLY_LINES';
export const SET_ASSEMBLY_LINE_NUMBER = '[Assembly] SET_ASSEMBLY_LINE_NUMBER';

export function disassemblyCode(rom) {
  return function (dispatch) {
    const lines = new Array(getOpcodeCountFromRom(rom));

    for (let i = 0, address = 0; i < lines.length; i++, address = getNextInstructionAddress(address)) {
      const opcode = createOpcode(readOpcode(rom, address));
      lines[i] = {
        address: fromRomToRomAddresses(address),
        opcode: getOpcodeValue(opcode),
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
    payload: { lineNumber: (fromMemoryToRomAddresses(pc) / OPCODE_BYTES) },
  });
}
