(function () {
  var images = document.querySelectorAll('.work-figure img');
  if (!images.length) return;

  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-hidden', 'true');

  var closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'lightbox-close';
  closeBtn.setAttribute('aria-label', '閉じる');
  closeBtn.innerHTML = '&times;';

  var img = document.createElement('img');
  img.alt = '';

  overlay.appendChild(closeBtn);
  overlay.appendChild(img);
  document.body.appendChild(overlay);

  var lastFocused = null;

  function open(src, alt) {
    img.src = src;
    img.alt = alt || '';
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
    lastFocused = document.activeElement;
    closeBtn.focus();
  }

  function close() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    img.src = '';
    if (lastFocused) lastFocused.focus();
  }

  images.forEach(function (el) {
    el.addEventListener('click', function () {
      open(el.getAttribute('src'), el.getAttribute('alt'));
    });
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target === img) close();
  });
  closeBtn.addEventListener('click', close);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
  });
})();
