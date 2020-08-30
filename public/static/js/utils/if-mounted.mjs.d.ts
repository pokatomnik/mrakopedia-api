export function useIfMounted() {
  return function <A extends Array<any>>(
    fn: (...args: A) => void
  ): (...args: A) => void {};
}
