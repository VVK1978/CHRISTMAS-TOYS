export default function changeMainTree(src: string): void {
  const mainTree = document.querySelector('.main__tree') as HTMLImageElement;
  mainTree.classList.toggle('close');
  setTimeout(() => {
    mainTree.src = src;
    mainTree.classList.toggle('close');
  }, 500);
}
