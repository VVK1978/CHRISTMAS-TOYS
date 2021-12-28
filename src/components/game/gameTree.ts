import { getTreeSrc, removeChildrenNodes } from '../../utils';
import { getActiveColor, getSnowflake, getTreeGarland } from '../../utils/game';

export default class GameTree {
  run() {}

  async render(): Promise<string> {
    const html = `
      <div class="game__tree" id="game-bg">
        <div class="garland__tree-container">
        </div>
        <div class="tree__container">
          <map name="tree-map">
          <area 
            coords="365,699,189,706,113,683,31,608,2,555,2,539,18,437,73,351,106,224,161,134,243,-1,306,75,353,144,399,221,424,359,452,459,496,550,444,664" 
            shape="poly">
          </map>
          <img 
            class="main__tree" 
            usemap="#tree-map"
            src="${await getTreeSrc(1)}" 
            alt="tree"
          />
        </div>
      </div>
    `;
    return html;
  }

  garlandOnOff(targetElement: HTMLInputElement): void {
    if (targetElement.checked) {
      const activeColor = getActiveColor();
      const garlandContent: string = getTreeGarland(activeColor);
      this.renderGarland(garlandContent);
    } else {
      removeChildrenNodes('.garland__tree-container');
    }
  }

  renderGarland(content: string): void {
    const garlandTreeContainer = document.querySelector(
      '.garland__tree-container'
    ) as HTMLDivElement;
    garlandTreeContainer.insertAdjacentHTML('afterbegin', content);
  }

  renderSnowflakes(): void {
    const html = `
    <div class="snowflakes">
    </div>
    `;
    const gameTree = document.querySelector('.game__tree') as HTMLElement;
    gameTree.insertAdjacentHTML('afterbegin', html);
  }

  renderSnow(): void {
    const snowflake: HTMLElement = getSnowflake();
    const snowflakes = document.querySelector('.snowflakes') as HTMLElement;
    if (snowflakes) {
      window.setTimeout(() => {
        snowflakes.append(snowflake);
        this.renderSnow();
      }, 50);
    }
  }
}
