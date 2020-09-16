import { Element } from '../preact/preact.mjs';

interface IFormProps {
  busy: boolean;
  onSubmit: () => void;
  children: Element;
}

export function Form(props: IFormProps): Element;
