// Fade-in when section is ~50% in view
const sections = document.querySelectorAll('.stop');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('in-view');
    else e.target.classList.remove('in-view');
  });
},{threshold:0.48});
sections.forEach(s => io.observe(s));

// Lightweight parallax: shift background-position based on section's viewport position
function parallaxTick(){
  sections.forEach(sec=>{
    const rect = sec.getBoundingClientRect();
    const y = Math.round(rect.top * 0.15); // subtle effect
    sec.style.backgroundPosition = `center ${y}px`;
  });
}
window.addEventListener('scroll', parallaxTick, {passive:true});
parallaxTick();

// Faster smooth scroll function
function smoothScrollTo(element, duration = 300) {
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('.top-nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const targetSection = document.getElementById(targetId);
    smoothScrollTo(targetSection, 300); // 300ms duration — faster!
  });
});
