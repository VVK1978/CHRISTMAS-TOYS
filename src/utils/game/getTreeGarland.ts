import { garlandsCount } from '../../constants';

export default function getTreeGarland(activeColor: string): string {
  let garlandContent = '';
  let li = '';
  let ul = '';
  garlandsCount.forEach((garlandCount, index) => {
    [...Array(garlandCount).keys()].forEach((count) => {
      li += `<li class="${activeColor}" style="transform: rotate(${
        -20 + 10 * index
      }deg) translate(0,${25 * count}px)"></li>`;
    });
    ul = `
      <ul class="lightrope">
        ${li};
      </ul>`;
    garlandContent += ul;
    li = '';
    ul = '';
  });
  return garlandContent;
}
