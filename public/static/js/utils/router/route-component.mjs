import Preact, { html, Hooks } from '../../preact/preact.mjs';
import { matchParams } from './params-matcher.mjs';
import { useHistory } from './history.mjs';

const UrlDataContext = Preact.createContext({
  params: {},
  query: {},
  push: () => {},
});

const { Provider: RouteProvider } = UrlDataContext;

export const useRouteData = () => {
  return Hooks.useContext(UrlDataContext);
};

export const RouterComponent = ({ routes, fallback: Fallback }) => {
  const { urlData, push } = useHistory();
  const patnName = urlData.getPathName();
  const match = routes.find(
    (currentRoute) => matchParams(patnName, currentRoute.url).match
  );

  const Component = match ? match.Component : Fallback;

  const params = match ? matchParams(patnName, match.url).params : {};
  const query = urlData.getOptions();

  const urlDataContextValue = Hooks.useMemo(
    () => ({
      params,
      query,
      push,
    }),
    [params, query, push]
  );

  return html`
    <${RouteProvider} value=${urlDataContextValue}>
      <${Component} />
    </$RouteProvider>
  `;
};
