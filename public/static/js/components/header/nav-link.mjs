import { Hooks, html } from '../../preact/preact.mjs';
import { useRouteData } from '../../utils/router/route-component.mjs';

export const NavLink = ({ link, children }) => {
  const { push } = useRouteData();
  const handleClick = Hooks.useCallback(
    (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      push(link);
    },
    [link, push]
  );
  return html`
    <li className="nav-item">
      <a className="nav-link" href=${`/#${link}`} onClick=${handleClick}>
        ${children}
      </a>
    </li>
  `;
};
