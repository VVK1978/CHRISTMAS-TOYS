import { GameFavorites, GameSettings, GameTree } from '../../components/game';

export default class Game {
  private gameSettings: GameSettings;

  private gameTree: GameTree;

  private gameFavorites: GameFavorites;

  constructor() {
    this.gameSettings = new GameSettings();
    this.gameTree = new GameTree();
    this.gameFavorites = new GameFavorites();
  }

  async render() {
    const wrapper = document.querySelector('.wrapper') as HTMLElement;
    const section = await `
    <section class="game">
      ${this.gameSettings.render()}
      ${await this.gameTree.render()}
      ${this.gameFavorites.render()}
    </section>
    `;
    wrapper.insertAdjacentHTML('beforeend', section);
    this.run();
  }

  run() {
    this.gameSettings.run();
    this.gameFavorites.run();
    this.gameSettings.settingsClicks();
    // this.handleClick();
  }
  /* 
  handleClick() {
    const reset = document.querySelector('.reset') as HTMLDivElement;
    reset.addEventListener(
      'click',
      () => {
        this.resetSettings();
      },
      { once: true }
    );
  } */
}
