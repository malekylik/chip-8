import { STACK_SIZE } from './const';

export function createStack() {
  const stackBytes =  new ArrayBuffer(STACK_SIZE);

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
