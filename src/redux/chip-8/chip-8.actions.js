export const SET_PROGRAM_COUNT = '[Chip-8] SET_ASSEMBLY_LINES';

export function setProgramCounter(pc) {
  return ({
    type: SET_PROGRAM_COUNT,
    payload: { pc },
  });
}
