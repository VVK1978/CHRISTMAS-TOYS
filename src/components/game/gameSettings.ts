import { changeBackground, changeMainTree, setActiveBg, setActiveTree } from '../../utils/game';
import { SettingsTree, SettingsBg, SettingsGarland, GameTree, ControlHeader } from './';

export default class GameSettings {
  private controlHeader: ControlHeader;

  private settingsTree: SettingsTree;

  private settingsBg: SettingsBg;

  private settingsGarland: SettingsGarland;

  private gameTree: GameTree;

  constructor() {
    this.controlHeader = new ControlHeader();
    this.settingsTree = new SettingsTree();
    this.settingsBg = new SettingsBg();
    this.settingsGarland = new SettingsGarland();
    this.gameTree = new GameTree();
  }

  run() {
    this.settingsTree.run();
    this.settingsBg.run();
    this.settingsGarland.run();
    this.controlHeader.run();
  }

  render(): string {
    const html = `
    <div class="game__settings">
      ${this.controlHeader.render()}
      ${this.settingsTree.render()}
      ${this.settingsBg.render()}
      ${this.settingsGarland.render()}
    </div>
    `;
    return html;
  }

  settingsClicks(): void {
    const settingsTree = document.querySelector('.game__settings') as HTMLDivElement;
    settingsTree.addEventListener('click', (event: Event) => this.settingsEvents(event), {
      once: true,
    });
  }

  settingsEvents(event: Event): void {
    const targetElement = event.target as HTMLElement as HTMLInputElement;
    if (targetElement.classList.contains('tree__card-image')) {
      const src: string = targetElement.src;
      setActiveTree(targetElement);
      changeMainTree(src);
    }

    if (targetElement.classList.contains('bg__card-image')) {
      const src: string = targetElement.src;
      setActiveBg(targetElement);
      changeBackground(src);
    }

    if (targetElement.classList.contains('switcher__checkbox')) {
      this.gameTree.garlandOnOff(targetElement);
    }

    if (targetElement.classList.contains('button__color')) {
      this.settingsGarland.setActiveGarlandColor(targetElement);
    }
    this.settingsClicks();
  }
}
