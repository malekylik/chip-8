import { LOOP_MODS } from '../../../worker/const/mode';

export const LOOP_MODS_OPTIONS = [
  {
    value: LOOP_MODS.DEFAULT_SPEED_MODE,
    label: '1X (Default mode)',
  },
  {
    value: LOOP_MODS.DOUBLE_SPEED_MODE,
    label: '2X',
  },
  {
    value: LOOP_MODS.TRIPLE_SPEED_MODE,
    label: '3X',
  },
  {
    value: LOOP_MODS.QUADRUPLE_SPEED_MODE,
    label: '4X',
  },
];

export const RESOLUTIONS_MODS = [
  {
    value: 1,
    label: '64x32 (Original)',
  },
  {
    value: 5,
    label: '320x160',
  },
  {
    value: 10,
    label: '640x320',
  },
  {
    value: 15,
    label: '960x480',
  },
  {
    value: 20,
    label: '1280x640',
  },
  {
    value: 25,
    label: '1600x800',
  },
  {
    value: 30,
    label: '1920x960',
  },
  {
    value: 40,
    label: '2560x1280',
  },
  {
    value: 45,
    label: '2880x1440',
  },
  {
    value: 50,
    label: '3200x1600',
  },
  {
    value: 55,
    label: '3520x1760',
  },
  {
    value: 60,
    label: '3840x1920',
  },
];
