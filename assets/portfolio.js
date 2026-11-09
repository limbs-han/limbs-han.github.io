const links = [...document.querySelectorAll('.side nav a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  function updateNav() {
    let current = sections[0];
    const activationLine = Math.max(130, parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0) + 1;
    for (const section of sections) if (section.getBoundingClientRect().top <= activationLine) current = section;
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) current = sections.at(-1);
    for (const link of links) {
      const active = link.getAttribute('href') === '#' + current.id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    }
  }
  addEventListener('scroll', updateNav, {passive:true});
  addEventListener('resize', updateNav);
  addEventListener('load', updateNav);
