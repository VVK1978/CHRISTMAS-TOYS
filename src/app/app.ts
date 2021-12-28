import 'nouislider/dist/nouislider.css';
import Header from '../components/main';
import { getSettings, initialSettings, initialStorage } from '../store';
import { removeChildrenNodes } from '../utils';
import { playAudio } from '../utils/game';
import AppView from '../view/appView';
import Footer from '../view/footer/footer';
import Game from '../view/game/game';
import Main from '../view/main/main';
import Toys from '../view/toys/toys';
import '../../public/assets/scss/base.scss';

export default class App {
  private toys: Toys;

  private game: Game;

  private footer: Footer;

  private header: Header;

  private appView: AppView;

  private main: Main;

  constructor() {
    this.header = new Header();
    this.appView = new AppView();
    this.main = new Main();
    this.toys = new Toys();
    this.game = new Game();
    this.footer = new Footer();
  }

  start() {
    initialStorage();
    initialSettings();
    this.header.run();
    this.appView.run();
    this.footer.run();
    this.handleClick();
  }

  handleClick() {
    const header = document.querySelector('.head') as HTMLElement;
    header.addEventListener(
      'click',
      (event: Event) => {
        this.events(event);
      },
      { once: true }
    );
    document.body.addEventListener('click', (event: Event) => {
      if (getSettings().isMusic) {
        this.audioOnFirstClick();
      }
      this.events(event);
    });
  }

  events(event: Event) {
    const targetElement = event.target as HTMLElement;

    if (targetElement.classList.contains('logo')) {
      removeChildrenNodes('.wrapper');
      this.header.setActivePage(targetElement);
      this.main.run();
    }

    if (
      targetElement.classList.contains('link__toys') ||
      targetElement.classList.contains('start')
    ) {
      removeChildrenNodes('.wrapper');
      this.header.setActivePage(targetElement);
      this.toys.run();
    }

    if (targetElement.classList.contains('link__game')) {
      removeChildrenNodes('.wrapper');
      this.header.setActivePage(targetElement);
      this.game.render();
    }
  }

  audioOnFirstClick() {
    playAudio(true);
  }
}
