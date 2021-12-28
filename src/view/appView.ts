import sound from '../../public/assets/audio/audio.mp3';
import Main from './main/main';

export default class AppView {
  private main: Main;

  constructor() {
    this.main = new Main();
  }

  run() {
    this.render();
    this.main.run();
  }

  render() {
    const body = document.querySelector('body') as HTMLBodyElement;
    const main = `
    <main class="app">
      <div class="wrapper">
      </div>
    </main>
    <audio class="sound" id="audio" controls loop>
      <source src="${sound}" type="audio/mpeg">
    </audio>
    `;
    body.insertAdjacentHTML('beforeend', main);
  }
}
