import { REGISTERS_COUNT } from './const';

export function creatProcessor() {
  const bytes =  new ArrayBuffer(REGISTERS_COUNT);

  return {
    bytes: new Uint8Array(bytes),
  };
}

export function getRegisterV0(proccesor) {
  return proccesor.bytes[REGISTERS_MAP.V0];
};

export function setRegisterV0(proccesor, value) {
  return proccesor.bytes[REGISTERS_MAP.V0] = value;
};

export function getRegisterV1(proccesor) {
  return proccesor.bytes[REGISTERS_MAP.V1];
};

export function setRegisterV1(proccesor, value) {
  return proccesor.bytes[REGISTERS_MAP.V1] = value;
};

export function getRegisterV2(proccesor) {
  return proccesor.bytes[REGISTERS_MAP.V2];
};

export function setRegisterV2(proccesor, value) {
  return proccesor.bytes[REGISTERS_MAP.V2] = value;
};

export function getRegisterV3(proccesor) {
  return proccesor.bytes[REGISTERS_MAP.V3];
};

export function setRegisterV3(proccesor, value) {
  return proccesor.bytes[REGISTERS_MAP.V3] = value;
};

export function getRegisterV4(proccesor) {
  return proccesor.bytes[REGISTERS_MAP.V4];
};

export function setRegisterV4(proccesor, value) {
  return proccesor.bytes[REGISTERS_MAP.V4] = value;
};

export function getRegisterV5(proccesor) {
  return proccesor.bytes[REGISTERS_MAP.V5];
};

export function setRegisterV5(proccesor, value) {
  return proccesor.bytes[REGISTERS_MAP.V5] = value;
};

export function getRegisterV6(proccesor) {
  return proccesor.bytes[REGISTERS_MAP.V6];
};

export function setRegisterV6(proccesor, value) {
  return proccesor.bytes[REGISTERS_MAP.V6] = value;
};

export function getRegisterV7(proccesor) {
  return proccesor.bytes[REGISTERS_MAP.V7];
};

export function setRegisterV7(proccesor, value) {
  return proccesor.bytes[REGISTERS_MAP.V7] = value;
};

export function getRegisterV8(proccesor) {
  return proccesor.bytes[REGISTERS_MAP.V8];
};

export function setRegisterV8(proccesor, value) {
  return proccesor.bytes[REGISTERS_MAP.V8] = value;
};

export function getRegisterV9(proccesor) {
  return proccesor.bytes[REGISTERS_MAP.V9];
};

export function setRegisterV9(proccesor, value) {
  return proccesor.bytes[REGISTERS_MAP.V9] = value;
};

export function getRegisterVA(proccesor) {
  return proccesor.bytes[REGISTERS_MAP.VA];
};

export function setRegisterVA(proccesor, value) {
  return proccesor.bytes[REGISTERS_MAP.VA] = value;
};

export function getRegisterVB(proccesor) {
  return proccesor.bytes[REGISTERS_MAP.VB];
};

export function setRegisterVB(proccesor, value) {
  return proccesor.bytes[REGISTERS_MAP.VB] = value;
};

export function getRegisterVC(proccesor) {
  return proccesor.bytes[REGISTERS_MAP.VC];
};

export function setRegisterVC(proccesor, value) {
  return proccesor.bytes[REGISTERS_MAP.VC] = value;
};

export function getRegisterVE(proccesor) {
  return proccesor.bytes[REGISTERS_MAP.VE];
};

export function setRegisterVE(proccesor, value) {
  return proccesor.bytes[REGISTERS_MAP.VE] = value;
};

export function getRegisterVF(proccesor) {
  return proccesor.bytes[REGISTERS_MAP.VF];
};

export function setRegisterVF(proccesor, value) {
  return proccesor.bytes[REGISTERS_MAP.VF] = value;
};
