/**
 * app.js — SisDik Learn
 * Flow: Landing Page → Beranda (grid kartu minggu) → Konten Minggu → Topik
 */

document.addEventListener("DOMContentLoaded", () => {

  /* ── ELEMEN DOM ── */
  const landingPage   = document.getElementById("landingPage");
  const landingBtn    = document.getElementById("landingMasukBtn");
  const appShell      = document.getElementById("appShell");
  const railNav       = document.getElementById("railNav");
  const content       = document.getElementById("content");
  const breadcrumb    = document.getElementById("breadcrumb");
  const railProgress  = document.getElementById("railProgress");
  const progressFill  = document.getElementById("progressBarFill");
  const rail          = document.getElementById("rail");
  const railToggle    = document.getElementById("railToggle");
  const railBackdrop  = document.getElementById("railBackdrop");
  const themeToggle   = document.getElementById("themeToggle");
  const themeIcon     = document.getElementById("themeIcon");
  const themeLabel    = document.getElementById("themeLabel");
  const readingTime   = document.getElementById("readingTime");
  const readingTimeText = document.getElementById("readingTimeText");
  const berandaBtn    = document.getElementById("berandaBtn");
  let flagController  = null;

  /* ── TEMA ── */
  const savedTheme = localStorage.getItem("sisdik-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeUI(savedTheme);

  themeToggle.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("sisdik-theme", next);
    updateThemeUI(next);
  });

  function updateThemeUI(theme) {
    if (theme === "dark") {
      themeIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
      themeLabel.textContent = "Mode Terang";
    } else {
      themeIcon.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
      themeLabel.textContent = "Mode Gelap";
    }
  }

  /* ── PROGRESS ── */
  const availableWeeks = COURSE.weeks.filter(w => w.available).length;
  const totalWeeks = COURSE.weeks.length;
  railProgress.textContent = `${availableWeeks} dari ${totalWeeks} minggu tersedia`;
  setTimeout(() => {
    progressFill.style.width = `${(availableWeeks / totalWeeks) * 100}%`;
  }, 600);

  /* ══════════════════════════════════════════════════════
     1. LANDING PAGE → MASUK
     ══════════════════════════════════════════════════════ */
  landingBtn.addEventListener("click", () => {
    // Animasi keluar landing
    landingPage.classList.add("landing-page--exit");
    setTimeout(() => {
      // Gunakan style.display bukan hidden attribute
      // karena CSS .landing-page { display: flex } menimpa [hidden]
      landingPage.style.display = "none";
      landingPage.style.pointerEvents = "none";
      flagController?.stop();
      // Tampilkan app shell
      appShell.classList.remove("app-shell--hidden");
      appShell.style.display = "";
      // Tampilkan beranda
      showBeranda();
    }, 500);
  });

  /* ══════════════════════════════════════════════════════
     2. BERANDA — Grid Kartu Minggu
     ══════════════════════════════════════════════════════ */
  function showBeranda() {
    // Sembunyikan sidebar topik
    railNav.hidden = true;
    railNav.innerHTML = "";

    breadcrumb.innerHTML = `
      <span class="breadcrumb-icon-frame" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      </span>
      <span>Beranda</span>`;
    readingTime.hidden = true;

    content.innerHTML = "";
    content.className = "content content-enter";

    const beranda = document.createElement("div");
    beranda.className = "beranda";

    // Header beranda
    beranda.innerHTML = `
      <div class="beranda-header">
        <div class="beranda-tag">
          <span class="landing-badge-dot"></span>
          Pilih Materi
        </div>
        <h2 class="beranda-title">Halo, Selamat Datang!</h2>
        <p class="beranda-sub">Pilih minggu yang ingin kamu pelajari. Klik kartu untuk masuk ke materi.</p>
      </div>

      <div class="beranda-stats">
        <div class="beranda-stat">
          <span class="beranda-stat-num">${availableWeeks}</span>
          <span class="beranda-stat-label">Tersedia</span>
        </div>
        <div class="beranda-stat">
          <span class="beranda-stat-num" style="color:var(--text-faint)">${totalWeeks - availableWeeks}</span>
          <span class="beranda-stat-label">Segera Hadir</span>
        </div>
        <div class="beranda-stat">
          <span class="beranda-stat-num" style="color:var(--accent-amber)">∞</span>
          <span class="beranda-stat-label">Soal Latihan</span>
        </div>
      </div>

      <div class="week-cards-grid" id="weekCardsGrid"></div>
    `;
    content.appendChild(beranda);

    // Bangun kartu minggu
    const grid = beranda.querySelector("#weekCardsGrid");
    const colors = [
      { accent: "--accent-cyan",   dim: "--accent-cyan-dim",   glow: "--accent-cyan-glow" },
      { accent: "--accent-violet", dim: "--accent-violet-dim", glow: "--accent-violet-glow" },
      { accent: "--accent-amber",  dim: "--accent-amber-dim",  glow: "--accent-amber-glow" },
      { accent: "--accent-rose",   dim: "--accent-rose-dim",   glow: "--accent-rose-glow" },
    ];

    COURSE.weeks.forEach((week, i) => {
      const col = colors[i % colors.length];
      const card = document.createElement("button");
      card.type = "button";
      card.className = "week-card" + (week.available ? "" : " week-card--locked");
      card.setAttribute("aria-label", week.available
        ? `Masuk ke Minggu ${week.number}: ${week.title}`
        : `Minggu ${week.number} belum tersedia`
      );

      if (week.available) {
        card.innerHTML = `
          <div class="week-card-num" style="color:var(${col.accent})">W${String(week.number).padStart(2,"0")}</div>
          <div class="week-card-title">${week.title}</div>
          <div class="week-card-topics">${week.topics.length} topik</div>
          <div class="week-card-arrow" style="color:var(${col.accent})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
          <div class="week-card-glow" style="background:var(${col.dim})"></div>
          <div class="week-card-bar" style="background:var(${col.accent})"></div>
        `;
        card.addEventListener("click", () => openWeek(week, col));
      } else {
        card.innerHTML = `
          <div class="week-card-num" style="color:var(--text-faint)">W${String(week.number).padStart(2,"0")}</div>
          <div class="week-card-title" style="color:var(--text-faint)">${"Minggu " + week.number}</div>
          <div class="week-card-topics" style="color:var(--text-faint)">Segera hadir</div>
          <div class="week-card-lock">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
          </div>
          <div class="week-card-bar" style="background:var(--line)"></div>
        `;
      }

      grid.appendChild(card);
    });
  }

  /* ══════════════════════════════════════════════════════
     3. BUKA MINGGU — Tampilkan topik di sidebar
     ══════════════════════════════════════════════════════ */
  function openWeek(week, col) {
    // Tampilkan topik di sidebar
    railNav.hidden = false;
    railNav.innerHTML = "";

    // Header minggu di sidebar
    const weekLabel = document.createElement("div");
    weekLabel.className = "rail-week-label";
    weekLabel.innerHTML = `
      <span class="rail-week-label-num" style="color:var(${col.accent})">Minggu ${week.number}</span>
      <span class="rail-week-label-title">${week.title}</span>
    `;
    railNav.appendChild(weekLabel);

    // Daftar topik
    const topicList = document.createElement("div");
    topicList.className = "rail-topic-list";
    week.topics.forEach(topic => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "topic-btn";
      btn.dataset.topicId = topic.id;
      btn.textContent = topic.label;
      btn.addEventListener("click", () => selectTopic(week, topic, btn, col));
      topicList.appendChild(btn);
    });
    railNav.appendChild(topicList);

    // Tampilkan halaman overview minggu di content
    showWeekOverview(week, col);

    if (window.matchMedia("(max-width: 900px)").matches) closeRail();
  }

  /* ══════════════════════════════════════════════════════
     4. OVERVIEW MINGGU — Halaman awal setelah klik kartu
     ══════════════════════════════════════════════════════ */
  function showWeekOverview(week, col) {
    breadcrumb.innerHTML = `
      <button class="breadcrumb-link" id="bcBeranda">
        <span class="breadcrumb-icon-frame" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </span>
        <span>Beranda</span>
      </button>
      <span class="breadcrumb-sep" aria-hidden="true">&rsaquo;</span>
      <span>Minggu ${week.number}</span>`;
    readingTime.hidden = true;
    // Klik "Beranda" di breadcrumb → kembali ke beranda
    breadcrumb.querySelector("#bcBeranda")?.addEventListener("click", showBeranda);

    content.innerHTML = "";
    content.className = "content content-enter";

    const overview = document.createElement("div");
    overview.innerHTML = `
      <button class="back-btn" id="backToBerandaBtn">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Kembali ke Beranda
      </button>
      <div class="week-overview-header" style="border-color:var(${col.accent})">
        <span class="week-overview-num" style="color:var(${col.accent})">Minggu ${String(week.number).padStart(2,"00")}</span>
        <h2 class="week-overview-title">${week.title}</h2>
        <p class="week-overview-sub">Pilih topik di bawah untuk mulai belajar, atau gunakan sidebar kiri untuk navigasi cepat.</p>
      </div>
      <div class="week-overview-grid">
        ${week.topics.map((t, i) => `
          <button class="week-overview-card" data-topic-id="${t.id}" style="--card-accent:var(${col.accent});--card-dim:var(${col.dim})">
            <span class="week-overview-card-num">${String(i + 1).padStart(2,"0")}</span>
            <span class="week-overview-card-label">${t.label}</span>
            <span class="week-overview-card-arrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </button>
        `).join("")}
      </div>
    `;
    content.appendChild(overview);
    // Tombol kembali ke beranda
    overview.querySelector("#backToBerandaBtn")?.addEventListener("click", showBeranda);

    // Bind klik kartu topik di overview
    overview.querySelectorAll(".week-overview-card").forEach(card => {
      card.addEventListener("click", () => {
        const topicId = card.dataset.topicId;
        const topic = week.topics.find(t => t.id === topicId);
        const sidebarBtn = railNav.querySelector(`[data-topic-id="${topicId}"]`);
        if (topic) selectTopic(week, topic, sidebarBtn, col);
      });
    });
  }

  /* ══════════════════════════════════════════════════════
     5. PILIH TOPIK — Tampilkan konten materi
     ══════════════════════════════════════════════════════ */
  function selectTopic(week, topic, btnEl, col) {
    railNav.querySelectorAll(".topic-btn").forEach(b => b.classList.remove("active"));
    if (btnEl) btnEl.classList.add("active");

    breadcrumb.innerHTML = `
      <button class="breadcrumb-link" id="bcBeranda2">
        <span class="breadcrumb-icon-frame" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </span>
        <span>Beranda</span>
      </button>
      <span class="breadcrumb-sep" aria-hidden="true">&rsaquo;</span>
      <button class="breadcrumb-link" id="bcWeek">
        Minggu ${week.number}
      </button>
      <span class="breadcrumb-sep" aria-hidden="true">&rsaquo;</span>
      <span>${topic.label}</span>`;

    // Navigasi breadcrumb
    breadcrumb.querySelector("#bcBeranda2")?.addEventListener("click", showBeranda);
    breadcrumb.querySelector("#bcWeek")?.addEventListener("click", () => openWeek(week, col));
    const rtMap = {
      renderWeek1Intro: "4 menit", renderWeek1Converter: "Interaktif", renderWeek1Quiz: "Latihan",
      renderWeek2Intro: "3 menit", renderWeek2Negative: "8 menit",
      renderWeek2Ops: "7 menit", renderWeek2Hex: "5 menit", renderWeek2Quiz: "Latihan",
      renderWeek2InteractiveQuiz: "Latihan",
      renderWeek3Intro: "4 menit", renderWeek3Gates: "7 menit",
      renderWeek3Laws: "8 menit", renderWeek3StandardForms: "6 menit",
      renderWeek3TruthTable: "6 menit", renderWeek3Conversion: "7 menit",
      renderWeek3Simplification: "8 menit", renderWeek3XOR: "5 menit",
      renderWeek3Exercises: "Latihan", renderWeek3Summary: "Kuis & Evaluasi",
      renderWeek4Intro: "4 menit", renderWeek4Concepts: "6 menit",
      renderWeek4Grouping: "8 menit", renderWeek4KMap2: "6 menit",
      renderWeek4KMap3: "8 menit", renderWeek4KMap4: "9 menit",
      renderWeek4CaseStudy: "10 menit", renderWeek4DontCare: "7 menit",
      renderWeek4Exercises: "Latihan", renderWeek4Summary: "Kuis & Evaluasi",
      renderWeek5Intro: "5 menit", renderWeek5BinaryArithmetic: "6 menit",
      renderWeek5HalfAdder: "5 menit", renderWeek5FullAdder: "7 menit",
      renderWeek5RCA: "6 menit", renderWeek5CLA: "8 menit",
      renderWeek5Subtractors: "8 menit", renderWeek5AdderSubtractor: "9 menit",
      renderWeek5Simulator: "Interaktif", renderWeek5Exercises: "Latihan",
      renderWeek5Summary: "Kuis & Evaluasi",
      renderWeek6Intro: "4 menit", renderWeek6UniversalGates: "7 menit",
      renderWeek6MultilevelNAND: "8 menit", renderWeek6MultilevelNOR: "8 menit",
      renderWeek6Comparison: "6 menit", renderWeek6MuxBasics: "8 menit",
      renderWeek6MuxAdvanced: "9 menit", renderWeek6MuxLogic: "8 menit",
      renderWeek6Exercises: "Latihan", renderWeek6Summary: "Kuis & Evaluasi",
      renderWeek7Intro: "4 menit", renderWeek7DecoderBasics: "7 menit",
      renderWeek7Decoder3to8: "8 menit", renderWeek7DecoderApps: "6 menit",
      renderWeek7EncoderBasics: "7 menit", renderWeek7EncoderPriority: "8 menit",
      renderWeek7SevenSegment: "8 menit", renderWeek7SimulatorBCD: "Interaktif",
      renderWeek7Exercises: "Latihan & Kuis"
    };
    readingTime.hidden = false;
    readingTimeText.textContent = rtMap[topic.render] || "5 menit";

    content.innerHTML = `<h2 class="content-title">${topic.label}</h2><div class="content-body" id="topicBody"></div>`;
    content.className = "content content-enter";

    const body = document.getElementById("topicBody");
    const renderFn = window[topic.render];
    if (typeof renderFn === "function") {
      renderFn(body);
    } else {
      body.innerHTML = `<p class="lead">Materi sedang disiapkan oleh dosen.</p>`;
    }

    if (window.matchMedia("(max-width: 900px)").matches) closeRail();
  }

  /* ══════════════════════════════════════════════════════
     6. TOMBOL BERANDA (sidebar)
     ══════════════════════════════════════════════════════ */
  berandaBtn.addEventListener("click", () => {
    showBeranda();
    if (window.matchMedia("(max-width: 900px)").matches) closeRail();
  });

  /* ══════════════════════════════════════════════════════
     7. TOMBOL KEMBALI KE LANDING
     ══════════════════════════════════════════════════════ */
  function goToLanding() {
    // Animasi keluar app shell
    appShell.style.opacity = "0";
    appShell.style.transition = "opacity 0.4s ease";
    setTimeout(() => {
      appShell.style.display = "none";
      appShell.style.opacity = "";
      appShell.style.transition = "";
      // Tampilkan kembali landing page
      landingPage.style.display = "";
      landingPage.style.pointerEvents = "";
      landingPage.classList.remove("landing-page--exit");
      landingPage.style.animation = "fadeIn 0.5s ease";
      flagController?.start();
    }, 400);
  }

  document.getElementById("toLandingBtn")?.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 900px)").matches) closeRail();
    goToLanding();
  });

  /* ── SIDEBAR MOBILE ── */
  function openRail() {
    rail.classList.add("rail--open");
    railToggle.setAttribute("aria-expanded", "true");
    railBackdrop.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeRail() {
    rail.classList.remove("rail--open");
    railToggle.setAttribute("aria-expanded", "false");
    railBackdrop.hidden = true;
    document.body.style.overflow = "";
  }
  railToggle.addEventListener("click", () => {
    rail.classList.contains("rail--open") ? closeRail() : openRail();
  });
  railBackdrop.addEventListener("click", closeRail);

  /* ── TOAST ── */
  window.showToast = function(msg, duration = 3000) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.innerHTML = `
      <span class="toast-icon-frame">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </span>
      <span>${msg}</span>`;
    toast.classList.add("toast--visible");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove("toast--visible"), duration);
  };

  /* ══════════════════════════════════════════════════════
     8. ANIMASI BENDERA BERKIBAR (Flag Wave Simulation)
     ══════════════════════════════════════════════════════ */
  function initFlagWave() {
    const canvas = document.getElementById("flagCanvas");
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const img = new Image();
    img.src = "landing-bg.jpg";

    let animId = null;
    let isRunning = false;
    let t = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
    }
    window.addEventListener("resize", resize);
    resize();

    img.onload = () => {
      canvas.classList.add("landing-flag-canvas--active");
      start();
    };

    function draw() {
      if (!isRunning) return;
      t += 0.012;

      const cw = canvas.width;
      const ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);

      // Hitung cover agar foto proporsional
      const imgRatio = img.width / img.height;
      const canvasRatio = cw / ch;
      let drawW, drawH, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawW = cw;
        drawH = cw / imgRatio;
        offsetX = 0;
        offsetY = (ch - drawH) * 0.06; // Fokus pada foto orang di bagian atas
      } else {
        drawH = ch;
        drawW = ch * imgRatio;
        offsetX = (cw - drawW) / 2;
        offsetY = 0;
      }

      // Potongan vertikal halus untuk gelombang kain yang lembut
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const stripWidth = Math.max(2, Math.floor(2.5 * dpr));
      const strips = Math.ceil(drawW / stripWidth);

      for (let i = 0; i < strips; i++) {
        const sx = (i / strips) * img.width;
        const sw = img.width / strips;
        const dx = offsetX + i * stripWidth;

        // Gelombang lembut & tenang (seperti hembusan angin sepoi-sepoi)
        const wave1 = Math.sin(i * 0.02 - t * 0.9) * (3.5 * dpr);
        const wave2 = Math.sin(i * 0.04 - t * 1.3) * (1.5 * dpr);
        const dy = offsetY + wave1 + wave2;

        // Gambar strip foto
        ctx.drawImage(img, sx, 0, sw, img.height, dx, dy, stripWidth + 0.6, drawH);

        // Efek pencahayaan & bayangan sangat halus agar nyaman di mata
        const slope = Math.cos(i * 0.02 - t * 0.9) * 0.15;
        if (slope > 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(0.06, slope * 0.12).toFixed(3)})`;
          ctx.fillRect(dx, dy, stripWidth + 0.6, drawH);
        } else {
          ctx.fillStyle = `rgba(0, 0, 0, ${Math.min(0.09, -slope * 0.16).toFixed(3)})`;
          ctx.fillRect(dx, dy, stripWidth + 0.6, drawH);
        }
      }

      animId = requestAnimationFrame(draw);
    }

    function start() {
      if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(draw);
      }
    }

    function stop() {
      isRunning = false;
      if (animId) cancelAnimationFrame(animId);
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
      else if (landingPage && landingPage.style.display !== "none") start();
    });

    return { start, stop };
  }

  flagController = initFlagWave();

  /* ══════════════════════════════════════════════════════
     GLOBAL BRIDGE FUNCTIONS
     Diperlukan oleh week6.js dan week7.js yang menggunakan
     inline onclick="navigateTo('home')" dan onclick="selectWeek(n)"
     di dalam konten HTML yang di-render secara dinamis.
     ══════════════════════════════════════════════════════ */
  const _weekColors = [
    { accent: "--accent-cyan",   dim: "--accent-cyan-dim",   glow: "--accent-cyan-glow" },
    { accent: "--accent-violet", dim: "--accent-violet-dim", glow: "--accent-violet-glow" },
    { accent: "--accent-amber",  dim: "--accent-amber-dim",  glow: "--accent-amber-glow" },
    { accent: "--accent-rose",   dim: "--accent-rose-dim",   glow: "--accent-rose-glow" },
  ];

  window.navigateTo = function(target) {
    if (target === "home" || target === "beranda") {
      showBeranda();
      if (window.matchMedia("(max-width: 900px)").matches) closeRail();
    }
  };

  window.selectWeek = function(weekNum) {
    const week = COURSE.weeks.find(w => w.number === weekNum);
    if (week && week.available) {
      const col = _weekColors[(weekNum - 1) % _weekColors.length];
      openWeek(week, col);
      if (window.matchMedia("(max-width: 900px)").matches) closeRail();
    }
  };

});
