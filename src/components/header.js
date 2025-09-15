document.addEventListener("astro:page-load", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("header nav a");

  const callback = (entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`header nav a[aria-label="${entry.target.id}"]`);
      if (link) {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove("text-primary"));
          link.classList.add("text-primary");
        } else {
          link.classList.remove("text-primary");
        }
      }
    });
  };

  const observer = new IntersectionObserver(callback, {
    root: null,
    rootMargin: "-50% 0px -50% 0px", // Adjust this to control when the link becomes active
    threshold: 0,
  });

  sections.forEach(section => observer.observe(section));

  // --- Hide header on scroll ---
  const header = document.querySelector("header");
  if (!header) return;

  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      // scrolling down
      header.classList.add('header-hidden');
    } else {
      // scrolling up
      header.classList.remove('header-hidden');
    }
    lastScrollY = window.scrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  document.addEventListener("astro:before-swap", () => {
    observer.disconnect();
    window.removeEventListener('scroll', handleScroll);
  });
});