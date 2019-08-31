import { STACK_SIZE } from './const';

export function createStack() {
  const stackBytes =  new ArrayBuffer(STACK_SIZE);

  return {
    stack: new Uint16Array(stackBytes),
    stackPointer: -1
  };
}

export function createSharedStack() {
  const stackBytes =  new SharedArrayBuffer(STACK_SIZE);

  return {
    stack: new Uint16Array(stackBytes),
    stackPointer: -1
  };
}

export function push(stack, value) {
  stack.stackPointer += 1;

  return stack.stack[stack.stackPointer] = value;
}

export function pop(stack) {
  const value = stack.stack[stack.stackPointer];

  stack.stackPointer -= 1;

  return value;
}

export function getStackPointer(stack) {
  return stack.stackPointer;
}

export function getStackValues(stack) {
  const stackValues = new Array(stack.stack.length);

  let i = stack.stack.length;
  while (i--) stackValues[i] = stack.stack[i];

  return stackValues;
}
