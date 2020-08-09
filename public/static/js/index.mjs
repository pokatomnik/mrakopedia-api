import { html } from './preact.mjs';
import { Main } from './components/main.mjs';
import { Intro } from './components/intro.mjs';
import { Row, LargeColumn } from './components/columns.mjs';

export const App = () => {
  return html`
    <${Main}>
      <${Intro} />
      <${Row}>
        <${LargeColumn} title="Feature rich">
          <ul>
            <li>Page search</li>
            <li>Categories navigation</li>
            <li>Stories of month</li>
            <li>Your personal favories list</li>
            <li>Similar stories</li>
            <li>Categories of the specific page</li>
          </ul>
        </${LargeColumn}>
        <${LargeColumn} title="Open source">
          This is an open source project,
          so feel free to look at the source code and contribute.
        </${LargeColumn}>
        <${LargeColumn} title="Open to feature requests">
          <p>
            I will be glad to see any${' '}
            <a
              href="https://github.com/pokatomnik/mrakopedia-reader/issues"
              rel="noreferrer noopener"
            >
              feedback
            </a>.
          </p>
          <p>
            Even if this project is my own initiative,
            I will be happy any comments, feature requests or even blame:)
          </p>
        </${LargeColumn}>
      </${Row}>
    </${Main}>
  `;
};
