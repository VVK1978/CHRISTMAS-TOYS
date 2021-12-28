export default class Header {
  run(): void {
    this.render();
  }

  render(): void {
    const body = document.querySelector('body') as HTMLBodyElement;
    const header = `
    <header class="head">
      <div class="head__container">
        <div class="logo"></div>
        <nav class="nav__bar">
          <li class="nav__link link__toys">Игрушки</li>
          <li class="nav__link link__game">Ёлка</li>
        </nav>
      </div>
    </header>
    `;
    body.insertAdjacentHTML('beforeend', header);
  }

  setActivePage(targetElement: HTMLElement) {
    const li = document.querySelectorAll('.nav__link') as NodeListOf<HTMLElement>;
    li.forEach((_li: HTMLElement) => _li.classList.remove('active__link'));
    targetElement.classList.add('active__link');
  }
}
