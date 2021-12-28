import { Sort } from '../enums';
import { Data } from '../types';

export default function sortData(data: Data[], sort: string): Data[] {
  let sorted: Data[] = [];
  switch (sort) {
    case Sort.nameUp:
      sorted = data.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case Sort.nameDown:
      sorted = data.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case Sort.countUp:
      sorted = data.sort((a, b) => +a.count - +b.count);
      break;
    case Sort.countDown:
      sorted = data.sort((a, b) => +b.count - +a.count);
      break;
    default:
      sorted = data.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
  return sorted;
}
