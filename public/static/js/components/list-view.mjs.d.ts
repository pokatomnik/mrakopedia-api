import { Element } from '../preact/preact.mjs';

interface IListViewProps<T> {
  items: Array<T>;
  defaultName: string;
  groupBy?: (items: Array<T>) => Record<string, Array<T>>;
  children: (item: T) => Element;
}

export function ListView<T>(props: IListViewProps<T>): Element;
