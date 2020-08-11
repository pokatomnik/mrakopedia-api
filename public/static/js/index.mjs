import { html } from './preact/preact.mjs';
import { Main } from './components/main.mjs';
import { Intro } from './components/intro.mjs';
import { Columns } from './components/columns.mjs';

export const App = () => {
  return html`
    <${Main}>
      <${Intro} />
      <${Columns} />
    </${Main}>
  `;
};
