import Preact from 'preact';
import _Hooks from 'preact/hooks';

export type Element = ReturnType<typeof Preact.createElement>;
export const Hooks = _Hooks;
export default Preact;
export function html(
  input: TemplateStringsArray,
  ...params: Array<unknown>
): Element;
