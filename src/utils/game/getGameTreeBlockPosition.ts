export default function getGameTreeBlockPosition() {
  const gameBg = document.querySelector('.tree__container') as HTMLElement;
  return [gameBg.getBoundingClientRect().x, gameBg.getBoundingClientRect().y];
}
