import { Element } from '../preact/preact.mjs';

interface IHeaderProps {
  children?: Element;
}

export function Header(props: IHeaderProps): Element;

interface INavLinkProps {
  link: string;
  children: Element;
}

export function NavLink(props: INavLinkProps): Element;
