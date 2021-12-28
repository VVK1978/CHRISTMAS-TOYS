import bookmarkIcon from '../../../public/assets/images/svg/bookmark.svg';
import { getBookmarks } from '../../store';

export default function headerBookmark(): string {
  const html = `
    <div class="cards__header-bookmark">
      <img class="bookmark__image" src="${bookmarkIcon}" alt="bookmark-icon"/>
      <span class="bookmark__count">${getBookmarks().length}</span>
    </div>
  `;
  return html;
}
