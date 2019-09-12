export const SET_NEW_ROM = '[Roms] SET_NEW_ROM';

export function setNewRom(name, rom) {
  return ({
    type: SET_NEW_ROM,
    payload: { name, rom },
  });
}
