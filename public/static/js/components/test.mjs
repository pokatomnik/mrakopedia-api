import { html, Hooks } from '../preact/preact.mjs';
import { useHistory } from '../utils/history.mjs';
import '../utils/params-matcher.mjs';

export const Test = () => {
  const { urlData, push } = useHistory();
  const testHandler = Hooks.useCallback(() => {
    push(
      `/${Math.random().toString(36).slice(2)}/${Math.random()
        .toString(36)
        .slice(2)}`,
      {
        [Math.random().toString(36).slice(2)]: true,
      }
    );
  }, [push]);
  return html`<button onClick=${testHandler}>
    Route: ${urlData.getHash()}
  </button>`;
};
