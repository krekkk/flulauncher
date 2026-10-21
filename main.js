/* FLU LAUNCHER — interactions */
(function () {
  "use strict";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ============================================================
     KONFIGURASI DOWNLOAD
     Ganti URL di bawah dengan link MediaFire kamu.
     Contoh:
     var DOWNLOAD_URL = "https://www.mediafire.com/file/xxxxx/Flu-Launcher.zip/file";
     ============================================================ */
  var DOWNLOAD_URL = "https://drive.google.com/file/d/1_O7T0TQoGxig6dKVgDkUdUf92RTwyZ5M/view?usp=sharing";

  $$("[data-download]").forEach(function (a) {
    a.href = DOWNLOAD_URL;
    if (/^https?:/i.test(DOWNLOAD_URL)) {
      a.removeAttribute("download");
      a.target = "_blank";
      a.rel = "noopener";
    }
  });

  /* ---------- Nav state ---------- */
  var nav = $("#nav");
  var onScroll = function () {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var burger = $("#burger");
  var navLinks = $("#navLinks");

  function closeMenu() {
    if (!burger || !navLinks) return;
    navLinks.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  if (burger && navLinks) {
    burger.addEventListener("click", function () {
      var open = !navLinks.classList.contains("is-open");
      navLinks.classList.toggle("is-open", open);
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
    });

    $$("#navLinks a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });

    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealItems = $$(".reveal");

  revealItems.forEach(function (el) {
    var delay = parseInt(el.getAttribute("data-delay") || "0", 10);
    if (delay > 0) el.style.transitionDelay = delay + "ms";
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

    revealItems.forEach(function (el) { io.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Hero cube tilt ---------- */
  var art = $(".hero__art");
  var cube = $("#heroCube");
  var finePointer = window.matchMedia("(pointer: fine)").matches;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (art && cube && finePointer && !reduced) {
    var raf = 0;
    var tx = 0;
    var ty = 0;

    art.addEventListener("mousemove", function (e) {
      var r = art.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      tx = py * -10;
      ty = px * 16;

      if (!raf) {
        raf = window.requestAnimationFrame(function () {
          cube.style.setProperty("--rx", tx.toFixed(2) + "deg");
          cube.style.setProperty("--ry", ty.toFixed(2) + "deg");
          raf = 0;
        });
      }
    });

    art.addEventListener("mouseleave", function () {
      cube.style.setProperty("--rx", "0deg");
      cube.style.setProperty("--ry", "0deg");
    });
  }

  /* ---------- Copy SHA-256 ---------- */
  var copyBtn = $("#copyHash");
  var sha = $("#sha");

  if (copyBtn && sha) {
    copyBtn.addEventListener("click", function () {
      var text = sha.textContent.trim();
      var done = function () {
        var old = copyBtn.textContent;
        copyBtn.textContent = "Tersalin ✓";
        copyBtn.classList.add("is-ok");
        window.setTimeout(function () {
          copyBtn.textContent = old;
          copyBtn.classList.remove("is-ok");
        }, 1600);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {
          fallbackCopy(text, done);
        });
      } else {
        fallbackCopy(text, done);
      }
    });
  }

  function fallbackCopy(text, done) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { /* noop */ }
    document.body.removeChild(ta);
  }

  /* ---------- FAQ: satu terbuka ---------- */
  var faqs = $$(".faq__item");
  faqs.forEach(function (item) {
    item.addEventListener("toggle", function () {
      if (!item.open) return;
      faqs.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ---------- Tahun footer ---------- */
  var year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
