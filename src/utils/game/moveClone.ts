import { getGameTreeBlockPosition } from '.';

export default function moveClone(targetElement: HTMLImageElement, event: MouseEvent): void {
  const width = targetElement.clientWidth;
  const height = targetElement.clientHeight;
  const [left, top] = getGameTreeBlockPosition();
  targetElement.style.left = `${event.clientX - left - width / 2}px`;
  targetElement.style.top = `${event.clientY - top - height / 2}px`;
}
