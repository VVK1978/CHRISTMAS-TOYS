import { GameTree } from '.';
import { removeChildrenNodes } from '../../utils';
import { getActiveColor, getTreeGarland } from '../../utils/game';

export default class SettingsGarland {
  private gameTree: GameTree;

  constructor() {
    this.gameTree = new GameTree();
  }

  run() {}

  render(): string {
    const html = `
      <div class="settings__garland">
        <h2 class="settings__title">Гирлянда</h2>
        <div class="garland__container">
          <div class="garland__buttons">

            <button 
              class="button__color multicolor on"
              data-color="1"
            >
            </button>

            <button 
              class="button__color red"
              data-color="2"
            >
            </button>

            <button 
              class="button__color blue"
              data-color="3"
            >
            </button>

            <button 
              class="button__color yellow"
              data-color="4"
            >
            </button>

            <button 
              class="button__color green"
              data-color="5"
            >
            </button>

          </div>
          <div class="garland__toggle-container">
            <input 
              type="checkbox" 
              name="garland-toggle" 
              class="switcher__checkbox" 
              id="switcher"
            />
            <label class="switcher__label" for="switcher">
              <div class="switcher__inner"></div>
              <div class="switcher__toggle"></div>
            </label>
          </div>
        </div>
      </div>
      `;
    return html;
  }

  setActiveGarlandColor(targetElement: HTMLElement) {
    const colors = document.querySelectorAll('.button__color') as NodeListOf<HTMLElement>;
    colors.forEach((color: HTMLElement) => {
      if ((color.dataset.color as string) === (targetElement.dataset.color as string)) {
        color.classList.add('on');
      } else {
        color.classList.remove('on');
      }
    });
    this.switchGarlandColor();
  }

  switchGarlandColor(): void {
    const switcher = document.getElementById('switcher') as HTMLInputElement;
    if (switcher.checked) {
      removeChildrenNodes('.garland__tree-container');
      const activeColor = getActiveColor();
      const garlandContent: string = getTreeGarland(activeColor);
      this.gameTree.renderGarland(garlandContent);
    }
  }
}
