export const stringify = <T extends unknown>(
  input: T | Array<T>,
  toString: (value: T) => string = String
) => {
  if (input === undefined) {
    return '';
  }

  if (Array.isArray(input) && input.length === 0) {
    return '';
  }

  return Array.isArray(input) ? input.map(toString).join('') : toString(input);
};
