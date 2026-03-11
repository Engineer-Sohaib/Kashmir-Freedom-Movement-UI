(function () {
  const nav     = document.getElementById("nav");
  const navPill = document.querySelector(".nav-pill");
  if (!nav) return;

  window.addEventListener("scroll", () => {
    const s = window.scrollY > 40;
    nav.classList.toggle("scrolled", s);
    if (navPill) navPill.classList.toggle("scrolled", s);
  });

  const toggle = document.getElementById("navToggle");
  const links  = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", links.classList.contains("open"));
    });
  }

  document.querySelectorAll(".has-dropdown > a").forEach((link) => {
    link.addEventListener("click", function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        this.closest(".has-dropdown").classList.toggle("open");
      }
    });
  });
})();

(function () {
  const nav = document.getElementById("nav");
  if (!nav || !nav.classList.contains("hero-nav")) return;
  window.addEventListener("scroll", () =>
    nav.classList.toggle("scrolled", window.scrollY > 40)
  );
})();

(function () {
  const srObs = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("in");
    }),
    { threshold: 0.07, rootMargin: "0px 0px -30px 0px" }
  );
  document.querySelectorAll(".sr").forEach((el) => srObs.observe(el));

  const rvObs = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    }),
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => rvObs.observe(el));
})();

(function () {
  if (!document.querySelector(".bs-fill")) return;
  const barObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll(".bs-fill").forEach((bar) => {
            const w = bar.dataset.width;
            bar.style.width = "0";
            setTimeout(() => { if (w) bar.style.width = w; }, 100);
          });
        }
      });
    },
    { threshold: 0.3 }
  );
  document.querySelectorAll(".bar-stats").forEach((el) => barObs.observe(el));
})();

(function () {
  const pills = document.querySelectorAll(".filter-pill");
  if (!pills.length) return;
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
    });
  });
})();

(function () {
  const btns = document.querySelectorAll(".faq-q");
  if (!btns.length) return;
  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isOpen = btn.classList.contains("open");
      document.querySelectorAll(".faq-q").forEach((b) => b.classList.remove("open"));
      document.querySelectorAll(".faq-a").forEach((a) => a.classList.remove("open"));
      if (!isOpen) {
        btn.classList.add("open");
        btn.nextElementSibling.classList.add("open");
      }
    });
  });
})();

(function () {
  const pills = document.querySelectorAll(".subject-pill");
  if (!pills.length) return;
  pills.forEach((p) => {
    p.addEventListener("click", () => {
      pills.forEach((x) => x.classList.remove("active"));
      p.classList.add("active");
    });
  });
})();

(function () {
  const amtBtns = document.querySelectorAll(".amt-btn");
  if (!amtBtns.length) return;

  amtBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      amtBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cf = document.getElementById("customField");
      if (cf) cf.style.display = btn.dataset.val === "custom" ? "flex" : "none";
    });
  });

  document.querySelectorAll(".freq-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".freq-tab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  const donateForm = document.getElementById("donateForm");
  if (donateForm) {
    donateForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const wrap    = document.getElementById("formWrap");
      const success = document.getElementById("formSuccess");
      if (wrap)    wrap.style.display = "none";
      if (success) success.classList.add("show");
    });
  }
})();

(function () {
  const galleryGrid = document.getElementById("galleryGrid");
  if (!galleryGrid) return;

  const items = Array.from(document.querySelectorAll(".gallery-item"));

  document.querySelectorAll(".filter-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".filter-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      const f = pill.dataset.filter;
      items.forEach((item) => {
        const cats = item.dataset.cat || "";
        item.style.display = f === "all" || cats.includes(f) ? "" : "none";
      });
    });
  });

  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".view-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cols = btn.dataset.cols;
      galleryGrid.className = "masonry-grid sr in";
      if (cols !== "4") galleryGrid.classList.add("cols-" + cols);
    });
  });

  const lightbox  = document.getElementById("lightbox");
  if (!lightbox) return;

  const lbImgWrap = document.getElementById("lbImgWrap");
  const lbCat     = document.getElementById("lbCat");
  const lbTitle   = document.getElementById("lbTitle");
  const lbLoc     = document.getElementById("lbLoc");
  const lbDesc    = document.getElementById("lbDesc");
  const lbCounter = document.getElementById("lbCounter");
  const lbClose   = document.getElementById("lbClose");
  const lbPrev    = document.getElementById("lbPrev");
  const lbNext    = document.getElementById("lbNext");

  let currentIndex = 0;
  const visibleItems = () => items.filter((i) => i.style.display !== "none");

  function openLightbox(idx) {
    currentIndex = idx;
    const visible = visibleItems();
    const item    = visible[idx];
    if (!item) return;

    const img      = item.querySelector("img");
    const title    = item.dataset.title || "";
    const loc      = item.dataset.loc   || "";
    const desc     = item.dataset.desc  || "";
    const cat      = item.dataset.cat   || "";
    const catLabel = cat.split(" ").map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(" · ");

    if (lbCat)     lbCat.textContent     = catLabel;
    if (lbTitle)   lbTitle.textContent   = title;
    if (lbLoc)     lbLoc.textContent     = loc;
    if (lbDesc)    lbDesc.textContent    = desc;
    if (lbCounter) lbCounter.innerHTML   = `<span>${idx + 1}</span> / ${visible.length}`;
    if (lbImgWrap) {
      lbImgWrap.innerHTML = img
        ? `<img src="${img.src}" alt="${img.alt}" style="width:100%;height:100%;object-fit:contain;display:block;">`
        : `<div class="lb-placeholder" style="background:var(--g800);"><i class="ri-image-line" style="font-size:5rem;color:var(--g400);"></i><p>Image Coming Soon</p></div>`;
    }

    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  function navigate(dir) {
    const visible = visibleItems();
    currentIndex  = (currentIndex + dir + visible.length) % visible.length;
    openLightbox(currentIndex);
  }

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const visible = visibleItems();
      const vi      = visible.indexOf(item);
      if (vi !== -1) openLightbox(vi);
    });
  });

  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lbPrev)  lbPrev.addEventListener("click",  () => navigate(-1));
  if (lbNext)  lbNext.addEventListener("click",  () => navigate(1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape")     closeLightbox();
    if (e.key === "ArrowLeft")  navigate(-1);
    if (e.key === "ArrowRight") navigate(1);
  });
})();

(function () {
  const mapSection = document.querySelector(".map-section");
  if (!mapSection) return;

  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll(".map-stat-bar").forEach((bar) => {
            const w = bar.style.width;
            bar.style.width = "0";
            setTimeout(() => { bar.style.width = w; }, 100);
          });
        }
      });
    },
    { threshold: 0.3 }
  );
  barObserver.observe(mapSection);
})();

(function () {
  const memberForm = document.getElementById("memberForm");
  if (!memberForm) return;

  function syncRole(role) {
    document.querySelectorAll(".tier").forEach((t) =>
      t.classList.toggle("active", t.dataset.tier === role)
    );
    document.querySelectorAll(".role-card").forEach((r) =>
      r.classList.toggle("active", r.dataset.role === role)
    );
  }

  document.querySelectorAll(".tier").forEach((t) =>
    t.addEventListener("click", () => syncRole(t.dataset.tier))
  );
  document.querySelectorAll(".role-card").forEach((r) =>
    r.addEventListener("click", () => syncRole(r.dataset.role))
  );
  document.querySelectorAll(".form-check").forEach((c) =>
    c.addEventListener("click", () => c.classList.toggle("checked"))
  );

  memberForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const wrap    = document.getElementById("formWrap");
    const success = document.getElementById("formSuccess");
    if (wrap)    wrap.style.display = "none";
    if (success) success.classList.add("show");
  });
})();

(function () {
  const contactForm = document.getElementById("contactForm");
  if (!contactForm) return;
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const wrap    = document.getElementById("formWrap");
    const success = document.getElementById("formSuccess");
    if (wrap)    wrap.style.display = "none";
    if (success) success.classList.add("show");
  });
})();

function kfmNewsletter(form) {
  var input = form.querySelector('input[type="email"]');
  var msg   = form.querySelector(".newsletter-msg");
  var email = input.value.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msg.textContent = "Please enter a valid email.";
    msg.className   = "newsletter-msg error";
    return false;
  }

  msg.textContent = "✓ Subscribed! Thank you.";
  msg.className   = "newsletter-msg";
  input.value     = "";
  return false;
}

(function () {
  const allCards = Array.from(document.querySelectorAll(".pin-card"));
  if (!allCards.length) return;

  const revObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("in"), i * 30);
          revObs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.02, rootMargin: "0px 0px -10px 0px" }
  );
  allCards.forEach((c) => revObs.observe(c));

  const countEl = document.getElementById("galleryCount");
  const emptyEl = document.getElementById("galleryEmpty");

  document.querySelectorAll(".filter-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".filter-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      const f = pill.dataset.filter;
      let visible = 0;
      allCards.forEach((card) => {
        const show = f === "all" || (card.dataset.cat || "").includes(f);
        card.style.display = show ? "" : "none";
        if (show) visible++;
      });
      if (countEl) countEl.textContent = visible + " photo" + (visible !== 1 ? "s" : "");
      if (emptyEl) emptyEl.classList.toggle("show", visible === 0);
    });
  });

  const grid = document.getElementById("galleryGrid");
  document.querySelectorAll(".col-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".col-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      if (!grid) return;
      const cols = btn.dataset.cols;
      grid.className = "masonry-grid";
      if (cols !== "4") grid.classList.add("cols-" + cols);
    });
  });

  const lightbox  = document.getElementById("lightbox");
  if (!lightbox) return;

  const lbImgWrap = document.getElementById("lbImgWrap");
  const lbCat     = document.getElementById("lbCat");
  const lbTitle   = document.getElementById("lbTitle");
  const lbLoc     = document.getElementById("lbLoc");
  const lbDesc    = document.getElementById("lbDesc");
  const lbCounter = document.getElementById("lbCounter");
  const lbClose   = document.getElementById("lbClose");
  const lbPrev    = document.getElementById("lbPrev");
  const lbNext    = document.getElementById("lbNext");

  let currentIndex  = 0;
  const visibleCards = () => allCards.filter((c) => c.style.display !== "none");

  function openLightbox(idx) {
    currentIndex   = idx;
    const visible  = visibleCards();
    const card     = visible[idx];
    if (!card) return;

    const imgEl = card.querySelector("img");
    if (lbImgWrap) {
      lbImgWrap.innerHTML = imgEl
        ? `<img src="${imgEl.src}" alt="${card.dataset.title || ""}" onerror="this.style.display='none'">`
        : "";
    }
    if (lbCat)     lbCat.textContent     = card.querySelector(".pin-ov-cat")?.textContent || "";
    if (lbTitle)   lbTitle.textContent   = card.dataset.title || "";
    if (lbLoc)     lbLoc.textContent     = "📍 " + (card.dataset.loc || "");
    if (lbDesc)    lbDesc.textContent    = card.dataset.desc  || "";
    if (lbCounter) lbCounter.textContent = (idx + 1) + " / " + visible.length;

    lightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  }

  function navigate(dir) {
    const visible  = visibleCards();
    currentIndex   = (currentIndex + dir + visible.length) % visible.length;
    openLightbox(currentIndex);
  }

  allCards.forEach((card) => {
    card.addEventListener("click", () => {
      const visible = visibleCards();
      const idx     = visible.indexOf(card);
      if (idx !== -1) openLightbox(idx);
    });
  });

  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lbPrev)  lbPrev.addEventListener("click",  () => navigate(-1));
  if (lbNext)  lbNext.addEventListener("click",  () => navigate(1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape")     closeLightbox();
    if (e.key === "ArrowLeft")  navigate(-1);
    if (e.key === "ArrowRight") navigate(1);
  });
})();

(function () {
  const pills = document.querySelectorAll(".news-pill");
  if (!pills.length) return;
  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      pills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
    });
  });
})();

(function () {
  function initStoriesSlider() {
  var $slider   = $(".stories-slider");
  if (!$slider.length || !$.fn.slick) return;

  var $prev     = $(".stories-prev");
  var $next     = $(".stories-next");
  var $cur      = $(".stories-counter-cur");
  var $total    = $(".stories-counter-total");
  var $dotsWrap = $(".stories-dots");
  var total     = $slider.children(".story-card").length;

  $total.text(pad(total));

  $dotsWrap.empty();
  for (var i = 0; i < total; i++) {
    $dotsWrap.append(
      '<button class="stories-dot" data-index="' + i +
      '" aria-label="Go to slide ' + (i + 1) + '"></button>'
    );
  }
  var $dots = $dotsWrap.find(".stories-dot");

  $dots.on("click", function () {
    $slider.slick("slickGoTo", parseInt($(this).data("index")));
  });

  $slider.slick({
    slidesToShow   : 3,
    slidesToScroll : 1,
    infinite       : true,
    speed          : 600,
    cssEase        : "cubic-bezier(0.22, 1, 0.36, 1)",
    arrows         : false,
    dots           : false,
    swipe          : true,
    touchMove      : true,
    responsive     : [
      { breakpoint: 1100, settings: { slidesToShow: 2 } },
      { breakpoint: 680,  settings: { slidesToShow: 1, centerMode: true, centerPadding: "40px" } }
    ]
  });

  $prev.on("click", function () { $slider.slick("slickPrev"); });
  $next.on("click", function () { $slider.slick("slickNext"); });

  $slider.on("afterChange", function (e, slick, index) {
    updateHUD(index, slick.slideCount);
  });

  updateHUD(0, total);

  function updateHUD(index, count) {
    $cur.text(pad(index + 1));
    $dots.removeClass("active");
    $dots.eq(index).addClass("active");
  }

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  $(document).on("keydown", function (e) {
    var r = $slider[0].getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      if (e.key === "ArrowLeft")  $slider.slick("slickPrev");
      if (e.key === "ArrowRight") $slider.slick("slickNext");
    }
  });
}

  if (typeof $ !== "undefined" && typeof $.fn !== "undefined") {
    $(document).ready(initStoriesSlider);
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      if (typeof $ !== "undefined") $(document).ready(initStoriesSlider);
    });
  }
})();