export default function removeChildrenNodes(selector: string): void {
  const element = document.querySelector(selector) as HTMLElement;
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
