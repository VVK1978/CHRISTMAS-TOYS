import { changeToyCardStyle } from '.';

export default function decreaseToyCount(targetElement: HTMLImageElement) {
  if (targetElement.nextElementSibling) {
    const previousCount = targetElement.nextElementSibling.textContent as string;
    const currentCount = +previousCount - 1;
    targetElement.nextElementSibling.textContent = `${currentCount}`;
    if (currentCount === 0) {
      const parentElement = targetElement.parentElement as HTMLDivElement;
      changeToyCardStyle(parentElement);
    }
  }
}
