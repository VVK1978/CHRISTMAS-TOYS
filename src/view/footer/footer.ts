import rss from '../../../public/assets/images/svg/rss.svg';

export default class Footer {
  run() {
    const body = document.body;
    const footer = `
    <footer class="footer">
      <div class="wrapper footer">
        <div class="footer__content">
          <a href="https://rs.school/js/" class="footer__link">
            <img src=${rss} alt="rs-school" class="footer__rss-image">
          </a>
          <a href="https://github.com/VVK1978" class="footer__link">
            VVK1978
          </a>
        </div>
      </div>
    </footer>
    `;
    body.insertAdjacentHTML('beforeend', footer);
  }
}
