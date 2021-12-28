import { Settings, Tree } from '../../interfaces';
import { getSettings, trees } from '../../store';
import { getTreeSrc } from '../../utils';

const settings: Settings = getSettings();

export default class SettingsTree {
  run() {
    this.getCards();
  }

  render(): string {
    const html = `
    <div class="settings__tree">
      <h2 class="settings__title">
        Выберите елку
      </h2>
      <div class="settings__tree-container" id="trees">
      </div>
    </div>
    `;
    return html;
  }

  getCards(): void {
    const settingsTreeContainer = document.getElementById('trees') as HTMLDivElement;
    trees.forEach(async (card: Tree, index: number) => {
      const html = `
      <div class="tree__card">
        <img 
          class="tree__card-image ${index === settings.tree - 1 ? 'active' : ''}" 
          data-image="${index}"
          src="${await getTreeSrc(card.num)}"
          alt="tree__image" 
        />
      </div>
    `;
      settingsTreeContainer.insertAdjacentHTML('beforeend', html);
    });
  }
}
