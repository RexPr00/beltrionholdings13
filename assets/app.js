(() => {
  const focusableSel = 'a[href], button:not([disabled]), input:not([disabled])';

  function setupLangMenus() {
    document.querySelectorAll('.lang-wrap').forEach((wrap) => {
      const toggle = wrap.querySelector('.lang-toggle');
      if (!toggle) return;
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        wrap.classList.toggle('open');
      });
    });
    document.addEventListener('click', () => {
      document.querySelectorAll('.lang-wrap.open').forEach((w) => w.classList.remove('open'));
    });
  }

  function trapFocus(container, e) {
    if (e.key !== 'Tab') return;
    const nodes = [...container.querySelectorAll(focusableSel)];
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function setupDrawer() {
    const burger = document.querySelector('.burger');
    const drawer = document.querySelector('.drawer');
    const backdrop = document.querySelector('.drawer-backdrop');
    const closeBtn = document.querySelector('.drawer-close');
    if (!burger || !drawer || !backdrop || !closeBtn) return;

    const open = () => {
      drawer.classList.add('open');
      backdrop.classList.add('open');
      document.body.classList.add('no-scroll');
      closeBtn.focus();
    };
    const close = () => {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      document.body.classList.remove('no-scroll');
      burger.focus();
    };

    burger.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
      if (!drawer.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      trapFocus(drawer, e);
    });
  }

  function setupFAQ() {
    const items = [...document.querySelectorAll('.faq-item')];
    items.forEach((item) => {
      const btn = item.querySelector('.faq-q');
      btn?.addEventListener('click', () => {
        items.forEach((i) => i.classList.remove('open'));
        item.classList.add('open');
      });
    });
    if (items[0]) items[0].classList.add('open');
  }

  function setupModal() {
    const modal = document.getElementById('privacy-modal');
    const openBtn = document.querySelectorAll('[data-open-privacy]');
    const closeBtn = document.querySelectorAll('[data-close-privacy]');
    if (!modal) return;

    const open = () => {
      modal.classList.add('open');
      document.body.classList.add('no-scroll');
      modal.querySelector('[data-close-privacy]')?.focus();
    };
    const close = () => {
      modal.classList.remove('open');
      document.body.classList.remove('no-scroll');
    };

    openBtn.forEach((btn) => btn.addEventListener('click', (e) => { e.preventDefault(); open(); }));
    closeBtn.forEach((btn) => btn.addEventListener('click', close));
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      trapFocus(modal, e);
    });
  }

  function setupReveal() {
    const blocks = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.opacity = '1';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    blocks.forEach((el) => {
      el.style.transform = 'translateY(16px)';
      el.style.opacity = '0';
      el.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
      io.observe(el);
    });
  }

  setupLangMenus();
  setupDrawer();
  setupFAQ();
  setupModal();
  setupReveal();
})();
