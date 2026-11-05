/* LetoutAI. Menu toggle and the hero chat replay. No dependencies. */
(function () {
  'use strict';
  var d = document;

  /* Menu: open and close on small screens. */
  function initNav() {
    var nav = d.querySelector('.nav');
    var toggle = d.querySelector('.nav-toggle');
    if (!nav || !toggle) { return; }
    function setOpen(open) {
      if (open) { nav.setAttribute('data-open', ''); } else { nav.removeAttribute('data-open'); }
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    toggle.addEventListener('click', function () { setOpen(!nav.hasAttribute('data-open')); });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.hasAttribute('data-open')) { setOpen(false); toggle.focus(); }
    });
  }

  /* Chat replay. Self-contained: pass the element that holds the phone and the
     approval card (the [data-replay] figure). The markup drives the timing:
       data-step    marks an element that appears
       data-at      ms after the replay starts when it appears
       data-typing  ms the typing dots show before it (optional)
     The replay starts when the phone ([data-chat]) is 30% on screen. With reduced
     motion, everything shows at once. */
  function replayChat(stage) {
    var steps = stage.querySelectorAll('[data-step]');
    var phone = stage.querySelector('[data-chat]') || stage;
    var typing = stage.querySelector('.typing');
    var last = null;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var i;

    if (reduce) {
      for (i = 0; i < steps.length; i++) { steps[i].classList.add('is-in'); }
      return;
    }

    function dots(on) {
      if (!typing) { return; }
      if (on) { typing.style.top = (last ? last.offsetTop + last.offsetHeight + 6 : 44) + 'px'; }
      typing.classList.toggle('is-on', on);
    }

    function queue(el) {
      var at = parseInt(el.getAttribute('data-at'), 10) || 0;
      var lead = parseInt(el.getAttribute('data-typing'), 10) || 0;
      if (lead) { setTimeout(function () { dots(true); }, Math.max(0, at - lead)); }
      setTimeout(function () {
        dots(false);
        el.classList.add('is-in');
        if (el.classList.contains('msg')) { last = el; }
      }, at);
    }

    function run() {
      for (i = 0; i < steps.length; i++) { queue(steps[i]); }
    }

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { io.disconnect(); run(); }
      }, { threshold: 0.3 });
      io.observe(phone);
    } else {
      run();
    }
  }

  initNav();
  var stage = d.querySelector('[data-replay]');
  if (stage) { replayChat(stage); }
})();
