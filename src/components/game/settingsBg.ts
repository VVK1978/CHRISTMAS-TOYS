import { Bg, Settings } from '../../interfaces';
import { bg, getSettings } from '../../store';

const settings: Settings = getSettings();

export default class SettingsBg {
  run() {
    this.getCards();
  }

  render(): string {
    const html = `
      <div class="settings__bg">
        <h2 class="settings__title">
          Выберите фон
        </h2>
        <div class="settings__bg-container" id="bg">
        </div>
      </div>
      `;
    return html;
  }

  setActiveBg(targetElement: HTMLElement) {
    const bgImages = document.querySelectorAll('.bg__card-image') as NodeListOf<HTMLElement>;
    bgImages.forEach((image: HTMLElement) => {
      if ((image.dataset.image as string) === (targetElement.dataset.image as string)) {
        image.classList.add('active');
      } else {
        image.classList.remove('active');
      }
    });
  }

  getCards(): void {
    const settingsBgContainer = document.getElementById('bg') as HTMLDivElement;
    bg.forEach(async (_bg: Bg, index) => {
      const html = `
      <div class="bg__card" >
        <img 
          class="bg__card-image ${index === settings.background - 1 ? 'active' : ''}" 
          alt="tree__image" 
          data-image="${_bg.num}"
          src="${await this.getSrc(_bg)}"/>
      </div>
    `;
      settingsBgContainer.insertAdjacentHTML('beforeend', html);
    });
  }

  getSrc(_bg: Bg): Promise<Bg> {
    return import(`../../../public/assets/images/bg/${_bg.num}.jpg`).then((data) => data.default);
  }
}
