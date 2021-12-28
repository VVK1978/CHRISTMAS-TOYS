import { Settings } from '../../interfaces';
import { getSettings, setSettings } from '../../store';

export default function setActiveBg(targetElement: HTMLElement) {
  const bgImages = document.querySelectorAll('.bg__card-image') as NodeListOf<HTMLElement>;
  bgImages.forEach((image: HTMLElement, index: number) => {
    if ((image.dataset.image as string) === (targetElement.dataset.image as string)) {
      image.classList.add('active');
      const settings: Settings = getSettings();
      settings.background = index + 1;
      setSettings(settings);
    } else {
      image.classList.remove('active');
    }
  });
}
