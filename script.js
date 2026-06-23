/* AS Yapı - Etkileşim, Animasyon ve Çoklu Dil Modülü */

let lenis;

document.addEventListener("DOMContentLoaded", () => {
  initLenis();
  initCustomCursor();
  initMobileMenu();
  initScrollAnimations();
  initStatsCounters();
  initProjectModule();
  initContactForm();
  initGeneralScrollReveals();
});

// 1. LENIS SMOOTH SCROLL ENTEGRASYONU
function initLenis() {
  if (typeof Lenis === "undefined") return;
  
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Momentum etkisi için özel eğri
    smoothWheel: true,
    smoothTouch: false
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // GSAP ScrollTrigger entegrasyonu
  if (typeof ScrollTrigger !== "undefined" && typeof gsap !== "undefined") {
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }
}

// 2. ÖZEL MOUSE İMLECİ (CUSTOM CURSOR)
function initCustomCursor() {
  const cursor = document.getElementById("customCursor");
  const dot = document.getElementById("customCursorDot");
  
  if (!cursor || !dot) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function animateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    
    cursorX += dx * 0.15;
    cursorY += dy * 0.15;
    
    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;
    
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const clickables = document.querySelectorAll("a, button, .btn, .project-card, .filter-btn, .modal-close, .hamburger");
  clickables.forEach(item => {
    item.addEventListener("mouseenter", () => cursor.classList.add("grow"));
    item.addEventListener("mouseleave", () => cursor.classList.remove("grow"));
  });
}

// 3. MOBİL MENÜ YÖNETİMİ
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");

  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobileNav.classList.toggle("active");
  });

  const mobileLinks = mobileNav.querySelectorAll(".nav-item");
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      mobileNav.classList.remove("active");
    });
  });
}

// 4. GSAP KAYDIRMA VE KATMAN PARÇALANMA ANİMASYONU (HERO FULL-PAGE 3D DECONSTRUCTION)
function initScrollAnimations() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP veya ScrollTrigger bulunamadı. Fallback devrede.");
    initScrollFallback();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // 1. Giriş Animasyonu Başlangıç Pozisyonları (3D perspektif eğimleri dahil)
  gsap.set(".facade-left", { xPercent: -100, rotateY: -45 });
  gsap.set(".facade-right", { xPercent: 100, rotateY: 45 });
  gsap.set(".structure-top", { yPercent: -100, rotateX: 45 });
  gsap.set(".structure-bottom", { yPercent: 100, rotateX: -45 });
  
  // Maskeli başlık yazıları başlangıcı
  gsap.set(".reveal-inner", { yPercent: 105 });
  gsap.set(".hero-description, .hero-actions, .scroll-indicator", { opacity: 0, y: 30 });

  // Sayfa Yüklendiğinde Giriş Animasyonu
  const startTl = gsap.timeline({ delay: 0.3 });
  startTl.to(".structure-top, .structure-bottom", { yPercent: 0, rotateX: 0, duration: 1.4, ease: "power4.out" })
         .to(".facade-left, .facade-right", { xPercent: 0, rotateY: 0, duration: 1.6, ease: "power4.out" }, "-=1.0")
         .to(".reveal-inner", { yPercent: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" }, "-=1.0")
         .to(".hero-description, .hero-actions, .scroll-indicator", { opacity: 1, y: 0, duration: 1.0, stagger: 0.1, ease: "power3.out" }, "-=0.6");

  // 2. Kaydırma ile 3D Derinlikli Panel Ayrışması
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "+=200%",
      scrub: 1.5,
      pin: true,
      anticipatePin: 1
    }
  });

  // AŞAMA 1: Bitmiş Cephe Panelleri İkiye Ayrılarak Sola/Sağa Döner, Alttaki Karkas Yapı Yakınlaşır
  tl.to(".facade-left", {
    xPercent: -105,
    rotateY: -80,
    ease: "power2.inOut"
  }, 0)
  .to(".facade-right", {
    xPercent: 105,
    rotateY: 80,
    ease: "power2.inOut"
  }, 0)
  .fromTo(".layer-structure-bg", {
    scale: 0.9,
    filter: "brightness(0.2) blur(4px)"
  }, {
    scale: 1,
    filter: "brightness(0.35) blur(0px)",
    ease: "power2.inOut"
  }, 0)
  .to(".label-facade-screen", {
    opacity: 1,
    scale: 1.05,
    duration: 0.3
  }, 0)
  .to(".label-facade-screen", {
    opacity: 0,
    duration: 0.2
  }, 0.4);

  // AŞAMA 2: Çelik Karkas Yapı Panelleri Yukarı/Aşağı Döner, Alttaki Çizim Katmanı Yakınlaşır
  tl.to(".structure-top", {
    yPercent: -105,
    rotateX: 80,
    ease: "power2.inOut"
  }, 0.5)
  .to(".structure-bottom", {
    yPercent: 105,
    rotateX: -80,
    ease: "power2.inOut"
  }, 0.5)
  .fromTo(".layer-blueprint-bg", {
    scale: 0.9,
    filter: "brightness(0.1)"
  }, {
    scale: 1,
    filter: "brightness(0.25)",
    ease: "power2.inOut"
  }, 0.5)
  .to(".label-structure-screen", {
    opacity: 1,
    scale: 1.05,
    duration: 0.3
  }, 0.4)
  .to(".label-structure-screen", {
    opacity: 0,
    duration: 0.2
  }, 0.8);

  // AŞAMA 3: En Alttaki Çizim (Blueprint) Etiketi Belirir
  tl.to(".label-blueprint-screen", {
    opacity: 1,
    scale: 1.05,
    duration: 0.3
  }, 0.8);
}

// Fallback (GSAP Olmaması Durumunda)
function initScrollFallback() {
  const facadeLeft = document.querySelector(".facade-left");
  const facadeRight = document.querySelector(".facade-right");
  const structTop = document.querySelector(".structure-top");
  const structBottom = document.querySelector(".structure-bottom");
  
  const labelBlue = document.querySelector(".label-blueprint-screen");
  const labelStruct = document.querySelector(".label-structure-screen");
  const labelFacade = document.querySelector(".label-facade-screen");

  if (facadeLeft) facadeLeft.style.transform = "translateX(0)";
  if (facadeRight) facadeRight.style.transform = "translateX(0)";
  if (structTop) structTop.style.transform = "translateY(0)";
  if (structBottom) structBottom.style.transform = "translateY(0)";

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight;
    const progress = Math.min(scrollY / maxScroll, 1);

    const phase1Progress = Math.min(progress * 2, 1);
    if (facadeLeft) facadeLeft.style.transform = `translateX(-${phase1Progress * 50}vw)`;
    if (facadeRight) facadeRight.style.transform = `translateX(${phase1Progress * 50}vw)`;
    if (labelFacade) labelFacade.style.opacity = phase1Progress < 0.8 ? 1 : 0;

    if (progress > 0.5) {
      const phase2Progress = Math.min((progress - 0.5) * 2, 1);
      if (structTop) structTop.style.transform = `translateY(-${phase2Progress * 50}vh)`;
      if (structBottom) structBottom.style.transform = `translateY(${phase2Progress * 50}vh)`;
      if (labelStruct) labelStruct.style.opacity = phase2Progress < 0.8 ? 1 : 0;
      if (labelBlue) labelBlue.style.opacity = phase2Progress > 0.5 ? 1 : 0;
    } else {
      if (structTop) structTop.style.transform = "translateY(0)";
      if (structBottom) structBottom.style.transform = "translateY(0)";
      if (labelStruct) labelStruct.style.opacity = progress > 0.3 ? 1 : 0;
      if (labelBlue) labelBlue.style.opacity = 0;
    }
  });
}

// 5. İSTATİSTİK SAYAÇLARI ANİMASYONU
function initStatsCounters() {
  const statNumbers = document.querySelectorAll(".stat-number");
  if (statNumbers.length === 0) return;

  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px"
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.getAttribute("data-target"), 10);
        let currentValue = 0;
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / targetValue));
        
        const timer = setInterval(() => {
          currentValue += 1;
          target.textContent = currentValue + (target.getAttribute("data-suffix") || "");
          if (currentValue >= targetValue) {
            target.textContent = targetValue + (target.getAttribute("data-suffix") || "");
            clearInterval(timer);
          }
        }, Math.max(stepTime, 15));

        observer.unobserve(target);
      }
    });
  }, observerOptions);

  statNumbers.forEach(num => observer.observe(num));
}

// 6. PROJE MODÜLÜ VE DİNAMİK DİL ÇEVİRİSİ
function initProjectModule() {
  if (typeof PROJECTS_DATA === "undefined") {
    console.error("Projeler veritabanı (projects.js) yüklenemedi.");
    return;
  }

  const projectsGrid = document.getElementById("projectsGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (!projectsGrid) return;

  const isEn = document.documentElement.lang === "en";

  // Projeleri Render Etme
  function renderProjects(category = "all") {
    const list = getProjects(category);
    projectsGrid.innerHTML = "";

    if (list.length === 0) {
      const noProjMsg = isEn ? "No projects found in the selected category." : "Seçilen kategoride proje bulunmamaktadır.";
      projectsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-dim); padding: 3rem 0;">${noProjMsg}</div>`;
      return;
    }

    list.forEach(proj => {
      const card = document.createElement("article");
      card.className = "project-card";
      card.setAttribute("data-id", proj.id);
      
      const title = isEn ? (proj.titleEn || proj.title) : proj.title;
      const catTitle = isEn ? (proj.categoryTitleEn || proj.categoryTitle) : proj.categoryTitle;
      const location = isEn ? (proj.locationEn || proj.location) : proj.location;
      const desc = isEn ? (proj.descriptionEn || proj.description) : proj.description;

      card.innerHTML = `
        <div class="project-img-wrapper">
          <img class="project-img" src="${proj.mainImage}" alt="${title}" loading="lazy">
          <div class="project-overlay">${catTitle}</div>
        </div>
        <div class="project-info">
          <div class="project-meta">
            <span>📍 ${location}</span>
            <span>📅 ${proj.year}</span>
          </div>
          <h3 class="project-card-title">${title}</h3>
          <p class="project-card-desc">${desc}</p>
        </div>
      `;
      
      card.addEventListener("click", () => openProjectModal(proj.id));
      projectsGrid.appendChild(card);
    });

    const cursor = document.getElementById("customCursor");
    if (cursor) {
      const cards = projectsGrid.querySelectorAll(".project-card");
      cards.forEach(c => {
        c.addEventListener("mouseenter", () => cursor.classList.add("grow"));
        c.addEventListener("mouseleave", () => cursor.classList.remove("grow"));
      });
    }
  }

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(btn.getAttribute("data-filter"));
    });
  });

  renderProjects("all");
}

// Proje Detay Modalı (Dinamik Dil Desteğiyle)
function openProjectModal(projectId) {
  const project = PROJECTS_DATA.find(p => p.id === projectId);
  if (!project) return;

  const isEn = document.documentElement.lang === "en";
  const title = isEn ? (project.titleEn || project.title) : project.title;
  const location = isEn ? (project.locationEn || project.location) : project.location;
  const catTitle = isEn ? (project.categoryTitleEn || project.categoryTitle) : project.categoryTitle;
  const desc = isEn ? (project.descriptionEn || project.description) : project.description;
  const features = isEn ? (project.featuresEn || project.features) : project.features;

  let modal = document.getElementById("projectModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.id = "projectModal";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-card">
      <button class="modal-close" id="closeModal">&times;</button>
      
      <div class="modal-gallery">
        <img class="modal-main-img" id="modalMainImg" src="${project.mainImage}" alt="${title}">
        <div class="modal-thumbs" id="modalThumbs"></div>
      </div>
      
      <div class="modal-details">
        <div>
          <h3 class="modal-title">${title}</h3>
          <div class="modal-meta-grid">
            <div class="modal-meta-item">
              <div class="modal-meta-label">${isEn ? 'Location' : 'Konum'}</div>
              <div class="modal-meta-val">${location}</div>
            </div>
            <div class="modal-meta-item">
              <div class="modal-meta-label">${isEn ? 'Project Year' : 'Proje Yılı'}</div>
              <div class="modal-meta-val">${project.year}</div>
            </div>
            <div class="modal-meta-item">
              <div class="modal-meta-label">${isEn ? 'Category' : 'Kategori'}</div>
              <div class="modal-meta-val">${catTitle}</div>
            </div>
            <div class="modal-meta-item">
              <div class="modal-meta-label">${isEn ? 'Total Area' : 'Toplam Alan'}</div>
              <div class="modal-meta-val">${project.area}</div>
            </div>
          </div>
          <p class="modal-desc">${desc}</p>
        </div>
        
        <div>
          <h4 class="modal-features-title">${isEn ? '⚙️ KEY FEATURES' : '⚙️ ÖNE ÇIKAN ÖZELLİKLER'}</h4>
          <ul class="modal-features-list">
            ${features.map(f => `<li class="modal-feature-item">${f}</li>`).join("")}
          </ul>
        </div>
      </div>
    </div>
  `;

  const thumbsContainer = modal.querySelector("#modalThumbs");
  const mainImg = modal.querySelector("#modalMainImg");

  project.images.forEach((imgUrl, idx) => {
    const thumb = document.createElement("img");
    thumb.className = `modal-thumb ${idx === 0 ? "active" : ""}`;
    thumb.src = imgUrl;
    thumb.alt = `${title} ${isEn ? 'Image' : 'Görsel'} ${idx + 1}`;
    
    thumb.addEventListener("click", () => {
      modal.querySelectorAll(".modal-thumb").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      mainImg.src = imgUrl;
    });
    
    thumbsContainer.appendChild(thumb);
  });

  const closeBtn = modal.querySelector("#closeModal");
  
  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
    if (lenis) lenis.start(); // Lenis scroll'u geri aç
  }

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", function escClose(e) {
    if (e.key === "Escape") {
      closeModal();
      document.removeEventListener("keydown", escClose);
    }
  });

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
  if (lenis) lenis.stop(); // Modal açıkken Lenis scroll'u durdur

  const cursor = document.getElementById("customCursor");
  if (cursor) {
    closeBtn.addEventListener("mouseenter", () => cursor.classList.add("grow"));
    closeBtn.addEventListener("mouseleave", () => cursor.classList.remove("grow"));
  }
}

// 7. İLETİŞİM FORMU (DİL UYUMLU MESAJLAR)
function initContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (!form || !status) return;

  const isEn = document.documentElement.lang === "en";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("formName").value.trim();
    const email = document.getElementById("formEmail").value.trim();
    const message = document.getElementById("formMessage").value.trim();

    if (!name || !email || !message) {
      const msg = isEn ? "Please fill in all required fields (*)." : "Lütfen zorunlu alanları (* işaretli) doldurunuz.";
      showStatus(msg, "error");
      return;
    }

    if (!validateEmail(email)) {
      const msg = isEn ? "Please enter a valid email address." : "Lütfen geçerli bir e-posta adresi giriniz.";
      showStatus(msg, "error");
      return;
    }

    const successMsg = isEn ? "Your message has been successfully sent! We will contact you shortly." : "Mesajınız başarıyla gönderildi! Sizinle en kısa sürede iletişime geçeceğiz.";
    showStatus(successMsg, "success");
    form.reset();
  });

  function showStatus(msg, type) {
    status.textContent = msg;
    status.className = `form-status ${type}`;
    status.style.display = "block";
    
    setTimeout(() => {
      status.style.display = "none";
    }, 5000);
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}

// 8. GENEL SCROLL REVEAL ANİMASYONLARI
function initGeneralScrollReveals() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  // Başlıklar, rozetler ve açıklamalar için reveal
  gsap.utils.toArray('.section-badge, .section-title, .section-desc').forEach(el => {
    if (el.closest('.hero-section')) return;

    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      y: 35,
      duration: 0.9,
      ease: "power2.out"
    });
  });

  // İstatistikler Alanı
  if (document.querySelector('.highlights-section')) {
    gsap.from('.stat-card', {
      scrollTrigger: {
        trigger: '.highlights-section',
        start: "top 80%"
      },
      opacity: 0,
      y: 40,
      duration: 0.7,
      stagger: 0.12,
      ease: "power2.out"
    });
  }

  // Hizmetlerimiz Alanı
  if (document.querySelector('.services-section')) {
    gsap.from('.service-card', {
      scrollTrigger: {
        trigger: '.services-section',
        start: "top 75%"
      },
      opacity: 0,
      y: 45,
      duration: 0.8,
      stagger: 0.18,
      ease: "power2.out"
    });
  }

  // Projeler Alanı
  if (document.querySelector('.projects-section')) {
    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: '.projects-section',
        start: "top 75%"
      },
      opacity: 0,
      y: 45,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out"
    });
  }

  // İletişim Alanı
  if (document.querySelector('.contact-layout')) {
    gsap.from('.contact-info-block > *, .contact-form', {
      scrollTrigger: {
        trigger: '.contact-layout',
        start: "top 75%"
      },
      opacity: 0,
      y: 35,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out"
    });
  }
}
