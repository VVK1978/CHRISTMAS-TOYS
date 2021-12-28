export default function changeToyCardStyle(card: HTMLDivElement): void {
  card.children[0].classList.toggle('hidden');
  card.children[1].classList.toggle('hidden');
  card.children[2].classList.toggle('hidden');
}
