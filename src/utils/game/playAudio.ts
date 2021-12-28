import { Settings } from '../../interfaces';
import { getSettings, setSettings } from '../../store';

export default function playAudio(isPlay: boolean): void {
  const settings: Settings = getSettings();
  settings.isMusic = isPlay;
  setSettings(settings);
  const audio: HTMLAudioElement = document.getElementById('audio') as HTMLAudioElement;
  if (audio) {
    audio.play();
    if (isPlay) {
      audio.muted = false;
    } else {
      audio.muted = true;
    }
  }
}
