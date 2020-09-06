import Preact, { html } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Intro } from '../components/intro.mjs';
import { Columns } from '../components/columns.mjs';
import { Header } from '../components/header/header.mjs';

export const Index = () => {
  return html`
    <${Preact.Fragment}>
    <${Header} />
    <${Main}>
      <${Intro} />
      <${Columns} />
    </${Main}>
    </${Preact.Fragment}>
  `;
};
