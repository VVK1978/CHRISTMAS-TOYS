import { getMousePosition } from '.';

export default function getToyClone(
  event: MouseEvent,
  targetElement: HTMLImageElement
): HTMLImageElement {
  console.log('клонирование объекта');
  const [clientX, clientY] = getMousePosition(event);
  const clone = document.createElement('img');
  const width = targetElement.clientWidth;
  const height = targetElement.clientHeight;
  clone.style.position = 'absolute';
  clone.style.zIndex = '99';
  clone.style.left = `${clientX - width / 2}px`;
  clone.style.top = `${clientY - height / 2}px`;
  clone.classList.add('clone');
  clone.classList.add('toy__card-image__clone');
  clone.alt = 'toy-image';
  clone.dataset.toy = targetElement.dataset.toy;
  clone.draggable = true;
  clone.src = targetElement.src;
  return clone;
}
