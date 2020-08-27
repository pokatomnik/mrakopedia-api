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
  const pathName = urlData.getPathName();
  const match = routes.find(
    (currentRoute) => matchParams(pathName, currentRoute.url).match
  );

  const Component = match ? match.Component : Fallback;

  const params = match ? matchParams(pathName, match.url).params : {};
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
