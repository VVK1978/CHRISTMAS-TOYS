export default function getActiveColor(): string {
  const colors = document.querySelectorAll('.button__color') as NodeListOf<HTMLElement>;
  let activeColor = '';
  colors.forEach((color: HTMLElement) => {
    if (color.classList.contains('on')) {
      activeColor = color.classList.value.split(' ')[1];
    }
  });
  return activeColor;
}
