import { Cards } from '.';
import { Color, Size, Shape } from '../../enums';
import { setStorage, getStorage } from '../../store';
import { sendQuery } from '../../utils';

export default class FiltersByValue {
  public cards: Cards;

  constructor() {
    this.cards = new Cards();
  }

  render(): string {
    const filters = getStorage();
    const html = `
      <div class="filters__value">
        <h2 class="filter__title">ФИЛЬТРЫ ПО ЗНАЧЕНИЮ</h2>
        <div class="value__shape shape">
          Форма:
          <button class="button__shape
          ${this.setActiveFilter('shape', Shape.ball)}" data-shape="${Shape.ball}">
          </button>
          <button class="button__shape 
          ${this.setActiveFilter('shape', Shape.bell)}" data-shape="${Shape.bell}">
          </button>
          <button class="button__shape
          ${this.setActiveFilter('shape', Shape.cone)}" data-shape="${Shape.cone}">
          </button>
          <button class="button__shape 
          ${this.setActiveFilter('shape', Shape.snowflake)}" data-shape="${Shape.snowflake}">
          </button>
          <button class="button__shape
          ${this.setActiveFilter('shape', Shape.toy)}" data-shape="${Shape.toy}">
          </button>
        </div>
        <div class="value__color color">
          Цвет:
          <button class="button__color
          ${this.setActiveFilter('color', Color.white)}" data-color="${Color.white}">
          </button>
          <button class="button__color
          ${this.setActiveFilter('color', Color.yellow)}" data-color="${Color.yellow}"></button>
          <button class="button__color
          ${this.setActiveFilter('color', Color.red)}" data-color="${Color.red}">
          </button>
          <button class="button__color
          ${this.setActiveFilter('color', Color.blue)}" data-color="${Color.blue}">
          </button>
          <button class="button__color
          ${this.setActiveFilter('color', Color.green)}" data-color="${Color.green}">
          </button>
        </div>
        <div class="value__size size">
          Размер:
          <button class="button__size
          ${this.setActiveFilter('size', Size.big)}" data-size="${Size.big}">
          </button>
          <button class="button__size
          ${this.setActiveFilter('size', Size.middle)}" data-size="${Size.middle}">
          </button>
          <button class="button__size
          ${this.setActiveFilter('size', Size.small)}" data-size="${Size.small}">
          </button>
        </div>
        <div class="value__favorite">
          Только любимые:
          <div class="form__favorite">
            <input class="input__favorite" type="checkbox" 
              ${filters.favorite === true ? 'checked' : ''}/>
            <label for="checkbox" class="input__favorite-label">
            </label>
          </div>
        </div>
      </div>
    `;
    return html;
  }

  setActiveFilter(key: string, value: string) {
    const query = getStorage();
    if (key === 'shape' || key === 'color' || key === 'size') {
      return query[key]?.includes(value) ? 'active' : '';
    }
  }

  valueClick(targetElement: HTMLElement): void {
    targetElement.classList.toggle('active');
    this.setQuery(targetElement);
  }

  favoriteClick(): void {
    const filters = getStorage();
    filters.favorite = !filters.favorite;
    setStorage(filters);
    sendQuery();
  }

  setQuery(targetElement: HTMLElement): void {
    const key: string = targetElement.classList[0].slice(8);
    const value: string = targetElement.dataset[key]!;
    const query = getStorage();
    if (key === 'shape' || key === 'color' || key === 'size') {
      if (query[key]?.includes(value)) {
        const indexDeleteElement: number = query[key]!.indexOf(value);
        query[key]?.splice(indexDeleteElement, 1);
      } else {
        query[key]?.push(value);
      }
      setStorage(query);
      sendQuery();
    }
  }
}
