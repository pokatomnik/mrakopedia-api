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
    <${LargeColumn} title="Возможности">
      <ul>
        <li>Поиск историй</li>
        <li>Навигация по категориям</li>
        <li>Истории месяца</li>
        <li>Избранное</li>
        <li>Истории, похожие на выбранную</li>
        <li>Категории выбранной истории</li>
        <li>Приложение активно развивается, новые возможности появляются каждую неделю</li>
      </ul>
    </${LargeColumn}>
    <${LargeColumn} title="Открытый код">
      Это открытый проект, каждый может принять в нем участие.
      Пулреквесты приветствуются.
    </${LargeColumn}>
    <${LargeColumn} title="Чего-то не хватает?">
      <p>
        Буду рад видеть любую обратную${' '}
        <a
          href="https://github.com/pokatomnik/mrakopedia-reader/issues"
          rel="noreferrer noopener"
        >
          связь
        </a>.
      </p>
      <p>
        Любые комментарии, просьбы о реализации новых фич или критика
      </p>
    </${LargeColumn}>
  </${Row}>
  `;
};
