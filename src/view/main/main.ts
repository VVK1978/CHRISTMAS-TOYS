import Header from '../../components/main/index';

export default class Main {
  private header: Header;

  constructor() {
    this.header = new Header();
    /*     const settings = getSettings();
    console.log(settings); */
  }

  run(): void {
    this.render();
  }

  render(): void {
    const main = `
    <section class="main__page">
      <div class="ball__image-big ball"></div>
      <div class="ball__image-small ball"></div>
      <h1 class="main__page-title">
        Новогодняя игра "Наряди елку"
      </h1>
      <button class="button__start start">
        Начать игру
      </button>
    </section>
    `;
    const wrapper = document.querySelector('.wrapper') as HTMLElement;
    wrapper.insertAdjacentHTML('afterbegin', main);
  }
}
