export function useIfMounted() {
  return function <A extends Array<unknown>>(
    fn: (...args: A) => void
  ): (...args: A) => void {};
}
