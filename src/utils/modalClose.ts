export default function modalOpenClose(): void {
  const modal = document.querySelector('.modal') as HTMLDivElement;
  modal.classList.remove('open');
}
