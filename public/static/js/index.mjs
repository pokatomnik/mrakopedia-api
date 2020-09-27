import { html } from './preact/preact.mjs';
import { RouterComponent } from './utils/router/route-component.mjs';
import { Fallback } from './pages/fallback.mjs';
import { routes } from './routes.mjs';

export const App = () => {
  return html` <${RouterComponent} routes=${routes} fallback=${Fallback} /> `;
};
