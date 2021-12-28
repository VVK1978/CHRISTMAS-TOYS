import { getTreeSrc } from '..';

export default function getFavoriteTrees(element: HTMLElement): void {
  [...Array(6).keys()].forEach(async (value: number) => {
    const html = `
  <div 
    class="favorite__tree-card ${element.classList.contains('burger__body-trees') ? 'burger' : ''}" 
    id="tree-${value + 1}">
    <img 
      class="tree__card-image " 
      alt="tree-image" 
      src="${await getTreeSrc(value + 1)}"/>
  </div>
`;
    element.insertAdjacentHTML('beforeend', html);
  });
}
