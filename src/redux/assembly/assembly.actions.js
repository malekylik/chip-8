import { readOpcode, getOpcodeCountFromRom } from '../../util/index';
import { getNextInstructionAddress } from '../../chip-8/processor/methods';
import { createOpcode, getOpcodeValue } from '../../chip-8/processor/opcode/opcode';
import { getAssemblerForOpcode } from '../../chip-8/debugger/debugger';

export const SET_ASSEMBLY_LINES = '[App] SET_ASSEMBLY_LINES';

export function disassemblyCode(rom) {
  return function (dispatch) {
    const lines = new Array(getOpcodeCountFromRom(rom));

    for (let i = 0, address = 0; i < lines.length; i++, address = getNextInstructionAddress(address)) {
      const opcode = createOpcode(readOpcode(rom, address));
      lines[i] = {
        address,
        opcode: getOpcodeValue(opcode),
        assembly: getAssemblerForOpcode(opcode),
      } ;
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
