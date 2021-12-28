import { getBookmarks } from '../../store';
import { Data } from '../../types';
import { getToySrc } from '../../utils';

export default class Card {
  async render(card: Data): Promise<string> {
    const src = await getToySrc(+card.num);
    const html = `
    <div class="card" data-number="${card.num}">
      <h2 class="card__title">${card.name}</h2>
      <img src="${src}" alt="" class="card__image"/>
      <div 
        class="card__bookmark-image
        ${
          getBookmarks().filter((bookmark: Data) => bookmark.num === card.num).length === 1
            ? 'marked'
            : ''
        }
        "
        id="${card.num}" 
        title="Избранное"
      >
      </div>
      <div class="card__description">
        <p class="count">
          Количество:
          <span>
          ${card.count}
          </span>
        </p>
        <p class="year">
          Год покупки:
          <span>
            ${card.year}
          </span>
        </p>
        <p class="shape">
          Форма:
          <span>
            ${card.shape}
          </span>
        </p>
        <p class="color">
          Цвет:
          <span>
            ${card.color}
          </span>
        </p>
        <p class="size">
          Размер:
          <span>
            ${card.size}
          </span>
        </p>
        <p class="favorite">
          Любимая:
          <span>
            ${card.favorite ? 'да' : 'нет'}
          </span>
        </p>
      </div>
    </div>
    `;
    return html;
  }
}
