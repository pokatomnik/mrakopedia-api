import Preact, { Hooks } from '../../preact/preact.mjs';
import { Router } from './router.mjs';
import { UrlData } from './url-data.mjs';

const Context = Preact.createContext(new Router());

export const useHistory = () => {
  const context = Hooks.useContext(Context);
  const [hash, setHash] = Hooks.useState(context.getRoute());

  Hooks.useEffect(() => {
    const unsubscribe = context.subscribe((hash) => {
      setHash(hash);
    });

    return () => {
      unsubscribe();
    };
  }, [context]);

  return {
    urlData: UrlData.fromString(hash),
    push: (route, options) => {
      context.push(new UrlData(route, options).getHash());
    },
  };
};
