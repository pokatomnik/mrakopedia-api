import Preact, { html } from '../preact/preact.mjs';
import { Main } from '../components/main.mjs';
import { Header } from '../components/header.mjs';
import { PageContents } from '../components/page-contents.mjs';

export const Page = () => {
  return html`
    <${Preact.Fragment}>
    <${Header} />
    <${Main}>
      <${PageContents} />
    </${Main}>
    </${Preact.Fragment}>
  `;
};
