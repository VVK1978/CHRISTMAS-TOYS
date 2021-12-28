import { burgerToysArguments, burgerTreesArguments } from '../../constants';
import { removeChildrenNodes } from '../../utils';
import {
  decreaseToyCount,
  getFavoriteToys,
  getFavoriteTrees,
  getToyClone,
  increaseToyCount,
  moveClone,
} from '../../utils/game';

let isCloneOutTree = false;
/* let offsetX = 0;
let offsetY = 0; */

export default class GameFavorites {
  async run() {
    const favoriteToys = document.getElementById('favorite-toys') as HTMLDivElement;
    const favoriteTrees = document.getElementById('favorite-trees') as HTMLElement;
    await getFavoriteToys(favoriteToys);
    await getFavoriteTrees(favoriteTrees);
    await this.burger(burgerToysArguments);
    await this.burger(burgerTreesArguments);
    this.drugNdrop();
  }

  render(): string {
    const html = `
      <div class="game__favorite">
        <div class="favorite__toys">
          <h2 class="settings__title">
            Игрушки
          </h2>
          <div 
            class="favorite__toys-container" 
            id="favorite-toys"
          >
          </div>
        </div>
        <div class="favorite__trees">
          <h2 class="settings__title">
            Вы нарядили
          </h2>
          <div 
            class="favorite__trees-container" 
            id="favorite-trees"
          >
          </div>
        </div>

        <aside class="favorite__toys-burger">
          <button 
            class="toys__burger"
            title="Выберите одну из Ваших любимых игрушек"
          >
              Игрушки
          </button>
          <div class="burger__body-toys">
          </div>
        </aside>

        <aside class="favorite__trees-burger">
          <button class="trees__burger">
            Вы нарядили
          </button>
          <div class="burger__body-trees">
          </div>
        </aside>
      </div>
    `;
    return html;
  }

  burger(classes: string[]) {
    const button = document.querySelector(classes[0]) as HTMLElement;
    button.addEventListener('click', (event: Event) => {
      if ((event.target as HTMLElement).classList.contains(classes[0].slice(1))) {
        const burgerBody = document.querySelector(classes[1]) as HTMLDivElement;
        burgerBody.classList.toggle('open');
        if (burgerBody.childElementCount === 0) {
          if (classes[0] === '.toys__burger') {
            getFavoriteToys(burgerBody);
          } else {
            getFavoriteTrees(burgerBody);
          }
        } else {
          setTimeout(() => {
            removeChildrenNodes(classes[1]);
          }, 300);
        }
      }
    });
  }

  drugNdrop(): void {
    const toys = document.querySelectorAll('.toy__card-image') as NodeListOf<HTMLImageElement>;
    toys.forEach((toy: HTMLImageElement) => {
      toy.addEventListener(
        'mousedown',
        (event: MouseEvent) => {
          this.handleClick(event);
        },
        { once: true }
      );
    });
  }

  handleClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLImageElement;
    if (targetElement.nextElementSibling?.textContent !== '0') {
      const map = (document.getElementsByName('tree-map') as NodeListOf<HTMLMapElement>)[0];
      map.addEventListener('dragover', (eventDnD: DragEvent) => {
        this.dragOver(eventDnD);
      });

      targetElement.addEventListener('dragend', (eventDnD: DragEvent) => {
        map.addEventListener(
          'drop',
          (ev: DragEvent) => {
            console.log('DROP = ', ev, targetElement);
            this.dragDrop(ev, targetElement);
          },
          { once: true }
        );
      });
    }
  }

  dragOver(event: DragEvent): void {
    event.preventDefault();
    event.dataTransfer!.dropEffect = 'copy';
  }

  dragLeave(targetElement: HTMLImageElement): void {
    if (targetElement.classList.contains('clone')) {
      isCloneOutTree = true;
    }
  }

  dragDrop(event: DragEvent, targetElement: HTMLImageElement): void {
    event.preventDefault();
    const clone = getToyClone(event, targetElement);
    const mainTree = document.querySelector('.tree__container') as HTMLElement;
    mainTree.append(clone);
    decreaseToyCount(targetElement);
    this.dragNdropClone(clone);
  }

  dragNdropClone(clone: HTMLImageElement): void {
    clone.addEventListener('mousedown', (event: MouseEvent) => {
      this.handleClickClone(event);
    });
  }

  dragEndClone(event: MouseEvent, targetElement: HTMLImageElement): void {
    // console.log('END = ', event, targetElement);
    if (isCloneOutTree) {
      increaseToyCount(targetElement);
      targetElement.remove();
      isCloneOutTree = false;
    } else {
      moveClone(targetElement, event);
    }
  }

  handleClickClone(event: MouseEvent): void {
    const clone = event.target as HTMLImageElement;
    if (clone.classList.contains('clone')) {
      const map = (document.getElementsByName('tree-map') as NodeListOf<HTMLMapElement>)[0];
      map.addEventListener(
        'dragleave',
        () => {
          this.dragLeave(clone);
        },
        { once: true }
      );
      clone.addEventListener(
        'dragend',
        (eventDnD: DragEvent) => {
          this.dragEndClone(eventDnD, clone);
        },
        { once: true }
      );
    }
  }
}
