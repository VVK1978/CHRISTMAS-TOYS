export default function changeBackground(src: string): void {
  const gameBg = document.getElementById('game-bg') as HTMLImageElement;
  gameBg.style.backgroundImage = `url('${src}')`;
}
