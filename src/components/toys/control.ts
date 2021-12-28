import { getStorage, setStorage } from '../../store';
import { modalClose, sendQuery } from '../../utils';
import { FiltersByValue, FiltersBySort, FiltersByRange, Cards } from './';
import search from './search';
export default class Filters {
  private filterByValue: FiltersByValue;

  private filterBySort: FiltersBySort;

  private filterByRange: FiltersByRange;

  private cards: Cards;

  constructor() {
    this.cards = new Cards();
    this.filterByValue = new FiltersByValue();
    this.filterBySort = new FiltersBySort();
    this.filterByRange = new FiltersByRange();
  }

  run() {
    this.filtersClick();
    this.cardsClick();
    this.searchClick();
    this.sortClick();
    this.resetClick();
  }

  render(): string {
    const html = `
    <div class="controls">
      <div class="controls__body">
        ${search()}
          <div class="filters__container">
            ${this.filterByValue.render()}
            ${this.filterByRange.render()}
            ${this.filterBySort.render()}
          </div>
      </div>
    </div>
    `;
    return html;
  }

  handleClick() {
    const control = document.querySelector('.filters__value')! as HTMLElement;
    control.addEventListener(
      'click',
      (event: Event) => {
        this.filtersEvents(event);
      },
      { once: true }
    );

    const cardsContainer = document.querySelector('.cards__container') as HTMLElement;
    cardsContainer.addEventListener(
      'click',
      (event: Event) => {
        this.cardEvents(event);
      },
      { once: true }
    );

    const searchToy = document.querySelector('.control__header-search') as HTMLElement;
    searchToy.addEventListener('input', (event: Event) => {
      event.stopPropagation();
      const targetElement = event.target as HTMLInputElement;
      this.search(targetElement);
    });
    searchToy.addEventListener(
      'click',
      (event: Event) => {
        event.stopPropagation();
        this.searchEvent(event);
      },
      { once: true }
    );

    const sortSelection = document.querySelector('.sort__selection') as HTMLInputElement;
    sortSelection.addEventListener(
      'change',
      (event: Event) => {
        this.sortEvents(event);
      },
      { once: true }
    );

    const buttonsContainer = document.querySelector('.buttons__container') as HTMLDivElement;
    buttonsContainer.addEventListener(
      'click',
      (event: Event) => {
        this.resetEvents(event);
      },
      { once: true }
    );
  }

  search(targetElement: HTMLInputElement): void {
    if (+targetElement.value.length !== 0) {
      this.changeSearchIcon('search', 'delete');
    } else {
      this.changeSearchIcon('delete', 'search');
      modalClose();
    }
    this.sendSearchResult(targetElement.value);
  }

  deleteSearchText(targetElement: HTMLElement): void {
    this.sendSearchResult(((targetElement.previousElementSibling as HTMLInputElement).value = ''));
    this.changeSearchIcon('delete', 'search');
  }

  sendSearchResult(value: string): void {
    const filters = getStorage();
    filters.name = value;
    setStorage(filters);
    sendQuery();
  }

  changeSearchIcon(iconRemoved: string, iconAdded: string): void {
    const searchIcon = document.querySelector('.search__icon') as HTMLElement;
    searchIcon.classList.remove(iconRemoved);
    searchIcon.classList.add(iconAdded);
  }

  filtersClick(): void {
    const control = document.querySelector('.filters__value')! as HTMLElement;
    control.addEventListener(
      'click',
      (event: Event) => {
        this.filtersEvents(event);
      },
      { once: true }
    );
  }

  cardsClick(): void {
    const cardsContainer = document.querySelector('.cards__container') as HTMLElement;
    cardsContainer.addEventListener(
      'click',
      (event: Event) => {
        this.cardEvents(event);
      },
      { once: true }
    );
  }

  searchClick(): void {
    const searchToy = document.querySelector('.control__header-search') as HTMLElement;
    searchToy.addEventListener('input', (event: Event) => {
      event.stopPropagation();
      const targetElement = event.target as HTMLInputElement;
      this.search(targetElement);
    });
    searchToy.addEventListener(
      'click',
      (event: Event) => {
        event.stopPropagation();
        this.searchEvent(event);
      },
      { once: true }
    );
  }

  sortClick(): void {
    const sortSelection = document.querySelector('.sort__selection') as HTMLInputElement;
    sortSelection.addEventListener(
      'change',
      (event: Event) => {
        this.sortEvents(event);
      },
      { once: true }
    );
  }

  resetClick(): void {
    const buttonsContainer = document.querySelector('.buttons__container') as HTMLDivElement;
    buttonsContainer.addEventListener(
      'click',
      (event: Event) => {
        this.resetEvents(event);
      },
      { once: true }
    );
  }

  searchEvent(event: Event): void {
    const targetElement = event.target as HTMLElement;
    if (targetElement.classList.contains('delete')) {
      this.deleteSearchText(targetElement);
    }
    this.searchClick();
  }

  filtersEvents(event: Event): void {
    const targetElement = event.target as HTMLElement as HTMLInputElement;
    const parentElement = <HTMLElement>targetElement.parentNode;
    if (parentElement.classList.contains('shape')) {
      this.filterByValue.valueClick(targetElement);
    }
    if (parentElement.classList.contains('color')) {
      this.filterByValue.valueClick(targetElement);
    }
    if (parentElement.classList.contains('size')) {
      this.filterByValue.valueClick(targetElement);
    }
    if (targetElement.classList.contains('input__favorite')) {
      this.filterByValue.favoriteClick();
    }
    this.filtersClick();
  }

  cardEvents(event: Event): void {
    const targetElement = event.target as HTMLElement;
    if (targetElement.classList.contains('card__bookmark-image')) {
      this.cards.cardMarkedUnmarked(targetElement);
    }
    this.cardsClick();
  }

  sortEvents(event: Event): void {
    this.filterBySort.sortClick(event);
    this.sortClick();
  }

  resetEvents(event: Event): void {
    const targetElement = event.target as HTMLButtonElement;
    if (targetElement.classList.contains('reset__filters')) {
      this.filterBySort.resetFiltersActiveStyle();
      this.filterBySort.resetFilters();
      this.filterByRange.resetSliders();
    }
    if (targetElement.classList.contains('reset__settings')) {
      this.filterBySort.resetSettings();
      this.filterByRange.resetSliders();
      this.filterBySort.resetFiltersActiveStyle();
    }
    this.resetClick();
  }
}
