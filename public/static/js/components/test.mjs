import { Hooks, html } from '../preact/preact.mjs';

export const Test = () => {
  const [state, setState] = Hooks.useState(0);

  const increment = Hooks.useCallback(() => {
    setState((state) => state + 1);
  }, []);

  return html` <button onClick=${increment}>${state}</button> `;
};
