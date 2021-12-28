export default function getSnowflake(): HTMLElement {
  const snowFlake = document.createElement('i') as HTMLLIElement;
  snowFlake.classList.add('fas');
  snowFlake.classList.add('fa-snowflake');
  snowFlake.style.left = Math.random() * window.innerWidth + 'px';
  snowFlake.style.animationDuration = Math.random() * 3 + 7 + 's';
  snowFlake.style.opacity = `${Math.random()}`;
  snowFlake.style.fontSize = Math.random() * 10 + 10 + 'px';
  setTimeout(() => {
    const i = document.getElementsByTagName('i');
    for (const item of i) {
      item.remove();
    }
  }, 2000);
  return snowFlake;
}
