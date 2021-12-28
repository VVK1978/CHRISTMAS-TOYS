import { Filters, Cards, FiltersByRange, Modal } from '../../components/toys';
import { getStorage } from '../../store';
import { initialSelect } from '../../utils';

export default class Toys {
  private filters: Filters;

  private cards: Cards;

  private filterByRange: FiltersByRange;

  private modal: Modal;

  constructor() {
    this.filters = new Filters();
    this.cards = new Cards();
    this.filterByRange = new FiltersByRange();
    this.modal = new Modal();
  }

  async run() {
    const wrapper = document.querySelector('.wrapper') as HTMLElement;
    const section = `
    <section class="toys">
      ${this.filters.render()}
      ${this.cards.run()}
    </section>
    `;
    wrapper.insertAdjacentHTML('beforeend', section);
    this.cards.render();
    this.handleClick();
    this.filterByRange.noUiSlider();
    this.setFocusSearch();
    this.scrollEvent();
    initialSelect();
  }

  handleClick() {
    this.filters.run();
    this.modal.closeClick();
  }

  setFocusSearch() {
    const search = document.querySelector('.search__input')! as HTMLInputElement;
    search.focus();
    search.value = getStorage().name;
  }

  scrollEvent() {
    const filters = document.querySelector('.controls__body') as HTMLElement;
    if (filters) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 140) {
          filters.style.top = '10px';
        } else {
          if (document.body.clientWidth > 1260) {
            filters.style.top = '80px';
          }
        }
      });
    }
  }
}
