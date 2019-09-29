export const SET_NEW_ROM = '[Roms] SET_NEW_ROM';
export const SET_NEW_ROM_INDEX = '[Roms] SET_NEW_ROM_INDEX';

export function setNewRom(name, rom) {
  return ({
    type: SET_NEW_ROM,
    payload: { name, rom },
  });
}

export function setNewRomIndex(index) {
  return ({
    type: SET_NEW_ROM_INDEX,
    payload: { index },
  });
}
