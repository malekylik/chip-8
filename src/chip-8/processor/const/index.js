export const REGISTERS_COUNT = 16;
export const PROGRAM_COUNTER = 8;
export const PROGRAM_COUNTER_BYTES = 2;

export const CARRY_FLAG_CLEAR = 0;
export const CARRY_FLAG_SET = 1;

export const PROGRAM_START_ADDRESS = 0x200;

export const REGISTERS_MAP = {
  V0: 0,
  V1: 1,
  V2: 2,
  V3: 3,
  V4: 4,
  V5: 5,
  V6: 6,
  V7: 7,
  V8: 8,
  V9: 9,
  VA: 10,
  VB: 11,
  VC: 12,
  VD: 13,
  VE: 14,
  VF: 15,
};

export const REGISTERS = [
  'V0',
  'V1',
  'V2',
  'V3',
  'V4',
  'V5',
  'V6',
  'V7',
  'V8',
  'V9',
  'VA',
  'VB',
  'VC',
  'VD',
  'VE',
  'VF',
];

export const MOCK_GAME = Uint8Array.from([
  18,
  23,
  66,
  76,
  73,
  84,
  90,
  32,
  66,
  121,
  32,
  68,
  97,
  118,
  105,
  100,
  32,
  87,
  73,
  78,
  84,
  69,
  82,
  163,
  65,
  96,
  4,
  97,
  9,
  98,
  14,
  103,
  4,
  208,
  30,
  242,
  30,
  112,
  12,
  48,
  64,
  18,
  33,
  240,
  10,
  0,
  224,
  34,
  217,
  240,
  10,
  0,
  224,
  142,
  112,
  163,
  30,
  107,
  31,
  204,
  31,
  140,
  196,
  220,
  178,
  63,
  1,
  18,
  73,
  220,
  178,
  18,
  57,
  202,
  7,
  122,
  1,
  123,
  254,
  220,
  178,
  122,
  255,
  58,
  0,
  18,
  77,
  126,
  255,
  62,
  0,
  18,
  57,
  107,
  0,
  140,
  112,
  109,
  0,
  110,
  0,
  163,
  27,
  221,
  227,
  63,
  0,
  18,
  193,
  59,
  0,
  18,
  129,
  96,
  5,
  224,
  158,
  18,
  135,
  107,
  1,
  136,
  208,
  120,
  2,
  137,
  224,
  121,
  3,
  163,
  30,
  216,
  145,
  129,
  240,
  96,
  5,
  240,
  21,
  240,
  7,
  48,
  0,
  18,
  139,
  59,
  1,
  18,
  171,
  163,
  30,
  49,
  1,
  216,
  145,
  121,
  1,
  57,
  32,
  18,
  171,
  107,
  0,
  49,
  0,
  124,
  255,
  76,
  0,
  18,
  187,
  163,
  27,
  221,
  227,
  125,
  2,
  61,
  64,
  18,
  185,
  109,
  0,
  126,
  1,
  18,
  101,
  0,
  224,
  119,
  2,
  18,
  45,
  163,
  27,
  221,
  227,
  96,
  20,
  97,
  2,
  98,
  11,
  163,
  32,
  208,
  27,
  242,
  30,
  112,
  8,
  48,
  44,
  18,
  205,
  18,
  215,
  96,
  10,
  97,
  13,
  98,
  5,
  163,
  7,
  208,
  21,
  242,
  30,
  112,
  8,
  48,
  42,
  18,
  225,
  128,
  112,
  112,
  254,
  128,
  6,
  163,
  135,
  240,
  51,
  242,
  101,
  96,
  45,
  241,
  41,
  97,
  13,
  208,
  21,
  112,
  5,
  242,
  41,
  208,
  21,
  0,
  238,
  131,
  130,
  131,
  130,
  251,
  232,
  8,
  136,
  5,
  226,
  190,
  160,
  184,
  32,
  62,
  128,
  128,
  128,
  128,
  248,
  128,
  248,
  252,
  192,
  192,
  249,
  129,
  219,
  203,
  251,
  0,
  250,
  138,
  154,
  153,
  248,
  239,
  42,
  232,
  41,
  41,
  0,
  111,
  104,
  46,
  76,
  143,
  190,
  160,
  184,
  176,
  190,
  0,
  190,
  34,
  62,
  52,
  178,
  216,
  216,
  0,
  195,
  195,
  0,
  216,
  216,
  0,
  195,
  195,
  0,
  216,
  216,
  192,
  192,
  0,
  192,
  192,
  0,
  192,
  192,
  0,
  192,
  192,
  0,
  219,
  219,
  219,
  219,
  0,
  24,
  24,
  0,
  24,
  24,
  0,
  24,
  24,
  0,
  219,
  219,
  219,
  219,
  0,
  24,
  24,
  0,
  24,
  24,
  0,
  24,
  24,
  0,
  24,
  24,
  219,
  219,
  0,
  3,
  3,
  0,
  24,
  24,
  0,
  192,
  192,
  0,
  219,
  219,
  0
]);
