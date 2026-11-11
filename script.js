(() => {
  const menu = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (menu && links) {
    menu.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      menu.textContent = open ? '×' : '☰';
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
      menu.textContent = '☰';
    }));
  }
  const items = document.querySelectorAll('.service-card,.job,.project-feature,.project-secondary,.education-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: .08});
    items.forEach(item => observer.observe(item));
  } else items.forEach(item => item.classList.add('in-view'));
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nReply email: ${email}`);
    const note = document.getElementById('formNote');
    if (note) note.textContent = 'Your email application should open with the message prepared. Please review and send it there.';
    window.location.href = `mailto:lakshminath.p@northeastern.edu?subject=${subject}&body=${body}`;
  });
})();