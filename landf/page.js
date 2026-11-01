const navigation = [...document.querySelectorAll('.side nav a')];
const sections = navigation.map(link => document.querySelector(link.hash));
let scheduled = false;

function updateNavigation() {
  const readingLine = window.innerHeight * 0.28;
  let current = sections[0];
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= readingLine) current = section;
  }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    current = sections[sections.length - 1];
  }
  navigation.forEach((link, index) => {
    const active = sections[index] === current;
    link.classList.toggle('on', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scheduled = false;
}

function scheduleNavigation() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(updateNavigation);
}

window.addEventListener('scroll', scheduleNavigation, { passive: true });
window.addEventListener('resize', scheduleNavigation);
window.addEventListener('load', updateNavigation);
updateNavigation();
