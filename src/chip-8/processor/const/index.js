export const REGISTERS_COUNT = 16;
export const PROGRAM_COUNTER = 8;
export const PROGRAM_COUNTER_BYTES = 2;
export const I_REGISTER = 9;
export const I_REGISTER_BYTES = 2;

export const CARRY_FLAG_CLEAR = 0;
export const CARRY_FLAG_SET = 1;

export const OPCODE_BYTES = 2;

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

// BRIX
export const MOCK_GAME = Uint8Array.from([
  0x6e, 0x05, 0x65, 0x00, 0x6b, 0x06, 0x6a, 0x00, 0xa3, 0x0c, 0xda, 0xb1, 0x7a, 0x04, 0x3a, 0x40,
  0x12, 0x08, 0x7b, 0x02, 0x3b, 0x12, 0x12, 0x06, 0x6c, 0x20, 0x6d, 0x1f, 0xa3, 0x10, 0xdc, 0xd1,
  0x22, 0xf6, 0x60, 0x00, 0x61, 0x00, 0xa3, 0x12, 0xd0, 0x11, 0x70, 0x08, 0xa3, 0x0e, 0xd0, 0x11,
  0x60, 0x40, 0xf0, 0x15, 0xf0, 0x07, 0x30, 0x00, 0x12, 0x34, 0xc6, 0x0f, 0x67, 0x1e, 0x68, 0x01,
  0x69, 0xff, 0xa3, 0x0e, 0xd6, 0x71, 0xa3, 0x10, 0xdc, 0xd1, 0x60, 0x04, 0xe0, 0xa1, 0x7c, 0xfe,
  0x60, 0x06, 0xe0, 0xa1, 0x7c, 0x02, 0x60, 0x3f, 0x8c, 0x02, 0xdc, 0xd1, 0xa3, 0x0e, 0xd6, 0x71,
  0x86, 0x84, 0x87, 0x94, 0x60, 0x3f, 0x86, 0x02, 0x61, 0x1f, 0x87, 0x12, 0x47, 0x1f, 0x12, 0xac,
  0x46, 0x00, 0x68, 0x01, 0x46, 0x3f, 0x68, 0xff, 0x47, 0x00, 0x69, 0x01, 0xd6, 0x71, 0x3f, 0x01,
  0x12, 0xaa, 0x47, 0x1f, 0x12, 0xaa, 0x60, 0x05, 0x80, 0x75, 0x3f, 0x00, 0x12, 0xaa, 0x60, 0x01,
  0xf0, 0x18, 0x80, 0x60, 0x61, 0xfc, 0x80, 0x12, 0xa3, 0x0c, 0xd0, 0x71, 0x60, 0xfe, 0x89, 0x03,
  0x22, 0xf6, 0x75, 0x01, 0x22, 0xf6, 0x45, 0x60, 0x12, 0xde, 0x12, 0x46, 0x69, 0xff, 0x80, 0x60,
  0x80, 0xc5, 0x3f, 0x01, 0x12, 0xca, 0x61, 0x02, 0x80, 0x15, 0x3f, 0x01, 0x12, 0xe0, 0x80, 0x15,
  0x3f, 0x01, 0x12, 0xee, 0x80, 0x15, 0x3f, 0x01, 0x12, 0xe8, 0x60, 0x20, 0xf0, 0x18, 0xa3, 0x0e,
  0x7e, 0xff, 0x80, 0xe0, 0x80, 0x04, 0x61, 0x00, 0xd0, 0x11, 0x3e, 0x00, 0x12, 0x30, 0x12, 0xde,
  0x78, 0xff, 0x48, 0xfe, 0x68, 0xff, 0x12, 0xee, 0x78, 0x01, 0x48, 0x02, 0x68, 0x01, 0x60, 0x04,
  0xf0, 0x18, 0x69, 0xff, 0x12, 0x70, 0xa3, 0x14, 0xf5, 0x33, 0xf2, 0x65, 0xf1, 0x29, 0x63, 0x37,
  0x64, 0x00, 0xd3, 0x45, 0x73, 0x05, 0xf2, 0x29, 0xd3, 0x45, 0x00, 0xee, 0xe0, 0x00, 0x80, 0x00,
  0xfc, 0x00, 0xaa, 0x00, 0x00, 0x00, 0x00, 0x00,
]);

export const TEST_ROM = Uint8Array.from([
  0x00, 0xE0, 0x63, 0x00, 0x64, 0x01, 0x65, 0xEE, 0x35, 0xEE, 0x13, 0x10, 0x63, 0x00, 0x64, 0x02, 0x65, 0xEE, 0x66, 0xEE, 0x55, 0x60, 0x13, 0x10, 0x63, 0x00, 0x64, 0x03, 0x65, 0xEE, 0x45, 0xFD, 0x13, 0x10, 0x63, 0x00, 0x64, 0x04, 0x65, 0xEE, 0x75, 0x01, 0x35, 0xEF, 0x13, 0x10, 0x63, 0x00, 0x64, 0x05, 0x6F, 0x01, 0x65, 0xEE, 0x66, 0xEF, 0x85, 0x65, 0x3F, 0x00, 0x13, 0x10, 0x63, 0x00, 0x64, 0x06, 0x6F, 0x00, 0x65, 0xEF, 0x66, 0xEE, 0x85, 0x65, 0x3F, 0x01, 0x13, 0x10, 0x6F, 0x00, 0x63, 0x00, 0x64, 0x07, 0x65, 0xEE, 0x66, 0xEF, 0x85, 0x67, 0x3F, 0x01, 0x13, 0x10, 0x63, 0x00, 0x64, 0x08, 0x6F, 0x01, 0x65, 0xEF, 0x66, 0xEE, 0x85, 0x67, 0x3F, 0x00, 0x13, 0x10, 0x63, 0x00, 0x64, 0x09, 0x65, 0xF0, 0x66, 0x0F, 0x85, 0x61, 0x35, 0xFF, 0x13, 0x10, 0x63, 0x01, 0x64, 0x00, 0x65, 0xF0, 0x66, 0x0F, 0x85, 0x62, 0x35, 0x00, 0x13, 0x10, 0x63, 0x01, 0x64, 0x01, 0x65, 0xF0, 0x66, 0x0F, 0x85, 0x63, 0x35, 0xFF, 0x13, 0x10, 0x6F, 0x00, 0x63, 0x01, 0x64, 0x02, 0x65, 0x81, 0x85, 0x0E, 0x3F, 0x01, 0x13, 0x10, 0x63, 0x01, 0x64, 0x03, 0x6F, 0x01, 0x65, 0x47, 0x85, 0x0E, 0x3F, 0x00, 0x13, 0x10, 0x63, 0x01, 0x64, 0x04, 0x6F, 0x00, 0x65, 0x01, 0x85, 0x06, 0x3F, 0x01, 0x13, 0x10, 0x63, 0x01, 0x64, 0x05, 0x6F, 0x01, 0x65, 0x02, 0x85, 0x06, 0x3F, 0x00, 0x13, 0x10, 0x63, 0x01, 0x64, 0x06, 0x60, 0x15, 0x61, 0x78, 0xA3, 0xD0, 0xF1, 0x55, 0xF1, 0x65, 0x30, 0x15, 0x13, 0x10, 0x31, 0x78, 0x13, 0x10, 0x63, 0x01, 0x64, 0x07, 0x60, 0x8A, 0xA3, 0xD0, 0xF0, 0x33, 0xA3, 0xD0, 0xF0, 0x65, 0x30, 0x01, 0x13, 0x10, 0x60, 0x01, 0xF0, 0x1E, 0xF0, 0x65, 0x30, 0x03, 0x13, 0x10, 0x60, 0x01, 0xF0, 0x1E, 0xF0, 0x65, 0x30, 0x08, 0x13, 0x10, 0x13, 0x32, 0x13, 0x0E, 0xA3, 0x2A, 0x60, 0x13, 0x61, 0x09, 0xD0, 0x18, 0xF3, 0x29, 0x60, 0x22, 0x61, 0x0B, 0xD0, 0x15, 0xF4, 0x29, 0x60, 0x28, 0x61, 0x0B, 0xD0, 0x15, 0x13, 0x0E, 0xFF, 0xF0, 0xF0, 0xFF, 0xF0, 0xF0, 0xF0, 0xFF, 0xA3, 0x58, 0x60, 0x15, 0x61, 0x0B, 0x63, 0x08, 0xD0, 0x18, 0x70, 0x08, 0xF3, 0x1E, 0x30, 0x2D, 0x13, 0x3A, 0xA3, 0x70, 0x60, 0x02, 0x61, 0x18, 0x63, 0x08, 0xD0, 0x18, 0x70, 0x05, 0xF3, 0x1E, 0x30, 0x3E, 0x13, 0x4C, 0x13, 0x0E, 0xF0, 0x88, 0x88, 0xF0, 0x88, 0x88, 0x88, 0xF0, 0x78, 0x84, 0x84, 0x84, 0x84, 0x84, 0x84, 0x78, 0x84, 0xC4, 0xA4, 0x94, 0x8C, 0x84, 0x84, 0x84, 0xC0, 0xA0, 0xA0, 0xC0, 0xA0, 0xA0, 0xC0, 0x00, 0x00, 0x00, 0xA0, 0xA0, 0xE0, 0x20, 0x20, 0xE0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xC0, 0xA0, 0xA0, 0xC0, 0xA0, 0xA0, 0xC0, 0x00, 0x00, 0x00, 0x60, 0xA0, 0xC0, 0x80, 0x60, 0x00, 0x00, 0x00, 0x60, 0x80, 0x40, 0x20, 0xC0, 0x00, 0x80, 0x80, 0xC0, 0x80, 0x80, 0x80, 0x60, 0x00, 0xE0, 0x80, 0x80, 0x80, 0x80, 0x80, 0xE0, 0x00, 0x00, 0x00, 0x40, 0xA0, 0xA0, 0xA0, 0x40, 0x00, 0x20, 0x20, 0x20, 0x60, 0xA0, 0xA0, 0x60, 0x00, 0x00, 0x00, 0x60, 0xA0, 0xC0, 0x80, 0x60, 0x00, 0x00, 0x00, 0x00, 0x60, 0x40, 0x40, 0x50, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
]);