import { Element } from '../preact/preact.mjs';

interface ICategory {
  title: string;
  url: string;
}

interface ICategoriesListProps {
  fetchCategories: () => Promise<Array<ICategory>>;
  groupBy: (items: Array<ICategory>) => Record<string, Array<ICategory>>;
}

export function CategoriesList(props: ICategoriesListProps): Element;
