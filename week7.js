/**
 * week7.js - Modul Pembelajaran Pertemuan 7: Decoder, Encoder, dan BCD to 7-Segment
 * Mata Kuliah: Sistem Digital
 * Referensi: Stephen Brown & Zvonko Vranesic, "Fundamentals of Digital Logic and VHDL Design", 3rd Ed., McGraw-Hill, 2009.
 */


/* ==========================================================================
   SECTION: w7_part1_helpers_svg.js
   ========================================================================== */
/**
 * week7.js - Modul Pembelajaran Pertemuan 7: Decoder, Encoder, dan BCD to 7-Segment
 * Mata Kuliah: Sistem Digital
 * Referensi: Stephen Brown & Zvonko Vranesic, "Fundamentals of Digital Logic and VHDL Design", 3rd Ed., McGraw-Hill, 2009.
 */

/* ───── HELPERS (w7 namespace) ───── */
function w7Section(title, accentOrBody, iconOrNothing, bodyOrNothing) {
  let accentVar = '--accent-cyan';
  let iconSvg = '📌';
  let bodyHTML = accentOrBody;
  if (bodyOrNothing !== undefined) {
    accentVar = accentOrBody;
    iconSvg = iconOrNothing;
    bodyHTML = bodyOrNothing;
  }
  return `
    <div class="card" style="margin-bottom:24px; border-left:3px solid var(${accentVar}); background:rgba(15,23,42,0.4);">
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:16px;">
        <span style="display:inline-flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:8px; background:rgba(0,210,255,0.08); font-size:1.1rem;">${iconSvg}</span>
        <h3 style="margin:0; font-size:1.15rem; font-weight:700; color:var(${accentVar});">${title}</h3>
      </div>
      <div>${bodyHTML}</div>
    </div>`;
}

function w7Code(lines, label) {
  const inner = Array.isArray(lines) ? lines.join('\n') : lines;
  return `<div style="margin:12px 0;">${label ? `<p style="font-size:0.78rem; color:var(--text-faint); font-weight:600; letter-spacing:.06em; text-transform:uppercase; margin-bottom:6px;">${label}</p>` : ''}
    <pre style="font-family:var(--font-mono, monospace); font-size:0.88rem; line-height:1.7; background:rgba(0,0,0,0.35); border:1px solid var(--border-color, rgba(255,255,255,0.1)); border-radius:10px; padding:16px 18px; overflow-x:auto; margin:0;"><code>${inner}</code></pre></div>`;
}

function w7Step(n, titleOrText, maybeDesc) {
  const title = maybeDesc ? `<strong style="color:var(--text-primary); font-size:0.95rem;">${titleOrText}</strong><br>` : '';
  const desc = maybeDesc || titleOrText;
  return `<div style="display:flex; align-items:flex-start; gap:12px; margin:10px 0;">
    <span style="min-width:28px; height:28px; border-radius:50%; background:rgba(0,210,255,0.1); border:1.5px solid var(--accent-cyan); color:var(--accent-cyan); font-size:0.82rem; font-weight:700; display:inline-flex; align-items:center; justify-content:center; margin-top:2px;">${n}</span>
    <div style="font-size:0.92rem; line-height:1.6; color:var(--text-secondary);">${title}${desc}</div></div>`;
}

function w7Alert(type, text) {
  const map = {
    info: ['var(--accent-cyan)', '💡', 'rgba(0,210,255,0.06)'],
    warning: ['var(--accent-amber)', '⚠️', 'rgba(245,158,11,0.06)'],
    success: ['var(--accent-emerald, #10b981)', '✅', 'rgba(16,185,129,0.06)'],
    danger: ['var(--accent-rose, #f43f5e)', '🚨', 'rgba(244,63,94,0.06)']
  };
  const [color, icon, bg] = map[type] || map.info;
  return `<div style="display:flex; gap:12px; align-items:flex-start; background:${bg}; border-left:4px solid ${color}; border-radius:0 8px 8px 0; padding:14px 16px; margin:16px 0; font-size:0.92rem; line-height:1.6; color:var(--text-secondary);">
    <span style="font-size:1.2rem;">${icon}</span><div style="flex:1;">${text}</div></div>`;
}

function w7Table(headers, rows) {
  return `<div style="overflow-x:auto; margin:16px 0;">
    <table style="width:100%; border-collapse:collapse; font-size:0.88rem; background:rgba(15,23,42,0.4); border-radius:8px; overflow:hidden;">
      <thead><tr style="border-bottom:2px solid var(--border-color, rgba(255,255,255,0.1)); background:rgba(255,255,255,0.02);">
        ${headers.map(h => `<th style="padding:10px 14px; text-align:center; color:var(--text-primary); font-weight:600; font-size:0.82rem; letter-spacing:.04em;">${h}</th>`).join('')}
      </tr></thead>
      <tbody>${rows.map((r, i) => `<tr style="border-bottom:1px solid rgba(255,255,255,0.05); ${i % 2 === 0 ? 'background:rgba(255,255,255,0.015);' : ''}">
        ${r.map(c => `<td style="padding:10px 14px; text-align:center; font-family:var(--font-mono, monospace); font-size:0.88rem; color:var(--text-secondary);">${c}</td>`).join('')}
      </tr>`).join('')}</tbody>
    </table></div>`;
}

function w7Spoiler(buttonLabel, contentHTML) {
  const uid = 'w7sp_' + Math.random().toString(36).substr(2, 9);
  return `<div style="margin:16px 0;">
    <button type="button" onclick="(function(){var c=document.getElementById('${uid}');c.hidden=!c.hidden;this.querySelector('.sp-arrow').textContent=c.hidden?'▶':'▼';}).call(this)" style="display:flex; align-items:center; gap:8px; background:rgba(124,58,237,0.12); border:1px solid var(--accent-violet); color:var(--accent-violet); padding:10px 16px; border-radius:8px; cursor:pointer; font-size:0.88rem; font-weight:600; width:100%; text-align:left;">
      <span class="sp-arrow">▶</span> ${buttonLabel}
    </button>
    <div id="${uid}" hidden style="background:rgba(0,0,0,0.3); border:1px solid rgba(124,58,237,0.3); border-radius:0 0 8px 8px; padding:16px 18px; margin-top:-2px;">
      ${contentHTML}
    </div>
  </div>`;
}

/* ───── DIAGRAM SCHEMATIC SVG HELPERS ───── */

/* 1. Combinational vs Sequential Concept Diagram */
function w7SvgCombVsSeq() {
  return `
    <div style="text-align:center;margin:18px 0;background:rgba(15,23,42,0.4);border:1px solid var(--border-color);border-radius:12px;padding:20px;overflow-x:auto">
      <svg width="600" height="200" viewBox="0 0 600 200" style="display:inline-block;min-width:550px;max-width:100%">
        <!-- Combinational Logic Block -->
        <g transform="translate(10, 20)">
          <text x="130" y="15" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent-cyan)">RANGKAIAN KOMBINASIONAL</text>
          <line x1="20" y1="75" x2="60" y2="75" stroke="var(--accent-cyan)" stroke-width="2.5"/>
          <polygon points="60,70 70,75 60,80" fill="var(--accent-cyan)"/>
          <text x="15" y="70" font-size="11" font-weight="700" fill="var(--text-secondary)">Inputs</text>

          <rect x="70" y="45" width="120" height="60" rx="8" fill="rgba(0,210,255,0.1)" stroke="var(--accent-cyan)" stroke-width="2"/>
          <text x="130" y="73" text-anchor="middle" font-size="11" font-weight="700" fill="var(--accent-cyan)">Logika Kombinasi</text>
          <text x="130" y="88" text-anchor="middle" font-size="9" fill="var(--text-muted)">(Tanpa Memori)</text>

          <line x1="190" y1="75" x2="230" y2="75" stroke="var(--accent-cyan)" stroke-width="2.5"/>
          <polygon points="230,70 240,75 230,80" fill="var(--accent-cyan)"/>
          <text x="245" y="79" font-size="11" font-weight="700" fill="var(--accent-cyan)">Outputs</text>
          <text x="130" y="130" text-anchor="middle" font-size="10" fill="var(--text-secondary)">Output = F(Input Saat Ini)</text>
        </g>

        <!-- Divider line -->
        <line x1="285" y1="20" x2="285" y2="180" stroke="rgba(255,255,255,0.1)" stroke-dasharray="4,4"/>

        <!-- Sequential Logic Block -->
        <g transform="translate(310, 20)">
          <text x="140" y="15" text-anchor="middle" font-size="12" font-weight="700" fill="var(--accent-violet)">RANGKAIAN SEKUENSIAL</text>
          <line x1="15" y1="65" x2="55" y2="65" stroke="var(--accent-violet)" stroke-width="2.5"/>
          <polygon points="55,60 65,65 55,70" fill="var(--accent-violet)"/>
          <text x="10" y="60" font-size="11" font-weight="700" fill="var(--text-secondary)">Inputs</text>

          <rect x="65" y="40" width="110" height="50" rx="8" fill="rgba(124,58,237,0.1)" stroke="var(--accent-violet)" stroke-width="2"/>
          <text x="120" y="68" text-anchor="middle" font-size="11" font-weight="700" fill="var(--accent-violet)">Logika Gerbang</text>

          <line x1="175" y1="65" x2="215" y2="65" stroke="var(--accent-violet)" stroke-width="2.5"/>
          <polygon points="215,60 225,65 215,70" fill="var(--accent-violet)"/>
          <text x="230" y="69" font-size="11" font-weight="700" fill="var(--accent-violet)">Outputs</text>

          <!-- Feedback Memory Loop -->
          <line x1="195" y1="65" x2="195" y2="125" stroke="var(--accent-amber)" stroke-width="2"/>
          <line x1="195" y1="125" x2="175" y2="125" stroke="var(--accent-amber)" stroke-width="2"/>
          <polygon points="175,120 165,125 175,130" fill="var(--accent-amber)"/>

          <rect x="75" y="105" width="90" height="40" rx="6" fill="rgba(245,158,11,0.1)" stroke="var(--accent-amber)" stroke-width="1.8"/>
          <text x="120" y="128" text-anchor="middle" font-size="10" font-weight="700" fill="var(--accent-amber)">Memori (Flip-Flop)</text>

          <line x1="75" y1="125" x2="45" y2="125" stroke="var(--accent-amber)" stroke-width="2"/>
          <line x1="45" y1="125" x2="45" y2="75" stroke="var(--accent-amber)" stroke-width="2"/>
          <line x1="45" y1="75" x2="65" y2="75" stroke="var(--accent-amber)" stroke-width="2"/>
          <polygon points="65,70 75,75 65,80" fill="var(--accent-amber)"/>
          <text x="140" y="168" text-anchor="middle" font-size="10" fill="var(--text-secondary)">Output = F(Input, State Sebelumnya)</text>
        </g>
      </svg>
      <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 7.1: Perbandingan Struktural Rangkaian Kombinasional vs Sekuensial</p>
    </div>`;
}

/* 2. Decoder 1-to-2 Gate Diagram */
function w7SvgDec1to2() {
  return `
    <div style="text-align:center;margin:18px 0;background:rgba(15,23,42,0.4);border:1px solid var(--border-color);border-radius:12px;padding:20px;overflow-x:auto">
      <svg width="420" height="150" viewBox="0 0 420 150" style="display:inline-block;min-width:380px;max-width:100%">
        <!-- Input A -->
        <text x="25" y="65" font-size="13" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-mono)">A</text>
        <line x1="45" y1="60" x2="80" y2="60" stroke="var(--accent-cyan)" stroke-width="2.5"/>
        <circle cx="80" cy="60" r="3.5" fill="var(--accent-cyan)"/>

        <!-- Branch to Inverter (Y0) -->
        <line x1="80" y1="60" x2="80" y2="35" stroke="var(--accent-cyan)" stroke-width="2"/>
        <line x1="80" y1="35" x2="120" y2="35" stroke="var(--accent-cyan)" stroke-width="2"/>
        <!-- NOT Gate Symbol -->
        <polygon points="120,20 150,35 120,50" fill="rgba(0,210,255,0.12)" stroke="var(--accent-cyan)" stroke-width="2"/>
        <circle cx="154" cy="35" r="3.5" fill="rgba(15,23,42,1)" stroke="var(--accent-cyan)" stroke-width="2"/>
        <line x1="158" y1="35" x2="230" y2="35" stroke="var(--accent-cyan)" stroke-width="2.5"/>
        <circle cx="230" cy="35" r="3.5" fill="var(--accent-cyan)"/>
        <text x="240" y="40" font-size="12" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-mono)">Y₀ = A'</text>

        <!-- Branch directly to Y1 -->
        <line x1="80" y1="60" x2="80" y2="95" stroke="var(--accent-cyan)" stroke-width="2"/>
        <line x1="80" y1="95" x2="230" y2="95" stroke="var(--accent-cyan)" stroke-width="2.5"/>
        <circle cx="230" cy="95" r="3.5" fill="var(--accent-cyan)"/>
        <text x="240" y="100" font-size="12" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-mono)">Y₁ = A</text>

        <!-- Block representation on the right -->
        <g transform="translate(305, 15)">
          <rect x="0" y="0" width="85" height="110" rx="8" fill="rgba(0,210,255,0.06)" stroke="var(--accent-cyan)" stroke-width="2"/>
          <text x="42" y="55" text-anchor="middle" font-size="10" font-weight="700" fill="var(--accent-cyan)">Decoder</text>
          <text x="42" y="70" text-anchor="middle" font-size="11" font-weight="800" fill="var(--text-primary)">1:2</text>
          <line x1="-15" y1="55" x2="0" y2="55" stroke="var(--accent-cyan)" stroke-width="2"/>
          <text x="-25" y="59" font-size="10" font-weight="700" fill="var(--accent-cyan)">A</text>
          <line x1="85" y1="35" x2="100" y2="35" stroke="var(--accent-cyan)" stroke-width="2"/>
          <text x="105" y="39" font-size="10" font-weight="700" fill="var(--accent-cyan)">Y₀</text>
          <line x1="85" y1="80" x2="100" y2="80" stroke="var(--accent-cyan)" stroke-width="2"/>
          <text x="105" y="84" font-size="10" font-weight="700" fill="var(--accent-cyan)">Y₁</text>
        </g>
      </svg>
      <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 7.2: Rangkaian Logika Gerbang dan Simbol Blok Decoder 1-to-2</p>
    </div>`;
}

/* 3. Decoder 2-to-4 Gate Diagram */
function w7SvgDec2to4() {
  return `
    <div style="text-align:center;margin:18px 0;background:rgba(15,23,42,0.4);border:1px solid var(--border-color);border-radius:12px;padding:20px;overflow-x:auto">
      <svg width="560" height="260" viewBox="0 0 560 260" style="display:inline-block;min-width:520px;max-width:100%">
        <!-- Input rails: A, A', B, B' -->
        <text x="35" y="25" font-size="12" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-mono)">A</text>
        <line x1="40" y1="35" x2="40" y2="245" stroke="var(--accent-cyan)" stroke-width="2"/>

        <!-- Inverter A -->
        <circle cx="40" cy="50" r="3" fill="var(--accent-cyan)"/>
        <line x1="40" y1="50" x2="60" y2="50" stroke="var(--accent-cyan)" stroke-width="1.5"/>
        <polygon points="60,42 75,50 60,58" fill="rgba(0,210,255,0.15)" stroke="var(--accent-cyan)" stroke-width="1.5"/>
        <circle cx="78" cy="50" r="2.5" fill="rgba(15,23,42,1)" stroke="var(--accent-cyan)" stroke-width="1.5"/>
        <line x1="81" y1="50" x2="100" y2="50" stroke="var(--accent-cyan)" stroke-width="1.5"/>
        <line x1="100" y1="50" x2="100" y2="245" stroke="rgba(0,210,255,0.7)" stroke-width="1.8" stroke-dasharray="3,3"/>
        <text x="95" y="25" font-size="11" font-weight="700" fill="rgba(0,210,255,0.7)" font-family="var(--font-mono)">A'</text>

        <!-- Input B -->
        <text x="145" y="25" font-size="12" font-weight="800" fill="var(--accent-violet)" font-family="var(--font-mono)">B</text>
        <line x1="150" y1="35" x2="150" y2="245" stroke="var(--accent-violet)" stroke-width="2"/>

        <!-- Inverter B -->
        <circle cx="150" cy="50" r="3" fill="var(--accent-violet)"/>
        <line x1="150" y1="50" x2="170" y2="50" stroke="var(--accent-violet)" stroke-width="1.5"/>
        <polygon points="170,42 185,50 170,58" fill="rgba(124,58,237,0.15)" stroke="var(--accent-violet)" stroke-width="1.5"/>
        <circle cx="188" cy="50" r="2.5" fill="rgba(15,23,42,1)" stroke="var(--accent-violet)" stroke-width="1.5"/>
        <line x1="191" y1="50" x2="210" y2="50" stroke="var(--accent-violet)" stroke-width="1.5"/>
        <line x1="210" y1="50" x2="210" y2="245" stroke="rgba(124,58,237,0.7)" stroke-width="1.8" stroke-dasharray="3,3"/>
        <text x="205" y="25" font-size="11" font-weight="700" fill="rgba(124,58,237,0.7)" font-family="var(--font-mono)">B'</text>

        <!-- AND Gate 0 (Y0 = A'B') -->
        <g transform="translate(260, 60)">
          <path d="M 0 0 L 25 0 A 18 18 0 0 1 25 36 L 0 36 Z" fill="rgba(0,210,255,0.08)" stroke="var(--accent-cyan)" stroke-width="2"/>
          <line x1="-160" y1="10" x2="0" y2="10" stroke="var(--accent-cyan)" stroke-width="1.5"/>
          <line x1="-50" y1="26" x2="0" y2="26" stroke="var(--accent-violet)" stroke-width="1.5"/>
          <line x1="43" y1="18" x2="90" y2="18" stroke="var(--accent-cyan)" stroke-width="2"/>
          <circle cx="90" cy="18" r="3" fill="var(--accent-cyan)"/>
          <text x="100" y="22" font-size="11" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-mono)">Y₀ = A'B'</text>
        </g>
        <!-- AND Gate 0 Dots -->
        <circle cx="100" cy="70" r="3" fill="var(--accent-cyan)"/>
        <circle cx="210" cy="86" r="3" fill="var(--accent-violet)"/>

        <!-- AND Gate 1 (Y1 = A'B) -->
        <g transform="translate(260, 110)">
          <path d="M 0 0 L 25 0 A 18 18 0 0 1 25 36 L 0 36 Z" fill="rgba(0,210,255,0.08)" stroke="var(--accent-cyan)" stroke-width="2"/>
          <line x1="-160" y1="10" x2="0" y2="10" stroke="var(--accent-cyan)" stroke-width="1.5"/>
          <line x1="-110" y1="26" x2="0" y2="26" stroke="var(--accent-violet)" stroke-width="1.5"/>
          <line x1="43" y1="18" x2="90" y2="18" stroke="var(--accent-cyan)" stroke-width="2"/>
          <circle cx="90" cy="18" r="3" fill="var(--accent-cyan)"/>
          <text x="100" y="22" font-size="11" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-mono)">Y₁ = A'B</text>
        </g>
        <circle cx="100" cy="120" r="3" fill="var(--accent-cyan)"/>
        <circle cx="150" cy="136" r="3" fill="var(--accent-violet)"/>

        <!-- AND Gate 2 (Y2 = AB') -->
        <g transform="translate(260, 160)">
          <path d="M 0 0 L 25 0 A 18 18 0 0 1 25 36 L 0 36 Z" fill="rgba(0,210,255,0.08)" stroke="var(--accent-cyan)" stroke-width="2"/>
          <line x1="-220" y1="10" x2="0" y2="10" stroke="var(--accent-cyan)" stroke-width="1.5"/>
          <line x1="-50" y1="26" x2="0" y2="26" stroke="var(--accent-violet)" stroke-width="1.5"/>
          <line x1="43" y1="18" x2="90" y2="18" stroke="var(--accent-cyan)" stroke-width="2"/>
          <circle cx="90" cy="18" r="3" fill="var(--accent-cyan)"/>
          <text x="100" y="22" font-size="11" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-mono)">Y₂ = AB'</text>
        </g>
        <circle cx="40" cy="170" r="3" fill="var(--accent-cyan)"/>
        <circle cx="210" cy="186" r="3" fill="var(--accent-violet)"/>

        <!-- AND Gate 3 (Y3 = AB) -->
        <g transform="translate(260, 210)">
          <path d="M 0 0 L 25 0 A 18 18 0 0 1 25 36 L 0 36 Z" fill="rgba(0,210,255,0.08)" stroke="var(--accent-cyan)" stroke-width="2"/>
          <line x1="-220" y1="10" x2="0" y2="10" stroke="var(--accent-cyan)" stroke-width="1.5"/>
          <line x1="-110" y1="26" x2="0" y2="26" stroke="var(--accent-violet)" stroke-width="1.5"/>
          <line x1="43" y1="18" x2="90" y2="18" stroke="var(--accent-cyan)" stroke-width="2"/>
          <circle cx="90" cy="18" r="3" fill="var(--accent-cyan)"/>
          <text x="100" y="22" font-size="11" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-mono)">Y₃ = AB</text>
        </g>
        <circle cx="40" cy="220" r="3" fill="var(--accent-cyan)"/>
        <circle cx="150" cy="236" r="3" fill="var(--accent-violet)"/>

        <!-- Block Symbol on Far Right -->
        <g transform="translate(450, 65)">
          <rect x="0" y="0" width="85" height="150" rx="8" fill="rgba(0,210,255,0.06)" stroke="var(--accent-cyan)" stroke-width="2"/>
          <text x="42" y="70" text-anchor="middle" font-size="10" font-weight="700" fill="var(--accent-cyan)">Decoder</text>
          <text x="42" y="88" text-anchor="middle" font-size="12" font-weight="800" fill="var(--text-primary)">2:4</text>
          <line x1="-15" y1="50" x2="0" y2="50" stroke="var(--accent-cyan)" stroke-width="2"/>
          <text x="-25" y="54" font-size="10" font-weight="700" fill="var(--accent-cyan)">A</text>
          <line x1="-15" y1="100" x2="0" y2="100" stroke="var(--accent-violet)" stroke-width="2"/>
          <text x="-25" y="104" font-size="10" font-weight="700" fill="var(--accent-violet)">B</text>
          <line x1="85" y1="25" x2="100" y2="25" stroke="var(--accent-cyan)" stroke-width="1.5"/>
          <line x1="85" y1="60" x2="100" y2="60" stroke="var(--accent-cyan)" stroke-width="1.5"/>
          <line x1="85" y1="95" x2="100" y2="95" stroke="var(--accent-cyan)" stroke-width="1.5"/>
          <line x1="85" y1="130" x2="100" y2="130" stroke="var(--accent-cyan)" stroke-width="1.5"/>
        </g>
      </svg>
      <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 7.3: Rangkaian Gerbang Logika Internal dan Diagram Blok Decoder 2-to-4 Aktif-HIGH</p>
    </div>`;
}

/* 4. Decoder 3-to-8 Block Diagram & Internal Structure */
function w7SvgDec3to8() {
  return `
    <div style="text-align:center;margin:18px 0;background:rgba(15,23,42,0.4);border:1px solid var(--border-color);border-radius:12px;padding:20px;overflow-x:auto">
      <svg width="580" height="260" viewBox="0 0 580 260" style="display:inline-block;min-width:520px;max-width:100%">
        <!-- Decoder 3:8 Block -->
        <g transform="translate(180, 20)">
          <rect x="0" y="0" width="160" height="220" rx="10" fill="rgba(124,58,237,0.08)" stroke="var(--accent-violet)" stroke-width="2"/>
          <text x="80" y="105" text-anchor="middle" font-size="13" font-weight="700" fill="var(--accent-violet)">DECODER</text>
          <text x="80" y="125" text-anchor="middle" font-size="15" font-weight="800" fill="var(--text-primary)">3 : 8</text>
          <text x="80" y="142" text-anchor="middle" font-size="9" fill="var(--text-muted)">(Aktif HIGH)</text>

          <!-- Enable pin on top -->
          <line x1="80" y1="-20" x2="80" y2="0" stroke="var(--accent-amber)" stroke-width="2"/>
          <circle cx="80" cy="-20" r="3.5" fill="var(--accent-amber)"/>
          <text x="80" y="-25" text-anchor="middle" font-size="10" font-weight="700" fill="var(--accent-amber)">E (Enable)</text>
        </g>

        <!-- 3 Inputs A2, A1, A0 on Left -->
        <g transform="translate(80, 60)">
          <line x1="0" y1="20" x2="100" y2="20" stroke="var(--accent-cyan)" stroke-width="2"/>
          <circle cx="0" cy="20" r="3.5" fill="var(--accent-cyan)"/>
          <text x="-10" y="24" text-anchor="end" font-size="11" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-mono)">A₂ (MSB)</text>

          <line x1="0" y1="70" x2="100" y2="70" stroke="var(--accent-cyan)" stroke-width="2"/>
          <circle cx="0" cy="70" r="3.5" fill="var(--accent-cyan)"/>
          <text x="-10" y="74" text-anchor="end" font-size="11" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-mono)">A₁</text>

          <line x1="0" y1="120" x2="100" y2="120" stroke="var(--accent-cyan)" stroke-width="2"/>
          <circle cx="0" cy="120" r="3.5" fill="var(--accent-cyan)"/>
          <text x="-10" y="124" text-anchor="end" font-size="11" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-mono)">A₀ (LSB)</text>
        </g>

        <!-- 8 Outputs Y0-Y7 on Right -->
        <g transform="translate(340, 25)">
          ${[0,1,2,3,4,5,6,7].map(i => `
            <line x1="0" y1="${15 + i * 26}" x2="80" y2="${15 + i * 26}" stroke="${i === 5 ? 'var(--accent-cyan)' : 'var(--accent-violet)'}" stroke-width="${i === 5 ? '2.5' : '1.8'}"/>
            <circle cx="80" cy="${15 + i * 26}" r="${i === 5 ? '4' : '3'}" fill="${i === 5 ? 'var(--accent-cyan)' : 'var(--accent-violet)'}"/>
            <text x="90" y="${19 + i * 26}" font-size="10.5" font-weight="${i === 5 ? '800' : '600'}" fill="${i === 5 ? 'var(--accent-cyan)' : 'var(--text-secondary)'}" font-family="var(--font-mono)">
              Y${i} ${i === 5 ? '← (101₂ AKTIF)' : ''}
            </text>
          `).join('')}
        </g>
      </svg>
      <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 7.4: Diagram Blok Arsitektur Decoder 3-to-8 dengan Enable Pin</p>
    </div>`;
}

/* 5. Encoder 4-to-2 Gate Diagram */
function w7SvgEnc4to2() {
  return `
    <div style="text-align:center;margin:18px 0;background:rgba(15,23,42,0.4);border:1px solid var(--border-color);border-radius:12px;padding:20px;overflow-x:auto">
      <svg width="520" height="220" viewBox="0 0 520 220" style="display:inline-block;min-width:480px;max-width:100%">
        <!-- 4 Input Lines (Horizontal) -->
        <g transform="translate(20, 20)">
          <text x="10" y="24" font-size="11" font-weight="700" fill="var(--text-muted)" font-family="var(--font-mono)">D₀</text>
          <line x1="35" y1="20" x2="160" y2="20" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-dasharray="3,3"/>
          <text x="170" y="24" font-size="9" fill="var(--text-muted)">(Tidak terhubung ke gerbang OR: 00)</text>

          <text x="10" y="64" font-size="11" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-mono)">D₁</text>
          <line x1="35" y1="60" x2="260" y2="60" stroke="var(--accent-cyan)" stroke-width="2"/>

          <text x="10" y="104" font-size="11" font-weight="800" fill="var(--accent-violet)" font-family="var(--font-mono)">D₂</text>
          <line x1="35" y1="100" x2="260" y2="100" stroke="var(--accent-violet)" stroke-width="2"/>

          <text x="10" y="144" font-size="11" font-weight="800" fill="var(--accent-amber)" font-family="var(--font-mono)">D₃</text>
          <line x1="35" y1="140" x2="260" y2="140" stroke="var(--accent-amber)" stroke-width="2"/>
        </g>

        <!-- Tap Connections to OR Gates -->
        <!-- OR Gate 1 for A1 = D2 + D3 -->
        <g transform="translate(280, 50)">
          <!-- OR Symbol -->
          <path d="M 0 0 C 10 12, 10 28, 0 40 C 25 40, 45 28, 55 20 C 45 12, 25 0, 0 0 Z" fill="rgba(124,58,237,0.12)" stroke="var(--accent-violet)" stroke-width="2"/>
          <line x1="-125" y1="10" x2="0" y2="10" stroke="var(--accent-violet)" stroke-width="2"/>
          <line x1="-85" y1="30" x2="0" y2="30" stroke="var(--accent-amber)" stroke-width="2"/>
          <line x1="55" y1="20" x2="110" y2="20" stroke="var(--accent-violet)" stroke-width="2.5"/>
          <circle cx="110" cy="20" r="3.5" fill="var(--accent-violet)"/>
          <text x="120" y="24" font-size="12" font-weight="800" fill="var(--accent-violet)" font-family="var(--font-mono)">A₁ = D₂ + D₃</text>
        </g>
        <circle cx="155" cy="120" r="3" fill="var(--accent-violet)"/>
        <circle cx="195" cy="160" r="3" fill="var(--accent-amber)"/>

        <!-- OR Gate 0 for A0 = D1 + D3 -->
        <g transform="translate(280, 130)">
          <path d="M 0 0 C 10 12, 10 28, 0 40 C 25 40, 45 28, 55 20 C 45 12, 25 0, 0 0 Z" fill="rgba(0,210,255,0.12)" stroke="var(--accent-cyan)" stroke-width="2"/>
          <line x1="-165" y1="10" x2="0" y2="10" stroke="var(--accent-cyan)" stroke-width="2"/>
          <line x1="-45" y1="30" x2="0" y2="30" stroke="var(--accent-amber)" stroke-width="2"/>
          <line x1="55" y1="20" x2="110" y2="20" stroke="var(--accent-cyan)" stroke-width="2.5"/>
          <circle cx="110" cy="20" r="3.5" fill="var(--accent-cyan)"/>
          <text x="120" y="24" font-size="12" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-mono)">A₀ = D₁ + D₃</text>
        </g>
        <circle cx="115" cy="80" r="3" fill="var(--accent-cyan)"/>
        <circle cx="235" cy="160" r="3" fill="var(--accent-amber)"/>
      </svg>
      <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 7.5: Implementasi Gerbang OR pada Encoder 4-to-2</p>
    </div>`;
}

/* 6. Seven-Segment Anatomy & Segment Layout */
function w7SvgSevenSegAnatomy() {
  return `
    <div style="text-align:center;margin:18px 0;background:rgba(15,23,42,0.4);border:1px solid var(--border-color);border-radius:12px;padding:20px;overflow-x:auto">
      <svg width="440" height="250" viewBox="0 0 440 250" style="display:inline-block;min-width:380px;max-width:100%">
        <!-- Seven Segment Graphic in Center -->
        <g transform="translate(140, 25)">
          <!-- Segment A (top horizontal) -->
          <polygon points="20,10 80,10 70,22 30,22" fill="var(--accent-cyan)" stroke="rgba(0,0,0,0.5)" stroke-width="1.5"/>
          <text x="50" y="6" text-anchor="middle" font-size="13" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-mono)">a</text>

          <!-- Segment B (top right) -->
          <polygon points="82,12 92,20 86,75 76,68" fill="var(--accent-cyan)" stroke="rgba(0,0,0,0.5)" stroke-width="1.5"/>
          <text x="105" y="48" font-size="13" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-mono)">b</text>

          <!-- Segment C (bottom right) -->
          <polygon points="85,82 91,88 84,142 74,134" fill="var(--accent-cyan)" stroke="rgba(0,0,0,0.5)" stroke-width="1.5"/>
          <text x="105" y="115" font-size="13" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-mono)">c</text>

          <!-- Segment D (bottom horizontal) -->
          <polygon points="18,144 80,144 70,132 28,132" fill="var(--accent-cyan)" stroke="rgba(0,0,0,0.5)" stroke-width="1.5"/>
          <text x="50" y="162" text-anchor="middle" font-size="13" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-mono)">d</text>

          <!-- Segment E (bottom left) -->
          <polygon points="16,82 26,88 20,134 10,142" fill="var(--accent-cyan)" stroke="rgba(0,0,0,0.5)" stroke-width="1.5"/>
          <text x="-5" y="115" font-size="13" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-mono)">e</text>

          <!-- Segment F (top left) -->
          <polygon points="18,12 28,20 22,68 12,75" fill="var(--accent-cyan)" stroke="rgba(0,0,0,0.5)" stroke-width="1.5"/>
          <text x="-5" y="48" font-size="13" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-mono)">f</text>

          <!-- Segment G (middle horizontal) -->
          <polygon points="22,76 30,70 70,70 78,76 70,82 30,82" fill="var(--accent-cyan)" stroke="rgba(0,0,0,0.5)" stroke-width="1.5"/>
          <text x="50" y="96" text-anchor="middle" font-size="13" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-mono)">g</text>

          <!-- Decimal Point (DP) -->
          <circle cx="106" cy="144" r="7" fill="var(--accent-rose)"/>
          <text x="120" y="148" font-size="12" font-weight="800" fill="var(--accent-rose)" font-family="var(--font-mono)">dp</text>
        </g>

        <!-- Explanatory Callouts -->
        <g transform="translate(10, 190)">
          <rect x="0" y="0" width="420" height="40" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)"/>
          <text x="210" y="24" text-anchor="middle" font-size="10.5" fill="var(--text-secondary)">
            7 LED Segmen Utama (a, b, c, d, e, f, g) + 1 Titik Desimal Tambahan (dp)
          </text>
        </g>
      </svg>
      <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 7.6: Tata Letak dan Standar Penamaan Segmen pada Seven-Segment Display</p>
    </div>`;
}

/* 7. BCD to 7-Segment Decoder Block Diagram */
function w7SvgBcdBlock() {
  return `
    <div style="text-align:center;margin:18px 0;background:rgba(15,23,42,0.4);border:1px solid var(--border-color);border-radius:12px;padding:20px;overflow-x:auto">
      <svg width="580" height="220" viewBox="0 0 580 220" style="display:inline-block;min-width:520px;max-width:100%">
        <!-- 4 BCD Inputs -->
        <g transform="translate(40, 45)">
          <text x="0" y="15" font-size="11" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-mono)">A (8)</text>
          <line x1="45" y1="10" x2="110" y2="10" stroke="var(--accent-cyan)" stroke-width="2"/>

          <text x="0" y="45" font-size="11" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-mono)">B (4)</text>
          <line x1="45" y1="40" x2="110" y2="40" stroke="var(--accent-cyan)" stroke-width="2"/>

          <text x="0" y="75" font-size="11" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-mono)">C (2)</text>
          <line x1="45" y1="70" x2="110" y2="70" stroke="var(--accent-cyan)" stroke-width="2"/>

          <text x="0" y="105" font-size="11" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-mono)">D (1)</text>
          <line x1="45" y1="100" x2="110" y2="100" stroke="var(--accent-cyan)" stroke-width="2"/>
        </g>

        <!-- Decoder IC / Block -->
        <g transform="translate(150, 30)">
          <rect x="0" y="0" width="160" height="150" rx="10" fill="rgba(0,210,255,0.06)" stroke="var(--accent-cyan)" stroke-width="2"/>
          <text x="80" y="55" text-anchor="middle" font-size="11" font-weight="700" fill="var(--accent-cyan)">BCD to 7-SEG</text>
          <text x="80" y="75" text-anchor="middle" font-size="13" font-weight="800" fill="var(--text-primary)">DECODER</text>
          <text x="80" y="95" text-anchor="middle" font-size="9.5" fill="var(--text-muted)">(Misal: IC 7447 / 7448)</text>
        </g>

        <!-- 7 Bus Lines (a-g) -->
        <g transform="translate(310, 30)">
          ${['a','b','c','d','e','f','g'].map((seg, idx) => `
            <line x1="0" y1="${15 + idx * 19}" x2="80" y2="${15 + idx * 19}" stroke="var(--accent-emerald)" stroke-width="1.8"/>
            <text x="40" y="${12 + idx * 19}" text-anchor="middle" font-size="9" font-weight="700" fill="var(--accent-emerald)">${seg}</text>
          `).join('')}
        </g>

        <!-- 7-Segment Physical Display -->
        <g transform="translate(390, 25)">
          <rect x="0" y="0" width="110" height="160" rx="8" fill="rgba(0,0,0,0.6)" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
          <text x="55" y="145" text-anchor="middle" font-size="9" fill="var(--text-muted)">Display</text>

          <!-- Lit digit "8" or outline -->
          <g transform="translate(35, 20) scale(0.65)">
            <polygon points="10,0 40,0 35,6 15,6" fill="var(--accent-cyan)"/>
            <polygon points="41,2 45,6 42,32 37,28" fill="var(--accent-cyan)"/>
            <polygon points="41,36 45,40 42,66 37,62" fill="var(--accent-cyan)"/>
            <polygon points="10,68 40,68 35,62 15,62" fill="var(--accent-cyan)"/>
            <polygon points="9,36 13,40 10,66 5,62" fill="var(--accent-cyan)"/>
            <polygon points="9,2 13,6 10,32 5,28" fill="var(--accent-cyan)"/>
            <polygon points="12,34 38,34 34,37 16,37" fill="var(--accent-cyan)"/>
          </g>
        </g>
      </svg>
      <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 7.7: Diagram Alir Sistem BCD to 7-Segment Decoder Menggerakkan Display</p>
    </div>`;
}


/* ==========================================================================
   SECTION: w7_part2_intro_combinational.js
   ========================================================================== */
// Part 2: Week 7 Intro & Review Rangkaian Kombinasional
function renderWeek7Intro(el) {
  const _html_ = `
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" onclick="navigateTo('home')">Home</a> / 
        <a href="#" onclick="selectWeek(7)">Minggu 7</a> / 
        Pendahuluan & CPMK
      </div>
      <h1 class="content-title">Pertemuan 7 — Decoder, Encoder, dan BCD to 7-Segment</h1>
      <p class="content-subtitle">Pengenalan sirkuit konversi data, prioritas pengkodean biner, dan antarmuka visual seven-segment display</p>
    </div>

    ${w7Alert('info', '<strong>Identitas Mata Kuliah & Referensi Akademik:</strong><br>' +
      'Mata Kuliah: <strong>Sistem Digital</strong> | Pertemuan: <strong>7 (Minggu VII)</strong><br>' +
      'Buku Rujukan Utama: <em>Stephen Brown & Zvonko Vranesic, "Fundamentals of Digital Logic and VHDL Design", 3rd Edition, McGraw-Hill, 2009 (Chapter 4: Combinational-Circuit Building Blocks).</em>'
    )}

    ${w7Section('Tujuan Pembelajaran (Learning Outcomes / CPMK)', `
      <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1.5rem;">
        Pada pertemuan ini, mahasiswa mempelajari tiga pilar vital konversi data biner dalam perancangan sistem digital modern: 
        <strong>Decoder</strong> (pengurai alamat biner), <strong>Encoder & Priority Encoder</strong> (pengkode jalur aktif ke biner), serta 
        <strong>Driver BCD to 7-Segment</strong> (penerjemah angka desimal terkemas menuju display visual numerik).
      </p>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.25rem;">
        <div class="card" style="border-left:4px solid var(--accent-cyan); background:rgba(0,210,255,0.03);">
          <div style="font-size:1.5rem; margin-bottom:0.5rem;">🔍</div>
          <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">1 & 2. Konsep & Desain Decoder</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.6;">
            Mahasiswa mampu menjelaskan konsep kerja decoder $n \\to 2^n$, merancang decoder 1:2, 2:4, dan 3:8 aktif-HIGH/LOW, serta mengintegrasikan sinyal Enable.
          </p>
        </div>

        <div class="card" style="border-left:4px solid var(--accent-violet); background:rgba(124,58,237,0.03);">
          <div style="font-size:1.5rem; margin-bottom:0.5rem;">⌨️</div>
          <h4 style="color:var(--accent-violet); margin-bottom:0.5rem;">3 & 4. Encoder & Priority Encoder</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.6;">
            Mahasiswa mampu menjelaskan prinsip kerja encoder biner, menganalisis priority encoder untuk mengatasi multi-input aktif, serta membedakan fungsi encoder vs decoder secara tegas.
          </p>
        </div>

        <div class="card" style="border-left:4px solid var(--accent-amber); background:rgba(245,158,11,0.03);">
          <div style="font-size:1.5rem; margin-bottom:0.5rem;">🔢</div>
          <h4 style="color:var(--accent-amber); margin-bottom:0.5rem;">5. Kode BCD 8421</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.6;">
            Mahasiswa memahami sistem bilangan Binary Coded Decimal (bobot 8-4-2-1), mengodekan digit desimal 0–9, serta mengidentifikasi kondisi kombinasi terlarang (invalid BCD 10–15).
          </p>
        </div>

        <div class="card" style="border-left:4px solid var(--accent-emerald); background:rgba(16,185,129,0.03);">
          <div style="font-size:1.5rem; margin-bottom:0.5rem;">💡</div>
          <h4 style="color:var(--accent-emerald); margin-bottom:0.5rem;">6, 7 & 8. BCD to 7-Segment Display</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.6;">
            Mahasiswa mampu membedakan display Common Anode vs Common Cathode, menganalisis tabel kebenaran segmen $a$–$g$, serta memverifikasi pola visual angka yang dihasilkan.
          </p>
        </div>
      </div>
    `)}

    ${w7Section('1. Review Rangkaian Kombinasional vs Sekuensial', `
      <p style="color:var(--text-secondary); line-height:1.7; margin-bottom:1rem;">
        Dalam arsitektur perangkat keras komputer, sistem digital dibagi menjadi dua kategori fundamental:
        <strong>Rangkaian Kombinasional</strong> dan <strong>Rangkaian Sekuensial</strong>.
      </p>

      <div style="margin:1.25rem 0; padding:1.25rem; background:rgba(0,0,0,0.25); border-radius:12px; border:1px solid var(--border-color);">
        ${w7SvgCombVsSeq()}
      </div>

      <div class="card" style="margin:1.5rem 0; background:rgba(0,210,255,0.03); border:1px solid rgba(0,210,255,0.2);">
        <h4 style="color:var(--accent-cyan); margin-bottom:0.75rem;">Definisi Rangkaian Kombinasional:</h4>
        <p style="color:var(--text-secondary); font-size:0.92rem; line-height:1.7;">
          Rangkaian kombinasional adalah rangkaian logika di mana nilai logika keluaran (output) pada setiap saat 
          <strong>hanya bergantung secara langsung pada kombinasi nilai masukan (input) saat itu juga</strong>. 
          Rangkaian ini <em>tidak memiliki memori internal</em> dan <em>tidak memiliki jalur umpan balik (feedback loop)</em>. 
          Jika input berubah, output akan langsung berubah setelah melewati jeda tunda propagasi gerbang (gate propagation delay).
        </p>
      </div>

      <h4 style="color:var(--text-primary); margin:1.5rem 0 0.75rem 0;">Tabel Perbandingan Rangkaian Kombinasional vs Sekuensial</h4>
      ${w7Table(['Aspek Karakteristik', 'Rangkaian Kombinasional', 'Rangkaian Sekuensial'], [
        [
          '<strong>Memori Internal</strong>',
          '<span style="color:var(--accent-rose); font-weight:bold;">Tidak memiliki memori</span> (memoryless)',
          '<span style="color:var(--accent-emerald); font-weight:bold;">Memiliki elemen penyimpan state</span> (Flip-Flop / Latch)'
        ],
        [
          '<strong>Penentu Nilai Output</strong>',
          'Murni ditentukan oleh <strong>input saat ini</strong> ($Y = f(X)$)',
          'Ditentukan oleh <strong>input saat ini DAN state masa lalu</strong> ($Y = f(X, Q)$)'
        ],
        [
          '<strong>Sinyal Clock (Pewaktu)</strong>',
          'Tidak membutuhkan clock (asinkron alami)',
          'Umumnya tersinkronisasi oleh sinyal Clock periodik'
        ],
        [
          '<strong>Jalur Umpan Balik (Feedback)</strong>',
          'Tidak ada jalur feedback dari output ke input',
          'Terdapat loop umpan balik dari memori ke logika gerbang'
        ],
        [
          '<strong>Contoh Rangkaian Nyata</strong>',
          '<strong>Decoder, Encoder, Multiplexer (MUX), Demultiplexer (DEMUX), Half/Full Adder</strong>',
          '<strong>Register, Counter, Shift Register, Memory RAM, Finite State Machine (FSM)</strong>'
        ]
      ])}
    `)}
  `;
  if (el) el.innerHTML = _html_;
  return _html_;
}


/* ==========================================================================
   SECTION: w7_part3_decoder_basics.js
   ========================================================================== */
// Part 3: Decoder Concepts, Decoder 1:2, and Decoder 2:4 (with & without Enable)
function renderWeek7DecoderBasics(el) {
  const _html_ = `
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" onclick="navigateTo('home')">Home</a> / 
        <a href="#" onclick="selectWeek(7)">Minggu 7</a> / 
        Dasar Decoder
      </div>
      <h1 class="content-title">Prinsip Kerja Decoder & Decoder 1:2, 2:4</h1>
      <p class="content-subtitle">Pengurai kode biner menjadi sinyal pemilihan tunggal (One-Hot Active Output)</p>
    </div>

    ${w7Alert('info', '<strong>Apa itu Decoder?</strong><br>' +
      'Decoder (pengurai sandi) adalah rangkaian logika kombinasional yang mengubah kode biner masukan sebanyak <strong>n bit</strong> menjadi maksimal <strong>2ⁿ jalur keluaran</strong> yang unik. Pada decoder standar aktif-HIGH, tepat <strong>hanya satu jalur output</strong> yang bernilai logika 1 (aktif) untuk setiap kombinasi biner input yang diberikan.'
    )}

    ${w7Section('1. Konsep Dasar dan Rumus Kapasitas Decoder', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        Decoder mendeteksi keberadaan kode biner tertentu di terminal inputnya. Sinyal output yang dihasilkan bertindak sebagai <em>jalur seleksi</em> yang menandai minterm yang sedang aktif.
      </p>

      <div class="card" style="margin:1.25rem 0; background:rgba(0,210,255,0.04); border:1px solid rgba(0,210,255,0.2);">
        <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Formula Relasi Input-Output Decoder:</h4>
        <p style="color:var(--text-secondary); font-size:0.95rem; line-height:1.6;">
          Jika sebuah decoder memiliki sejumlah <strong>$n$ jalur input biner</strong>, maka jumlah kemungkinan jalur output yang dapat dikontrol adalah:
        </p>
        <div style="font-family:'Fira Code', monospace; font-size:1.15rem; color:var(--accent-cyan); margin-top:0.5rem; text-align:center;">
          Jumlah Output (M) = 2<sup>n</sup> (di mana n = jumlah bit input)
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1rem; margin-top:1.25rem;">
        <div class="card">
          <strong style="color:var(--accent-cyan);">Decoder 1-to-2</strong>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.35rem; line-height:1.5;">
            Input: 1 bit ($n=1$) &rarr; Output: $2^1 = 2$ jalur ($Y_0, Y_1$).
          </p>
        </div>
        <div class="card">
          <strong style="color:var(--accent-violet);">Decoder 2-to-4</strong>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.35rem; line-height:1.5;">
            Input: 2 bit ($n=2$) &rarr; Output: $2^2 = 4$ jalur ($Y_0 - Y_3$).
          </p>
        </div>
        <div class="card">
          <strong style="color:var(--accent-amber);">Decoder 3-to-8</strong>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.35rem; line-height:1.5;">
            Input: 3 bit ($n=3$) &rarr; Output: $2^3 = 8$ jalur ($Y_0 - Y_7$).
          </p>
        </div>
        <div class="card">
          <strong style="color:var(--accent-emerald);">Decoder 4-to-16</strong>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.35rem; line-height:1.5;">
            Input: 4 bit ($n=4$) &rarr; Output: $2^4 = 16$ jalur ($Y_0 - Y_{15}$).
          </p>
        </div>
      </div>
    `)}

    ${w7Section('2. Decoder 1-to-2 (1-to-2 Decoder)', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        Decoder 1-to-2 adalah decoder paling mendasar dengan 1 jalur input ($A$) dan 2 jalur output ($Y_0$ dan $Y_1$).
      </p>

      <h4 style="color:var(--accent-cyan); margin:1.25rem 0 0.5rem 0;">Persamaan Boolean:</h4>
      ${w7Code("Y₀ = A'\nY₁ = A")}

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin:1.5rem 0;" class="w6-responsive-grid">
        <div>
          <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem; text-align:center;">Tabel Kebenaran Decoder 1-to-2</h4>
          ${w7Table(['Input A', 'Output Y₀', 'Output Y₁', 'Keterangan'], [
            ['0', '<span style="color:var(--accent-cyan); font-weight:bold;">1</span>', '<span style="color:var(--accent-rose); font-weight:bold;">0</span>', 'A = 0 mengaktifkan jalur Y₀'],
            ['1', '<span style="color:var(--accent-rose); font-weight:bold;">0</span>', '<span style="color:var(--accent-cyan); font-weight:bold;">1</span>', 'A = 1 mengaktifkan jalur Y₁']
          ])}
        </div>
        <div>
          <h4 style="color:var(--accent-cyan); margin-bottom:0.75rem;">Penjelasan Logika:</h4>
          <p style="color:var(--text-secondary); font-size:0.92rem; line-height:1.65;">
            Ketika input $A = 0$, sinyal dibalik oleh gerbang NOT sehingga $Y_0 = (0)' = 1$, sedangkan $Y_1 = 0$. 
            Sebaliknya saat $A = 1$, $Y_0 = (1)' = 0$ dan sinyal $A$ langsung mengaktifkan $Y_1 = 1$. Rangkaian ini hanya membutuhkan satu gerbang inverter (NOT).
          </p>
        </div>
      </div>

      <div style="margin:1.5rem 0; padding:1.25rem; background:rgba(0,0,0,0.25); border-radius:12px; border:1px solid var(--border-color);">
        <h4 style="color:var(--accent-cyan); margin-bottom:1rem; text-align:center;">Diagram Rangkaian & Simbol Blok Decoder 1-to-2</h4>
        ${w7SvgDec1to2()}
      </div>
    `)}

    ${w7Section('3. Decoder 2-to-4 (2-to-4 Decoder)', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        Decoder 2-to-4 menerima 2 bit masukan: <strong>$A$ sebagai MSB</strong> (Most Significant Bit) dan <strong>$B$ sebagai LSB</strong> (Least Significant Bit), serta menghasilkan 4 jalur keluaran ($Y_0, Y_1, Y_2, Y_3$).
      </p>

      <h4 style="color:var(--accent-cyan); margin:1.25rem 0 0.5rem 0;">Persamaan Boolean Masing-Masing Output:</h4>
      ${w7Code(
`Y₀ = A' · B'   (Aktif saat AB = 00)
Y₁ = A' · B    (Aktif saat AB = 01)
Y₂ = A · B'    (Aktif saat AB = 10)
Y₃ = A · B     (Aktif saat AB = 11)`
      )}

      <h4 style="color:var(--accent-cyan); margin:1.5rem 0 0.5rem 0;">Tabel Kebenaran Lengkap Decoder 2-to-4:</h4>
      ${w7Table(['A (MSB)', 'B (LSB)', 'Y₀ (A\'B\')', 'Y₁ (A\'B)', 'Y₂ (AB\')', 'Y₃ (AB)', 'Minterm Aktif'], [
        ['0', '0', '<span style="color:var(--accent-cyan); font-weight:bold;">1</span>', '0', '0', '0', '<strong style="color:var(--accent-cyan);">m₀ (Y₀ aktif)</strong>'],
        ['0', '1', '0', '<span style="color:var(--accent-cyan); font-weight:bold;">1</span>', '0', '0', '<strong style="color:var(--accent-cyan);">m₁ (Y₁ aktif)</strong>'],
        ['1', '0', '0', '0', '<span style="color:var(--accent-cyan); font-weight:bold;">1</span>', '0', '<strong style="color:var(--accent-cyan);">m₂ (Y₂ aktif)</strong>'],
        ['1', '1', '0', '0', '0', '<span style="color:var(--accent-cyan); font-weight:bold;">1</span>', '<strong style="color:var(--accent-cyan);">m₃ (Y₃ aktif)</strong>']
      ])}

      <div style="margin:1.5rem 0; padding:1.25rem; background:rgba(0,0,0,0.25); border-radius:12px; border:1px solid var(--border-color);">
        <h4 style="color:var(--accent-cyan); margin-bottom:1rem; text-align:center;">Diagram Gerbang Logika Internal Decoder 2-to-4</h4>
        ${w7SvgDec2to4()}
      </div>
    `)}

    ${w7Section('4. Decoder 2-to-4 dengan Sinyal Enable (E)', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        Dalam IC nyata, decoder hampir selalu dilengkapi pin <strong>Enable ($E$)</strong>. Sinyal Enable berfungsi sebagai "sakelar master":
        <ul style="color:var(--text-secondary); line-height:1.7; padding-left:1.25rem;">
          <li>Ketika <strong>$E = 1$ (Enable Aktif)</strong>: Decoder bekerja secara normal sesuai nilai input $A$ dan $B$.</li>
          <li>Ketika <strong>$E = 0$ (Disable/Nonaktif)</strong>: <em>Seluruh output $Y_0 - Y_3$ dipaksa bernilai 0</em>, mengabaikan apa pun nilai $A$ dan $B$.</li>
        </ul>
      </p>

      <h4 style="color:var(--accent-violet); margin:1.25rem 0 0.5rem 0;">Persamaan Boolean dengan Enable Aktif-HIGH:</h4>
      ${w7Code(
`Y₀ = E · A' · B'
Y₁ = E · A' · B
Y₂ = E · A · B'
Y₃ = E · A · B`
      )}

      <h4 style="color:var(--accent-violet); margin:1.5rem 0 0.5rem 0;">Tabel Kebenaran Ringkas Decoder 2-to-4 dengan Enable:</h4>
      ${w7Table(['Enable (E)', 'A', 'B', 'Y₀', 'Y₁', 'Y₂', 'Y₃', 'Kondisi Status'], [
        ['0', 'X', 'X', '0', '0', '0', '0', '<span style="color:var(--accent-rose); font-weight:bold;">NONAKTIF (Seluruh output mati)</span>'],
        ['1', '0', '0', '<span style="color:var(--accent-cyan); font-weight:bold;">1</span>', '0', '0', '0', 'Decoder Aktif &rarr; Memilih Y₀'],
        ['1', '0', '1', '0', '<span style="color:var(--accent-cyan); font-weight:bold;">1</span>', '0', '0', 'Decoder Aktif &rarr; Memilih Y₁'],
        ['1', '1', '0', '0', '0', '<span style="color:var(--accent-cyan); font-weight:bold;">1</span>', '0', 'Decoder Aktif &rarr; Memilih Y₂'],
        ['1', '1', '1', '0', '0', '0', '<span style="color:var(--accent-cyan); font-weight:bold;">1</span>', 'Decoder Aktif &rarr; Memilih Y₃']
      ])}
      <p style="font-size:0.88rem; color:var(--text-muted); margin-top:0.5rem;">
        *Catatan: Huruf <code>X</code> merepresentasikan kondisi <em>Don't Care</em> (apakah input A dan B bernilai 0 atau 1, jika E=0 output tetap 0).
      </p>
    `)}
  `;
  if (el) el.innerHTML = _html_;
  return _html_;
}


/* ==========================================================================
   SECTION: w7_part4_decoder_3to8_sim.js
   ========================================================================== */
// Part 4: Decoder 3-to-8 & Interactive Simulator for Decoder 2:4 and 3:8
function renderWeek7Decoder3to8(el) {
  const _html_ = `
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" onclick="navigateTo('home')">Home</a> / 
        <a href="#" onclick="selectWeek(7)">Minggu 7</a> / 
        Decoder 3:8 & Simulator
      </div>
      <h1 class="content-title">Decoder 3-to-8 & Simulator Interaktif</h1>
      <p class="content-subtitle">Ekspansi 8-kanal output, pembentukan minterm biner 3-bit, dan simulasi pengujian real-time</p>
    </div>

    ${w7Alert('info', '<strong>Decoder 3-to-8 (3-to-8 Line Decoder):</strong><br>' +
      'Decoder 3-to-8 mengonversi kombinasi biner 3 bit ($A_2 A_1 A_0$) menjadi satu dari 8 jalur output ($Y_0 - Y_7$). Nilai biner 3-bit berkisar dari $000_2$ (desimal 0) hingga $111_2$ (desimal 7). Sinyal keluaran ini secara sempurna merepresentasikan masing-masing minterm ($m_0 - m_7$).'
    )}

    ${w7Section('1. Persamaan Logika Boolean Decoder 3-to-8', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        Setiap output adalah hasil operasi AND antara ketiga input (dalam bentuk normal atau komplemen):
      </p>

      ${w7Code(
`Y₀ = A₂' · A₁' · A₀'   (Minterm 0: aktif saat 000₂)
Y₁ = A₂' · A₁' · A₀    (Minterm 1: aktif saat 001₂)
Y₂ = A₂' · A₁  · A₀'   (Minterm 2: aktif saat 010₂)
Y₃ = A₂' · A₁  · A₀    (Minterm 3: aktif saat 011₂)
Y₄ = A₂  · A₁' · A₀'   (Minterm 4: aktif saat 100₂)
Y₅ = A₂  · A₁' · A₀    (Minterm 5: aktif saat 101₂)
Y₆ = A₂  · A₁  · A₀'   (Minterm 6: aktif saat 110₂)
Y₇ = A₂  · A₁  · A₀    (Minterm 7: aktif saat 111₂)`
      )}

      <h4 style="color:var(--accent-violet); margin:1.5rem 0 0.5rem 0;">Tabel Kebenaran Lengkap 8 Baris Decoder 3-to-8:</h4>
      ${w7Table(['A₂ (MSB)', 'A₁', 'A₀ (LSB)', 'Nilai Desimal', 'Output yang Aktif', 'Pola Output (Y₇ Y₆ Y₅ Y₄ Y₃ Y₂ Y₁ Y₀)'], [
        ['0', '0', '0', '0', '<strong style="color:var(--accent-cyan);">Y₀</strong>', '0 0 0 0 0 0 0 <strong style="color:var(--accent-cyan);">1</strong>'],
        ['0', '0', '1', '1', '<strong style="color:var(--accent-cyan);">Y₁</strong>', '0 0 0 0 0 0 <strong style="color:var(--accent-cyan);">1</strong> 0'],
        ['0', '1', '0', '2', '<strong style="color:var(--accent-cyan);">Y₂</strong>', '0 0 0 0 0 <strong style="color:var(--accent-cyan);">1</strong> 0 0'],
        ['0', '1', '1', '3', '<strong style="color:var(--accent-cyan);">Y₃</strong>', '0 0 0 0 <strong style="color:var(--accent-cyan);">1</strong> 0 0 0'],
        ['1', '0', '0', '4', '<strong style="color:var(--accent-cyan);">Y₄</strong>', '0 0 0 <strong style="color:var(--accent-cyan);">1</strong> 0 0 0 0'],
        ['1', '0', '1', '5', '<strong style="color:var(--accent-cyan);">Y₅</strong>', '0 0 <strong style="color:var(--accent-cyan);">1</strong> 0 0 0 0 0'],
        ['1', '1', '0', '6', '<strong style="color:var(--accent-cyan);">Y₆</strong>', '0 <strong style="color:var(--accent-cyan);">1</strong> 0 0 0 0 0 0'],
        ['1', '1', '1', '7', '<strong style="color:var(--accent-cyan);">Y₇</strong>', '<strong style="color:var(--accent-cyan);">1</strong> 0 0 0 0 0 0 0']
      ])}

      <div style="margin:1.5rem 0; padding:1.25rem; background:rgba(0,0,0,0.25); border-radius:12px; border:1px solid var(--border-color);">
        <h4 style="color:var(--accent-violet); margin-bottom:1rem; text-align:center;">Diagram Blok Arsitektur Decoder 3-to-8</h4>
        ${w7SvgDec3to8()}
      </div>
    `)}

    ${w7Section('2. Simulator Interaktif Decoder 2-to-4 & 3-to-8', `
      <p style="color:var(--text-secondary); line-height:1.6; margin-bottom:1.5rem;">
        Uji dan amati respon keluaran decoder secara real-time. Anda dapat menyalakan/mematikan sinyal Enable dan mengubah nilai bit masukan.
      </p>

      <!-- SIMULATOR 2:4 -->
      <div class="card" style="margin-bottom:2rem; background:rgba(15,23,42,0.6); border:1px solid var(--border-color); padding:1.5rem;">
        <h4 style="color:var(--accent-cyan); margin-bottom:1rem;">🕹️ Simulator Decoder 2-to-4 dengan Enable</h4>
        
        <div style="display:flex; flex-wrap:wrap; justify-content:space-around; align-items:center; gap:1.5rem;">
          <!-- Controls -->
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            <div style="display:flex; align-items:center; gap:0.75rem;">
              <span style="width:75px; font-weight:bold; color:var(--accent-amber);">Enable (E):</span>
              <button id="w7-btn-dec2-e" onclick="w7ToggleDec2('e')" class="btn" style="min-width:60px; font-weight:bold; background:var(--accent-amber); color:#000;">1</button>
            </div>
            <div style="display:flex; align-items:center; gap:0.75rem;">
              <span style="width:75px; font-weight:bold; color:var(--accent-cyan);">Input A (MSB):</span>
              <button id="w7-btn-dec2-a" onclick="w7ToggleDec2('a')" class="btn" style="min-width:60px; font-weight:bold;">0</button>
            </div>
            <div style="display:flex; align-items:center; gap:0.75rem;">
              <span style="width:75px; font-weight:bold; color:var(--accent-cyan);">Input B (LSB):</span>
              <button id="w7-btn-dec2-b" onclick="w7ToggleDec2('b')" class="btn" style="min-width:60px; font-weight:bold;">0</button>
            </div>
          </div>

          <!-- Outputs Display -->
          <div>
            <div style="font-weight:bold; color:var(--text-primary); margin-bottom:0.5rem; text-align:center;">Status Output (Y₀ - Y₃):</div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
              ${[0,1,2,3].map(i => `
                <div id="w7-dec2-box-y${i}" style="display:flex; justify-content:space-between; align-items:center; width:110px; padding:8px 12px; background:rgba(255,255,255,0.03); border-radius:6px; border:1px solid rgba(255,255,255,0.1);">
                  <span style="font-weight:bold; font-size:0.9rem;">Y${i}:</span>
                  <span id="w7-dec2-val-y${i}" style="font-weight:bold; font-size:1.1rem; color:var(--text-muted);">0</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div id="w7-dec2-exp" style="margin-top:1.25rem; padding:0.75rem 1rem; background:rgba(0,0,0,0.3); border-radius:8px; font-family:'Fira Code', monospace; font-size:0.88rem; color:var(--text-secondary);">
          Status: Enable = 1, Input AB = 00₂ &rarr; Jalur Y₀ AKTIF (1).
        </div>
      </div>

      <!-- SIMULATOR 3:8 -->
      <div class="card" style="background:rgba(15,23,42,0.6); border:1px solid var(--border-color); padding:1.5rem;">
        <h4 style="color:var(--accent-violet); margin-bottom:1rem;">🕹️ Simulator Decoder 3-to-8</h4>
        
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1.5rem; align-items:center;">
          <!-- Controls -->
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            <div style="font-weight:bold; color:var(--text-primary); margin-bottom:0.25rem;">Input Biner (A₂ A₁ A₀):</div>
            <div style="display:flex; align-items:center; gap:0.75rem;">
              <span style="width:70px; font-weight:bold; color:var(--accent-violet);">A₂ (MSB):</span>
              <button id="w7-btn-dec3-a2" onclick="w7ToggleDec3('a2')" class="btn" style="min-width:60px; font-weight:bold;">0</button>
            </div>
            <div style="display:flex; align-items:center; gap:0.75rem;">
              <span style="width:70px; font-weight:bold; color:var(--accent-violet);">A₁:</span>
              <button id="w7-btn-dec3-a1" onclick="w7ToggleDec3('a1')" class="btn" style="min-width:60px; font-weight:bold;">0</button>
            </div>
            <div style="display:flex; align-items:center; gap:0.75rem;">
              <span style="width:70px; font-weight:bold; color:var(--accent-violet);">A₀ (LSB):</span>
              <button id="w7-btn-dec3-a0" onclick="w7ToggleDec3('a0')" class="btn" style="min-width:60px; font-weight:bold;">0</button>
            </div>
          </div>

          <!-- 8 Output Grid -->
          <div>
            <div style="font-weight:bold; color:var(--text-primary); margin-bottom:0.5rem; text-align:center;">Status Output (Y₀ - Y₇):</div>
            <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:0.5rem;">
              ${[0,1,2,3,4,5,6,7].map(i => `
                <div id="w7-dec3-box-y${i}" style="display:flex; flex-direction:column; align-items:center; padding:6px 4px; background:rgba(255,255,255,0.02); border-radius:6px; border:1px solid rgba(255,255,255,0.08);">
                  <span style="font-size:0.75rem; color:var(--text-muted);">Y${i}</span>
                  <span id="w7-dec3-val-y${i}" style="font-weight:bold; font-size:1.1rem; color:var(--text-muted);">0</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div id="w7-dec3-exp" style="margin-top:1.25rem; padding:0.75rem 1rem; background:rgba(0,0,0,0.3); border-radius:8px; font-family:'Fira Code', monospace; font-size:0.88rem; color:var(--text-secondary);">
          Input = 000₂ (Desimal 0) &rarr; Output Y₀ AKTIF (1), lainnya bernilai 0.
        </div>
      </div>
    `)}
  `;
  if (el) el.innerHTML = _html_;
  if (typeof window !== 'undefined') {
    if (window.w7UpdateDec2Display) setTimeout(window.w7UpdateDec2Display, 10);
    if (window.w7UpdateDec3Display) setTimeout(window.w7UpdateDec3Display, 10);
  }
  return _html_;
}

// Logic & Simulator Handlers for Decoder 2:4 & 3:8
window.w7Dec2State = { e: 1, a: 0, b: 0 };
window.w7Dec3State = { a2: 0, a1: 0, a0: 0 };

window.w7ToggleDec2 = function(pin) {
  if (window.w7Dec2State[pin] !== undefined) {
    window.w7Dec2State[pin] = window.w7Dec2State[pin] === 0 ? 1 : 0;
    window.w7UpdateDec2Display();
  }
};

window.w7UpdateDec2Display = function() {
  const s = window.w7Dec2State;
  const btnE = document.getElementById('w7-btn-dec2-e');
  const btnA = document.getElementById('w7-btn-dec2-a');
  const btnB = document.getElementById('w7-btn-dec2-b');
  const exp = document.getElementById('w7-dec2-exp');

  if (btnE) btnE.textContent = s.e;
  if (btnA) btnA.textContent = s.a;
  if (btnB) btnB.textContent = s.b;

  const activeIdx = (s.a << 1) | s.b;

  for (let i = 0; i < 4; i++) {
    const valEl = document.getElementById('w7-dec2-val-y' + i);
    const boxEl = document.getElementById('w7-dec2-box-y' + i);
    const isLit = (s.e === 1 && i === activeIdx);
    if (valEl) {
      valEl.textContent = isLit ? '1' : '0';
      valEl.style.color = isLit ? 'var(--accent-cyan)' : 'var(--text-muted)';
    }
    if (boxEl) {
      boxEl.style.background = isLit ? 'rgba(0,210,255,0.15)' : 'rgba(255,255,255,0.03)';
      boxEl.style.borderColor = isLit ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)';
      boxEl.style.boxShadow = isLit ? '0 0 10px rgba(0,210,255,0.4)' : 'none';
    }
  }

  if (exp) {
    if (s.e === 0) {
      exp.innerHTML = '<span style="color:var(--accent-rose); font-weight:bold;">Enable E = 0 (Disable)</span> &rarr; Seluruh output Y₀ - Y₃ dipaksa bernilai 0.';
    } else {
      exp.innerHTML = 'Enable E = 1, Input AB = ' + s.a + s.b + '₂ (Desimal ' + activeIdx + ') &rarr; Jalur <strong style="color:var(--accent-cyan);">Y' + activeIdx + ' AKTIF (1)</strong>.';
    }
  }
};

window.w7ToggleDec3 = function(pin) {
  if (window.w7Dec3State[pin] !== undefined) {
    window.w7Dec3State[pin] = window.w7Dec3State[pin] === 0 ? 1 : 0;
    window.w7UpdateDec3Display();
  }
};

window.w7UpdateDec3Display = function() {
  const s = window.w7Dec3State;
  ['a2', 'a1', 'a0'].forEach(p => {
    const el = document.getElementById('w7-btn-dec3-' + p);
    if (el) el.textContent = s[p];
  });

  const activeIdx = (s.a2 << 2) | (s.a1 << 1) | s.a0;
  const exp = document.getElementById('w7-dec3-exp');

  for (let i = 0; i < 8; i++) {
    const valEl = document.getElementById('w7-dec3-val-y' + i);
    const boxEl = document.getElementById('w7-dec3-box-y' + i);
    const isLit = (i === activeIdx);
    if (valEl) {
      valEl.textContent = isLit ? '1' : '0';
      valEl.style.color = isLit ? 'var(--accent-violet)' : 'var(--text-muted)';
    }
    if (boxEl) {
      boxEl.style.background = isLit ? 'rgba(124,58,237,0.18)' : 'rgba(255,255,255,0.02)';
      boxEl.style.borderColor = isLit ? 'var(--accent-violet)' : 'rgba(255,255,255,0.08)';
      boxEl.style.boxShadow = isLit ? '0 0 10px rgba(124,58,237,0.4)' : 'none';
    }
  }

  if (exp) {
    exp.innerHTML = 'Input Biner = ' + s.a2 + s.a1 + s.a0 + '₂ (Desimal ' + activeIdx + ') &rarr; Output <strong style="color:var(--accent-violet);">Y' + activeIdx + ' AKTIF (1)</strong>, lainnya 0.';
  }
};


/* ==========================================================================
   SECTION: w7_part5_decoder_apps.js
   ========================================================================== */
// Part 5: Applications of Decoders in Digital Systems & IC 74LS138
function renderWeek7DecoderApps(el) {
  const _html_ = `
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" onclick="navigateTo('home')">Home</a> / 
        <a href="#" onclick="selectWeek(7)">Minggu 7</a> / 
        Aplikasi Decoder
      </div>
      <h1 class="content-title">Aplikasi Decoder dalam Sistem Komputer</h1>
      <p class="content-subtitle">Implementasi Address Decoding memori, seleksi periferal mikroprosesor, dan kunci digital</p>
    </div>

    ${w7Alert('success', '<strong>Peran Kunci dalam Arsitektur Komputer:</strong><br>' +
      'Decoder adalah jembatan vital antara CPU (Central Processing Unit) dengan memori dan perangkat I/O. Bus alamat CPU yang berisi kode biner diurai oleh decoder untuk menghasilkan sinyal <strong>Chip Select (CS)</strong> ke satu chip memori atau periferal spesifik.'
    )}

    ${w7Section('1. Empat Aplikasi Utama Decoder dalam Industri', `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.25rem;">
        
        <!-- App 1: Memory Address Decoder -->
        <div class="card" style="border-top:3px solid var(--accent-cyan);">
          <div style="font-size:1.5rem; margin-bottom:0.5rem;">💾</div>
          <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">A. Address Decoder pada Memori RAM/ROM</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.65;">
            CPU mengirimkan bit alamat pada Address Bus. Decoder membaca bit-bit berbobot tinggi untuk mengaktifkan satu bank/blok memori tertentu.
          </p>
          <div style="margin-top:0.75rem; padding:0.6rem; background:rgba(0,0,0,0.25); border-radius:6px; font-family:'Fira Code', monospace; font-size:0.82rem; color:var(--accent-cyan);">
            Contoh: Input A₂A₁A₀ = 101₂ (5 desimal) &rarr; Output Y₅ aktif &rarr; Blok memori RAM ke-5 diaktifkan untuk Read/Write.
          </div>
        </div>

        <!-- App 2: Channel Selection -->
        <div class="card" style="border-top:3px solid var(--accent-violet);">
          <div style="font-size:1.5rem; margin-bottom:0.5rem;">🔀</div>
          <h4 style="color:var(--accent-violet); margin-bottom:0.5rem;">B. Pemilihan Saluran (Channel Routing)</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.65;">
            Decoder digunakan untuk mengarahkan jalur data menuju salah satu saluran output dari banyak penerima data yang tersedia berdasarkan kode kontrol biner.
          </p>
          <div style="margin-top:0.75rem; padding:0.6rem; background:rgba(0,0,0,0.25); border-radius:6px; font-family:'Fira Code', monospace; font-size:0.82rem; color:var(--accent-violet);">
            Contoh: Decoder 2-to-4 memilih 1 dari 4 kanal sensor audio untuk dihubungkan ke bus transmisi utama.
          </div>
        </div>

        <!-- App 3: Security & Digital Lock -->
        <div class="card" style="border-top:3px solid var(--accent-amber);">
          <div style="font-size:1.5rem; margin-bottom:0.5rem;">🔐</div>
          <h4 style="color:var(--accent-amber); margin-bottom:0.5rem;">C. Sistem Keamanan & Kunci Digital</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.65;">
            Decoder dapat mendeteksi kombinasi biner rahasia (password biner). Hanya saat kombinasi biner yang cocok dimasukkan, satu output khusus akan aktif untuk memicu relay kunci.
          </p>
          <div style="margin-top:0.75rem; padding:0.6rem; background:rgba(0,0,0,0.25); border-radius:6px; font-family:'Fira Code', monospace; font-size:0.82rem; color:var(--accent-amber);">
            Contoh: Kode PIN 101₂ memicu output Y₅ untuk membuka solenoid relay pintu.
          </div>
        </div>

        <!-- App 4: Peripheral Control -->
        <div class="card" style="border-top:3px solid var(--accent-emerald);">
          <div style="font-size:1.5rem; margin-bottom:0.5rem;">⚙️</div>
          <h4 style="color:var(--accent-emerald); margin-bottom:0.5rem;">D. Pengendalian Periferal I/O</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.65;">
            Pada mikrokontroler/mikroprosesor, decoder mengendalikan pin <em>Chip Select (CS)</em> untuk perangkat eksternal seperti ADC (Analog-to-Digital Converter), modul UART, Timer, dan display.
          </p>
          <div style="margin-top:0.75rem; padding:0.6rem; background:rgba(0,0,0,0.25); border-radius:6px; font-family:'Fira Code', monospace; font-size:0.82rem; color:var(--accent-emerald);">
            Contoh: Y₀ &rarr; ADC CS, Y₁ &rarr; UART CS, Y₂ &rarr; Timer CS, Y₃ &rarr; GPIO Controller.
          </div>
        </div>

      </div>

      ${w7Alert('warning', '<strong>Catatan Rekayasa Sistem Nyata:</strong><br>' +
        'Ilustrasi kunci digital di atas adalah konsep logika fundamental. Pada sistem keamanan industri nyata, diperlukan proteksi anti-tamper, timer tunda, pembatasan jumlah percobaan, serta enkripsi kriptografis tambahan.'
      )}
    `)}

    ${w7Section('2. Contoh IC Industri Populer: 74LS138 (3-to-8 Decoder)', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        Salah satu Integrated Circuit (IC) standar TTL logika kombinasional yang paling legendaris dan masih dipelajari secara global adalah <strong>IC 74LS138</strong>.
      </p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin:1.25rem 0;" class="w6-responsive-grid">
        <div class="card" style="background:rgba(0,210,255,0.03);">
          <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Karakteristik Kunci IC 74LS138:</h4>
          <ul style="color:var(--text-secondary); font-size:0.9rem; line-height:1.7; padding-left:1.25rem;">
            <li><strong>Fungsi:</strong> 3-to-8 Line Decoder / Demultiplexer.</li>
            <li><strong>Input Seleksi:</strong> 3 pin alamat biner ($A, B, C$).</li>
            <li><strong>Output:</strong> 8 jalur ($Y_0 - Y_7$) dengan polaritas <em>Aktif-LOW</em> (output terpilih bernilai logika 0 / GND).</li>
            <li><strong>3 Pin Enable Modular:</strong> $G_1$ (aktif-HIGH), $\\overline{G}_{2A}$ (aktif-LOW), dan $\\overline{G}_{2B}$ (aktif-LOW).</li>
          </ul>
        </div>

        <div class="card" style="background:rgba(124,58,237,0.03);">
          <h4 style="color:var(--accent-violet); margin-bottom:0.5rem;">Keunggulan Arsitektur Enable 3-Pin:</h4>
          <p style="color:var(--text-secondary); font-size:0.9rem; line-height:1.65;">
            Tiga pin Enable pada 74LS138 memungkinkan beberapa chip decoder digabungkan secara langsung (cascading) untuk membentuk decoder yang lebih besar (misal <strong>Decoder 4-to-16</strong> atau <strong>Decoder 5-to-32</strong>) <em>tanpa memerlukan gerbang logika eksternal tambahan</em>!
          </p>
        </div>
      </div>
    `)}
  `;
  if (el) el.innerHTML = _html_;
  return _html_;
}


/* ==========================================================================
   SECTION: w7_part6_encoder_basics.js
   ========================================================================== */
// Part 6: Encoder Concepts, Encoder 4-to-2 & Interactive Simulator
function renderWeek7EncoderBasics(el) {
  const _html_ = `
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" onclick="navigateTo('home')">Home</a> / 
        <a href="#" onclick="selectWeek(7)">Minggu 7</a> / 
        Dasar Encoder
      </div>
      <h1 class="content-title">Prinsip Kerja Encoder & Encoder 4-to-2</h1>
      <p class="content-subtitle">Pengkodean jalur masukan aktif menjadi representasi kode biner kompak</p>
    </div>

    ${w7Alert('info', '<strong>Apa itu Encoder?</strong><br>' +
      'Encoder (penyandi) adalah kebalikan langsung dari Decoder. Rangkaian kombinasional ini memiliki <strong>2ⁿ jalur input</strong> dan menghasilkan <strong>n bit kode biner</strong> pada outputnya. Encoder mendeteksi jalur mana yang sedang aktif, lalu mengodekan indeks jalur tersebut ke dalam bilangan biner.'
    )}

    ${w7Section('1. Perbedaan Mendasar Encoder vs Decoder', `
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;" class="w6-responsive-grid">
        <div class="card" style="border-left:4px solid var(--accent-cyan);">
          <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">DECODER (Pengurai Sandi)</h4>
          <ul style="color:var(--text-secondary); font-size:0.9rem; line-height:1.7; padding-left:1.25rem;">
            <li>Input: <strong>n bit biner</strong>.</li>
            <li>Output: <strong>2ⁿ jalur</strong>.</li>
            <li>Arah operasi: <em>Biner &rarr; 1 output spesifik aktif</em>.</li>
            <li>Contoh: Mengubah alamat biner CPU untuk memilih satu baris memori.</li>
          </ul>
        </div>

        <div class="card" style="border-left:4px solid var(--accent-violet);">
          <h4 style="color:var(--accent-violet); margin-bottom:0.5rem;">ENCODER (Penyandi)</h4>
          <ul style="color:var(--text-secondary); font-size:0.9rem; line-height:1.7; padding-left:1.25rem;">
            <li>Input: <strong>2ⁿ jalur sinyal</strong>.</li>
            <li>Output: <strong>n bit biner</strong>.</li>
            <li>Arah operasi: <em>1 jalur aktif &rarr; Kode biner</em>.</li>
            <li>Contoh: Mengubah penekanan satu tombol keypad menjadi kode biner tombol tersebut.</li>
          </ul>
        </div>
      </div>

      <div class="card" style="margin-top:1.25rem; background:rgba(245,158,11,0.04); border-left:4px solid var(--accent-amber);">
        <h4 style="color:var(--accent-amber); margin-bottom:0.5rem;">Asumsi Krusial Encoder Biasa (Simple Binary Encoder):</h4>
        <p style="color:var(--text-secondary); font-size:0.92rem; line-height:1.65;">
          Pada encoder biasa, <strong>hanya boleh ada TEPAT SATU input yang aktif pada satu waktu (One-Hot Condition)</strong>. 
          Jika dua atau lebih input aktif bersamaan (misal tombol 1 dan tombol 3 ditekan berbarengan), encoder biasa akan menghasilkan keluaran yang <em>ambigu dan salah</em> karena gerbang OR menggabungkan kedua input tersebut tanpa aturan prioritas.
        </p>
      </div>
    `)}

    ${w7Section('2. Encoder 4-to-2 (4-to-2 Binary Encoder)', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        Encoder 4-to-2 memiliki empat input data ($D_0, D_1, D_2, D_3$) dan dua output biner: <strong>$A_1$ (MSB)</strong> dan <strong>$A_0$ (LSB)</strong>.
      </p>

      <h4 style="color:var(--accent-cyan); margin:1.25rem 0 0.5rem 0;">Tabel Kebenaran Encoder 4-to-2 (Kondisi One-Hot):</h4>
      ${w7Table(['Input Aktif', 'D₃', 'D₂', 'D₁', 'D₀', 'A₁ (MSB)', 'A₀ (LSB)', 'Representasi Desimal Output'], [
        ['<strong style="color:var(--text-muted);">D₀</strong>', '0', '0', '0', '1', '0', '0', '00₂ (Desimal 0)'],
        ['<strong style="color:var(--accent-cyan);">D₁</strong>', '0', '0', '1', '0', '0', '1', '01₂ (Desimal 1)'],
        ['<strong style="color:var(--accent-violet);">D₂</strong>', '0', '1', '0', '0', '1', '0', '10₂ (Desimal 2)'],
        ['<strong style="color:var(--accent-amber);">D₃</strong>', '1', '0', '0', '0', '1', '1', '11₂ (Desimal 3)']
      ])}

      <h4 style="color:var(--accent-cyan); margin:1.5rem 0 0.5rem 0;">Penurunan Persamaan Boolean:</h4>
      <p style="color:var(--text-secondary); line-height:1.65;">
        Dari tabel kebenaran di atas:
        <ul style="color:var(--text-secondary); line-height:1.7; padding-left:1.25rem;">
          <li>$A_1$ bernilai 1 jika $D_2$ aktif ATAU $D_3$ aktif &rArr; <strong>$A_1 = D_2 + D_3$</strong>.</li>
          <li>$A_0$ bernilai 1 jika $D_1$ aktif ATAU $D_3$ aktif &rArr; <strong>$A_0 = D_1 + D_3$</strong>.</li>
        </ul>
        Perhatikan bahwa $D_0$ <strong>tidak diperlukan dalam persamaan gerbang OR</strong>, karena saat $D_0 = 1$ (dan yang lain 0), $A_1 = 0$ dan $A_0 = 0$ secara otomatis!
      </p>

      ${w7Code(
`// Persamaan Logika Encoder 4-to-2:
A₁ = D₂ + D₃
A₀ = D₁ + D₃`
      )}

      <div style="margin:1.5rem 0; padding:1.25rem; background:rgba(0,0,0,0.25); border-radius:12px; border:1px solid var(--border-color);">
        <h4 style="color:var(--accent-cyan); margin-bottom:1rem; text-align:center;">Diagram Rangkaian Gerbang OR Encoder 4-to-2</h4>
        ${w7SvgEnc4to2()}
      </div>
    `)}

    ${w7Section('3. Simulator Interaktif Encoder 4-to-2', `
      <p style="color:var(--text-secondary); line-height:1.6; margin-bottom:1.5rem;">
        Klik tombol bit $D_0, D_1, D_2, D_3$ di bawah untuk mengubah status input. Cobalah mengaktifkan satu input (kondisi valid), lalu cobalah mengaktifkan lebih dari satu input untuk melihat deteksi kesalahan ambiguitas!
      </p>

      <div class="card" style="background:rgba(15,23,42,0.6); border:1px solid var(--border-color); padding:1.5rem;">
        <div style="display:flex; flex-wrap:wrap; justify-content:space-around; align-items:center; gap:1.5rem;">
          
          <!-- Inputs Column -->
          <div>
            <div style="font-weight:bold; color:var(--text-primary); margin-bottom:0.75rem;">Jalur Input Data (D):</div>
            <div style="display:flex; flex-direction:column; gap:0.6rem;">
              <div style="display:flex; align-items:center; gap:0.75rem;">
                <span style="width:30px; font-weight:bold; color:var(--text-muted);">D₀:</span>
                <button id="w7-btn-enc-d0" onclick="w7ToggleEnc4('d0')" class="btn" style="min-width:60px; font-weight:bold;">1</button>
              </div>
              <div style="display:flex; align-items:center; gap:0.75rem;">
                <span style="width:30px; font-weight:bold; color:var(--accent-cyan);">D₁:</span>
                <button id="w7-btn-enc-d1" onclick="w7ToggleEnc4('d1')" class="btn" style="min-width:60px; font-weight:bold;">0</button>
              </div>
              <div style="display:flex; align-items:center; gap:0.75rem;">
                <span style="width:30px; font-weight:bold; color:var(--accent-violet);">D₂:</span>
                <button id="w7-btn-enc-d2" onclick="w7ToggleEnc4('d2')" class="btn" style="min-width:60px; font-weight:bold;">0</button>
              </div>
              <div style="display:flex; align-items:center; gap:0.75rem;">
                <span style="width:30px; font-weight:bold; color:var(--accent-amber);">D₃:</span>
                <button id="w7-btn-enc-d3" onclick="w7ToggleEnc4('d3')" class="btn" style="min-width:60px; font-weight:bold;">0</button>
              </div>
            </div>
          </div>

          <!-- Outputs Display -->
          <div style="display:flex; flex-direction:column; align-items:center; gap:1rem;">
            <div style="font-weight:bold; color:var(--text-primary);">Output Biner (A₁ A₀):</div>
            <div style="display:flex; gap:1rem;">
              <div style="display:flex; flex-direction:column; align-items:center; padding:12px 18px; background:rgba(124,58,237,0.1); border-radius:8px; border:1px solid var(--accent-violet);">
                <span style="font-size:0.8rem; color:var(--text-muted);">A₁ (MSB)</span>
                <span id="w7-enc-out-a1" style="font-size:2rem; font-weight:bold; color:var(--accent-violet);">0</span>
              </div>
              <div style="display:flex; flex-direction:column; align-items:center; padding:12px 18px; background:rgba(0,210,255,0.1); border-radius:8px; border:1px solid var(--accent-cyan);">
                <span style="font-size:0.8rem; color:var(--text-muted);">A₀ (LSB)</span>
                <span id="w7-enc-out-a0" style="font-size:2rem; font-weight:bold; color:var(--accent-cyan);">0</span>
              </div>
            </div>
            <div id="w7-enc-decimal-txt" style="font-size:0.95rem; font-weight:bold; color:var(--text-primary);">
              Nilai Desimal: 0 (Biner 00₂)
            </div>
          </div>

        </div>

        <div id="w7-enc-status-box" style="margin-top:1.5rem; padding:0.85rem 1.25rem; border-radius:8px; font-size:0.9rem; line-height:1.6;">
          Status: Normal. Hanya D₀ yang aktif &rarr; Output A₁A₀ = 00₂.
        </div>
      </div>
    `)}
  `;
  if (el) el.innerHTML = _html_;
  if (typeof window !== 'undefined' && window.w7UpdateEnc4Display) {
    setTimeout(window.w7UpdateEnc4Display, 10);
  }
  return _html_;
}

// Logic & Simulator Handlers for Encoder 4:2
window.w7Enc4State = { d0: 1, d1: 0, d2: 0, d3: 0 };

window.w7ToggleEnc4 = function(pin) {
  if (window.w7Enc4State[pin] !== undefined) {
    window.w7Enc4State[pin] = window.w7Enc4State[pin] === 0 ? 1 : 0;
    window.w7UpdateEnc4Display();
  }
};

window.w7UpdateEnc4Display = function() {
  const s = window.w7Enc4State;
  ['d0', 'd1', 'd2', 'd3'].forEach(p => {
    const el = document.getElementById('w7-btn-enc-' + p);
    if (el) el.textContent = s[p];
  });

  // Calculate OR outputs: A1 = D2 | D3, A0 = D1 | D3
  const a1 = s.d2 | s.d3;
  const a0 = s.d1 | s.d3;

  const activePins = [];
  if (s.d0 === 1) activePins.push('D₀');
  if (s.d1 === 1) activePins.push('D₁');
  if (s.d2 === 1) activePins.push('D₂');
  if (s.d3 === 1) activePins.push('D₃');

  const outA1 = document.getElementById('w7-enc-out-a1');
  const outA0 = document.getElementById('w7-enc-out-a0');
  const decTxt = document.getElementById('w7-enc-decimal-txt');
  const statusBox = document.getElementById('w7-enc-status-box');

  if (outA1) outA1.textContent = a1;
  if (outA0) outA0.textContent = a0;

  const binVal = '' + a1 + a0;
  const decVal = (a1 << 1) | a0;

  if (decTxt) {
    decTxt.textContent = 'Nilai Desimal: ' + decVal + ' (Biner ' + binVal + '₂)';
  }

  if (statusBox) {
    if (activePins.length === 0) {
      statusBox.style.background = 'rgba(245,158,11,0.15)';
      statusBox.style.border = '1px solid var(--accent-amber)';
      statusBox.style.color = 'var(--accent-amber)';
      statusBox.innerHTML = '⚠️ <strong>Peringatan:</strong> Tidak ada input yang aktif. Output A₁A₀ = 00₂ dapat salah diartikan sebagai D₀ aktif.';
    } else if (activePins.length === 1) {
      statusBox.style.background = 'rgba(16,185,129,0.15)';
      statusBox.style.border = '1px solid var(--accent-emerald)';
      statusBox.style.color = 'var(--accent-emerald)';
      statusBox.innerHTML = '✅ <strong>Kondisi Valid (One-Hot):</strong> Hanya <strong>' + activePins[0] + '</strong> yang aktif. Output A₁A₀ = <strong>' + binVal + '₂ (Desimal ' + decVal + ')</strong> terkodekan sempurna.';
    } else {
      statusBox.style.background = 'rgba(244,63,94,0.15)';
      statusBox.style.border = '1px solid var(--accent-rose)';
      statusBox.style.color = 'var(--accent-rose)';
      statusBox.innerHTML = '🚨 <strong>KESALAHAN AMBIGUITAS (Multi-Input Aktif):</strong> Ada ' + activePins.length + ' input aktif bersamaan (' + activePins.join(', ') + '). Output menghasilkan ' + binVal + '₂, yang <em>bukan</em> kode tunggal yang valid! Inilah alasan diperlukannya <strong>Priority Encoder</strong>.';
    }
  }
};


/* ==========================================================================
   SECTION: w7_part7_encoder_priority.js
   ========================================================================== */
// Part 7: Priority Encoder, Decimal-to-BCD, Applications & Decoder vs Encoder Comparison
function renderWeek7EncoderPriority(el) {
  const _html_ = `
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" onclick="navigateTo('home')">Home</a> / 
        <a href="#" onclick="selectWeek(7)">Minggu 7</a> / 
        Priority Encoder & Perbandingan
      </div>
      <h1 class="content-title">Priority Encoder & Perbandingan Decoder-Encoder</h1>
      <p class="content-subtitle">Solusi multi-input berprioritas, Decimal-to-BCD, serta komparasi komprehensif</p>
    </div>

    ${w7Alert("info", "<strong>Solusi Mengatasi Multi-Input: Priority Encoder</strong><br>" +
      "Dalam aplikasi dunia nyata (seperti tombol keyboard komputer atau sistem interupsi mikroprosesor), sangat sering terjadi kondisi di mana dua tombol ditekan bersamaan. <strong>Priority Encoder</strong> menyelesaikan masalah ini dengan menetapkan hirarki: jika beberapa input aktif sekaligus, sirkuit hanya akan mengodekan input yang memiliki <strong>prioritas tertinggi</strong>, sementara input lainnya diabaikan (Don't Care).")
    }

    ${w7Section('1. Tiga Jenis Encoder dalam Sistem Digital', `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:1.25rem;">
        
        <div class="card" style="border-top:3px solid var(--accent-cyan);">
          <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">A. Binary Encoder (Biasa)</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.65;">
            Mengubah $2^n$ jalur input one-hot menjadi $n$ bit biner. Bekerja sempurna dengan syarat ketat hanya ada tepat 1 input aktif. Contoh: Encoder 8-to-3 dasar.
          </p>
        </div>

        <div class="card" style="border-top:3px solid var(--accent-violet);">
          <h4 style="color:var(--accent-violet); margin-bottom:0.5rem;">B. Priority Encoder</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.65;">
            Memiliki logika internal yang memprioritaskan nomor bit tertinggi (misal $D_7 > D_6 > ... > D_0$). Menjamin keluaran selalu valid meskipun banyak tombol ditekan serempak.
          </p>
        </div>

        <div class="card" style="border-top:3px solid var(--accent-amber);">
          <h4 style="color:var(--accent-amber); margin-bottom:0.5rem;">C. Decimal-to-BCD Encoder</h4>
          <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.65;">
            Memiliki 10 jalur input yang mewakili digit angka desimal 0 sampai 9. Menghasilkan 4-bit output berupa kode BCD 8421. Contoh: Input desimal 5 &rarr; BCD <code>0101</code>.
          </p>
        </div>

      </div>
    `)}

    ${w7Section('2. Priority Encoder 8-to-3 (8-to-3 Priority Encoder)', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        Misalkan kita merancang Priority Encoder 8-to-3 dengan konvensi:
        <br>&bull; <strong>$D_7$ memiliki prioritas tertinggi</strong> (Highest Priority).
        <br>&bull; <strong>$D_0$ memiliki prioritas terendah</strong> (Lowest Priority).
        <br>&bull; Simbol <code>X</code> (Don&#39;t Care) berarti nilai bit tersebut tidak berpengaruh (boleh 0 atau 1).
      </p>

      <h4 style="color:var(--accent-violet); margin:1.25rem 0 0.5rem 0;">Tabel Kebenaran Lengkap Priority Encoder 8-to-3:</h4>
      ${w7Table(['D₇', 'D₆', 'D₅', 'D₄', 'D₃', 'D₂', 'D₁', 'D₀', 'Y₂', 'Y₁', 'Y₀', 'Keterangan Prioritas'], [
        ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '<span style="color:var(--text-muted);">Tidak ada input aktif (V=0)</span>'],
        ['0', '0', '0', '0', '0', '0', '0', '1', '0', '0', '0', '<strong style="color:var(--accent-cyan);">D₀ aktif (000₂)</strong>'],
        ['0', '0', '0', '0', '0', '0', '1', 'X', '0', '0', '1', '<strong style="color:var(--accent-cyan);">D₁ aktif (001₂), abaikan D₀</strong>'],
        ['0', '0', '0', '0', '0', '1', 'X', 'X', '0', '1', '0', '<strong style="color:var(--accent-cyan);">D₂ aktif (010₂), abaikan D₁-D₀</strong>'],
        ['0', '0', '0', '0', '1', 'X', 'X', 'X', '0', '1', '1', '<strong style="color:var(--accent-cyan);">D₃ aktif (011₂), abaikan D₂-D₀</strong>'],
        ['0', '0', '0', '1', 'X', 'X', 'X', 'X', '1', '0', '0', '<strong style="color:var(--accent-violet);">D₄ aktif (100₂), abaikan D₃-D₀</strong>'],
        ['0', '0', '1', 'X', 'X', 'X', 'X', 'X', '1', '0', '1', '<strong style="color:var(--accent-violet);">D₅ aktif (101₂), abaikan D₄-D₀</strong>'],
        ['0', '1', 'X', 'X', 'X', 'X', 'X', 'X', '1', '1', '0', '<strong style="color:var(--accent-violet);">D₆ aktif (110₂), abaikan D₅-D₀</strong>'],
        ['1', 'X', 'X', 'X', 'X', 'X', 'X', 'X', '1', '1', '1', '<strong style="color:var(--accent-amber);">D₇ AKTIF (111₂), PRIORITAS TERTINGGI!</strong>']
      ])}

      <div class="card" style="margin-top:1.25rem; background:rgba(124,58,237,0.04); border-left:4px solid var(--accent-violet);">
        <h4 style="color:var(--accent-violet); margin-bottom:0.5rem;">Contoh Kasus Nyata:</h4>
        <p style="color:var(--text-secondary); font-size:0.92rem; line-height:1.65;">
          Jika jalur $D_6$ dan $D_2$ aktif secara bersamaan, karena $D_6$ memiliki nomor indeks lebih tinggi daripada $D_2$, maka $D_6$ yang dimenangkan oleh sirkuit. 
          Output yang dihasilkan adalah <strong>$Y_2 Y_1 Y_0 = 110_2$ (desimal 6)</strong>, bukan gabungan aneh!
        </p>
      </div>
    `)}

    ${w7Section('3. Aplikasi Encoder dalam Kehidupan Nyata', `
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:1rem;">
        <div class="card">
          <strong style="color:var(--accent-cyan);">1. Keyboard & Keypad Komputer</strong>
          <p style="font-size:0.88rem; color:var(--text-secondary); margin-top:0.35rem; line-height:1.5;">
            Ratusan tombol fisik pada keyboard dihubungkan ke matriks encoder untuk diubah menjadi kode ASCII / Scan Code biner ke prosesor.
          </p>
        </div>
        <div class="card">
          <strong style="color:var(--accent-violet);">2. Priority Interrupt Controller (PIC)</strong>
          <p style="font-size:0.88rem; color:var(--text-secondary); margin-top:0.35rem; line-height:1.5;">
            Pada CPU, perangkat kritis (seperti tombol Power, reset, error baterai) diberi pin prioritas lebih tinggi dibanding mouse/keyboard.
          </p>
        </div>
        <div class="card">
          <strong style="color:var(--accent-emerald);">3. Rotary Optical Encoder (Sensor Mesin)</strong>
          <p style="font-size:0.88rem; color:var(--text-secondary); margin-top:0.35rem; line-height:1.5;">
            Pada robotika, piringan celah cahaya menghasilkan sinyal pulsa posisi motor yang dikodekan ke nilai sudut biner.
          </p>
        </div>
      </div>

      <div style="margin-top:1.25rem; padding:1.25rem; background:rgba(0,0,0,0.25); border-radius:10px; border:1px solid var(--border-color); text-align:center;">
        <div style="font-family:'Fira Code', monospace; font-size:0.95rem; color:var(--accent-cyan); line-height:1.8;">
          [Tombol / Sensor Fisik] &rarr; [Priority Encoder] &rarr; [Kode Biner Ringkas] &rarr; [Bus Mikroprosesor / CPU]
        </div>
        <p style="font-size:0.82rem; color:var(--text-muted); margin-top:0.5rem; font-style:italic;">
          Gambar 7.8: Diagram Alir Konversi Sinyal Fisik Menjadi Kode Digital Melalui Encoder
        </p>
      </div>
    `)}

    ${w7Section('4. Tabel Perbandingan Lengkap: Decoder vs Encoder', `
      <div style="overflow-x:auto;">
        ${w7Table(['Parameter Komparasi', 'DECODER (Pengurai Sandi)', 'ENCODER (Penyandi)'], [
          [
            '<strong>Arah Konversi</strong>',
            'Kode biner kompak &rarr; Satu jalur output aktif',
            'Satu jalur input aktif &rarr; Kode biner kompak'
          ],
          [
            '<strong>Jumlah Pin Masukan (Input)</strong>',
            '<strong>n bit</strong> kode biner',
            '<strong>2ⁿ jalur</strong> sinyal data'
          ],
          [
            '<strong>Jumlah Pin Keluaran (Output)</strong>',
            '<strong>2ⁿ jalur</strong> sinyal seleksi',
            '<strong>n bit</strong> kode biner'
          ],
          [
            '<strong>Kondisi Normal</strong>',
            'Satu output yang aktif (One-Hot Output)',
            'Satu input yang aktif (One-Hot Input)'
          ],
          [
            '<strong>Solusi Masalah Ambiguitas</strong>',
            'Menggunakan sinyal <strong>Enable (E)</strong>',
            'Menggunakan arsitektur <strong>Priority Encoder</strong>'
          ],
          [
            '<strong>Contoh IC Standar TTL</strong>',
            '<span style="color:var(--accent-cyan); font-weight:bold;">IC 74LS138</span> (3-to-8 Decoder)',
            '<span style="color:var(--accent-violet); font-weight:bold;">IC 74LS148</span> (8-to-3 Priority Encoder)'
          ],
          [
            '<strong>Aplikasi Utama</strong>',
            'Address decoding RAM/ROM, pengaktif Chip Select periferal, demultiplexing',
            'Pengkodean tombol keyboard/keypad, penanganan interupsi CPU, kompresi jalur data'
          ]
        ])}
      </div>
    `)}
  `;
  if (el) el.innerHTML = _html_;
  return _html_;
}


/* ==========================================================================
   SECTION: w7_part8_seven_segment_bcd.js
   ========================================================================== */
// Part 8: Seven-Segment Display, Common Anode/Cathode, BCD 8421, and Truth Table
function renderWeek7SevenSegment(el) {
  const _html_ = `
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" onclick="navigateTo('home')">Home</a> / 
        <a href="#" onclick="selectWeek(7)">Minggu 7</a> / 
        Seven-Segment & BCD
      </div>
      <h1 class="content-title">Seven-Segment Display & Kode BCD 8421</h1>
      <p class="content-subtitle">Struktur display LED 7-segmen, konfigurasi polaritas CA/CC, dan pemetaan tabel kebenaran</p>
    </div>

    ${w7Alert('info', '<strong>Antarmuka Visual Digital:</strong><br>' +
      'Seven-Segment Display adalah komponen display optoelektronika paling umum untuk menampilkan angka desimal numerik (0–9). Komponen ini tersusun dari <strong>7 dioda pemancar cahaya (LED)</strong> berbentuk batang garis yang diberi label alfabet standar <strong>a, b, c, d, e, f, dan g</strong>, ditambah satu LED titik desimal (<strong>dp</strong>).'
    )}

    ${w7Section('1. Anatomi dan Standar Penamaan Posisi Segmen', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        Untuk menstandardisasi perancangan perangkat keras dan pengkodean, industri semikonduktor menetapkan posisi segmen secara universal sebagai berikut:
      </p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin:1.25rem 0;" class="w6-responsive-grid">
        <div>
          <ul style="color:var(--text-secondary); font-size:0.92rem; line-height:1.8; padding-left:1.25rem;">
            <li><strong>a:</strong> Segmen horizontal paling atas.</li>
            <li><strong>b:</strong> Segmen vertikal kanan atas.</li>
            <li><strong>c:</strong> Segmen vertikal kanan bawah.</li>
            <li><strong>d:</strong> Segmen horizontal paling bawah.</li>
            <li><strong>e:</strong> Segmen vertikal kiri bawah.</li>
            <li><strong>f:</strong> Segmen vertikal kiri atas.</li>
            <li><strong>g:</strong> Segmen horizontal tengah.</li>
            <li><strong>dp:</strong> Dot Point (titik desimal) di sudut kanan bawah.</li>
          </ul>
        </div>
        <div style="padding:1rem; background:rgba(0,0,0,0.25); border-radius:10px; border:1px solid var(--border-color);">
          ${w7SvgSevenSegAnatomy()}
        </div>
      </div>
    `)}

    ${w7Section('2. Common Anode (CA) vs Common Cathode (CC)', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        Karena ketujuh segmen di dalam modul display adalah LED (dioda dengan terminal Anoda $+$ dan Katoda $-$), produsen menyatukan salah satu kutub untuk menghemat jumlah pin IC:
      </p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin:1.25rem 0;" class="w6-responsive-grid">
        <!-- Common Anode -->
        <div class="card" style="border-left:4px solid var(--accent-rose);">
          <h4 style="color:var(--accent-rose); margin-bottom:0.5rem;">A. Common Anode (CA)</h4>
          <ul style="color:var(--text-secondary); font-size:0.9rem; line-height:1.65; padding-left:1.25rem;">
            <li>Semua <strong>Anoda (+)</strong> LED dihubungkan bersama ke satu pin terminal bersama (Common).</li>
            <li>Pin Common disambungkan ke tegangan sumber positif <strong>VCC (+5V)</strong>.</li>
            <li>Segmen MENYALA ketika diberi logika <strong>LOW (0 / GND)</strong>.</li>
            <li>Polaritas sinyal pengendali adalah <strong>Aktif-LOW</strong>.</li>
            <li>Contoh IC Driver: <em>IC 7447</em>.</li>
          </ul>
        </div>

        <!-- Common Cathode -->
        <div class="card" style="border-left:4px solid var(--accent-emerald);">
          <h4 style="color:var(--accent-emerald); margin-bottom:0.5rem;">B. Common Cathode (CC)</h4>
          <ul style="color:var(--text-secondary); font-size:0.9rem; line-height:1.65; padding-left:1.25rem;">
            <li>Semua <strong>Katoda (-)</strong> LED dihubungkan bersama ke satu pin terminal bersama (Common).</li>
            <li>Pin Common disambungkan ke <strong>Ground (GND / 0V)</strong>.</li>
            <li>Segmen MENYALA ketika diberi logika <strong>HIGH (1 / +5V)</strong>.</li>
            <li>Polaritas sinyal pengendali adalah <strong>Aktif-HIGH</strong>.</li>
            <li>Contoh IC Driver: <em>IC 7448</em>.</li>
          </ul>
        </div>
      </div>

      <h4 style="color:var(--text-primary); margin:1.5rem 0 0.5rem 0;">Tabel Komparasi Polaritas CA vs CC:</h4>
      ${w7Table(['Parameter Sirkuit', 'Common Anode (CA)', 'Common Cathode (CC)'], [
        ['Sambungan Pin Common', 'Tersambung ke VCC (+5V)', 'Tersambung ke GND (0V)'],
        ['Logika Segmen MENYALA', '<span style="color:var(--accent-rose); font-weight:bold;">Logika 0 (LOW / 0V)</span>', '<span style="color:var(--accent-emerald); font-weight:bold;">Logika 1 (HIGH / 5V)</span>'],
        ['Logika Segmen MATI', 'Logika 1 (HIGH / 5V)', 'Logika 0 (LOW / 0V)'],
        ['Sifat Polaritas Driver', 'Aktif-LOW (Inverted logic)', 'Aktif-HIGH (True logic)'],
        ['Contoh IC Standar TTL', 'IC 74LS47 (Open-collector)', 'IC 74LS48 (Internal pull-up)']
      ])}
    `)}

    ${w7Section('3. Kode BCD 8421 (Binary Coded Decimal)', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        Sistem <strong>Binary Coded Decimal (BCD 8421)</strong> adalah metode pengkodean angka desimal di mana <em>setiap digit angka desimal (0 sampai 9)</em> dikonversi secara individual menjadi 4-bit biner dengan bobot posisi <strong>8, 4, 2, dan 1</strong>:
      </p>

      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin:1.25rem 0;" class="w6-responsive-grid">
        <div>
          ${w7Table(['Digit Desimal', 'Bit BCD (A=8, B=4, C=2, D=1)'], [
            ['0', '0 0 0 0'],
            ['1', '0 0 0 1'],
            ['2', '0 0 1 0'],
            ['3', '0 0 1 1'],
            ['4', '0 1 0 0'],
            ['5', '0 1 0 1'],
            ['6', '0 1 1 0'],
            ['7', '0 1 1 1'],
            ['8', '1 0 0 0'],
            ['9', '1 0 0 1']
          ])}
        </div>
        <div>
          <div class="card" style="background:rgba(245,158,11,0.03); border:1px solid rgba(245,158,11,0.2);">
            <h4 style="color:var(--accent-amber); margin-bottom:0.5rem;">Perbedaan BCD vs Biner Murni:</h4>
            <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.65;">
              Mari bandingkan penulisan angka desimal <strong>59</strong>:
              <br>&bull; <strong>Dalam Biner Murni:</strong> $59_{10} = 111011_2$ (dihitung sebagai $32 + 16 + 8 + 2 + 1$).
              <br>&bull; <strong>Dalam BCD 8421:</strong> Digit 5 dan digit 9 dikodekan terpisah:
              <br>&nbsp;&nbsp;Digit 5 = <code>0101</code>
              <br>&nbsp;&nbsp;Digit 9 = <code>1001</code>
              <br>&nbsp;&nbsp;&rArr; $59_{BCD} = \mathbf{0101\ 1001_{BCD}}$ (butuh 2 kelompok 4-bit = 8 bit).
            </p>
          </div>

          <div class="card" style="margin-top:1rem; background:rgba(244,63,94,0.04); border-left:4px solid var(--accent-rose);">
            <h4 style="color:var(--accent-rose); margin-bottom:0.5rem;">Kombinasi Terlarang (Invalid BCD 10–15):</h4>
            <p style="font-size:0.88rem; color:var(--text-secondary); line-height:1.6;">
              Karena 4-bit biner dapat menghasilkan 16 kombinasi ($0000 - 1111$), namun digit desimal hanya ada 10 ($0 - 9$), maka 6 kombinasi sisanya yaitu 
              <strong>1010₂ (10), 1011₂ (11), 1100₂ (12), 1101₂ (13), 1110₂ (14), dan 1111₂ (15)</strong> adalah 
              <strong>KODE ILEGAL / TIDAK VALID</strong>. Dalam K-Map penyederhanaan decoder, nilai ini diperlakukan sebagai <em>Don&#39;t Care (X)</em>.
            </p>
          </div>
        </div>
      </div>
    `)}

    ${w7Section('4. Tabel Kebenaran BCD to 7-Segment Decoder', `
      <p style="color:var(--text-secondary); line-height:1.7;">
        Tabel berikut menunjukkan hubungan langsung antara 4 bit input BCD ($A=8, B=4, C=2, D=1$) dengan status ketujuh segmen LED untuk display <strong>Common Cathode (1 = Menyala, 0 = Mati)</strong>:
      </p>

      ${w7Table(['Digit', 'A (8)', 'B (4)', 'C (2)', 'D (1)', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'Visualisasi Display'], [
        ['0', '0', '0', '0', '0', '1', '1', '1', '1', '1', '1', '0', '<span style="font-family:monospace; color:var(--accent-cyan);">[ a b c d e f ] (g mati)</span>'],
        ['1', '0', '0', '0', '1', '0', '1', '1', '0', '0', '0', '0', '<span style="font-family:monospace; color:var(--accent-cyan);">[ b c ]</span>'],
        ['2', '0', '0', '1', '0', '1', '1', '0', '1', '1', '0', '1', '<span style="font-family:monospace; color:var(--accent-cyan);">[ a b d e g ]</span>'],
        ['3', '0', '0', '1', '1', '1', '1', '1', '1', '0', '0', '1', '<span style="font-family:monospace; color:var(--accent-cyan);">[ a b c d g ]</span>'],
        ['4', '0', '1', '0', '0', '0', '1', '1', '0', '0', '1', '1', '<span style="font-family:monospace; color:var(--accent-cyan);">[ b c f g ]</span>'],
        ['5', '0', '1', '0', '1', '1', '0', '1', '1', '0', '1', '1', '<span style="font-family:monospace; color:var(--accent-cyan);">[ a c d f g ]</span>'],
        ['6', '0', '1', '1', '0', '1', '0', '1', '1', '1', '1', '1', '<span style="font-family:monospace; color:var(--accent-cyan);">[ a c d e f g ]</span>'],
        ['7', '0', '1', '1', '1', '1', '1', '1', '0', '0', '0', '0', '<span style="font-family:monospace; color:var(--accent-cyan);">[ a b c ]</span>'],
        ['8', '1', '0', '0', '0', '1', '1', '1', '1', '1', '1', '1', '<span style="font-family:monospace; color:var(--accent-cyan);">[ SEMUA a-g MENYALA ]</span>'],
        ['9', '1', '0', '0', '1', '1', '1', '1', '1', '0', '1', '1', '<span style="font-family:monospace; color:var(--accent-cyan);">[ a b c d f g ]</span>']
      ])}

      <div style="margin:1.5rem 0; padding:1.25rem; background:rgba(0,0,0,0.25); border-radius:12px; border:1px solid var(--border-color);">
        <h4 style="color:var(--accent-cyan); margin-bottom:1rem; text-align:center;">Diagram Blok Sistem BCD to 7-Segment Decoder</h4>
        ${w7SvgBcdBlock()}
      </div>

      <h4 style="color:var(--text-primary); margin:1.5rem 0 0.5rem 0;">Metode Penurunan Persamaan Boolean Tiap Segmen:</h4>
      <p style="color:var(--text-secondary); line-height:1.65;">
        Untuk merancang sirkuit gerbang internal decoder, setiap segmen ($a$ sampai $g$) dipandang sebagai fungsi Boolean 4-variabel mandiri: $F_{seg}(A, B, C, D)$.
        <br>Langkah perancangan sistematis:
      </p>
      <div style="display:flex; flex-direction:column; gap:0.6rem; margin-top:0.75rem;">
        ${w7Step("1", "Petakan Minterm Segmen", "Tentukan digit desimal berapa saja yang membutuhkan segmen tersebut menyala (nilai 1 pada tabel di atas).")}
        ${w7Step("2", "Masukkan ke Karnaugh Map 4-Variabel", "Isi sel K-Map dengan angka 1 pada minterm digit tersebut, angka 0 pada digit lainnya, dan tandai minterm 10 s.d. 15 dengan nilai Don't Care (X).")}
        ${w7Step("3", "Pengelompokan Sel (Grouping)", "Bentuk kelompok 8, 4, atau 2 sel bersebelahan dengan memanfaatkan sel Don't Care untuk memperoleh persamaan SOP yang paling hemat gerbang.")}
        ${w7Step("4", "Validasi Rangkaian", "Uji kembali fungsi persamaan logika terhadap seluruh nilai 0000 s.d. 1001 untuk memastikan pola segmen yang menyala 100% akurat.")}
      </div>
    `)}
  `;
  if (el) el.innerHTML = _html_;
  return _html_;
}


/* ==========================================================================
   SECTION: w7_part9_simulator_bcd.js
   ========================================================================== */
// Part 9: Interactive BCD to 7-Segment Simulator
function renderWeek7SimulatorBCD(el) {
  const _html_ = `
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" onclick="navigateTo('home')">Home</a> / 
        <a href="#" onclick="selectWeek(7)">Minggu 7</a> / 
        Simulator BCD to 7-Segment
      </div>
      <h1 class="content-title">Simulator Interaktif BCD to 7-Segment Display</h1>
      <p class="content-subtitle">Eksplorasi visual grafis responsif decoder BCD 8421 dengan kendali mode Common Cathode & Anode</p>
    </div>

    ${w7Alert('success', '<strong>Fitur Pembelajaran Interaktif:</strong><br>' +
      'Ubah kombinasi 4 bit masukan BCD ($A, B, C, D$) dan pilih mode display (Common Cathode / Common Anode). Amati secara langsung bagaimana segmen-segmen LED menyala membentuk angka numerik desimal 0–9 atau menampilkan peringatan saat memasukkan kode biner terlarang 10–15.'
    )}

    ${w7Section('Laboratorium Virtual BCD to 7-Segment', `
      <div class="card" style="background:rgba(15,23,42,0.6); border:1px solid var(--border-color); padding:1.75rem;">
        
        <!-- Controls & Simulator Layout -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:2rem; align-items:center;">
          
          <!-- Column 1: Inputs & Mode Selector -->
          <div style="display:flex; flex-direction:column; gap:1.25rem;">
            
            <!-- Mode Switcher -->
            <div style="padding:1rem; background:rgba(255,255,255,0.03); border-radius:8px; border:1px solid rgba(255,255,255,0.08);">
              <span style="font-weight:bold; color:var(--text-primary); font-size:0.9rem; display:block; margin-bottom:0.6rem;">Pilih Mode Display:</span>
              <div style="display:flex; gap:0.5rem;">
                <button id="w7-btn-mode-cc" onclick="w7SetBcdMode('CC')" class="btn" style="flex:1; font-size:0.85rem; font-weight:bold; background:var(--accent-emerald); color:#000;">
                  Common Cathode (CC)
                </button>
                <button id="w7-btn-mode-ca" onclick="w7SetBcdMode('CA')" class="btn" style="flex:1; font-size:0.85rem; font-weight:bold; background:rgba(255,255,255,0.08); color:var(--text-secondary);">
                  Common Anode (CA)
                </button>
              </div>
              <span id="w7-mode-desc" style="font-size:0.8rem; color:var(--accent-emerald); display:block; margin-top:0.4rem;">
                Mode Aktif-HIGH: Logika 1 = Segmen Menyala.
              </span>
            </div>

            <!-- BCD Bit Toggles -->
            <div>
              <span style="font-weight:bold; color:var(--text-primary); font-size:0.9rem; display:block; margin-bottom:0.6rem;">Input Bit BCD 8421:</span>
              <div style="display:flex; flex-direction:column; gap:0.6rem;">
                <div style="display:flex; align-items:center; justify-content:space-between; padding:4px 8px; background:rgba(0,0,0,0.2); border-radius:6px;">
                  <span style="font-family:'Fira Code', monospace; font-size:0.9rem; color:var(--accent-cyan); font-weight:bold;">A (Bobot 8 - MSB):</span>
                  <button id="w7-btn-bcd-a" onclick="w7ToggleBcd('a')" class="btn" style="min-width:60px; font-weight:bold; font-size:1.1rem;">0</button>
                </div>
                <div style="display:flex; align-items:center; justify-content:space-between; padding:4px 8px; background:rgba(0,0,0,0.2); border-radius:6px;">
                  <span style="font-family:'Fira Code', monospace; font-size:0.9rem; color:var(--accent-cyan); font-weight:bold;">B (Bobot 4):</span>
                  <button id="w7-btn-bcd-b" onclick="w7ToggleBcd('b')" class="btn" style="min-width:60px; font-weight:bold; font-size:1.1rem;">0</button>
                </div>
                <div style="display:flex; align-items:center; justify-content:space-between; padding:4px 8px; background:rgba(0,0,0,0.2); border-radius:6px;">
                  <span style="font-family:'Fira Code', monospace; font-size:0.9rem; color:var(--accent-cyan); font-weight:bold;">C (Bobot 2):</span>
                  <button id="w7-btn-bcd-c" onclick="w7ToggleBcd('c')" class="btn" style="min-width:60px; font-weight:bold; font-size:1.1rem;">0</button>
                </div>
                <div style="display:flex; align-items:center; justify-content:space-between; padding:4px 8px; background:rgba(0,0,0,0.2); border-radius:6px;">
                  <span style="font-family:'Fira Code', monospace; font-size:0.9rem; color:var(--accent-cyan); font-weight:bold;">D (Bobot 1 - LSB):</span>
                  <button id="w7-btn-bcd-d" onclick="w7ToggleBcd('d')" class="btn" style="min-width:60px; font-weight:bold; font-size:1.1rem;">0</button>
                </div>
              </div>
            </div>

          </div>

          <!-- Column 2: The Physical Seven-Segment Graphic -->
          <div style="display:flex; flex-direction:column; align-items:center; justify-content:center;">
            
            <div style="position:relative; width:180px; height:260px; background:#080c14; border-radius:12px; border:2px solid rgba(255,255,255,0.15); box-shadow:inset 0 0 20px rgba(0,0,0,0.9), 0 10px 25px rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center;">
              
              <svg width="140" height="220" viewBox="0 0 100 160">
                <!-- Segment a (top) -->
                <polygon id="w7-seg-a" points="20,10 80,10 70,22 30,22" fill="rgba(255,255,255,0.06)" stroke="rgba(0,0,0,0.4)" stroke-width="1"/>
                <text x="50" y="8" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.3)" font-family="sans-serif">a</text>

                <!-- Segment b (top right) -->
                <polygon id="w7-seg-b" points="82,12 92,20 86,75 76,68" fill="rgba(255,255,255,0.06)" stroke="rgba(0,0,0,0.4)" stroke-width="1"/>
                <text x="96" y="45" font-size="8" fill="rgba(255,255,255,0.3)" font-family="sans-serif">b</text>

                <!-- Segment c (bottom right) -->
                <polygon id="w7-seg-c" points="85,82 91,88 84,142 74,134" fill="rgba(255,255,255,0.06)" stroke="rgba(0,0,0,0.4)" stroke-width="1"/>
                <text x="96" y="112" font-size="8" fill="rgba(255,255,255,0.3)" font-family="sans-serif">c</text>

                <!-- Segment d (bottom) -->
                <polygon id="w7-seg-d" points="18,144 80,144 70,132 28,132" fill="rgba(255,255,255,0.06)" stroke="rgba(0,0,0,0.4)" stroke-width="1"/>
                <text x="50" y="154" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.3)" font-family="sans-serif">d</text>

                <!-- Segment e (bottom left) -->
                <polygon id="w7-seg-e" points="16,82 26,88 20,134 10,142" fill="rgba(255,255,255,0.06)" stroke="rgba(0,0,0,0.4)" stroke-width="1"/>
                <text x="2" y="112" font-size="8" fill="rgba(255,255,255,0.3)" font-family="sans-serif">e</text>

                <!-- Segment f (top left) -->
                <polygon id="w7-seg-f" points="18,12 28,20 22,68 12,75" fill="rgba(255,255,255,0.06)" stroke="rgba(0,0,0,0.4)" stroke-width="1"/>
                <text x="2" y="45" font-size="8" fill="rgba(255,255,255,0.3)" font-family="sans-serif">f</text>

                <!-- Segment g (middle) -->
                <polygon id="w7-seg-g" points="22,76 30,70 70,70 78,76 70,82 30,82" fill="rgba(255,255,255,0.06)" stroke="rgba(0,0,0,0.4)" stroke-width="1"/>
                <text x="50" y="79" text-anchor="middle" font-size="8" fill="rgba(255,255,255,0.3)" font-family="sans-serif">g</text>

                <!-- Dot point -->
                <circle id="w7-seg-dp" cx="95" cy="144" r="5" fill="rgba(255,255,255,0.06)"/>
              </svg>
            </div>

            <!-- Output Digit Badge -->
            <div style="margin-top:1rem; text-align:center;">
              <span style="font-size:0.85rem; color:var(--text-muted);">Digit Desimal:</span>
              <div id="w7-bcd-digit-badge" style="font-size:2rem; font-weight:800; color:var(--accent-cyan);">0</div>
            </div>

          </div>

          <!-- Column 3: Segment Breakdown Table -->
          <div>
            <div style="font-weight:bold; color:var(--text-primary); margin-bottom:0.5rem; text-align:center;">Status Logika Tiap Segmen:</div>
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.4rem; font-family:'Fira Code', monospace; font-size:0.85rem;">
              ${['a','b','c','d','e','f','g'].map(s => `
                <div id="w7-chip-seg-${s}" style="display:flex; justify-content:space-between; padding:5px 10px; background:rgba(255,255,255,0.02); border-radius:6px; border:1px solid rgba(255,255,255,0.06);">
                  <span>Segmen ${s}:</span>
                  <span id="w7-val-seg-${s}" style="font-weight:bold; color:var(--text-muted);">0 (OFF)</span>
                </div>
              `).join('')}
            </div>

            <div style="margin-top:1rem; padding:8px 12px; background:rgba(0,0,0,0.3); border-radius:6px; font-size:0.82rem; color:var(--text-muted); text-align:center;" id="w7-bcd-segments-list">
              Segmen Aktif: a, b, c, d, e, f
            </div>
          </div>

        </div>

        <!-- Feedback & Validation Box -->
        <div id="w7-bcd-feedback-box" style="margin-top:1.5rem; padding:1rem 1.25rem; border-radius:8px; font-size:0.92rem; line-height:1.6; background:rgba(16,185,129,0.1); border:1px solid var(--accent-emerald); color:var(--accent-emerald);">
          <strong>Kombinasi BCD Valid (0000₂ = Desimal 0):</strong> Seluruh segmen luar a, b, c, d, e, f menyala membentuk angka nol. Segmen tengah g mati.
        </div>

      </div>
    `)}
  `;
  if (el) el.innerHTML = _html_;
  if (typeof window !== 'undefined' && window.w7UpdateBcdDisplay) {
    setTimeout(window.w7UpdateBcdDisplay, 10);
  }
  return _html_;
}

// BCD Simulator State & Interactive Logic
window.w7BcdState = { a: 0, b: 0, c: 0, d: 0, mode: 'CC' };

// Standard 7-Segment Common Cathode Lookup Table (1 = ON, 0 = OFF)
// Segments order: [a, b, c, d, e, f, g]
window.w7BcdTableCC = {
  0: [1, 1, 1, 1, 1, 1, 0], // digit 0
  1: [0, 1, 1, 0, 0, 0, 0], // digit 1
  2: [1, 1, 0, 1, 1, 0, 1], // digit 2
  3: [1, 1, 1, 1, 0, 0, 1], // digit 3
  4: [0, 1, 1, 0, 0, 1, 1], // digit 4
  5: [1, 0, 1, 1, 0, 1, 1], // digit 5
  6: [1, 0, 1, 1, 1, 1, 1], // digit 6
  7: [1, 1, 1, 0, 0, 0, 0], // digit 7
  8: [1, 1, 1, 1, 1, 1, 1], // digit 8
  9: [1, 1, 1, 1, 0, 1, 1]  // digit 9
};

window.w7ToggleBcd = function(pin) {
  if (window.w7BcdState[pin] !== undefined) {
    window.w7BcdState[pin] = window.w7BcdState[pin] === 0 ? 1 : 0;
    window.w7UpdateBcdDisplay();
  }
};

window.w7SetBcdMode = function(mode) {
  window.w7BcdState.mode = mode;
  const btnCC = document.getElementById('w7-btn-mode-cc');
  const btnCA = document.getElementById('w7-btn-mode-ca');
  const modeDesc = document.getElementById('w7-mode-desc');

  if (btnCC && btnCA) {
    if (mode === 'CC') {
      btnCC.style.background = 'var(--accent-emerald)';
      btnCC.style.color = '#000';
      btnCA.style.background = 'rgba(255,255,255,0.08)';
      btnCA.style.color = 'var(--text-secondary)';
      if (modeDesc) modeDesc.textContent = 'Mode Common Cathode (Aktif-HIGH): Logika 1 = Segmen Menyala.';
    } else {
      btnCA.style.background = 'var(--accent-rose)';
      btnCA.style.color = '#fff';
      btnCC.style.background = 'rgba(255,255,255,0.08)';
      btnCC.style.color = 'var(--text-secondary)';
      if (modeDesc) modeDesc.textContent = 'Mode Common Anode (Aktif-LOW): Logika 0 = Segmen Menyala.';
    }
  }
  window.w7UpdateBcdDisplay();
};

window.w7UpdateBcdDisplay = function() {
  const s = window.w7BcdState;
  ['a', 'b', 'c', 'd'].forEach(p => {
    const el = document.getElementById('w7-btn-bcd-' + p);
    if (el) el.textContent = s[p];
  });

  const decVal = (s.a << 3) | (s.b << 2) | (s.c << 1) | s.d;
  const binStr = '' + s.a + s.b + s.c + s.d;

  const segNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  const digitBadge = document.getElementById('w7-bcd-digit-badge');
  const fbBox = document.getElementById('w7-bcd-feedback-box');
  const segList = document.getElementById('w7-bcd-segments-list');

  const isCC = (s.mode === 'CC');
  const litColor = isCC ? 'var(--accent-cyan)' : 'var(--accent-rose)';
  const litGlow = isCC ? '0 0 12px rgba(0,210,255,0.8)' : '0 0 12px rgba(244,63,94,0.8)';
  const offColor = 'rgba(255,255,255,0.06)';

  if (decVal <= 9) {
    // Valid BCD digit 0-9
    const patternCC = window.w7BcdTableCC[decVal];
    const litSegments = [];

    segNames.forEach((seg, idx) => {
      const isLit = patternCC[idx] === 1;
      // In CC: logic 1 = lit. In CA: logic 0 = lit.
      const logicSignal = isCC ? (isLit ? 1 : 0) : (isLit ? 0 : 1);

      if (isLit) litSegments.push(seg);

      const polyEl = document.getElementById('w7-seg-' + seg);
      if (polyEl) {
        polyEl.setAttribute('fill', isLit ? litColor : offColor);
        polyEl.style.filter = isLit ? 'drop-shadow(' + litGlow + ')' : 'none';
      }

      const valEl = document.getElementById('w7-val-seg-' + seg);
      const chipEl = document.getElementById('w7-chip-seg-' + seg);
      if (valEl) {
        valEl.textContent = logicSignal + (isLit ? ' (ON)' : ' (OFF)');
        valEl.style.color = isLit ? litColor : 'var(--text-muted)';
      }
      if (chipEl) {
        chipEl.style.borderColor = isLit ? litColor : 'rgba(255,255,255,0.06)';
      }
    });

    if (digitBadge) {
      digitBadge.textContent = decVal;
      digitBadge.style.color = litColor;
    }

    if (segList) {
      segList.textContent = 'Segmen Aktif: ' + (litSegments.length > 0 ? litSegments.join(', ') : 'Tidak ada');
    }

    if (fbBox) {
      fbBox.style.background = isCC ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)';
      fbBox.style.borderColor = isCC ? 'var(--accent-emerald)' : 'var(--accent-rose)';
      fbBox.style.color = isCC ? 'var(--accent-emerald)' : 'var(--accent-rose)';
      fbBox.innerHTML = '<strong>Kombinasi BCD Valid:</strong> ' + binStr + '₂ = <strong>Digit Desimal ' + decVal + '</strong> (' + (isCC ? 'Common Cathode' : 'Common Anode') + '). Segmen aktif: <strong>' + litSegments.join(', ') + '</strong>.';
    }
  } else {
    // Invalid BCD (10 - 15)
    segNames.forEach(seg => {
      const polyEl = document.getElementById('w7-seg-' + seg);
      if (polyEl) {
        // Display a dash on middle segment 'g' to indicate error/dash
        if (seg === 'g') {
          polyEl.setAttribute('fill', 'var(--accent-amber)');
          polyEl.style.filter = 'drop-shadow(0 0 10px rgba(245,158,11,0.8))';
        } else {
          polyEl.setAttribute('fill', offColor);
          polyEl.style.filter = 'none';
        }
      }

      const valEl = document.getElementById('w7-val-seg-' + seg);
      const chipEl = document.getElementById('w7-chip-seg-' + seg);
      if (valEl) {
        valEl.textContent = 'X (Don&#39;t Care)';
        valEl.style.color = 'var(--accent-amber)';
      }
      if (chipEl) chipEl.style.borderColor = 'rgba(255,255,255,0.06)';
    });

    if (digitBadge) {
      digitBadge.textContent = '-';
      digitBadge.style.color = 'var(--accent-amber)';
    }

    if (segList) {
      segList.textContent = 'Status Segmen: Don&#39;t Care (X)';
    }

    if (fbBox) {
      fbBox.style.background = 'rgba(245,158,11,0.15)';
      fbBox.style.borderColor = 'var(--accent-amber)';
      fbBox.style.color = 'var(--accent-amber)';
      fbBox.innerHTML = "⚠️ <strong>KOMBINASI BCD ILEGAL / TIDAK VALID:</strong> Input biner <strong>" + binStr + "₂ (Desimal " + decVal + ")</strong> berada di luar rentang digit desimal tunggal (0–9). Pada BCD standar 8421, kondisi minterm 10 s.d. 15 diperlakukan sebagai <em>Don't Care (X)</em> pada perancangan logika.";
    }
  }
};


/* ==========================================================================
   SECTION: w7_part10_exercises_quiz.js
   ========================================================================== */
// Part 10: Exercises 1-6, Interactive Quiz (5 MCQs), and 2 Essay Questions
function renderWeek7Exercises(el) {
  const _html_ = `
    <div class="content-header">
      <div class="breadcrumb">
        <a href="#" onclick="navigateTo('home')">Home</a> / 
        <a href="#" onclick="selectWeek(7)">Minggu 7</a> / 
        Latihan & Evaluasi
      </div>
      <h1 class="content-title">Latihan Mandiri & Evaluasi Kompetensi Minggu 7</h1>
      <p class="content-subtitle">Uji pemahaman mendalam: analisis decoder, priority encoder, BCD 8421, dan seven-segment</p>
    </div>

    ${w7Alert('info', '<strong>Petunjuk Pengerjaan:</strong><br>' +
      'Kerjakan setiap soal latihan (Latihan 1–6) secara mandiri terlebih dahulu, kemudian buka panel pembahasan untuk memeriksa ketepatan jawaban Anda. Di bagian akhir, kerjakan <strong>Kuis Interaktif 5 Soal</strong> untuk mengukur skor pemahaman Anda secara instan.'
    )}

    ${w7Section('Bagian 1: Latihan Studi Kasus (Latihan 1 s.d. 6)', `
      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        
        <!-- Latihan 1 -->
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <h4 style="color:var(--accent-cyan); margin:0;">Latihan 1: Analisis Output Decoder 2-to-4</h4>
            <span style="font-size:0.8rem; padding:2px 8px; border-radius:4px; background:rgba(0,210,255,0.1); color:var(--accent-cyan);">Dasar Decoder</span>
          </div>
          <p style="color:var(--text-secondary); line-height:1.6;">
            Diberikan decoder 2-to-4 aktif-HIGH dengan input biner <strong>A = 1</strong> (MSB) dan <strong>B = 0</strong> (LSB). Tentukan:
            <br>1. Output manakah yang aktif (bernilai 1)?
            <br>2. Tuliskan persamaan Boolean untuk output tersebut!
            <br>3. Berapakah nilai kombinasi ketiga output lainnya?
          </p>
          ${w7Spoiler('Lihat Pembahasan Lengkap Latihan 1', `
            <div style="font-size:0.92rem; line-height:1.7; color:var(--text-secondary);">
              <strong>Pembahasan Latihan 1:</strong><br>
              1. Input biner $AB = 10_2$ setara dengan nilai desimal <strong>2</strong>. Maka output yang aktif adalah <strong>Y₂</strong>.<br>
              2. Persamaan Boolean untuk output $Y_2$ adalah: <code>Y₂ = A · B'</code>.<br>
              3. Karena ini adalah decoder aktif-HIGH tanpa kondisi ambigu, hanya ada satu output yang aktif. Maka ketiga output lainnya bernilai 0: <strong>Y₀ = 0, Y₁ = 0, dan Y₃ = 0</strong> (Pola: $Y_3 Y_2 Y_1 Y_0 = 0100_2$).
            </div>
          `)}
        </div>

        <!-- Latihan 2 -->
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <h4 style="color:var(--accent-cyan); margin:0;">Latihan 2: Penguraian Alamat Decoder 3-to-8</h4>
            <span style="font-size:0.8rem; padding:2px 8px; border-radius:4px; background:rgba(0,210,255,0.1); color:var(--accent-cyan);">Decoder 3:8</span>
          </div>
          <p style="color:var(--text-secondary); line-height:1.6;">
            Pada decoder 3-to-8 aktif-HIGH, diberikan kombinasi sinyal masukan <strong>A₂ A₁ A₀ = 101₂</strong>. Tentukan output yang aktif dan jelaskan langkah perhitungan untuk menentukan indeks output tersebut!
          </p>
          ${w7Spoiler('Lihat Pembahasan Lengkap Latihan 2', `
            <div style="font-size:0.92rem; line-height:1.7; color:var(--text-secondary);">
              <strong>Pembahasan Latihan 2:</strong><br>
              Langkah penentuan indeks:<br>
              Konversikan bilangan biner 3-bit ke desimal dengan rumus bobot posisi:<br>
              $\\text{Desimal} = (A_2 \\times 2^2) + (A_1 \\times 2^1) + (A_0 \\times 2^0) = (1 \\times 4) + (0 \\times 2) + (1 \\times 1) = 4 + 0 + 1 = \\mathbf{5}$.<br>
              Maka output yang aktif adalah <strong>Y₅</strong>.<br>
              Persamaan minterm: <code>Y₅ = A₂ · A₁' · A₀</code>. Seluruh output lainnya ($Y_0, Y_1, Y_2, Y_3, Y_4, Y_6, Y_7$) bernilai logika 0.
            </div>
          `)}
        </div>

        <!-- Latihan 3 -->
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <h4 style="color:var(--accent-violet); margin:0;">Latihan 3: Pengkodean Biner Encoder 4-to-2</h4>
            <span style="font-size:0.8rem; padding:2px 8px; border-radius:4px; background:rgba(124,58,237,0.1); color:var(--accent-violet);">Dasar Encoder</span>
          </div>
          <p style="color:var(--text-secondary); line-height:1.6;">
            Sebuah encoder 4-to-2 menerima sinyal di mana hanya jalur <strong>D₂ = 1</strong> dan input lainnya ($D_0, D_1, D_3$) bernilai 0. Berapakah nilai keluaran biner <strong>A₁ A₀</strong> dan berapa nilai desimal yang direpresentasikan?
          </p>
          ${w7Spoiler('Lihat Pembahasan Lengkap Latihan 3', `
            <div style="font-size:0.92rem; line-height:1.7; color:var(--text-secondary);">
              <strong>Pembahasan Latihan 3:</strong><br>
              Berdasarkan persamaan logika gerbang OR encoder 4-to-2:<br>
              &bull; $A_1 = D_2 + D_3 = 1 + 0 = \\mathbf{1}$<br>
              &bull; $A_0 = D_1 + D_3 = 0 + 0 = \\mathbf{0}$<br>
              Maka keluaran biner adalah <strong>A₁ A₀ = 10₂</strong>.<br>
              Nilai desimal yang direpresentasikan adalah <strong>2</strong> (sesuai dengan nomor indeks jalur masukan yang aktif, yaitu $D_2$).
            </div>
          `)}
        </div>

        <!-- Latihan 4 -->
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <h4 style="color:var(--accent-violet); margin:0;">Latihan 4: Arbitrasi Multi-Input pada Priority Encoder</h4>
            <span style="font-size:0.8rem; padding:2px 8px; border-radius:4px; background:rgba(124,58,237,0.1); color:var(--accent-violet);">Priority Logic</span>
          </div>
          <p style="color:var(--text-secondary); line-height:1.6;">
            Pada Priority Encoder 8-to-3 (dengan $D_7$ berprioritas tertinggi dan $D_0$ terendah), dua input aktif secara bersamaan, yaitu <strong>D₆ = 1</strong> dan <strong>D₂ = 1</strong>. Jalur manakah yang dimenangkan oleh sistem dan berapakah output biner <strong>Y₂ Y₁ Y₀</strong> yang dihasilkan?
          </p>
          ${w7Spoiler('Lihat Pembahasan Lengkap Latihan 4', `
            <div style="font-size:0.92rem; line-height:1.7; color:var(--text-secondary);">
              <strong>Pembahasan Latihan 4:</strong><br>
              Sesuai aturan prioritas: $D_7 > D_6 > D_5 > D_4 > D_3 > D_2 > D_1 > D_0$.<br>
              Karena indeks 6 lebih tinggi daripada indeks 2 ($6 > 2$), maka sinyal <strong>D₆ mendapatkan prioritas</strong> dan sinyal $D_2$ diabaikan sepenuhnya (Don't Care).<br>
              Output mengodekan nilai 6 dalam biner 3-bit: <strong>Y₂ Y₁ Y₀ = 110₂</strong>.
            </div>
          `)}
        </div>

        <!-- Latihan 5 -->
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <h4 style="color:var(--accent-amber); margin:0;">Latihan 5: Konversi & Validasi Kode BCD 8421</h4>
            <span style="font-size:0.8rem; padding:2px 8px; border-radius:4px; background:rgba(245,158,11,0.1); color:var(--accent-amber);">Kode BCD</span>
          </div>
          <p style="color:var(--text-secondary); line-height:1.6;">
            1. Ubahlah digit desimal <strong>7</strong> menjadi kode BCD 8421!<br>
            2. Berapakah nilai desimal dari kode BCD <strong>1001₂</strong>?<br>
            3. Mengapa kode biner <strong>1010₂</strong> tidak termasuk kode BCD yang valid?
          </p>
          ${w7Spoiler('Lihat Pembahasan Lengkap Latihan 5', `
            <div style="font-size:0.92rem; line-height:1.7; color:var(--text-secondary);">
              <strong>Pembahasan Latihan 5:</strong><br>
              1. Digit 7 desimal diubah ke BCD 8421: $7 = 4 + 2 + 1 &rArr; \\mathbf{0111_{BCD}}$.<br>
              2. Kode BCD $1001_2$ memiliki bobot $(1 \\times 8) + (0 \\times 4) + (0 \\times 2) + (1 \\times 1) = 8 + 1 = \\mathbf{9}$ desimal.<br>
              3. Kode biner $1010_2$ bernilai 10 desimal. BCD (Binary Coded Decimal) hanya dirancang untuk mengodekan <em>satu digit desimal tunggal</em> (angka 0 s.d. 9 per kelompok 4-bit). Untuk bilangan 10 desimal, dalam BCD harus ditulis dengan dua nibble: <code>0001 0000</code>. Oleh karena itu, $1010_2$ adalah kode ilegal/terlarang dalam representasi BCD 1 digit.
            </div>
          `)}
        </div>

        <!-- Latihan 6 -->
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <h4 style="color:var(--accent-emerald); margin:0;">Latihan 6: Pemetaan Segmen LED Display</h4>
            <span style="font-size:0.8rem; padding:2px 8px; border-radius:4px; background:rgba(16,185,129,0.1); color:var(--accent-emerald);">Seven-Segment</span>
          </div>
          <p style="color:var(--text-secondary); line-height:1.6;">
            Tentukan segmen mana saja yang harus MENYALA untuk menampilkan angka desimal <strong>2</strong> pada seven-segment display mode Common Cathode! Bagaimanakah perbedaan polaritas outputnya jika display diganti menjadi mode Common Anode?
          </p>
          ${w7Spoiler('Lihat Pembahasan Lengkap Latihan 6', `
            <div style="font-size:0.92rem; line-height:1.7; color:var(--text-secondary);">
              <strong>Pembahasan Latihan 6:</strong><br>
              1. Untuk menampilkan angka <strong>2</strong>, segmen yang harus menyala adalah: <strong>a, b, d, e, dan g</strong> (segmen c dan f mati).<br>
              2. Pada display <strong>Common Cathode (Aktif-HIGH)</strong>:<br>
              Logika 1 = Menyala, Logika 0 = Mati.<br>
              Keluaran segmen: <code>[a=1, b=1, c=0, d=1, e=1, f=0, g=1]</code>.<br>
              3. Pada display <strong>Common Anode (Aktif-LOW)</strong>:<br>
              Logika 0 = Menyala, Logika 1 = Mati (polaritas terbalik).<br>
              Keluaran segmen: <code>[a=0, b=0, c=1, d=0, e=0, f=1, g=0]</code>.
            </div>
          `)}
        </div>

      </div>
    `)}

    ${w7Section('Bagian 2: Kuis Interaktif Mandiri Minggu 7', `
      <p style="color:var(--text-secondary); line-height:1.6; margin-bottom:1.5rem;">
        Pilihlah satu jawaban yang paling tepat pada setiap soal di bawah ini, lalu klik tombol <strong>"Periksa Jawaban"</strong>. Skor Anda akan dihitung secara langsung.
      </p>

      <!-- Score Box -->
      <div id="w7-quiz-score-box" class="card" style="margin-bottom:1.5rem; background:rgba(0,210,255,0.05); border:1px solid rgba(0,210,255,0.3); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
        <div>
          <span style="font-size:1.1rem; font-weight:bold; color:var(--text-primary);">Skor Kuis Anda: </span>
          <span id="w7-quiz-score-txt" style="font-size:1.4rem; font-weight:bold; color:var(--accent-cyan);">0 / 5</span>
        </div>
        <button onclick="w7ResetQuiz()" class="btn" style="background:rgba(255,255,255,0.1); border:1px solid var(--border-color);">
          🔄 Ulangi Kuis
        </button>
      </div>

      <div style="display:flex; flex-direction:column; gap:1.5rem;">
        
        <!-- Question 1 -->
        <div class="card" id="w7-q1-card">
          <div style="font-weight:bold; color:var(--accent-cyan); margin-bottom:0.5rem;">Pertanyaan 1 dari 5:</div>
          <p style="color:var(--text-primary); font-size:1rem; margin-bottom:1rem;">
            Sebuah decoder biner memiliki 3 bit input ($n = 3$). Berapakah jumlah maksimum jalur output yang dimiliki oleh decoder tersebut?
          </p>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="radio" name="w7_q1" value="A"> A. 3 jalur output</label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="radio" name="w7_q1" value="B"> B. 6 jalur output</label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="radio" name="w7_q1" value="C"> C. 8 jalur output</label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="radio" name="w7_q1" value="D"> D. 16 jalur output</label>
          </div>
          <div style="margin-top:1rem;">
            <button onclick="w7CheckAnswer(1, 'C')" class="btn" style="background:var(--accent-cyan); color:#000; font-weight:bold;">Periksa Jawaban</button>
          </div>
          <div id="w7-q1-feedback" style="display:none; margin-top:1rem; padding:0.75rem; border-radius:8px;"></div>
        </div>

        <!-- Question 2 -->
        <div class="card" id="w7-q2-card">
          <div style="font-weight:bold; color:var(--accent-violet); margin-bottom:0.5rem;">Pertanyaan 2 dari 5:</div>
          <p style="color:var(--text-primary); font-size:1rem; margin-bottom:1rem;">
            Pada decoder 2-to-4 yang dilengkapi pin Enable aktif-HIGH ($E$), apa yang terjadi pada seluruh jalur output ($Y_0 - Y_3$) ketika sinyal $E = 0$?
          </p>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="radio" name="w7_q2" value="A"> A. Seluruh output bernilai 0 (nonaktif).</label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="radio" name="w7_q2" value="B"> B. Seluruh output bernilai 1.</label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="radio" name="w7_q2" value="C"> C. Output Y₀ tetap aktif.</label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="radio" name="w7_q2" value="D"> D. Decoder mengalami hubung singkat (short circuit).</label>
          </div>
          <div style="margin-top:1rem;">
            <button onclick="w7CheckAnswer(2, 'A')" class="btn" style="background:var(--accent-violet); color:#fff; font-weight:bold;">Periksa Jawaban</button>
          </div>
          <div id="w7-q2-feedback" style="display:none; margin-top:1rem; padding:0.75rem; border-radius:8px;"></div>
        </div>

        <!-- Question 3 -->
        <div class="card" id="w7-q3-card">
          <div style="font-weight:bold; color:var(--accent-amber); margin-bottom:0.5rem;">Pertanyaan 3 dari 5:</div>
          <p style="color:var(--text-primary); font-size:1rem; margin-bottom:1rem;">
            Pada Priority Encoder 8-to-3 di mana $D_7$ memiliki prioritas tertinggi, jika jalur $D_7$ dan $D_3$ sama-sama bernilai 1, berapakah output biner $Y_2 Y_1 Y_0$?
          </p>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="radio" name="w7_q3" value="A"> A. 011₂ (desimal 3)</label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="radio" name="w7_q3" value="B"> B. 101₂ (desimal 5)</label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="radio" name="w7_q3" value="C"> C. 111₂ (desimal 7)</label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="radio" name="w7_q3" value="D"> D. 000₂ (desimal 0)</label>
          </div>
          <div style="margin-top:1rem;">
            <button onclick="w7CheckAnswer(3, 'C')" class="btn" style="background:var(--accent-amber); color:#000; font-weight:bold;">Periksa Jawaban</button>
          </div>
          <div id="w7-q3-feedback" style="display:none; margin-top:1rem; padding:0.75rem; border-radius:8px;"></div>
        </div>

        <!-- Question 4 -->
        <div class="card" id="w7-q4-card">
          <div style="font-weight:bold; color:var(--accent-emerald); margin-bottom:0.5rem;">Pertanyaan 4 dari 5:</div>
          <p style="color:var(--text-primary); font-size:1rem; margin-bottom:1rem;">
            Bagaimanakah penulisan bilangan desimal 59 dalam format sistem kode BCD 8421?
          </p>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="radio" name="w7_q4" value="A"> A. 111011</label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="radio" name="w7_q4" value="B"> B. 0101 1001</label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="radio" name="w7_q4" value="C"> C. 1001 0101</label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="radio" name="w7_q4" value="D"> D. 0101 1010</label>
          </div>
          <div style="margin-top:1rem;">
            <button onclick="w7CheckAnswer(4, 'B')" class="btn" style="background:var(--accent-emerald); color:#fff; font-weight:bold;">Periksa Jawaban</button>
          </div>
          <div id="w7-q4-feedback" style="display:none; margin-top:1rem; padding:0.75rem; border-radius:8px;"></div>
        </div>

        <!-- Question 5 -->
        <div class="card" id="w7-q5-card">
          <div style="font-weight:bold; color:var(--accent-rose); margin-bottom:0.5rem;">Pertanyaan 5 dari 5:</div>
          <p style="color:var(--text-primary); font-size:1rem; margin-bottom:1rem;">
            Pada seven-segment display jenis <strong>Common Anode (CA)</strong>, kondisi logika apakah yang menyebabkan segmen LED menyala?
          </p>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="radio" name="w7_q5" value="A"> A. Logika 1 (HIGH / +5V)</label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="radio" name="w7_q5" value="B"> B. Logika 0 (LOW / GND / 0V)</label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="radio" name="w7_q5" value="C"> C. Sinyal clock frekuensi tinggi</label>
            <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer;"><input type="radio" name="w7_q5" value="D"> D. Logika mengambang (high-impedance / Hi-Z)</label>
          </div>
          <div style="margin-top:1rem;">
            <button onclick="w7CheckAnswer(5, 'B')" class="btn" style="background:var(--accent-rose); color:#fff; font-weight:bold;">Periksa Jawaban</button>
          </div>
          <div id="w7-q5-feedback" style="display:none; margin-top:1rem; padding:0.75rem; border-radius:8px;"></div>
        </div>

      </div>
    `)}

    ${w7Section('Bagian 3: Pertanyaan Refleksi & Pemikiran Kritis (Essay)', `
      <div style="display:flex; flex-direction:column; gap:1.25rem;">
        
        <div class="card">
          <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;">Essay 1: Analisis Address Decoding pada Perluasan Memori Komputer</h4>
          <p style="color:var(--text-secondary); line-height:1.6;">
            Jelaskan bagaimana sebuah Decoder 3-to-8 dapat digunakan oleh CPU untuk memilih 8 chip memori RAM yang masing-masing berkapasitas 1 KB! Mengapa decoder sangat krusial dalam pencegahan <em>bus contention</em> (tabrakan bus data)?
          </p>
          ${w7Spoiler('Lihat Penjelasan Akademik Essay 1', `
            <div style="font-size:0.92rem; line-height:1.7; color:var(--text-secondary);">
              <strong>Jawaban:</strong><br>
              1. <strong>Pemetaan Alamat:</strong> Untuk memilih alamat internal dalam 1 KB ($1024 = 2^{10}$ byte), dibutuhkan 10 bit alamat terendah ($A_0 - A_9$). Tiga bit alamat berikutnya berbobot lebih tinggi ($A_{10}, A_{11}, A_{12}$) dihubungkan ke input decoder 3-to-8.<br>
              2. Kedelapan output decoder ($Y_0 - Y_7$) masing-masing dihubungkan ke pin <em>Chip Select (CS)</em> dari kedelapan chip RAM.<br>
              3. <strong>Pencegahan Bus Contention:</strong> Pada bus komputer bersama (shared data bus), jika ada dua chip memori yang mencoba mengirim data ke bus secara bersamaan, akan terjadi arus hubung singkat dan data korup (bus contention). Karena sifat alami decoder adalah <em>one-hot</em> (tepat hanya satu output yang aktif), decoder menjamin <strong>hanya satu chip memori saja yang diizinkan mengendalikan bus data</strong> pada satu waktu.
            </div>
          `)}
        </div>

        <div class="card">
          <h4 style="color:var(--accent-violet); margin-bottom:0.5rem;">Essay 2: Kebutuhan Priority Encoder pada Sistem Interupsi Real-Time</h4>
          <p style="color:var(--text-secondary); line-height:1.6;">
            Mengapa sistem operasi dan arsitektur mikroprosesor real-time (seperti pada sistem kendali rem ABS otomotif atau instrumen medis) mutlak membutuhkan Priority Encoder untuk menangani sinyal <em>Interrupt Request (IRQ)</em>?
          </p>
          ${w7Spoiler('Lihat Penjelasan Akademik Essay 2', `
            <div style="font-size:0.92rem; line-height:1.7; color:var(--text-secondary);">
              <strong>Jawaban:</strong><br>
              Dalam sistem komputasi real-time, beberapa perangkat keras eksternal dapat meminta perhatian CPU secara bersamaan (misal: sensor tabrakan darurat airbag, sensor kecepatan roda ABS, dan pemutar musik kabin).<br>
              Jika menggunakan encoder biasa, sinyal-sinyal interupsi tersebut akan bercampur menjadi kode biner salah yang tidak dikenali CPU.<br>
              Dengan <strong>Priority Encoder</strong>, sinyal keselamatan darurat (seperti deteksi tabrakan) dialokasikan pada pin prioritas tertinggi ($D_7$). Sistem menjamin prosesor segera mengeksekusi instruksi penyelamatan kritis tanpa tertunda oleh perangkat non-kritis lainnya.
            </div>
          `)}
        </div>

      </div>
    `)}
  `;
  if (el) el.innerHTML = _html_;
  if (typeof window !== 'undefined' && window.w7UpdateQuizScore) {
    setTimeout(window.w7UpdateQuizScore, 10);
  }
  return _html_;
}

// Interactive Quiz Logic for Week 7
window.w7QuizResults = {};

window.w7CheckAnswer = function(qNum, correctVal) {
  const radios = document.getElementsByName('w7_q' + qNum);
  let selected = null;
  for (let r of radios) {
    if (r.checked) {
      selected = r.value;
      break;
    }
  }

  const fb = document.getElementById('w7-q' + qNum + '-feedback');
  if (!selected) {
    if (fb) {
      fb.style.display = 'block';
      fb.style.background = 'rgba(245,158,11,0.15)';
      fb.style.border = '1px solid var(--accent-amber)';
      fb.style.color = 'var(--accent-amber)';
      fb.innerHTML = '⚠️ Silakan pilih salah satu opsi jawaban terlebih dahulu!';
    }
    return;
  }

  const isCorrect = (selected === correctVal);
  window.w7QuizResults[qNum] = isCorrect;

  if (fb) {
    fb.style.display = 'block';
    if (isCorrect) {
      fb.style.background = 'rgba(16,185,129,0.15)';
      fb.style.border = '1px solid var(--accent-emerald)';
      fb.style.color = 'var(--accent-emerald)';
      fb.innerHTML = '<strong>&check; Benar Sekali!</strong> ' + w7GetExplanation(qNum);
    } else {
      fb.style.background = 'rgba(244,63,94,0.15)';
      fb.style.border = '1px solid var(--accent-rose)';
      fb.style.color = 'var(--accent-rose)';
      fb.innerHTML = '<strong>&cross; Belum Tepat.</strong> Jawaban yang benar adalah <strong>' + correctVal + '</strong>. ' + w7GetExplanation(qNum);
    }
  }

  w7UpdateQuizScore();
};

window.w7GetExplanation = function(qNum) {
  switch(qNum) {
    case 1: return "Decoder dengan n bit input menghasilkan 2ⁿ jalur output. Untuk n = 3, jumlah output adalah 2³ = 8 jalur (Y₀ s.d. Y₇).";
    case 2: return "Ketika sinyal Enable (E) bernilai 0 (nonaktif), seluruh gerbang AND output dipaksa menghasilkan nilai 0 tanpa memedulikan nilai input biner.";
    case 3: return "Karena D₇ memiliki tingkat prioritas tertinggi di atas D₃, sistem memenangkan D₇ sehingga output mengodekan nilai 7 (111₂).";
    case 4: return "Sistem BCD 8421 mengodekan setiap digit desimal terpisah: digit 5 = 0101, digit 9 = 1001, sehingga digabungkan menjadi 0101 1001.";
    case 5: return "Pada Common Anode, kutub positif disatukan ke VCC, sehingga arus hanya mengalir ketika kutub katoda segmen diberi tegangan 0V / LOW (logika 0).";
    default: return "";
  }
};

window.w7UpdateQuizScore = function() {
  let score = 0;
  for (let k in window.w7QuizResults) {
    if (window.w7QuizResults[k] === true) score++;
  }
  const scoreTxt = document.getElementById('w7-quiz-score-txt');
  if (scoreTxt) {
    scoreTxt.textContent = score + ' / 5';
    scoreTxt.style.color = score >= 4 ? 'var(--accent-emerald)' : (score >= 2 ? 'var(--accent-amber)' : 'var(--accent-rose)');
  }
};

window.w7ResetQuiz = function() {
  window.w7QuizResults = {};
  for (let i = 1; i <= 5; i++) {
    const radios = document.getElementsByName('w7_q' + i);
    for (let r of radios) r.checked = false;
    const fb = document.getElementById('w7-q' + i + '-feedback');
    if (fb) fb.style.display = 'none';
  }
  w7UpdateQuizScore();
};



/* ───── WINDOW EXPORTS FOR TOPIC RENDERING ───── */
if (typeof window !== 'undefined') {
  window.renderWeek7Intro = renderWeek7Intro;
  window.renderWeek7DecoderBasics = renderWeek7DecoderBasics;
  window.renderWeek7Decoder3to8 = renderWeek7Decoder3to8;
  window.renderWeek7DecoderApps = renderWeek7DecoderApps;
  window.renderWeek7EncoderBasics = renderWeek7EncoderBasics;
  window.renderWeek7EncoderPriority = renderWeek7EncoderPriority;
  window.renderWeek7SevenSegment = renderWeek7SevenSegment;
  window.renderWeek7SimulatorBCD = renderWeek7SimulatorBCD;
  window.renderWeek7Exercises = renderWeek7Exercises;
}
