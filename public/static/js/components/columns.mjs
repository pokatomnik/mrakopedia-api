import { html } from '../preact/preact.mjs';

const LargeColumn = ({ title, children }) => {
  return html`
    <div className="col-lg-4">
      <h2>${title}</h2>
      <p>${children}</p>
    </div>
  `;
};

const Row = ({ children }) => {
  return html`<div className="container">
    <div className="row">
      ${children}
    </div>
  </div>`;
};

export const Columns = () => {
  return html`
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
  `;
};
