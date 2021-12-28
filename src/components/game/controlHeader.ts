import { GameFavorites, GameTree } from '.';
import { Settings } from '../../interfaces';
import { getSettings, resetSettings, setSettings } from '../../store';
import {
  changeBackground,
  changeMainTree,
  playAudio,
  setActiveBg,
  setActiveTree,
} from '../../utils/game';

export default class ControlHeader {
  private gameTree: GameTree;

  private gameFavorite: GameFavorites;

  constructor() {
    this.gameTree = new GameTree();
    this.gameFavorite = new GameFavorites();
  }

  run() {
    this.handleClick();
    this.applySettings();
  }

  render(): string {
    const html = `
    <div class="control__header">
      <div class="control__header-sound">
        <div class="audio ${getSettings().isMusic ? 'play' : 'mute'}"></div>
        </div>
      <div class="control__header-snow">
        <div 
          class="snow" 
          title="Снег"
        >
        </div>
      </div>
      <div 
        class="reset" 
        title="Сброс настроек"
      >
      </div>
    </div>
    `;
    return html;
  }

  applySettings() {
    if (getSettings().isSnow) {
      const targetElement = document.querySelector('.snow') as HTMLElement;
      this.setSnowIconStyle(targetElement);
    }
  }

  setMusicIconStyle(targetElement: HTMLElement): void {
    targetElement.classList.toggle('play');
    targetElement.classList.toggle('mute');
    if (targetElement.classList.contains('play')) {
      playAudio(true);
    }
    if (targetElement.classList.contains('mute')) {
      playAudio(false);
    }
  }

  setSnowIconStyle(targetElement: HTMLElement): void {
    targetElement.classList.toggle('active');
    if (targetElement.classList.contains('active')) {
      this.startStopSnow(true);
    } else {
      this.startStopSnow(false);
    }
  }

  startStopSnow(isStart: boolean) {
    const settings: Settings = getSettings();
    settings.isSnow = isStart;
    setSettings(settings);
    if (isStart) {
      this.gameTree.renderSnowflakes();
      this.gameTree.renderSnow();
    } else {
      const snowflakes = document.querySelector('.snowflakes') as HTMLElement;
      snowflakes.remove();
    }
  }

  resetGameSettings() {
    const settings: Settings = getSettings();
    if (settings.isSnow) {
      this.setSnowIconStyle(document.querySelector('.snow') as HTMLElement);
    }
    if (settings.isMusic) {
      settings.isMusic = false;
      setSettings(settings);
      this.setMusicIconStyle(document.querySelector('.audio') as HTMLElement);
    }
    if (settings.background !== 1) {
      const bgImage = document.querySelectorAll('.bg__card-image')[0] as HTMLImageElement;
      setActiveBg(bgImage);
      changeBackground(bgImage.src);
    }
    if (settings.tree !== 1) {
      const treeImage = document.querySelectorAll('.tree__card-image')[0] as HTMLImageElement;
      setActiveTree(treeImage);
      changeMainTree(treeImage.src);
    }
    const cloneToys = document.querySelectorAll('.clone') as NodeListOf<HTMLImageElement>;
    if (cloneToys) {
      cloneToys.forEach((cloneToy) => cloneToy.remove());
    }
    (document.querySelector('.game__favorite') as HTMLDivElement).remove();
    (document.querySelector('.game') as HTMLElement).insertAdjacentHTML(
      'beforeend',
      this.gameFavorite.render()
    );
    this.gameFavorite.run();
    resetSettings(true);
  }

  handleClick() {
    const controlHeader = document.querySelector('.control__header') as HTMLDivElement;
    controlHeader.addEventListener(
      'click',
      (event: Event) => {
        event.stopPropagation();
        this.controlEvents(event);
      },
      { once: true }
    );
  }

  controlEvents(event: Event) {
    const targetElement = event.target as HTMLDivElement;

    if (targetElement.classList.contains('audio')) {
      this.setMusicIconStyle(targetElement);
    }

    if (targetElement.classList.contains('snow')) {
      this.setSnowIconStyle(targetElement);
    }

    if (targetElement.classList.contains('reset')) {
      this.resetGameSettings();
    }
    this.handleClick();
  }
}
