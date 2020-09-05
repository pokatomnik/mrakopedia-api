import { Hooks, html } from '../../preact/preact.mjs';
import { RouteSearch } from '../../routes.mjs';
import { useRouteData } from '../../utils/router/route-component.mjs';

export const SearchForm = () => {
  const { push } = useRouteData();
  const [searchString, setSearchString] = Hooks.useState('');

  const handleInput = Hooks.useCallback(({ currentTarget: { value } }) => {
    setSearchString(value);
  }, []);

  const handleSubmit = Hooks.useCallback(
    (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      push(RouteSearch.link(searchString));
    },
    [searchString, push]
  );

  return html`
    <form className="form-inline mt-2 mt-md-0" onSubmit=${handleSubmit}>
      <input
        className="form-control mr-sm-2"
        type="text"
        placeholder="Навание истории..."
        aria-label="Название истории..."
        value=${searchString}
        onInput=${handleInput}
      />
      <button
        className="btn btn-primary my-2 my-sm-0"
        type="submit"
        disabled=${!searchString}
      >
        Поиск
      </button>
    </form>
  `;
};
