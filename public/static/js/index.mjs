import { html } from './preact/preact.mjs';
import { RouterComponent } from './utils/router/route-component.mjs';
import { Fallback } from './pages/fallback.mjs';
import { routes } from './routes.mjs';
import { AuthProvider } from './utils/auth/auth.mjs';

export const App = () => {
  return html`
    <${AuthProvider}>
      <${RouterComponent} routes=${routes} fallback=${Fallback} />
    </${AuthProvider}>
  `;
};
