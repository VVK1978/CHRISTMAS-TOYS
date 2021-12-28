import { removeChildrenNodes } from '.';
import { Cards } from '../components/toys';

export function sendQuery(): void {
  const cards = new Cards();
  removeChildrenNodes('.cards__container');
  cards.render();
}
