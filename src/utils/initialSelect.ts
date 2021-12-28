import { getSort } from '../store';

export default function initialSelect(): void {
  const options = document.querySelectorAll('.sort__option') as NodeListOf<HTMLOptionElement>;
  options.forEach((option, index) => (index === +getSort() ? (option.selected = true) : ''));
}
