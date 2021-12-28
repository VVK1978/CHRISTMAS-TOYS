import { Settings } from '../../interfaces';
import { getSettings, setSettings } from '../../store';

export default function setActiveTree(targetElement: HTMLElement) {
  const treeImage = document.querySelectorAll('.tree__card-image') as NodeListOf<HTMLElement>;
  treeImage.forEach((image: HTMLElement, index: number) => {
    if ((image.dataset.image as string) === (targetElement.dataset.image as string)) {
      image.classList.add('active');
      const settings: Settings = getSettings();
      settings.tree = index + 1;
      setSettings(settings);
    } else {
      image.classList.remove('active');
    }
  });
}
