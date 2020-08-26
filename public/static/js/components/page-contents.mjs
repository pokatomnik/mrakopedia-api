import { html } from '../preact/preact.mjs';
import { useRouteData } from '../utils/router/route-component.mjs';
import { style } from '../utils/style.mjs';
import { apiPage } from '../api/api-routes.mjs';

const IFRAME_STYLE = style({
  height: 'calc(100vh - 56px)',
  width: '100vw',
  border: '0',
  'box-sizing': 'border-box',
});

export const PageContents = () => {
  const {
    params: { title },
  } = useRouteData();

  return html`<iframe style=${IFRAME_STYLE} src="${apiPage(title)}" />`;
};
