import { modalOpen } from '.';

export default function modalMessage(message: string): void {
  modalOpen();
  const modalContentMessage = document.querySelector('.modal__content-message') as HTMLDivElement;
  modalContentMessage.innerHTML = message;
}
