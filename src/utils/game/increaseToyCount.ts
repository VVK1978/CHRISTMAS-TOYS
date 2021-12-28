import { changeToyCardStyle } from '.';

export default function increaseToyCount(targetElement: HTMLImageElement) {
  if (targetElement.dataset.toy) {
    const toyCeil: string = targetElement.dataset.toy;
    const toys = document.querySelectorAll('.toy__card-image') as NodeListOf<HTMLImageElement>;
    toys.forEach((toy) => {
      if (toy.dataset.toy === toyCeil) {
        if (toy.nextElementSibling) {
          const previousCount = toy.nextElementSibling.textContent as string;
          const currentCount = +previousCount + 1;
          toy.nextElementSibling.textContent = `${currentCount}`;
          if (currentCount === 1) {
            const parentElement = toy.parentElement as HTMLDivElement;
            changeToyCardStyle(parentElement);
          }
        }
      }
    });
  }
}
