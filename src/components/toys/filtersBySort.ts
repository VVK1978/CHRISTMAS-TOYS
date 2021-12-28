import { Cards } from '.';
import { Sort } from '../../enums';
import { initialStorage } from '../../store';
import { resetStorage, setSort } from '../../store';
import { sendQuery } from '../../utils';
import { initialSelect } from '../../utils';

export default class FiltersBySort {
  private cards: Cards;

  constructor() {
    this.cards = new Cards();
  }

  render(): string {
    const html = `
      <div class="filters__sort">
        <h2 class="filter__title">СОРТИРОВКА</h2>
        <select class="sort__selection" name="sort-values">
          <option 
            class="sort__option" 
            value="${Sort.nameUp}">
              По названию от А до Я
          </option>
          <option 
            class="sort__option" 
            value="${Sort.nameDown}">
              По названию от Я до А
          </option>
          <option 
            class="sort__option" 
            value="${Sort.countUp}">
              По количеству по возрастанию
          </option>
          <option 
            class="sort__option" 
            value="${Sort.countDown}">
              По количеству по убыванию
          </option>
        </select>
        <div class="buttons__container">
          <button class="button__reset reset__filters">Сброс фильтров</button>
          <button class="button__reset reset__settings">Сброс настроек</button>
        </div>
      </div>
    `;
    return html;
  }

  resetFiltersActiveStyle(): void {
    const active = document.querySelectorAll('.active') as NodeListOf<HTMLElement>;
    if (active.length > 0) {
      active.forEach((element) => {
        if (element.classList.contains('active')) {
          element.classList.remove('active');
        }
      });
    }
    this.resetFavorite();
  }

  sortClick(event: Event): void {
    const targetElement = <HTMLInputElement>event.target;
    const sort = targetElement.value;
    setSort(sort);
    sendQuery();
  }

  resetFilters() {
    initialStorage(true);
    initialSelect();
  }

  resetSettings(): void {
    const bookmarksCount = document.querySelector('.bookmark__count') as HTMLElement;
    bookmarksCount.innerHTML = '0';
    resetStorage();
  }

  resetFavorite(): void {
    const favorite = document.querySelector('.input__favorite') as HTMLInputElement;
    favorite.checked = false;
  }
}
