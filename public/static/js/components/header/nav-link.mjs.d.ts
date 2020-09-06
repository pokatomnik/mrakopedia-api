import { Element } from '../../preact/preact.mjs';

interface INavLinkProps {
  link: string;
  children: Element;
}

export function NavLink(props: INavLinkProps): Element;
