import { html, Hooks } from '../preact/preact.mjs';

export const ListView = ({
  items,
  defaultName,
  groupBy = () => ({
    [defaultName]: items,
  }),
  children,
}) => {
  const grouped = Hooks.useMemo(() => groupBy(items), [groupBy, items]);
  return html`
    <div className="container">
      ${Object.entries(grouped).map(([entryName, values]) => {
        return html`
          <div className="my-3 p-3 bg-white rounded box-shadow">
            <h6 className="border-bottom border-gray pb-2 mb-0">
              ${entryName}
            </h6>
            ${values.map(
              (value) => html`
                <div className="media text-muted pt-3">
                  <p
                    className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray"
                  >
                    ${children(value)}
                  </p>
                </div>
              `
            )}
          </div>
        `;
      })}
    </div>
  `;
};
