import { html } from '../preact/preact.mjs';
import { style } from '../utils/style.mjs';

const FORM_STYLE = style({
  width: '100%',
  'max-width': '420px',
  padding: '15px',
  margin: '50px auto 0 auto',
});

export const Form = ({ busy, onSubmit, children }) => {
  return html`
    <form style=${FORM_STYLE} onSubmit=${onSubmit}>
      <fieldset disabled=${busy}>
        ${children}
      </fieldset>
    </form>
  `;
};
