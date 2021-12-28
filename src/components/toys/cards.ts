import { BOOKMARKS_MAX, MESSAGE_BOOKMARKS, MESSAGE_FILTERS } from '../../constants';
import { getStorage } from '../../store';
import { addBookmark, removeBookmark, getBookmarks } from '../../store';
import { Data, TQuery } from '../../types';
import { filterData, modalMessage, modalClose } from '../../utils';
import { headerBookmark } from '../toys/index';
import { Card, Modal } from './';

export default class Cards {
  private card: Card;

  private modal: Modal;

  constructor() {
    this.card = new Card();
    this.modal = new Modal();
  }

  run(): string {
    const html = `
    <div class="cards">
      <div class="cards__header">
        <h2 class="cards__header-title">ИГРУШКИ</h2>
        ${headerBookmark()}
      </div>
      <div class="cards__container">
      </div>
      ${this.modal.render()}
    </div>
    `;
    return html;
  }

  async render(): Promise<void> {
    const query: TQuery = getStorage();
    const cardsData: Data[] = await this.getData().then((_data) => _data);
    const dataFiltered: Data[] = filterData(query, cardsData);
    if (dataFiltered.length === 0) {
      modalMessage(MESSAGE_FILTERS);
    } else {
      modalClose();
    }
    dataFiltered.forEach(async (card: Data) => {
      const cardContainer = document.querySelector('.cards__container') as HTMLElement;
      const cardsContent: string = await this.card.render(card);
      cardContainer.insertAdjacentHTML('beforeend', cardsContent);
    });
  }

  getData(): Promise<Data[]> {
    return import('../../store/data').then((_data) => _data.default);
  }

  cardMarkedUnmarked(targetElement: HTMLElement): void {
    if (getBookmarks().length !== BOOKMARKS_MAX) {
      targetElement.classList.toggle('marked');
      this.addRemoveCardToBookmark(targetElement);
    } else {
      if (getBookmarks().length === BOOKMARKS_MAX && targetElement.classList.contains('marked')) {
        targetElement.classList.toggle('marked');
        this.addRemoveCardToBookmark(targetElement);
        modalClose();
      } else {
        this.messageBookmarks();
      }
    }
  }

  addRemoveCardToBookmark(targetElement: HTMLElement): void {
    const toyNumber: string = targetElement.id;
    if (targetElement.classList.contains('marked')) {
      addBookmark(toyNumber);
      this.countBookmarks('add');
    } else {
      removeBookmark(toyNumber);
      this.countBookmarks();
    }
  }

  countBookmarks(operation?: string): void {
    const countBookmark = document.querySelector('.bookmark__count') as HTMLSpanElement;
    let countCurrent = +countBookmark.textContent!;
    if (operation === 'add' && getBookmarks().length <= BOOKMARKS_MAX) {
      countCurrent += 1;
    } else {
      countCurrent -= 1;
    }
    countBookmark.textContent = `${countCurrent}`;
  }

  messageBookmarks(): void {
    modalMessage(MESSAGE_BOOKMARKS);
  }
}
