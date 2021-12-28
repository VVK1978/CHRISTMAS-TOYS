import { getToySrc } from '..';
import { Data } from '../../interfaces';
import { data, getBookmarks } from '../../store';

export default function getFavoriteToys(element: HTMLDivElement): void {
  const bookmarks: Data[] = getBookmarks();
  let toys: Data[] = [];
  if (bookmarks.length !== 0) {
    toys = bookmarks;
  } else {
    data.forEach((toy: Data, index: number) => {
      if (index < 20) {
        toys.push(toy);
      }
    });
  }
  [...Array(20).keys()].forEach(async (index: number) => {
    const html = `
    <div 
      class="favorite__toy-card ${element.classList.contains('burger__body-toys') ? 'burger' : ''}" 
      id="toy-${index + 1}">
      <img 
        class="${toys[index] ? 'toy__card-image' : 'empty'}" 
        alt="toy-image" 
        src="${toys[index] ? await getToySrc(+toys[index].num) : ''}"
        data-toy="${index + 1}"
        draggable="true"
      />
      <span 
        class="toy__count ${toys[index] ? '' : 'hidden'}"
      >
        ${toys[index] ? +toys[index].count : ''}
      </span>
      <p 
        class="empty__text ${toys[index] ? 'hidden' : ''}"
      >
        ПУСТО
      </p>
    </div>
    `;
    await element.insertAdjacentHTML('afterbegin', html);
  });
}
