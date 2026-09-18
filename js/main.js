(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     Footer year
  --------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------
     Mobile menu
  --------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    const setMenuOpen = (isOpen, returnFocus = false) => {
      mobileMenu.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
      if (!isOpen && returnFocus) navToggle.focus();
    };

    navToggle.addEventListener('click', () => {
      setMenuOpen(!mobileMenu.classList.contains('is-open'));
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        setMenuOpen(false);
      });
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        setMenuOpen(false, true);
      }
    });
  }

  /* ---------------------------------------------------------
     Hero — cinematic intro sequence
     1) Video plays fullscreen with no Hero copy.
     2) When it finishes its first playthrough, reveal the
        Hero content once, then let the video loop as a
        plain background with the content staying visible.
     3) If the video can't play (blocked, slow, reduced motion),
        show the fallback background and reveal content right away.
  --------------------------------------------------------- */
  const heroVideo = document.getElementById('heroVideo');
  const heroContent = document.getElementById('heroContent');
  const heroFallback = document.getElementById('heroFallback');
  const heroPulse = document.getElementById('heroPulse');

  let introRevealed = false;

  function revealHeroContent() {
    if (introRevealed) return;
    introRevealed = true;
    if (heroContent) heroContent.classList.add('is-visible');
  }

  function useFallback() {
    if (heroFallback) heroFallback.classList.add('is-active');
    if (heroVideo) heroVideo.style.display = 'none';
    if (heroPulse) heroPulse.style.display = 'none';
    revealHeroContent();
  }

  if (!heroVideo || prefersReducedMotion) {
    useFallback();
  } else {
    let settled = false;

    // Safety net: never make someone wait more than ~4s for content.
    const safetyTimer = setTimeout(() => {
      if (!settled) revealHeroContent();
    }, 4000);

    heroVideo.addEventListener('ended', () => {
      settled = true;
      clearTimeout(safetyTimer);
      revealHeroContent();
    }, { once: true });

    // If the browser can't even start playback, fall back immediately.
    heroVideo.addEventListener('error', () => {
      settled = true;
      clearTimeout(safetyTimer);
      useFallback();
    }, { once: true });

    heroVideo.addEventListener('stalled', () => {
      if (!settled && heroVideo.currentTime === 0) {
        settled = true;
        clearTimeout(safetyTimer);
        useFallback();
      }
    });

    // Some browsers autoplay-block regardless of muted attr edge cases.
    const playPromise = heroVideo.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        settled = true;
        clearTimeout(safetyTimer);
        useFallback();
      });
    }

    // After the intro has revealed content once, let the video loop
    // silently in the background without re-triggering anything.
    heroVideo.addEventListener('ended', () => {
      if (heroVideo.loop) return;
      heroVideo.loop = true;
      heroVideo.play().catch(() => {});
    });
  }

  /* ---------------------------------------------------------
     Scroll reveal — one subtle entrance per block, triggered
     once when it enters the viewport.
  --------------------------------------------------------- */
  const revealTargets = document.querySelectorAll('[data-scroll-reveal]');

  if (revealTargets.length) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach(el => el.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.18, rootMargin: '0px 0px -60px 0px' });

      revealTargets.forEach(el => observer.observe(el));
    }
  }

  /* ---------------------------------------------------------
     Servicios — expand/collapse each category card
     (isolated to #servicios, does not affect other sections)
  --------------------------------------------------------- */
  const svcToggles = document.querySelectorAll('.svc-card__toggle');

  svcToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const card = toggle.closest('.svc-card');
      if (!card) return;
      const isOpen = card.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  });

})();
