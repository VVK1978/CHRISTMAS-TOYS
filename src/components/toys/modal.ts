import { modalClose } from '../../utils';

export default class Modal {
  render(): string {
    const message =
      'Извините, совпадений не обнаружено.<br/>Выберите, пожалуйста, другую комбинацию фильтров.';
    const html = `
    <div class="modal">
    <div class="modal__body">
      <div class="modal__head">
          <div class="modal__icon-close">X</div>
      </div>
      <div class="modal__content">
        <p class="modal__content-message">
          ${message}
        </p>
      </div>
      <div class="modal__footer">
      </div>
    </div>
  </div>
    `;
    return html;
  }

  closeClick(): void {
    const modal = document.querySelector('.modal__icon-close') as HTMLDivElement;
    modal.addEventListener('click', () => {
      modalClose();
    });
  }
}
