(() => {
  "use strict";

  const STORAGE_KEY = "portfolio_2d_config_v1";
  const THEME_KEY = "portfolio_2d_theme_v1";

  const clone = (obj) => JSON.parse(JSON.stringify(obj));

  const escapeHtml = (str = "") =>
    String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  function loadConfig() {
    const base = clone(window.PORTFOLIO_CONFIG || {});
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...base, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore storage errors
    }
    return base;
  }

  let state = loadConfig();
  let activeSkillCat = "All";
  let activeProjectCat = "All";
  let activeEditorTab = "profile";

  // =========================================================================
  // THEME & CSS VARIABLES
  // =========================================================================
  function applyThemeColors() {
    const root = document.documentElement;
    const theme = state.theme || {};
    if (theme.accentColor) root.style.setProperty("--accent", theme.accentColor);
    if (theme.secondaryColor) root.style.setProperty("--secondary", theme.secondaryColor);
    if (theme.tertiaryColor) root.style.setProperty("--tertiary", theme.tertiaryColor);
  }

  function initThemeMode() {
    const saved = localStorage.getItem(THEME_KEY);
    const mode = saved || state.theme?.defaultMode || "light";
    setThemeMode(mode);
  }

  function setThemeMode(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    localStorage.setItem(THEME_KEY, mode);
    const icon = document.getElementById("theme-icon");
    if (icon) icon.textContent = mode === "dark" ? "☀️" : "🌙";
  }

  const DESIGN_PRESETS = {
    midnight: { mode: "dark", accentColor: "#6366F1", secondaryColor: "#22D3EE", tertiaryColor: "#FB7185" },
    daylight: { mode: "light", accentColor: "#4F46E5", secondaryColor: "#0EA5E9", tertiaryColor: "#F43F5E" },
    emerald: { mode: "dark", accentColor: "#10B981", secondaryColor: "#38BDF8", tertiaryColor: "#FBBF24" },
    sunset: { mode: "dark", accentColor: "#F97316", secondaryColor: "#EC4899", tertiaryColor: "#FACC15" },
  };

  // =========================================================================
  // 2D SVG ART GENERATORS (Modern Flat-Vector 2D Studio Style)
  // =========================================================================
  function create2DAvatarSVG(initials = "KM") {
    return `
      <svg viewBox="0 0 320 320" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="2D Illustrated Studio Avatar">
        <defs>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#1E1B4B"/>
            <stop offset="100%" stop-color="#312E81"/>
          </linearGradient>
          <linearGradient id="hoodieGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#6366F1"/>
            <stop offset="100%" stop-color="#22D3EE"/>
          </linearGradient>
        </defs>
        <rect width="320" height="320" fill="url(#bgGrad)"/>
        <!-- Soft 2D layered orbs -->
        <circle cx="64" cy="64" r="34" fill="#22D3EE" opacity="0.22"/>
        <circle cx="262" cy="82" r="46" fill="#FB7185" opacity="0.2"/>
        <rect x="38" y="218" width="52" height="52" rx="14" transform="rotate(-14 64 244)" fill="#6366F1" opacity="0.28"/>
        <!-- Character Shoulders -->
        <path d="M64 320 C68 238, 252 238, 256 320 Z" fill="url(#hoodieGrad)"/>
        <!-- Neck -->
        <rect x="140" y="194" width="40" height="44" rx="16" fill="#F3C6A5"/>
        <!-- Head -->
        <rect x="100" y="88" width="120" height="124" rx="52" fill="#F7D3B5"/>
        <!-- Hair -->
        <path d="M98 134 C100 72, 220 72, 222 134 C202 110, 166 108, 144 114 C122 120, 110 128, 98 134 Z" fill="#0F172A"/>
        <!-- Glasses -->
        <rect x="115" y="138" width="36" height="26" rx="8" fill="rgba(255,255,255,0.18)" stroke="#E2E8F0" stroke-width="2.5"/>
        <rect x="169" y="138" width="36" height="26" rx="8" fill="rgba(255,255,255,0.18)" stroke="#E2E8F0" stroke-width="2.5"/>
        <line x1="151" y1="150" x2="169" y2="150" stroke="#E2E8F0" stroke-width="2.5"/>
        <!-- Eyes -->
        <circle cx="133" cy="151" r="4.5" fill="#0F172A"/>
        <circle cx="187" cy="151" r="4.5" fill="#0F172A"/>
        <!-- Smile -->
        <path d="M144 182 Q160 194 176 182" fill="none" stroke="#0F172A" stroke-width="3.5" stroke-linecap="round"/>
        <!-- Floating Initials Pill -->
        <rect x="206" y="256" width="58" height="30" rx="15" fill="rgba(15,23,42,0.75)" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>
        <text x="235" y="276" text-anchor="middle" font-family="Outfit, sans-serif" font-weight="700" font-size="13" fill="#F8FAFC">${escapeHtml(initials)}</text>
      </svg>
    `;
  }

  function createProjectCoverSVG(project, index) {
    const accent = project.color || "#6366F1";
    const patterns = [
      `<circle cx="96" cy="95" r="56" fill="${escapeHtml(accent)}" opacity="0.85"/>
       <rect x="148" y="48" width="112" height="92" rx="18" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.28)" stroke-width="2"/>
       <circle cx="242" cy="126" r="24" fill="#22D3EE" opacity="0.9"/>`,
      `<rect x="58" y="40" width="204" height="112" rx="16" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.22)" stroke-width="2"/>
       <rect x="78" y="62" width="70" height="12" rx="6" fill="${escapeHtml(accent)}"/>
       <rect x="78" y="86" width="164" height="10" rx="5" fill="rgba(255,255,255,0.22)"/>
       <rect x="78" y="108" width="118" height="10" rx="5" fill="rgba(255,255,255,0.14)"/>`,
      `<polygon points="160,32 238,154 82,154" fill="${escapeHtml(accent)}" opacity="0.85"/>
       <circle cx="218" cy="70" r="28" fill="#22D3EE" opacity="0.75"/>
       <rect x="72" y="102" width="44" height="44" rx="12" fill="rgba(255,255,255,0.16)"/>`,
      `<rect x="72" y="40" width="80" height="110" rx="16" fill="${escapeHtml(accent)}" opacity="0.85"/>
       <rect x="168" y="40" width="80" height="50" rx="14" fill="rgba(255,255,255,0.14)"/>
       <rect x="168" y="100" width="80" height="50" rx="14" fill="#22D3EE" opacity="0.75"/>`,
    ];
    return `
      <svg viewBox="0 0 320 190" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <rect width="320" height="190" fill="#0F172A"/>
        <circle cx="280" cy="24" r="90" fill="${escapeHtml(accent)}" opacity="0.18"/>
        ${patterns[index % patterns.length]}
      </svg>
    `;
  }

  function serviceIconSvg(name) {
    const icons = {
      sparkles: "✦",
      code: "</>",
      layers: "◫",
    };
    return `<span style="font-family: var(--font-mono); font-weight: 700; font-size: 1.15rem;">${icons[name] || "★"}</span>`;
  }

  // =========================================================================
  // RENDER SECTIONS
  // =========================================================================
  function renderProfile() {
    const p = state.profile || {};
    document.title = `${p.name || "Portfolio"} — ${p.role || "2D Portfolio"}`;

    document.getElementById("nav-brand-badge").textContent = p.brandMark || "2D";
    document.getElementById("nav-brand-name").textContent = (p.name || "Portfolio").split(" ")[0];
    document.getElementById("hero-availability").textContent = p.availability || "";
    document.getElementById("hero-name").textContent = p.name || "";
    document.getElementById("hero-role").textContent = p.role || "";
    document.getElementById("hero-tagline").textContent = p.tagline || "";
    document.getElementById("hero-location").textContent = `📍 ${p.location || ""}`;

    const resumeBtn = document.getElementById("hero-resume-btn");
    if (p.resumeUrl && p.resumeUrl !== "#") {
      resumeBtn.href = p.resumeUrl;
      resumeBtn.style.display = "inline-flex";
    } else {
      resumeBtn.style.display = p.resumeUrl ? "inline-flex" : "none";
      resumeBtn.href = p.resumeUrl || "#";
    }

    const avatarArt = document.getElementById("avatar-art");
    if (p.avatarImage) {
      avatarArt.innerHTML = `<img src="${escapeHtml(p.avatarImage)}" alt="${escapeHtml(p.name || "Avatar")}" />`;
    } else {
      avatarArt.innerHTML = create2DAvatarSVG(p.avatarInitials || "2D");
    }

    const socialsHtml = (p.socials || [])
      .map(
        (s) =>
          `<a class="social-chip" href="${escapeHtml(s.url)}" target="_blank" rel="noopener">${escapeHtml(s.label)} ↗</a>`
      )
      .join("");
    document.getElementById("hero-socials").innerHTML = socialsHtml;
    document.getElementById("contact-socials").innerHTML = socialsHtml;

    document.getElementById("contact-email-text").textContent = p.email || "";
    document.getElementById("contact-location-text").textContent = p.location || "";
    document.getElementById("footer-copy").textContent = `© ${new Date().getFullYear()} ${p.name || ""}. ${state.footer?.note || ""}`;
  }

  function renderAbout() {
    const a = state.about || {};
    document.getElementById("about-heading").textContent = a.heading || "";
    document.getElementById("about-paragraphs").innerHTML = (a.paragraphs || [])
      .map((p) => `<p>${escapeHtml(p)}</p>`)
      .join("");

    document.getElementById("about-stats").innerHTML = (a.stats || [])
      .map(
        (s) => `
        <div class="card-2d stat-card">
          <div class="stat-card__value">${escapeHtml(s.value)}</div>
          <div class="stat-card__label">${escapeHtml(s.label)}</div>
        </div>`
      )
      .join("");

    document.getElementById("services-grid").innerHTML = (state.services || [])
      .map(
        (srv) => `
        <article class="card-2d card-2d--interactive service-card">
          <div class="service-card__icon">${serviceIconSvg(srv.icon)}</div>
          <h3>${escapeHtml(srv.title)}</h3>
          <p>${escapeHtml(srv.description)}</p>
        </article>`
      )
      .join("");
  }

  function renderSkills() {
    const skills = state.skills || [];
    const categories = ["All", ...new Set(skills.map((s) => s.category).filter(Boolean))];
    if (!categories.includes(activeSkillCat)) activeSkillCat = "All";

    const filterEl = document.getElementById("skill-filters");
    filterEl.innerHTML = categories
      .map(
        (cat) =>
          `<button class="filter-pill ${cat === activeSkillCat ? "is-active" : ""}" data-skill-cat="${escapeHtml(cat)}" type="button">${escapeHtml(cat)}</button>`
      )
      .join("");

    const filtered = activeSkillCat === "All" ? skills : skills.filter((s) => s.category === activeSkillCat);
    document.getElementById("skills-grid").innerHTML = filtered
      .map(
        (skill) => `
        <div class="card-2d skill-card">
          <div class="skill-card__top">
            <span>${escapeHtml(skill.name)}</span>
            <span class="skill-card__cat">${escapeHtml(skill.category)}</span>
          </div>
          <div class="skill-bar" role="progressbar" aria-valuenow="${Number(skill.level)}" aria-valuemin="0" aria-valuemax="100">
            <div class="skill-bar__fill" style="width: ${Math.max(0, Math.min(100, Number(skill.level) || 0))}%"></div>
          </div>
        </div>`
      )
      .join("");
  }

  function renderProjects() {
    const projects = state.projects || [];
    const categories = ["All", ...new Set(projects.map((p) => p.category).filter(Boolean))];
    if (!categories.includes(activeProjectCat)) activeProjectCat = "All";

    document.getElementById("project-filters").innerHTML = categories
      .map(
        (cat) =>
          `<button class="filter-pill ${cat === activeProjectCat ? "is-active" : ""}" data-project-cat="${escapeHtml(cat)}" type="button">${escapeHtml(cat)}</button>`
      )
      .join("");

    const filtered = activeProjectCat === "All" ? projects : projects.filter((p) => p.category === activeProjectCat);

    document.getElementById("projects-grid").innerHTML = filtered
      .map((proj, idx) => {
        const cover = proj.image
          ? `<img src="${escapeHtml(proj.image)}" alt="${escapeHtml(proj.title)}" loading="lazy" />`
          : createProjectCoverSVG(proj, idx);

        return `
          <article class="card-2d card-2d--interactive project-card" data-project-id="${escapeHtml(proj.id)}" tabindex="0" role="button" aria-label="Open details for ${escapeHtml(proj.title)}">
            <div class="project-card__cover">
              ${cover}
              <span class="project-card__year">${escapeHtml(proj.year)}</span>
            </div>
            <div class="project-card__body">
              <span class="project-card__cat">${escapeHtml(proj.category)}</span>
              <h3 class="project-card__title">${escapeHtml(proj.title)}</h3>
              <p class="project-card__summary">${escapeHtml(proj.summary)}</p>
              <div class="tag-list">
                ${(proj.tags || []).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("")}
              </div>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderExperience() {
    const exp = state.experience || [];
    document.getElementById("experience-timeline").innerHTML = exp
      .map(
        (item) => `
        <article class="card-2d timeline-item">
          <div class="timeline-item__top">
            <h3>${escapeHtml(item.role)}</h3>
            <span class="timeline-item__period">${escapeHtml(item.period)}</span>
          </div>
          <div class="timeline-item__company">${escapeHtml(item.company)} · ${escapeHtml(item.type || "Full-time")}</div>
          <p class="timeline-item__desc">${escapeHtml(item.description)}</p>
        </article>`
      )
      .join("");
  }

  function renderAll() {
    applyThemeColors();
    renderProfile();
    renderAbout();
    renderSkills();
    renderProjects();
    renderExperience();
  }

  // =========================================================================
  // PROJECT DETAIL MODAL (<dialog>)
  // =========================================================================
  const dialog = document.getElementById("project-dialog");

  function openProjectModal(projectId) {
    const projects = state.projects || [];
    const idx = projects.findIndex((p) => p.id === projectId);
    if (idx === -1) return;
    const proj = projects[idx];

    const coverEl = document.getElementById("dialog-cover");
    const closeBtn = document.getElementById("dialog-close-btn");
    coverEl.innerHTML = proj.image
      ? `<img src="${escapeHtml(proj.image)}" alt="${escapeHtml(proj.title)}" />`
      : createProjectCoverSVG(proj, idx);
    coverEl.appendChild(closeBtn);

    document.getElementById("dialog-cat").textContent = `${proj.category} · ${proj.year}`;
    document.getElementById("dialog-title").textContent = proj.title;
    document.getElementById("dialog-desc").textContent = proj.description || proj.summary;
    document.getElementById("dialog-tags").innerHTML = (proj.tags || [])
      .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
      .join("");

    const liveBtn = document.getElementById("dialog-live");
    const repoBtn = document.getElementById("dialog-repo");
    liveBtn.href = proj.liveUrl || "#";
    repoBtn.href = proj.repoUrl || "#";

    dialog.showModal();
  }

  // =========================================================================
  // INTERACTIVE 2D CANVAS HERO PLAYGROUND
  // =========================================================================
  function initHeroCanvas() {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    const mouse = { x: -9999, y: -9999 };
    const shapes = [];
    const palette = () => [
      state.theme?.accentColor || "#FF5C35",
      state.theme?.secondaryColor || "#FFD166",
      state.theme?.tertiaryColor || "#06D6A0",
      "#8B5CF6",
    ];
    const kinds = ["circle", "square", "triangle", "cross"];

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    }

    function spawnShape(x, y, burst = false) {
      const colors = palette();
      const angle = Math.random() * Math.PI * 2;
      const speed = burst ? 1.5 + Math.random() * 2.5 : 0.25 + Math.random() * 0.45;
      return {
        x: x ?? Math.random() * width,
        y: y ?? Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: burst ? 10 + Math.random() * 14 : 14 + Math.random() * 20,
        rot: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.02,
        kind: kinds[Math.floor(Math.random() * kinds.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: burst ? 0.9 : 0.35,
      };
    }

    resize();
    for (let i = 0; i < 16; i++) shapes.push(spawnShape());

    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener("pointerleave", () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });
    canvas.addEventListener("click", (e) => {
      if (reducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (let i = 0; i < 5; i++) {
        shapes.push(spawnShape(cx, cy, true));
      }
      if (shapes.length > 42) shapes.splice(0, shapes.length - 42);
    });

    function drawShape(s) {
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rot);
      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = s.color;

      const r = s.size / 2;
      if (s.kind === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.65, 0, Math.PI * 2);
        ctx.fill();
      } else if (s.kind === "square") {
        ctx.beginPath();
        ctx.roundRect(-r * 0.6, -r * 0.6, s.size * 0.6, s.size * 0.6, 4);
        ctx.fill();
      } else if (s.kind === "triangle") {
        ctx.beginPath();
        ctx.moveTo(0, -r * 0.7);
        ctx.lineTo(r * 0.65, r * 0.6);
        ctx.lineTo(-r * 0.65, r * 0.6);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-r * 0.5, 0);
        ctx.lineTo(r * 0.5, 0);
        ctx.moveTo(0, -r * 0.5);
        ctx.lineTo(0, r * 0.5);
        ctx.stroke();
      }
      ctx.restore();
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const lineRgb = isDark ? "148, 163, 184" : "71, 85, 105";

      for (let i = 0; i < shapes.length; i++) {
        const s = shapes[i];
        if (!reducedMotion) {
          const dx = s.x - mouse.x;
          const dy = s.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 130 && dist > 0) {
            const push = (130 - dist) / 130;
            s.x += (dx / dist) * push * 2.2;
            s.y += (dy / dist) * push * 2.2;
          }
          s.x += s.vx;
          s.y += s.vy;
          s.rot += s.vRot;

          if (s.x < -30) s.x = width + 30;
          if (s.x > width + 30) s.x = -30;
          if (s.y < -30) s.y = height + 30;
          if (s.y > height + 30) s.y = -30;
        }

        // Draw subtle 2D constellation lines between nearby nodes
        for (let j = i + 1; j < shapes.length; j++) {
          const o = shapes[j];
          const d = Math.hypot(s.x - o.x, s.y - o.y);
          if (d < 135) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lineRgb}, ${(1 - d / 135) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.moveTo(s.x, s.y);
            ctx.lineTo(o.x, o.y);
            ctx.stroke();
          }
        }

        drawShape(s);
      }

      if (!reducedMotion) requestAnimationFrame(tick);
    }

    tick();
  }

  // =========================================================================
  // LIVE PORTFOLIO EDITOR DRAWER
  // =========================================================================
  const editorDrawer = document.getElementById("editor-drawer");
  const editorBody = document.getElementById("editor-body");

  function saveAndRender() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
    renderAll();
  }

  function openEditor() {
    editorDrawer.classList.add("is-open");
    editorDrawer.setAttribute("aria-hidden", "false");
    renderEditorTab();
  }

  function closeEditor() {
    editorDrawer.classList.remove("is-open");
    editorDrawer.setAttribute("aria-hidden", "true");
  }

  function renderEditorTab() {
    document.querySelectorAll(".editor-tab").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.tab === activeEditorTab);
    });

    if (activeEditorTab === "profile") {
      const p = state.profile;
      const t = state.theme;
      const preset = t.preset || "midnight";
      editorBody.innerHTML = `
        <div class="field">
          <label>Design Preset</label>
          <select id="ed-preset">
            <option value="midnight" ${preset === "midnight" ? "selected" : ""}>Midnight 2D Studio (Dark)</option>
            <option value="daylight" ${preset === "daylight" ? "selected" : ""}>Daylight Clean (Light)</option>
            <option value="emerald" ${preset === "emerald" ? "selected" : ""}>Emerald Forest (Dark)</option>
            <option value="sunset" ${preset === "sunset" ? "selected" : ""}>Sunset Warm (Dark)</option>
          </select>
        </div>
        <div class="field"><label>Full Name</label><input data-bind="profile.name" value="${escapeHtml(p.name)}" /></div>
        <div class="field"><label>Brand Mark (2-3 chars)</label><input data-bind="profile.brandMark" value="${escapeHtml(p.brandMark)}" /></div>
        <div class="field"><label>Role / Title</label><input data-bind="profile.role" value="${escapeHtml(p.role)}" /></div>
        <div class="field"><label>Tagline</label><textarea data-bind="profile.tagline">${escapeHtml(p.tagline)}</textarea></div>
        <div class="field"><label>Availability Badge</label><input data-bind="profile.availability" value="${escapeHtml(p.availability)}" /></div>
        <div class="field"><label>Location</label><input data-bind="profile.location" value="${escapeHtml(p.location)}" /></div>
        <div class="field"><label>Email</label><input data-bind="profile.email" value="${escapeHtml(p.email)}" /></div>
        <div class="field"><label>Avatar Image URL (optional)</label><input data-bind="profile.avatarImage" placeholder="Leave blank for 2D vector avatar" value="${escapeHtml(p.avatarImage || "")}" /></div>
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:0.6rem;">
          <div class="field"><label>Accent</label><input type="color" data-bind="theme.accentColor" value="${escapeHtml(t.accentColor)}" style="height:42px; padding:2px;" /></div>
          <div class="field"><label>Secondary</label><input type="color" data-bind="theme.secondaryColor" value="${escapeHtml(t.secondaryColor)}" style="height:42px; padding:2px;" /></div>
          <div class="field"><label>Tertiary</label><input type="color" data-bind="theme.tertiaryColor" value="${escapeHtml(t.tertiaryColor)}" style="height:42px; padding:2px;" /></div>
        </div>
      `;
    } else if (activeEditorTab === "about") {
      const a = state.about;
      editorBody.innerHTML = `
        <div class="field"><label>About Heading</label><input data-bind="about.heading" value="${escapeHtml(a.heading)}" /></div>
        <div class="field"><label>Paragraphs (separate with blank line)</label><textarea id="ed-about-paras" style="min-height:160px;">${escapeHtml((a.paragraphs || []).join("\n\n"))}</textarea></div>
        <hr style="border:1px solid var(--border); width:100%;" />
        <strong>Quick Stats</strong>
        ${(a.stats || [])
          .map(
            (st, i) => `
          <div class="editor-item-box">
            <div style="display:grid; grid-template-columns: 1fr 2fr; gap:0.5rem;">
              <input data-arr="about.stats" data-idx="${i}" data-key="value" value="${escapeHtml(st.value)}" placeholder="4+" />
              <input data-arr="about.stats" data-idx="${i}" data-key="label" value="${escapeHtml(st.label)}" placeholder="Years" />
            </div>
          </div>`
          )
          .join("")}
      `;
    } else if (activeEditorTab === "skills") {
      editorBody.innerHTML = `
        <button class="btn-2d btn-2d--sm btn-2d--secondary" id="ed-add-skill" type="button">+ Add Skill</button>
        ${(state.skills || [])
          .map(
            (sk, i) => `
          <div class="editor-item-box">
            <div class="editor-item-box__head">
              <span>${escapeHtml(sk.name)}</span>
              <button class="btn-2d btn-2d--sm" data-del="skills" data-idx="${i}" type="button">Delete</button>
            </div>
            <input data-arr="skills" data-idx="${i}" data-key="name" value="${escapeHtml(sk.name)}" placeholder="Skill name" />
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem;">
              <input data-arr="skills" data-idx="${i}" data-key="category" value="${escapeHtml(sk.category)}" placeholder="Category" />
              <input type="number" min="0" max="100" data-arr="skills" data-idx="${i}" data-key="level" value="${Number(sk.level)}" />
            </div>
          </div>`
          )
          .join("")}
      `;
    } else if (activeEditorTab === "projects") {
      editorBody.innerHTML = `
        <button class="btn-2d btn-2d--sm btn-2d--secondary" id="ed-add-project" type="button">+ Add Project</button>
        ${(state.projects || [])
          .map(
            (pr, i) => `
          <div class="editor-item-box">
            <div class="editor-item-box__head">
              <span>${escapeHtml(pr.title)}</span>
              <button class="btn-2d btn-2d--sm" data-del="projects" data-idx="${i}" type="button">Delete</button>
            </div>
            <input data-arr="projects" data-idx="${i}" data-key="title" value="${escapeHtml(pr.title)}" placeholder="Title" />
            <div style="display:grid; grid-template-columns: 1fr 90px 56px; gap:0.5rem;">
              <input data-arr="projects" data-idx="${i}" data-key="category" value="${escapeHtml(pr.category)}" placeholder="Category" />
              <input data-arr="projects" data-idx="${i}" data-key="year" value="${escapeHtml(pr.year)}" placeholder="Year" />
              <input type="color" data-arr="projects" data-idx="${i}" data-key="color" value="${escapeHtml(pr.color || "#FF5C35")}" style="height:38px; padding:2px;" />
            </div>
            <textarea data-arr="projects" data-idx="${i}" data-key="summary" placeholder="Short summary">${escapeHtml(pr.summary)}</textarea>
            <input data-arr="projects" data-idx="${i}" data-key="image" value="${escapeHtml(pr.image || "")}" placeholder="Image URL (optional)" />
            <input data-tags-idx="${i}" value="${escapeHtml((pr.tags || []).join(", "))}" placeholder="Tags (comma separated)" />
          </div>`
          )
          .join("")}
      `;
    } else if (activeEditorTab === "experience") {
      editorBody.innerHTML = `
        <button class="btn-2d btn-2d--sm btn-2d--secondary" id="ed-add-exp" type="button">+ Add Experience</button>
        ${(state.experience || [])
          .map(
            (ex, i) => `
          <div class="editor-item-box">
            <div class="editor-item-box__head">
              <span>${escapeHtml(ex.role)}</span>
              <button class="btn-2d btn-2d--sm" data-del="experience" data-idx="${i}" type="button">Delete</button>
            </div>
            <input data-arr="experience" data-idx="${i}" data-key="role" value="${escapeHtml(ex.role)}" placeholder="Role" />
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem;">
              <input data-arr="experience" data-idx="${i}" data-key="company" value="${escapeHtml(ex.company)}" placeholder="Company" />
              <input data-arr="experience" data-idx="${i}" data-key="period" value="${escapeHtml(ex.period)}" placeholder="2024 — Present" />
            </div>
            <textarea data-arr="experience" data-idx="${i}" data-key="description" placeholder="Description">${escapeHtml(ex.description)}</textarea>
          </div>`
          )
          .join("")}
      `;
    }
  }

  function downloadConfigFile() {
    const content = `/**\n * Updated Portfolio Configuration\n * Replace your existing config.js with this file to make edits permanent.\n */\nwindow.PORTFOLIO_CONFIG = ${JSON.stringify(state, null, 2)};\n`;
    const blob = new Blob([content], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "config.js";
    a.click();
    URL.revokeObjectURL(url);
  }

  // =========================================================================
  // EVENT WIRING
  // =========================================================================
  function bindEvents() {
    document.getElementById("theme-toggle").addEventListener("click", () => {
      const curr = document.documentElement.getAttribute("data-theme");
      setThemeMode(curr === "dark" ? "light" : "dark");
    });

    const mobileBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.getElementById("nav-links");
    mobileBtn.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      mobileBtn.setAttribute("aria-expanded", String(open));
    });
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("is-open");
        mobileBtn.setAttribute("aria-expanded", "false");
      }
    });

    // Skill & Project Filters
    document.getElementById("skill-filters").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-skill-cat]");
      if (!btn) return;
      activeSkillCat = btn.dataset.skillCat;
      renderSkills();
    });

    document.getElementById("project-filters").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-project-cat]");
      if (!btn) return;
      activeProjectCat = btn.dataset.projectCat;
      renderProjects();
    });

    // Project Modal
    const projectsGrid = document.getElementById("projects-grid");
    projectsGrid.addEventListener("click", (e) => {
      const card = e.target.closest("[data-project-id]");
      if (card) openProjectModal(card.dataset.projectId);
    });
    projectsGrid.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        const card = e.target.closest("[data-project-id]");
        if (card) {
          e.preventDefault();
          openProjectModal(card.dataset.projectId);
        }
      }
    });
    document.getElementById("dialog-close-btn").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) dialog.close();
    });

    // Copy email
    document.getElementById("copy-email-btn").addEventListener("click", async (e) => {
      const email = state.profile?.email || "";
      try {
        await navigator.clipboard.writeText(email);
        e.target.textContent = "Copied!";
        setTimeout(() => (e.target.textContent = "Copy"), 1500);
      } catch {
        e.target.textContent = email;
      }
    });

    // Contact form
    document.getElementById("contact-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("c-name").value.trim();
      const email = document.getElementById("c-email").value.trim();
      const msg = document.getElementById("c-message").value.trim();
      const status = document.getElementById("form-status");

      if (!name || !email.includes("@") || !msg) {
        status.textContent = "Please fill in your name, a valid email, and a message.";
        status.style.color = "var(--accent)";
        return;
      }
      status.textContent = `Thanks ${name}! Your message is ready — opening your mail app or connect via ${state.profile?.email}.`;
      status.style.color = "var(--tertiary)";
      e.target.reset();
    });

    // Editor open/close
    document.getElementById("open-editor-nav").addEventListener("click", openEditor);
    document.getElementById("open-editor-fab").addEventListener("click", openEditor);
    document.getElementById("close-editor-btn").addEventListener("click", closeEditor);

    // Editor tabs
    document.querySelector(".editor-drawer__tabs").addEventListener("click", (e) => {
      const tab = e.target.closest(".editor-tab");
      if (!tab) return;
      activeEditorTab = tab.dataset.tab;
      renderEditorTab();
    });

    // Editor live inputs
    editorBody.addEventListener("input", (e) => {
      const el = e.target;
      if (el.dataset.bind) {
        const [section, key] = el.dataset.bind.split(".");
        state[section][key] = el.value;
        saveAndRender();
      } else if (el.id === "ed-about-paras") {
        state.about.paragraphs = el.value.split(/\n\s*\n/).filter(Boolean);
        saveAndRender();
      } else if (el.dataset.arr) {
        const path = el.dataset.arr.split(".");
        const arr = path.length === 2 ? state[path[0]][path[1]] : state[path[0]];
        const idx = Number(el.dataset.idx);
        const key = el.dataset.key;
        arr[idx][key] = key === "level" ? Number(el.value) : el.value;
        saveAndRender();
      } else if (el.dataset.tagsIdx !== undefined) {
        const idx = Number(el.dataset.tagsIdx);
        state.projects[idx].tags = el.value
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        saveAndRender();
      }
    });

    editorBody.addEventListener("change", (e) => {
      if (e.target.id === "ed-preset") {
        const presetKey = e.target.value;
        const p = DESIGN_PRESETS[presetKey];
        if (p) {
          state.theme.preset = presetKey;
          state.theme.defaultMode = p.mode;
          state.theme.accentColor = p.accentColor;
          state.theme.secondaryColor = p.secondaryColor;
          state.theme.tertiaryColor = p.tertiaryColor;
          setThemeMode(p.mode);
          saveAndRender();
          renderEditorTab();
        }
      }
    });

    // Editor add/delete buttons
    editorBody.addEventListener("click", (e) => {
      const del = e.target.closest("[data-del]");
      if (del) {
        state[del.dataset.del].splice(Number(del.dataset.idx), 1);
        saveAndRender();
        renderEditorTab();
        return;
      }
      if (e.target.id === "ed-add-skill") {
        state.skills.unshift({ name: "New Skill", level: 80, category: "Frontend" });
        saveAndRender();
        renderEditorTab();
      } else if (e.target.id === "ed-add-project") {
        state.projects.unshift({
          id: `proj-${Date.now()}`,
          title: "New 2D Project",
          category: "Web App",
          year: String(new Date().getFullYear()),
          color: "#FF5C35",
          image: "",
          summary: "Short description of your new project.",
          description: "Full description of your new project.",
          tags: ["HTML", "CSS", "JS"],
          liveUrl: "#",
          repoUrl: "#",
        });
        saveAndRender();
        renderEditorTab();
      } else if (e.target.id === "ed-add-exp") {
        state.experience.unshift({
          period: "2026 — Present",
          role: "New Role",
          company: "Company Name",
          type: "Full-time",
          description: "Describe your impact and responsibilities.",
        });
        saveAndRender();
        renderEditorTab();
      }
    });

    document.getElementById("editor-export-btn").addEventListener("click", downloadConfigFile);
    document.getElementById("editor-reset-btn").addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY);
      state = clone(window.PORTFOLIO_CONFIG || {});
      renderAll();
      renderEditorTab();
    });
  }

  // =========================================================================
  // BOOT
  // =========================================================================
  initThemeMode();
  renderAll();
  bindEvents();
  initHeroCanvas();
})();
