/**
 * week5.js — SisDik Learn: Pertemuan 5
 * ----------------------------------------
 * Materi: Rangkaian Adder dan Subtractor
 * Berisi seluruh render function untuk topik-topik Minggu 5.
 */

/* ───── HELPERS (w5 namespace) ───── */
function w5Section(title, accentVar, iconSvg, bodyHTML) {
  return `
    <div class="info-card" style="margin-bottom:28px;border-left:3px solid var(${accentVar})">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
        <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;background:var(${accentVar}-dim)">${iconSvg}</span>
        <h3 style="margin:0;font-size:1.05rem;font-weight:700;color:var(${accentVar})">${title}</h3>
      </div>
      <div>${bodyHTML}</div>
    </div>`;
}

function w5Code(lines, label) {
  const inner = Array.isArray(lines) ? lines.join('\n') : lines;
  return `<div style="margin:12px 0">${label ? `<p style="font-size:0.78rem;color:var(--text-faint);font-weight:600;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px">${label}</p>` : ''}
    <pre style="font-family:var(--font-mono);font-size:0.88rem;line-height:1.7;background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px 18px;overflow-x:auto;margin:0"><code>${inner}</code></pre></div>`;
}

function w5Step(n, text) {
  return `<div style="display:flex;align-items:flex-start;gap:12px;margin:10px 0">
    <span style="min-width:26px;height:26px;border-radius:50%;background:var(--accent-cyan-dim);border:1.5px solid var(--accent-cyan);color:var(--accent-cyan);font-size:0.78rem;font-weight:700;display:inline-flex;align-items:center;justify-content:center;margin-top:1px">${n}</span>
    <span style="font-size:0.95rem;line-height:1.6">${text}</span></div>`;
}

function w5Alert(type, text) {
  const map = { info:['var(--accent-cyan)','💡'], warning:['var(--accent-amber)','⚠️'], success:['var(--success)','✅'], danger:['var(--danger)','🚨'] };
  const [color, icon] = map[type] || map.info;
  return `<div style="display:flex;gap:10px;align-items:flex-start;background:var(--bg-inset);border-left:3px solid ${color};border-radius:0 8px 8px 0;padding:12px 14px;margin:14px 0;font-size:0.9rem;line-height:1.6">
    <span>${icon}</span><span>${text}</span></div>`;
}

function w5Table(headers, rows) {
  return `<div style="overflow-x:auto;margin:16px 0">
    <table style="width:100%;border-collapse:collapse;font-size:0.88rem">
      <thead><tr style="border-bottom:2px solid var(--line)">
        ${headers.map(h => `<th style="padding:10px 14px;text-align:center;color:var(--text-faint);font-weight:600;font-size:0.8rem;letter-spacing:.04em">${h}</th>`).join('')}
      </tr></thead>
      <tbody>${rows.map((r, i) => `<tr style="border-bottom:1px solid var(--line);${i % 2 === 0 ? 'background:var(--bg-inset)' : ''}">
        ${r.map(c => `<td style="padding:10px 14px;text-align:center;font-family:var(--font-mono);font-size:0.88rem">${c}</td>`).join('')}
      </tr>`).join('')}</tbody>
    </table></div>`;
}

function w5Spoiler(buttonLabel, contentHTML) {
  const uid = 'w5sp_' + Math.random().toString(36).substr(2, 9);
  return `<div style="margin:16px 0">
    <button type="button" onclick="(function(){var c=document.getElementById('${uid}');c.hidden=!c.hidden;this.querySelector('.sp-arrow').textContent=c.hidden?'▶':'▼'}).call(this)" style="display:flex;align-items:center;gap:8px;background:var(--accent-violet-dim);border:1px solid var(--accent-violet);color:var(--accent-violet);padding:10px 16px;border-radius:10px;cursor:pointer;font-size:0.88rem;font-weight:600;width:100%;text-align:left">
      <span class="sp-arrow">▶</span> ${buttonLabel}
    </button>
    <div id="${uid}" hidden style="background:var(--bg-inset);border:1px solid var(--line);border-radius:0 0 10px 10px;padding:16px 18px;margin-top:-2px">
      ${contentHTML}
    </div>
  </div>`;
}

/* ───── DIAGRAM SCHEMATIC SVG HELPERS ───── */

/* Half Adder Schematic SVG */
function w5SvgHalfAdder() {
  return `
    <div style="text-align:center;margin:18px 0;background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px">
      <svg width="380" height="170" viewBox="0 0 380 170" style="display:inline-block;max-width:100%">
        <!-- Input A -->
        <text x="20" y="45" font-size="13" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">A</text>
        <line x1="38" y1="42" x2="150" y2="42" stroke="var(--line-strong)" stroke-width="2"/>
        <circle cx="70" cy="42" r="3.5" fill="var(--accent-cyan)"/>
        <line x1="70" y1="42" x2="70" y2="120" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="70" y1="120" x2="150" y2="120" stroke="var(--line-strong)" stroke-width="2"/>

        <!-- Input B -->
        <text x="20" y="75" font-size="13" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">B</text>
        <line x1="38" y1="72" x2="150" y2="72" stroke="var(--line-strong)" stroke-width="2"/>
        <circle cx="100" cy="72" r="3.5" fill="var(--accent-violet)"/>
        <line x1="100" y1="72" x2="100" y2="142" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="100" y1="142" x2="150" y2="142" stroke="var(--line-strong)" stroke-width="2"/>

        <!-- XOR Gate (Sum = A ⊕ B) -->
        <path d="M 142 32 Q 157 57 142 82" fill="none" stroke="var(--accent-cyan)" stroke-width="2.2"/>
        <path d="M 150 32 Q 165 57 150 82 Q 190 82 208 57 Q 190 32 150 32 Z" fill="var(--accent-cyan-dim)" stroke="var(--accent-cyan)" stroke-width="2.2"/>
        <text x="168" y="61" font-size="10" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-ui)">XOR</text>
        <line x1="208" y1="57" x2="300" y2="57" stroke="var(--line-strong)" stroke-width="2"/>
        <circle cx="300" cy="57" r="4" fill="var(--accent-cyan)"/>
        <text x="312" y="61" font-size="13" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-mono)">S (Sum = A ⊕ B)</text>

        <!-- AND Gate (Carry = A · B) -->
        <path d="M 150 110 L 178 110 A 21 21 0 0 1 178 152 L 150 152 Z" fill="var(--accent-violet-dim)" stroke="var(--accent-violet)" stroke-width="2.2"/>
        <text x="163" y="135" font-size="10" font-weight="700" fill="var(--accent-violet)" font-family="var(--font-ui)">AND</text>
        <line x1="199" y1="131" x2="300" y2="131" stroke="var(--line-strong)" stroke-width="2"/>
        <circle cx="300" cy="131" r="4" fill="var(--accent-violet)"/>
        <text x="312" y="135" font-size="13" font-weight="800" fill="var(--accent-violet)" font-family="var(--font-mono)">C (Carry = A · B)</text>
      </svg>
      <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 5.1: Skematik Logika Half Adder (HA)</p>
    </div>`;
}

/* Full Adder Schematic SVG */
function w5SvgFullAdder() {
  return `
    <div style="text-align:center;margin:18px 0;background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px">
      <svg width="490" height="230" viewBox="0 0 490 230" style="display:inline-block;max-width:100%">
        <!-- Inputs A, B -->
        <text x="15" y="38" font-size="13" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">A</text>
        <line x1="32" y1="35" x2="90" y2="35" stroke="var(--line-strong)" stroke-width="2"/>
        <circle cx="50" cy="35" r="3.5" fill="var(--accent-cyan)"/>
        <line x1="50" y1="35" x2="50" y2="125" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="50" y1="125" x2="220" y2="125" stroke="var(--line-strong)" stroke-width="2"/>

        <text x="15" y="65" font-size="13" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">B</text>
        <line x1="32" y1="62" x2="90" y2="62" stroke="var(--line-strong)" stroke-width="2"/>
        <circle cx="70" cy="62" r="3.5" fill="var(--accent-violet)"/>
        <line x1="70" y1="62" x2="70" y2="145" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="70" y1="145" x2="220" y2="145" stroke="var(--line-strong)" stroke-width="2"/>

        <!-- XOR 1 (A ⊕ B) -->
        <path d="M 83 25 Q 96 48 83 71" fill="none" stroke="var(--accent-cyan)" stroke-width="2"/>
        <path d="M 90 25 Q 103 48 90 71 Q 125 71 140 48 Q 125 25 90 25 Z" fill="var(--accent-cyan-dim)" stroke="var(--accent-cyan)" stroke-width="2"/>
        <text x="103" y="52" font-size="9" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-ui)">XOR1</text>

        <!-- XOR 1 output -->
        <line x1="140" y1="48" x2="210" y2="48" stroke="var(--line-strong)" stroke-width="2"/>
        <circle cx="165" cy="48" r="3.5" fill="var(--accent-cyan)"/>
        <line x1="165" y1="48" x2="165" y2="185" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="165" y1="185" x2="220" y2="185" stroke="var(--line-strong)" stroke-width="2"/>

        <!-- Input Cin -->
        <text x="15" y="95" font-size="13" font-weight="700" fill="var(--accent-amber)" font-family="var(--font-mono)">Cin</text>
        <line x1="42" y1="92" x2="185" y2="92" stroke="var(--accent-amber)" stroke-width="2"/>
        <circle cx="185" cy="92" r="3.5" fill="var(--accent-amber)"/>
        <line x1="185" y1="92" x2="185" y2="68" stroke="var(--accent-amber)" stroke-width="2"/>
        <line x1="185" y1="68" x2="210" y2="68" stroke="var(--accent-amber)" stroke-width="2"/>
        <line x1="185" y1="92" x2="185" y2="205" stroke="var(--accent-amber)" stroke-width="2"/>
        <line x1="185" y1="205" x2="220" y2="205" stroke="var(--accent-amber)" stroke-width="2"/>

        <!-- XOR 2 (Sum = (A ⊕ B) ⊕ Cin) -->
        <path d="M 203 38 Q 216 58 203 78" fill="none" stroke="var(--success)" stroke-width="2"/>
        <path d="M 210 38 Q 223 58 210 78 Q 245 78 260 58 Q 245 38 210 38 Z" fill="var(--success-dim)" stroke="var(--success)" stroke-width="2"/>
        <text x="223" y="62" font-size="9" font-weight="700" fill="var(--success)" font-family="var(--font-ui)">XOR2</text>
        <line x1="260" y1="58" x2="380" y2="58" stroke="var(--line-strong)" stroke-width="2"/>
        <circle cx="380" cy="58" r="4" fill="var(--success)"/>
        <text x="392" y="62" font-size="13" font-weight="800" fill="var(--success)" font-family="var(--font-mono)">S (Sum = A ⊕ B ⊕ Cin)</text>

        <!-- AND 1 (A · B) -->
        <path d="M 220 115 L 242 115 A 18 18 0 0 1 242 151 L 220 151 Z" fill="var(--accent-violet-dim)" stroke="var(--accent-violet)" stroke-width="2"/>
        <text x="228" y="137" font-size="9" font-weight="700" fill="var(--accent-violet)" font-family="var(--font-ui)">AND</text>
        <line x1="260" y1="133" x2="310" y2="133" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="310" y1="133" x2="310" y2="153" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="310" y1="153" x2="330" y2="153" stroke="var(--line-strong)" stroke-width="2"/>

        <!-- AND 2 (Cin · (A ⊕ B)) -->
        <path d="M 220 175 L 242 175 A 18 18 0 0 1 242 211 L 220 211 Z" fill="var(--accent-amber-dim)" stroke="var(--accent-amber)" stroke-width="2"/>
        <text x="228" y="197" font-size="9" font-weight="700" fill="var(--accent-amber)" font-family="var(--font-ui)">AND</text>
        <line x1="260" y1="193" x2="310" y2="193" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="310" y1="193" x2="310" y2="173" stroke="var(--line-strong)" stroke-width="2"/>
        <line x1="310" y1="173" x2="330" y2="173" stroke="var(--line-strong)" stroke-width="2"/>

        <!-- OR Gate (Cout) -->
        <path d="M 330 145 Q 343 163 330 181 Q 365 181 380 163 Q 365 145 330 145 Z" fill="var(--danger-dim)" stroke="var(--danger)" stroke-width="2"/>
        <text x="345" y="167" font-size="9" font-weight="700" fill="var(--danger)" font-family="var(--font-ui)">OR</text>
        <line x1="380" y1="163" x2="430" y2="163" stroke="var(--line-strong)" stroke-width="2"/>
        <circle cx="430" cy="163" r="4" fill="var(--danger)"/>
        <text x="440" y="167" font-size="13" font-weight="800" fill="var(--danger)" font-family="var(--font-mono)">Cout</text>
      </svg>
      <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 5.2: Skematik Logika Full Adder (FA) yang tersusun dari 2 HA dan 1 OR</p>
    </div>`;
}

/* 4-Bit Ripple Carry Adder Schematic SVG */
function w5SvgRCA4() {
  const boxW = 85, boxH = 95;
  const gap = 35;
  const ox = 30, oy = 55;
  return `
    <div style="text-align:center;margin:18px 0;background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px;overflow-x:auto">
      <svg width="580" height="210" viewBox="0 0 580 210" style="display:inline-block;min-width:540px;max-width:100%">
        <!-- Global Initial Cin on right -->
        <text x="545" y="106" font-size="12" font-weight="700" fill="var(--accent-amber)" font-family="var(--font-mono)">Cin (0)</text>
        <line x1="535" y1="102" x2="480" y2="102" stroke="var(--accent-amber)" stroke-width="2.5" marker-end="url(#arrAmber)"/>
        <polygon points="485,102 492,98 492,106" fill="var(--accent-amber)"/>

        <!-- 4 Full Adder Blocks (FA3 on left, FA0 on right) -->
        ${[3, 2, 1, 0].map((bit, idx) => {
          const x = ox + idx * (boxW + gap);
          return `
            <!-- Box FA${bit} -->
            <rect x="${x}" y="${oy}" width="${boxW}" height="${boxH}" rx="10" fill="var(--bg-card)" stroke="var(--accent-cyan)" stroke-width="2"/>
            <text x="${x + boxW/2}" y="${oy + 25}" text-anchor="middle" font-size="13" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-ui)">FA ${bit}</text>
            <text x="${x + boxW/2}" y="${oy + 42}" text-anchor="middle" font-size="9" fill="var(--text-faint)" font-family="var(--font-mono)">(Bit ${bit})</text>

            <!-- Inputs A and B from top -->
            <line x1="${x + 25}" y1="15" x2="${x + 25}" y2="${oy}" stroke="var(--line-strong)" stroke-width="2"/>
            <text x="${x + 25}" y="10" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">A${bit}</text>

            <line x1="${x + 60}" y1="15" x2="${x + 60}" y2="${oy}" stroke="var(--line-strong)" stroke-width="2"/>
            <text x="${x + 60}" y="10" text-anchor="middle" font-size="11" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">B${bit}</text>

            <!-- Output Sum to bottom -->
            <line x1="${x + boxW/2}" y1="${oy + boxH}" x2="${x + boxW/2}" y2="185" stroke="var(--success)" stroke-width="2.2"/>
            <circle cx="${x + boxW/2}" cy="185" r="3.5" fill="var(--success)"/>
            <text x="${x + boxW/2}" y="202" text-anchor="middle" font-size="12" font-weight="800" fill="var(--success)" font-family="var(--font-mono)">S${bit}</text>

            <!-- Carry Propagation Line to Left -->
            ${idx < 3 ? `
              <line x1="${x}" y1="${oy + 50}" x2="${x - gap}" y2="${oy + 50}" stroke="var(--danger)" stroke-width="2.2"/>
              <polygon points="${x - gap + 5},${oy + 50} ${x - gap + 12},${oy + 46} ${x - gap + 12},${oy + 54}" fill="var(--danger)"/>
              <text x="${x - gap/2}" y="${oy + 42}" text-anchor="middle" font-size="9" font-weight="700" fill="var(--danger)" font-family="var(--font-mono)">C${bit}</text>
            ` : `
              <!-- Final Cout on Left of FA3 -->
              <line x1="${x}" y1="${oy + 50}" x2="${x - 25}" y2="${oy + 50}" stroke="var(--danger)" stroke-width="2.5"/>
              <circle cx="${x - 25}" cy="${oy + 50}" r="4" fill="var(--danger)"/>
              <text x="${x - 30}" y="${oy + 38}" text-anchor="end" font-size="12" font-weight="800" fill="var(--danger)" font-family="var(--font-mono)">Cout (C₄)</text>
            `}
          `;
        }).join('')}
      </svg>
      <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 5.3: Struktur Ripple Carry Adder (RCA) 4-bit — Carry merambat secara berantai dari FA0 ke FA3 (LSB ke MSB)</p>
    </div>`;
}

/* 4-Bit Carry Lookahead Adder (CLA) Block SVG */
function w5SvgCLA4() {
  return `
    <div style="text-align:center;margin:18px 0;background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px;overflow-x:auto">
      <svg width="560" height="250" viewBox="0 0 560 250" style="display:inline-block;min-width:520px;max-width:100%">
        <!-- Top Inputs: A[3:0], B[3:0] -->
        <text x="230" y="22" text-anchor="middle" font-size="12" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">A[3:0] & B[3:0]</text>
        <line x1="230" y1="28" x2="230" y2="50" stroke="var(--line-strong)" stroke-width="2.5"/>

        <!-- Box 1: P & G Generator -->
        <rect x="70" y="50" width="320" height="45" rx="8" fill="var(--accent-cyan-dim)" stroke="var(--accent-cyan)" stroke-width="2"/>
        <text x="230" y="77" text-anchor="middle" font-size="12" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-ui)">P & G GENERATOR (Pᵢ = Aᵢ ⊕ Bᵢ,  Gᵢ = Aᵢ · Bᵢ)</text>

        <!-- Lines P and G to Lookahead Carry Unit -->
        <line x1="180" y1="95" x2="180" y2="125" stroke="var(--accent-cyan)" stroke-width="2"/>
        <text x="170" y="115" font-size="9" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-mono)">P[3:0]</text>

        <line x1="280" y1="95" x2="280" y2="125" stroke="var(--accent-cyan)" stroke-width="2"/>
        <text x="290" y="115" font-size="9" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-mono)">G[3:0]</text>

        <!-- Input C0 from right -->
        <text x="495" y="152" font-size="11" font-weight="700" fill="var(--accent-amber)" font-family="var(--font-mono)">C₀ (Cin)</text>
        <line x1="455" y1="148" x2="390" y2="148" stroke="var(--accent-amber)" stroke-width="2.2"/>
        <polygon points="392,148 399,144 399,152" fill="var(--accent-amber)"/>

        <!-- Box 2: Carry Lookahead Generator Unit (LCU) -->
        <rect x="70" y="125" width="320" height="50" rx="8" fill="var(--accent-amber-dim)" stroke="var(--accent-amber)" stroke-width="2"/>
        <text x="230" y="147" text-anchor="middle" font-size="12" font-weight="800" fill="var(--accent-amber)" font-family="var(--font-ui)">LOOKAHEAD CARRY GENERATOR</text>
        <text x="230" y="164" text-anchor="middle" font-size="9.5" fill="var(--text-secondary)" font-family="var(--font-mono)">(C₁, C₂, C₃, C₄ dihitung paralel simultan)</text>

        <!-- Final C4 out to Left -->
        <line x1="70" y1="150" x2="20" y2="150" stroke="var(--danger)" stroke-width="2.5"/>
        <circle cx="20" cy="150" r="4" fill="var(--danger)"/>
        <text x="25" y="140" font-size="11" font-weight="800" fill="var(--danger)" font-family="var(--font-mono)">C₄ (Cout)</text>

        <!-- Carry Lines to Sum Box -->
        <line x1="230" y1="175" x2="230" y2="200" stroke="var(--accent-amber)" stroke-width="2"/>
        <text x="242" y="192" font-size="9" font-weight="700" fill="var(--accent-amber)" font-family="var(--font-mono)">C[3:0]</text>

        <!-- Bypass P to Sum Box -->
        <path d="M 390 72 L 425 72 L 425 215 L 390 215" fill="none" stroke="var(--accent-cyan)" stroke-width="1.8" stroke-dasharray="4,3"/>
        <text x="432" y="145" font-size="9" font-weight="600" fill="var(--accent-cyan)" font-family="var(--font-mono)">P[3:0]</text>

        <!-- Box 3: Sum Generator -->
        <rect x="70" y="200" width="320" height="38" rx="8" fill="var(--success-dim)" stroke="var(--success)" stroke-width="2"/>
        <text x="230" y="224" text-anchor="middle" font-size="12" font-weight="800" fill="var(--success)" font-family="var(--font-ui)">SUM GENERATOR (Sᵢ = Pᵢ ⊕ Cᵢ)</text>

        <!-- Output S[3:0] -->
        <line x1="70" y1="219" x2="20" y2="219" stroke="var(--success)" stroke-width="2.5"/>
        <circle cx="20" cy="219" r="4" fill="var(--success)"/>
        <text x="25" y="210" font-size="11" font-weight="800" fill="var(--success)" font-family="var(--font-mono)">S[3:0]</text>
      </svg>
      <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 5.4: Diagram Blok Arsitektur Carry Lookahead Adder (CLA) 4-bit</p>
    </div>`;
}

/* 4-Bit Adder-Subtractor Integrated Schematic SVG */
function w5SvgAdderSubtractor() {
  const boxW = 80, boxH = 90;
  const gap = 36;
  const ox = 35, oy = 90;
  return `
    <div style="text-align:center;margin:18px 0;background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px;overflow-x:auto">
      <svg width="580" height="250" viewBox="0 0 580 250" style="display:inline-block;min-width:540px;max-width:100%">
        <!-- Control Line M at top right -->
        <text x="545" y="32" font-size="12" font-weight="800" fill="var(--accent-amber)" font-family="var(--font-mono)">Mode (M)</text>
        <line x1="535" y1="28" x2="45" y2="28" stroke="var(--accent-amber)" stroke-width="2.5"/>

        <!-- C0 line from M to FA0 Cin -->
        <line x1="495" y1="28" x2="495" y2="135" stroke="var(--accent-amber)" stroke-width="2"/>
        <line x1="495" y1="135" x2="465" y2="135" stroke="var(--accent-amber)" stroke-width="2"/>
        <text x="500" y="85" font-size="9.5" font-weight="700" fill="var(--accent-amber)" font-family="var(--font-mono)">C₀ = M</text>

        <!-- 4 Blocks -->
        ${[3, 2, 1, 0].map((bit, idx) => {
          const x = ox + idx * (boxW + gap);
          return `
            <!-- Connection from M line to XOR -->
            <circle cx="${x + 55}" cy="28" r="3.5" fill="var(--accent-amber)"/>
            <line x1="${x + 55}" y1="28" x2="${x + 55}" y2="45" stroke="var(--accent-amber)" stroke-width="1.8"/>

            <!-- Input B${bit} into XOR -->
            <line x1="${x + 35}" y1="10" x2="${x + 35}" y2="45" stroke="var(--line-strong)" stroke-width="1.8"/>
            <text x="${x + 35}" y="7" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">B${bit}</text>

            <!-- XOR Gate (B${bit} ⊕ M) -->
            <path d="${'M ' + (x+28) + ' 45 Q ' + (x+45) + ' 53 ' + (x+28) + ' 61'}" fill="none" stroke="var(--accent-amber)" stroke-width="1.5"/>
            <path d="${'M ' + (x+32) + ' 45 Q ' + (x+48) + ' 53 ' + (x+32) + ' 61 Q ' + (x+65) + ' 61 ' + (x+72) + ' 53 Q ' + (x+65) + ' 45 ' + (x+32) + ' 45 Z'}" fill="var(--accent-amber-dim)" stroke="var(--accent-amber)" stroke-width="1.5"/>

            <!-- Line from XOR out to FA -->
            <line x1="${x + 52}" y1="61" x2="${x + 52}" y2="${oy}" stroke="var(--accent-amber)" stroke-width="1.8"/>

            <!-- Input A${bit} direct into FA -->
            <line x1="${x + 20}" y1="10" x2="${x + 20}" y2="${oy}" stroke="var(--line-strong)" stroke-width="1.8"/>
            <text x="${x + 20}" y="7" text-anchor="middle" font-size="10" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">A${bit}</text>

            <!-- FA Box -->
            <rect x="${x}" y="${oy}" width="${boxW}" height="${boxH}" rx="8" fill="var(--bg-card)" stroke="var(--accent-cyan)" stroke-width="2"/>
            <text x="${x + boxW/2}" y="${oy + 22}" text-anchor="middle" font-size="12" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-ui)">FA ${bit}</text>

            <!-- Sum output S${bit} -->
            <line x1="${x + boxW/2}" y1="${oy + boxH}" x2="${x + boxW/2}" y2="215" stroke="var(--success)" stroke-width="2"/>
            <circle cx="${x + boxW/2}" cy="215" r="3.5" fill="var(--success)"/>
            <text x="${x + boxW/2}" y="232" text-anchor="middle" font-size="11" font-weight="800" fill="var(--success)" font-family="var(--font-mono)">S${bit}</text>

            <!-- Carry Propagation -->
            ${idx < 3 ? `
              <line x1="${x}" y1="${oy + 45}" x2="${x - gap}" y2="${oy + 45}" stroke="var(--danger)" stroke-width="2"/>
              <polygon points="${x - gap + 5},${oy + 45} ${x - gap + 11},${oy + 42} ${x - gap + 11},${oy + 48}" fill="var(--danger)"/>
              <text x="${x - gap/2}" y="${oy + 38}" text-anchor="middle" font-size="8.5" font-weight="700" fill="var(--danger)" font-family="var(--font-mono)">C${bit}</text>
            ` : `
              <line x1="${x}" y1="${oy + 45}" x2="${x - 25}" y2="${oy + 45}" stroke="var(--danger)" stroke-width="2.2"/>
              <circle cx="${x - 25}" cy="${oy + 45}" r="3.5" fill="var(--danger)"/>
              <text x="${x - 30}" y="${oy + 36}" text-anchor="end" font-size="11" font-weight="800" fill="var(--danger)" font-family="var(--font-mono)">C₄ (Cout)</text>
            `}
          `;
        }).join('')}
      </svg>
      <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 5.5: Rangkaian 4-bit Adder-Subtractor Terintegrasi (M=0 Penjumlahan, M=1 Pengurangan Two's Complement)</p>
    </div>`;
}



/* ══════════════════════════════════════════════════════
   TOPIK 1: PENGANTAR ADDER, SUBTRACTOR & REPRESENTASI BILANGAN
   ══════════════════════════════════════════════════════ */
function renderWeek5Intro(el) {
  el.innerHTML = `
    <!-- Hero Banner -->
    <div style="background:linear-gradient(135deg,var(--accent-cyan-dim) 0%,var(--accent-violet-dim) 100%);border:1px solid var(--line);border-radius:16px;padding:28px 32px;margin-bottom:32px;position:relative;overflow:hidden">
      <div style="position:absolute;top:-20px;right:-20px;width:130px;height:130px;border-radius:50%;background:var(--accent-cyan-glow);filter:blur(45px)"></div>
      <div style="position:relative">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
          <span style="background:var(--accent-cyan-dim);color:var(--accent-cyan);border:1px solid var(--accent-cyan);padding:4px 12px;border-radius:99px;font-size:0.75rem;font-weight:700;letter-spacing:.06em">PERTEMUAN 5</span>
          <span style="font-size:0.78rem;color:var(--text-faint)">Sistem Digital</span>
        </div>
        <h2 style="margin:0 0 10px;font-size:1.5rem;font-weight:800">Rangkaian Aritmatika Digital: Adder dan Subtractor</h2>
        <p style="margin:0;color:var(--text-secondary);font-size:0.95rem;max-width:620px;line-height:1.6">
          Pelajari fondasi perangkat keras pengolah data di dalam Arithmetic Logic Unit (ALU). Dari gerbang logika sederhana Half Adder hingga arsitektur berkecepatan tinggi Carry Lookahead Adder (CLA) dan rangkaian Adder-Subtractor terintegrasi berbasis Two\'s Complement.
        </p>
      </div>
    </div>

    <!-- Identitas Mata Kuliah -->
    ${w5Section('Identitas Modul Pembelajaran', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>',
      `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
        ${[
          ['Mata Kuliah', 'Sistem Digital'],
          ['Pertemuan', '5 dari 14'],
          ['Materi Pokok', 'Adder & Subtractor Digital'],
          ['Tingkat Kesulitan', 'Dasar ke Lanjut']
        ].map(([k,v]) => `
          <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px">
            <p style="margin:0 0 4px;font-size:0.75rem;color:var(--text-faint);font-weight:600;text-transform:uppercase;letter-spacing:.06em">${k}</p>
            <p style="margin:0;font-weight:700">${v}</p>
          </div>`).join('')}
      </div>`
    )}

    <!-- Capaian Pembelajaran -->
    ${w5Section('Capaian Pembelajaran (CPMK-5)', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      `<div style="background:var(--accent-violet-dim);border:1px solid var(--accent-violet);border-radius:10px;padding:14px 16px;margin-bottom:16px">
        <p style="margin:0;font-size:0.95rem;line-height:1.6;font-weight:500">Mahasiswa mampu <strong>menganalisis, merancang, dan memverifikasi</strong> rangkaian logika kombinasi aritmatika untuk operasi penjumlahan dan pengurangan biner bertanda maupun tak bertanda dalam sistem digital modern.</p>
      </div>
      <p style="margin:0 0 12px;font-size:0.88rem;font-weight:600;color:var(--text-secondary)">Sub-kemampuan yang akan dicapai:</p>
      ${[
        'Memahami mekanisme dasar penjumlahan dan pengurangan biner beserta prinsip Carry dan Borrow.',
        'Menguasai empat format representasi bilangan biner bertanda (terutama Two\'s Complement).',
        'Menganalisis prinsip kerja, tabel kebenaran, dan diagram rangkaian Half Adder (HA) dan Full Adder (FA).',
        'Membandingkan propagasi sinyal pada Ripple Carry Adder (RCA) dan Carry Lookahead Adder (CLA).',
        'Memahami perancangan Half Subtractor (HS) dan Full Subtractor (FS).',
        'Merancang dan mengoperasikan rangkaian Adder-Subtractor multi-bit terintegrasi menggunakan gerbang kontrol XOR.'
      ].map((t, i) => w5Step(i + 1, t)).join('')}`
    )}

    <!-- Pengantar Peran Adder & Subtractor dalam ALU -->
    ${w5Section('Peran Strategis dalam Arithmetic Logic Unit (ALU)', '--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        Di dalam arsitektur prosesor komputer (CPU / Microcontroller / GPU), seluruh operasi matematika dasar (penjumlahan, pengurangan, perkalian, pembagian, hingga penghitungan alamat memori <em>effective address</em>) dieksekusi oleh <strong>Arithmetic Logic Unit (ALU)</strong>. Blok inti dari ALU adalah <strong>Adder</strong> dan <strong>Subtractor</strong>.
      </p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;margin-bottom:16px">
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px">
          <h4 style="margin:0 0 8px;font-size:0.92rem;color:var(--accent-cyan);display:flex;align-items:center;gap:6px">
            <span>➕</span> Adder (Penjumlah)
          </h4>
          <p style="margin:0;font-size:0.86rem;color:var(--text-secondary);line-height:1.6">
            Rangkaian digital yang menerima dua atau lebih operand biner dan menghasilkan keluaran <strong>Sum (Hasil Jumlah)</strong> serta <strong>Carry (Bit Bawaan)</strong> untuk posisi yang lebih signifikan.
          </p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px">
          <h4 style="margin:0 0 8px;font-size:0.92rem;color:var(--accent-violet);display:flex;align-items:center;gap:6px">
            <span>➖</span> Subtractor (Pengurang)
          </h4>
          <p style="margin:0;font-size:0.86rem;color:var(--text-secondary);line-height:1.6">
            Rangkaian digital yang mengurangkan bilangan subtrahend dari minuend, menghasilkan nilai <strong>Difference (Selisih)</strong> dan sinyal <strong>Borrow (Pinjaman)</strong> jika bit yang dikurangi lebih kecil.
          </p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px">
          <h4 style="margin:0 0 8px;font-size:0.92rem;color:var(--success);display:flex;align-items:center;gap:6px">
            <span>⚡</span> Rangkaian Aritmatika Multi-bit
          </h4>
          <p style="margin:0;font-size:0.86rem;color:var(--text-secondary);line-height:1.6">
            Penggabungan beberapa sel adder/subtractor 1-bit secara berantai (cascade) atau menggunakan jaringan logika lookahead paralel untuk mengolah data 4-bit, 8-bit, 32-bit, hingga 64-bit sekaligus.
          </p>
        </div>
      </div>`
    )}

    <!-- 4 Representasi Bilangan Biner -->
    ${w5Section('Representasi Bilangan dalam Sistem Digital', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        Sebelum merancang rangkaian hardware aritmatika, kita harus memahami bagaimana angka positif dan negatif dienkodekan ke dalam bit biner. Terdapat empat metode utama dalam teknik digital:
      </p>

      <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:18px">
        <!-- A. Unsigned Binary -->
        <div style="background:var(--bg-inset);border-left:3px solid var(--accent-cyan);border-radius:0 10px 10px 0;padding:14px 16px">
          <h4 style="margin:0 0 6px;font-size:0.92rem;color:var(--accent-cyan)">A. Unsigned Binary (Biner Tanpa Tanda)</h4>
          <p style="margin:0 0 6px;font-size:0.86rem;color:var(--text-secondary);line-height:1.6">
            Digunakan murni untuk menyatakan besaran nilai nonnegatif (nol dan positif). Seluruh bit berfungsi sebagai bobot nilai posisi (2ⁿ).
          </p>
          <p style="margin:0;font-family:var(--font-mono);font-size:0.86rem;color:var(--text-primary)">
            Contoh 4-bit: <code>1011₂ = (1×8) + (0×4) + (1×2) + (1×1) = 11₁₀</code>. Rentang 4-bit: <strong>0 hingga +15</strong>.
          </p>
        </div>

        <!-- B. Sign-Magnitude -->
        <div style="background:var(--bg-inset);border-left:3px solid var(--accent-violet);border-radius:0 10px 10px 0;padding:14px 16px">
          <h4 style="margin:0 0 6px;font-size:0.92rem;color:var(--accent-violet)">B. Sign-Magnitude (Tanda dan Magnitudo)</h4>
          <p style="margin:0 0 6px;font-size:0.86rem;color:var(--text-secondary);line-height:1.6">
            Bit paling kiri (MSB) dicadangkan secara khusus sebagai <strong>bit tanda</strong>: <code>0 = Positif (+)</code> dan <code>1 = Negatif (-)</code>. Bit sisanya menunjukkan besar nilai absolut.
          </p>
          <p style="margin:0;font-family:var(--font-mono);font-size:0.86rem;color:var(--text-primary)">
            Contoh 4-bit: <code>+5 = 0101₂</code>, sedangkan <code>-5 = 1101₂</code>.<br>
            <span style="color:var(--danger)">Kelemahan fatal:</span> Memiliki <em>dua nilai nol</em>: +0 (<code>0000₂</code>) dan -0 (<code>1000₂</code>), serta sirkuit hardware penjumlahannya sangat rumit.
          </p>
        </div>

        <!-- C. One's Complement -->
        <div style="background:var(--bg-inset);border-left:3px solid var(--accent-amber);border-radius:0 10px 10px 0;padding:14px 16px">
          <h4 style="margin:0 0 6px;font-size:0.92rem;color:var(--accent-amber)">C. One\'s Complement (Komplemen Satu)</h4>
          <p style="margin:0 0 6px;font-size:0.86rem;color:var(--text-secondary);line-height:1.6">
            Bilangan negatif diperoleh dengan <strong>membalik setiap bit</strong> (NOT / inversi bit 0 ↔ 1) dari bilangan positifnya.
          </p>
          <p style="margin:0;font-family:var(--font-mono);font-size:0.86rem;color:var(--text-primary)">
            Contoh 4-bit: <code>+5 = 0101₂</code> → diinversi menjadi <code>-5 = 1010₂</code>.<br>
            <span style="color:var(--danger)">Kelemahan:</span> Masih memiliki dua representasi nol: +0 (<code>0000₂</code>) dan -0 (<code>1111₂</code>), serta membutuhkan penambahan <em>end-around carry</em>.
          </p>
        </div>

        <!-- D. Two's Complement -->
        <div style="background:var(--bg-inset);border-left:3px solid var(--success);border-radius:0 10px 10px 0;padding:14px 16px">
          <h4 style="margin:0 0 6px;font-size:0.92rem;color:var(--success)">D. Two\'s Complement (Komplemen Dua) — Standar Industri CPU</h4>
          <p style="margin:0 0 6px;font-size:0.86rem;color:var(--text-secondary);line-height:1.6">
            Bilangan negatif diperoleh dengan <strong>membalik seluruh bit bilangan positif (One\'s Complement), lalu menambahkan 1 pada bit LSB</strong>.
          </p>
          ${w5Code([
            '+5 desimal           = 0101₂',
            'Inversi (One\'s Comp) = 1010₂',
            'Tambahkan 1          = +   1₂',
            '--------------------------------',
            '-5 desimal (Two\'s)   = 1011₂'
          ], 'Proses Pembentukan Two\'s Complement')}
          <p style="margin:8px 0 0;font-size:0.86rem;color:var(--text-secondary);line-height:1.6">
            <strong>Mengapa Two\'s Complement Dipakai di Semua Komputer Modern?</strong><br>
            1. Hanya memiliki <strong>satu representasi nol tunggal (0000₂)</strong>.<br>
            2. Operasi pengurangan <code>A - B</code> diubah menjadi <strong>penjumlahan biasa: <code>A + (-B) = A + B\' + 1</code></strong>, sehingga perangkat keras ALU cukup menggunakan rangkaian Adder yang sama tanpa memerlukan rangkaian pengurang terpisah!
          </p>
        </div>
      </div>

      <h4 style="margin:20px 0 10px;font-size:0.95rem;font-weight:700">Tabel Perbandingan 4 Format Bilangan Biner (4-Bit):</h4>
      ${w5Table(
        ['Format Representasi', 'Rentang Nilai 4-bit', 'Nilai +5₁₀', 'Nilai -5₁₀', 'Representasi Angka Nol', 'Kompleksitas Hardware'],
        [
          ['Unsigned Binary', '0 s.d. +15', '0101₂', 'Tidak Mendukung', '0000₂ (Tunggal)', 'Paling Sederhana'],
          ['Sign-Magnitude', '-7 s.d. +7', '0101₂', '1101₂', 'Ganda (+0: 0000₂, -0: 1000₂)', 'Sangat Rumit'],
          ['One\'s Complement', '-7 s.d. +7', '0101₂', '1010₂', 'Ganda (+0: 0000₂, -0: 1111₂)', 'Sedang (End-around carry)'],
          ['Two\'s Complement', '<strong>-8 s.d. +7</strong>', '<strong>0101₂</strong>', '<strong>1011₂</strong>', '<strong>0000₂ (Tunggal & Unik)</strong>', '<strong>Sangat Efisien (Cukup 1 Adder)</strong>']
        ]
      )}`
    )}
  `;
}



/* ══════════════════════════════════════════════════════
   TOPIK 2: PENJUMLAHAN & PENGURANGAN BINER
   ══════════════════════════════════════════════════════ */
function renderWeek5BinaryArithmetic(el) {
  el.innerHTML = `
    <!-- Section 1: Penjumlahan Biner -->
    ${w5Section('1. Mekanisme Penjumlahan Biner & Konsep Carry', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        Penjumlahan biner mendasarkan dirinya pada sistem bilangan basis dua ({0, 1}). Terdapat 4 aturan fundamental untuk penjumlahan dua bit:
      </p>
      ${w5Table(
        ['Operasi', 'Hasil Penjumlahan (Sum)', 'Bit Bawaan (Carry)', 'Nilai Biner Penuh', 'Keterangan'],
        [
          ['0 + 0', '0', '0', '00₂', 'Tanpa luapan'],
          ['0 + 1', '1', '0', '01₂', 'Hasil 1, tanpa bawaan'],
          ['1 + 0', '1', '0', '01₂', 'Hasil 1, tanpa bawaan'],
          ['1 + 1', '<strong>0</strong>', '<strong>1</strong>', '<strong>10₂</strong>', '1 + 1 = 2₁₀ = 10₂ (Sum=0, Carry=1 ke bit lebih tinggi)'],
          ['1 + 1 + 1 (dengan Cin)', '<strong>1</strong>', '<strong>1</strong>', '<strong>11₂</strong>', '1 + 1 + 1 = 3₁₀ = 11₂ (Sum=1, Carry=1)']
        ]
      )}

      <h4 style="margin:18px 0 10px;font-size:0.95rem;font-weight:700;color:var(--accent-cyan)">Konsep Carry (Bit Bawaan)</h4>
      <p style="margin:0 0 14px;font-size:0.92rem;line-height:1.7;color:var(--text-secondary)">
        Sama persis seperti penjumlahan desimal (misal 5 + 7 = 12, tulis 2 simpan 1), pada biner ketika hasil penjumlahan mencapai atau melampaui basis sistem (yaitu 2), nilai lokal menjadi 0 dan sebuah sinyal <strong>Carry = 1</strong> diteruskan ke posisi bit sebelah kiri (posisi dengan bobot nilai 2 kali lebih besar).
      </p>

      <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px;margin:16px 0">
        <p style="margin:0 0 8px;font-weight:700;color:var(--accent-cyan)">Contoh Penjumlahan Multi-Bit: 1011₂ (11₁₀) + 0110₂ (6₁₀)</p>
        ${w5Code([
          'Carry:     [1] [1] [0] [0]     (Jalur bit bawaan)',
          '             1   0   1   1₂    = 11₁₀',
          '           + 0   1   1   0₂    =  6₁₀',
          '           -------------------',
          'Hasil:     1   0   0   0   1₂  = 17₁₀  (16 + 1 = 17)'
        ], 'Perhitungan Biner Berundak')}

        <div style="margin-top:12px">
          <p style="margin:0 0 6px;font-size:0.86rem;font-weight:700">Analisis Proses dari LSB ke MSB:</p>
          ${w5Step('Bit 0 (LSB)', '1 + 0 = <strong>1</strong> (Carry keluar = 0)')}
          ${w5Step('Bit 1', '1 + 1 + (Carry in 0) = <strong>0</strong> (Carry keluar = 1)')}
          ${w5Step('Bit 2', '0 + 1 + (Carry in 1) = 1 + 1 = <strong>0</strong> (Carry keluar = 1)')}
          ${w5Step('Bit 3 (MSB)', '1 + 0 + (Carry in 1) = 1 + 1 = <strong>0</strong> (Carry keluar = 1)')}
          ${w5Step('Bit 4 (Carry-out Akhir)', 'Carry keluar MSB turun menjadi bit ke-5: <strong>1</strong>')}
        </div>
      </div>`
    )}

    <!-- Section 2: Pengurangan Biner -->
    ${w5Section('2. Mekanisme Pengurangan Biner & Konsep Borrow', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        Pengurangan biner mengikuti kaidah aritmatika pengurangan posisi dengan nilai pinjaman (<strong>Borrow</strong>):
      </p>
      ${w5Table(
        ['Operasi', 'Selisih (Difference)', 'Pinjaman (Borrow)', 'Penjelasan Teknis'],
        [
          ['0 − 0', '0', '0', 'Tidak memerlukan pinjaman'],
          ['1 − 0', '1', '0', 'Pengurangan normal'],
          ['1 − 1', '0', '0', 'Hasil selisih nol'],
          ['0 − 1', '<strong>1</strong>', '<strong>1</strong>', '0 tidak cukup dikurangi 1, harus meminjam 1 dari bit kiri (berbobot 2). Sehingga 2 − 1 = 1']
        ]
      )}

      <h4 style="margin:18px 0 10px;font-size:0.95rem;font-weight:700;color:var(--accent-violet)">Konsep Borrow (Bit Pinjaman)</h4>
      <p style="margin:0 0 14px;font-size:0.92rem;line-height:1.7;color:var(--text-secondary)">
        Ketika bit yang dikurangi (minuend) bernilai 0 dan bit pengurang (subtrahend) bernilai 1, kita wajib meminjam 1 dari kolom yang lebih tinggi. Nilai 1 yang dipinjam dari kolom sebelah kiri bernilai <strong>2 pada kolom saat ini</strong> (karena basis 2), sehingga perhitungannya menjadi <code>(2 + 0) − 1 = 1</code>.
      </p>

      <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px;margin:16px 0">
        <p style="margin:0 0 8px;font-weight:700;color:var(--accent-violet)">Contoh Pengurangan Multi-Bit: 1001₂ (9₁₀) − 0101₂ (5₁₀)</p>
        ${w5Code([
          'Borrow:        [1]             (Pinjam dari bit ke-3)',
          '                 1   0   0   1₂  = 9₁₀',
          '               - 0   1   0   1₂  = 5₁₀',
          '               ---------------',
          'Hasil:           0   1   0   0₂  = 4₁₀'
        ], 'Perhitungan Pengurangan Biner')}

        <div style="margin-top:12px">
          <p style="margin:0 0 6px;font-size:0.86rem;font-weight:700">Penjelasan Langkah Demi Langkah:</p>
          ${w5Step('Bit 0 (LSB)', '1 − 1 = <strong>0</strong> (Borrow = 0)')}
          ${w5Step('Bit 1', '0 − 0 = <strong>0</strong> (Borrow = 0)')}
          ${w5Step('Bit 2', '0 − 1 → 0 tidak cukup, meminjam 1 dari bit 3 (yang menjadi 0). Nilai bit 2 menjadi 2, lalu 2 − 1 = <strong>1</strong>')}
          ${w5Step('Bit 3 (MSB)', 'Sisa bit adalah 0 (karena telah dipinjam), sehingga 0 − 0 = <strong>0</strong>')}
          ${w5Step('Hasil Akhir', '0100₂ = 4₁₀ (Sesuai dengan 9 − 5 = 4)')}
        </div>
      </div>

      <h4 style="margin:20px 0 10px;font-size:0.95rem;font-weight:700">Tabel Kebenaran Half Subtractor (Konsep Dasar Difference & Borrow):</h4>
      ${w5Table(
        ['Minuend (A)', 'Subtrahend (B)', 'Difference (D)', 'Borrow-out (Bout)'],
        [
          ['0', '0', '0', '0'],
          ['0', '1', '1', '1'],
          ['1', '0', '1', '0'],
          ['1', '1', '0', '0']
        ]
      )}`
    )}
  `;
}



/* ══════════════════════════════════════════════════════
   TOPIK 3: HALF ADDER (HA)
   ══════════════════════════════════════════════════════ */
function renderWeek5HalfAdder(el) {
  el.innerHTML = `
    <!-- Section 1: Definisi & Persamaan -->
    ${w5Section('Rangkaian Half Adder (Penjumlah Setengah)', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        <strong>Half Adder (HA)</strong> adalah sirkuit logika kombinasi paling sederhana untuk menjumlahkan <strong>dua bit biner tunggal</strong> (A dan B). Rangkaian ini tidak memperhitungkan bit bawaan (carry) dari kolom sebelumnya.
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-bottom:16px">
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:12px 14px">
          <p style="margin:0 0 4px;font-weight:700;color:var(--text-faint);font-size:0.75rem;text-transform:uppercase">SINYAL MASUKAN (INPUT)</p>
          <p style="margin:0;font-weight:700">A dan B (2 bit biner)</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:12px 14px">
          <p style="margin:0 0 4px;font-weight:700;color:var(--accent-cyan);font-size:0.75rem;text-transform:uppercase">KELUARAN SUM (HASIL JUMLAH)</p>
          <p style="margin:0;font-weight:700;font-family:var(--font-mono)">S = A ⊕ B</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:12px 14px">
          <p style="margin:0 0 4px;font-weight:700;color:var(--accent-violet);font-size:0.75rem;text-transform:uppercase">KELUARAN CARRY (BAWAAN)</p>
          <p style="margin:0;font-weight:700;font-family:var(--font-mono)">C = A · B</p>
        </div>
      </div>

      <h4 style="margin:18px 0 10px;font-size:0.95rem;font-weight:700">Tabel Kebenaran Half Adder:</h4>
      ${w5Table(
        ['Input A', 'Input B', 'Sum (S = A ⊕ B)', 'Carry (C = A · B)', 'Kondisi Operasi'],
        [
          ['0', '0', '0', '0', '0 + 0 = 0'],
          ['0', '1', '1', '0', '0 + 1 = 1'],
          ['1', '0', '1', '0', '1 + 0 = 1'],
          ['1', '1', '0', '1', '1 + 1 = 10₂ (Sum=0, Carry=1)']
        ]
      )}

      <!-- Diagram Skematik SVG -->
      <h4 style="margin:20px 0 8px;font-size:0.95rem;font-weight:700;color:var(--accent-cyan)">Diagram Gerbang Logika Half Adder:</h4>
      ${w5SvgHalfAdder()}

      <div style="margin-top:16px">
        <h4 style="margin:0 0 8px;font-size:0.92rem;font-weight:700">Analisis Gerbang:</h4>
        ${w5Step('Gerbang XOR', 'Menghasilkan <strong>Sum (S)</strong>. Bernilai 1 jika salah satu masukan berlogika 1, namun bernilai 0 jika kedua masukan sama (0,0 atau 1,1).')}
        ${w5Step('Gerbang AND', 'Menghasilkan <strong>Carry (C)</strong>. Hanya bernilai 1 jika kedua masukan A dan B bernilai 1 sekaligus (kondisi 1 + 1).')}
      </div>

      ${w5Alert('warning', '<strong>Keterbatasan Fundamental Half Adder:</strong> Rangkaian ini tidak memiliki jalur input untuk menerima <em>Carry-in (Cin)</em> dari penjumlahan tahap bit sebelumnya. Oleh karena itu, Half Adder hanya dapat digunakan pada bit terendah (LSB) dan TIDAK BISA digunakan untuk bit pertengahan atau MSB pada penjumlahan multi-bit!')}`
    )}
  `;
}

/* ══════════════════════════════════════════════════════
   TOPIK 4: FULL ADDER (FA)
   ══════════════════════════════════════════════════════ */
function renderWeek5FullAdder(el) {
  el.innerHTML = `
    <!-- Section 1: Definisi & Tabel Kebenaran -->
    ${w5Section('Rangkaian Full Adder (Penjumlah Penuh)', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        <strong>Full Adder (FA)</strong> adalah rangkaian aritmatika lengkap yang mampu menjumlahkan <strong>tiga masukan bit biner</strong> sekaligus: dua bit operand utama (A dan B) ditambah satu bit bawaan dari tahap sebelumnya (<strong>Carry-in / Cin</strong>).
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin-bottom:16px">
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:12px 14px">
          <p style="margin:0 0 4px;font-weight:700;color:var(--success);font-size:0.75rem;text-transform:uppercase">PERSAMAAN SUM (S)</p>
          <p style="margin:0;font-weight:700;font-family:var(--font-mono);font-size:1.05rem">S = A ⊕ B ⊕ Cin</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:12px 14px">
          <p style="margin:0 0 4px;font-weight:700;color:var(--danger);font-size:0.75rem;text-transform:uppercase">PERSAMAAN CARRY-OUT (Cout)</p>
          <p style="margin:0;font-weight:700;font-family:var(--font-mono);font-size:1.05rem">Cout = AB + Cin(A ⊕ B)</p>
        </div>
      </div>

      <h4 style="margin:18px 0 10px;font-size:0.95rem;font-weight:700">Tabel Kebenaran Lengkap Full Adder (8 Kombinasi):</h4>
      ${w5Table(
        ['Baris', 'A', 'B', 'Cin', 'Sum (S)', 'Cout', 'Proses Aritmatika'],
        [
          ['0', '0', '0', '0', '0', '0', '0 + 0 + 0 = 0 (00₂)'],
          ['1', '0', '0', '1', '1', '0', '0 + 0 + 1 = 1 (01₂)'],
          ['2', '0', '1', '0', '1', '0', '0 + 1 + 0 = 1 (01₂)'],
          ['3', '0', '1', '1', '0', '1', '0 + 1 + 1 = 2 (10₂) → Sum=0, Cout=1'],
          ['4', '1', '0', '0', '1', '0', '1 + 0 + 0 = 1 (01₂)'],
          ['5', '1', '0', '1', '0', '1', '1 + 0 + 1 = 2 (10₂) → Sum=0, Cout=1'],
          ['6', '1', '1', '0', '0', '1', '1 + 1 + 0 = 2 (10₂) → Sum=0, Cout=1'],
          ['7', '1', '1', '1', '1', '1', '1 + 1 + 1 = 3 (11₂) → Sum=1, Cout=1']
        ]
      )}

      <!-- Penurunan Rumus -->
      <h4 style="margin:20px 0 8px;font-size:0.95rem;font-weight:700;color:var(--accent-violet)">Penurunan Persamaan Boolean dari Minterm:</h4>
      ${w5Code([
        '1. Persamaan Sum (S):',
        '   S bernilai 1 pada baris {1, 2, 4, 7}:',
        '   S = A\'B\'Cin + A\'BCin\' + AB\'Cin\' + ABCin',
        '   S = Cin(A\'B\' + AB) + Cin\'(A\'B + AB\')',
        '   S = Cin(A ⊕ B)\' + Cin\'(A ⊕ B)',
        '   S = (A ⊕ B) ⊕ Cin  =  A ⊕ B ⊕ Cin',
        '',
        '2. Persamaan Carry-out (Cout):',
        '   Cout bernilai 1 pada baris {3, 5, 6, 7}:',
        '   Cout = A\'BCin + AB\'Cin + ABCin\' + ABCin',
        '   Cout = Cin(A\'B + AB\') + AB(Cin\' + Cin)',
        '   Cout = Cin(A ⊕ B) + AB(1)  =  AB + Cin(A ⊕ B)'
      ], 'Langkah Penurunan Aljabar')}

      <!-- Diagram Skematik SVG -->
      <h4 style="margin:20px 0 8px;font-size:0.95rem;font-weight:700;color:var(--accent-violet)">Diagram Gerbang Logika Full Adder (2 Half Adder + 1 OR):</h4>
      ${w5SvgFullAdder()}

      <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px;margin-top:16px">
        <h4 style="margin:0 0 8px;font-size:0.92rem;color:var(--success)">Prinsip Arsitektur: Full Adder dari 2 Half Adder</h4>
        <p style="margin:0;font-size:0.86rem;color:var(--text-secondary);line-height:1.6">
          • <strong>Half Adder 1:</strong> Menjumlahkan A dan B → menghasilkan <code>S₁ = A ⊕ B</code> dan <code>C₁ = AB</code>.<br>
          • <strong>Half Adder 2:</strong> Menjumlahkan hasil S₁ dengan Cin → menghasilkan <code>Sum akhir = S₁ ⊕ Cin</code> dan <code>C₂ = Cin · S₁</code>.<br>
          • <strong>Gerbang OR:</strong> Menggabungkan kedua carry <code>Cout = C₁ + C₂ = AB + Cin(A ⊕ B)</code>. Keduanya tidak akan pernah bernilai 1 bersamaan, sehingga gerbang OR aman digunakan.
        </p>
      </div>`
    )}
  `;
}



/* ══════════════════════════════════════════════════════
   TOPIK 5: RIPPLE CARRY ADDER (RCA)
   ══════════════════════════════════════════════════════ */
function renderWeek5RCA(el) {
  el.innerHTML = `
    <!-- Section 1: Konsep Ripple Carry Adder -->
    ${w5Section('Ripple Carry Adder (RCA) 4-Bit', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 11a9 9 0 019 9M4 4a16 16 0 0116 16"/><circle cx="5" cy="19" r="1"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        Untuk menjumlahkan bilangan biner multi-bit (misalnya bilangan 4-bit A[3:0] dan B[3:0]), kita dapat merangkai beberapa blok Full Adder secara seri (berantai). Rangkaian ini dinamakan <strong>Ripple Carry Adder (RCA)</strong> karena bit bawaan (carry) merambat berurutan seperti riak gelombang dari tahap LSB menuju tahap MSB.
      </p>

      ${w5Step('Tahap 0 (FA0 - LSB)', 'Menjumlahkan A₀, B₀, dan Cin awal (biasanya di-ground ke 0). Menghasilkan S₀ dan sinyal Carry C₀.')}
      ${w5Step('Tahap 1 (FA1)', 'Menerima Carry C₀ dari FA0 sebagai Carry-in-nya, menjumlahkan dengan A₁ dan B₁ → menghasilkan S₁ dan C₁.')}
      ${w5Step('Tahap 2 (FA2)', 'Menerima Carry C₁ dari FA1, menjumlahkan dengan A₂ dan B₂ → menghasilkan S₂ dan C₂.')}
      ${w5Step('Tahap 3 (FA3 - MSB)', 'Menerima Carry C₂ dari FA2, menjumlahkan dengan A₃ dan B₃ → menghasilkan S₃ dan Carry-out akhir (C₄).')}

      <!-- Diagram Skematik RCA 4-bit -->
      <h4 style="margin:20px 0 8px;font-size:0.95rem;font-weight:700;color:var(--accent-cyan)">Diagram Rangkaian Ripple Carry Adder 4-Bit:</h4>
      ${w5SvgRCA4()}

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;margin-top:16px">
        <div style="background:var(--bg-inset);border:1.5px solid var(--success);border-radius:10px;padding:14px">
          <p style="margin:0 0 6px;font-weight:700;color:var(--success)">✅ Kelebihan Ripple Carry Adder</p>
          <ul style="margin:0;padding-left:18px;font-size:0.86rem;line-height:1.6;color:var(--text-secondary)">
            <li>Struktur modular dan berulang (mudah dirancang).</li>
            <li>Kebutuhan gerbang logika relatif sedikit (hemat luas silikon IC).</li>
            <li>Sangat efisien untuk pengolahan data dengan lebar bit kecil (misal 2-bit s.d. 8-bit).</li>
          </ul>
        </div>
        <div style="background:var(--bg-inset);border:1.5px solid var(--danger);border-radius:10px;padding:14px">
          <p style="margin:0 0 6px;font-weight:700;color:var(--danger)">❌ Kekurangan: Bottleneck Propagation Delay</p>
          <ul style="margin:0;padding-left:18px;font-size:0.86rem;line-height:1.6;color:var(--text-secondary)">
            <li>Tahap FA3 tidak dapat menghasilkan nilai Sum akhir yang valid sebelum bit Carry merambat melalui FA0, FA1, dan FA2.</li>
            <li>Total keterlambatan (propagation delay) bertambah secara linier <code>T = N × t_carry</code>.</li>
            <li>Pada arsitektur 32-bit atau 64-bit, penundaan riak ini menjadi pembatas utama kecepatan clock processor!</li>
          </ul>
        </div>
      </div>`
    )}
  `;
}

/* ══════════════════════════════════════════════════════
   TOPIK 6: CARRY LOOKAHEAD ADDER (CLA) & PERBANDINGAN
   ══════════════════════════════════════════════════════ */
function renderWeek5CLA(el) {
  el.innerHTML = `
    <!-- Section 1: Carry Lookahead Adder -->
    ${w5Section('Carry Lookahead Adder (CLA): Solusi Kecepatan Tinggi', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        Untuk mengatasi kelemahan keterlambatan propagasi pada RCA, para insinyur mengembangkan <strong>Carry Lookahead Adder (CLA)</strong>. Ide revolusionernya: <em>seluruh sinyal carry dihitung secara instan dan paralel</em> langsung dari masukan A, B, dan C₀ melalui persamaan logika kombinasi dua tingkat, tanpa menunggu perambatan tahap demi tahap!
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin-bottom:16px">
        <div style="background:var(--bg-inset);border:1px solid var(--accent-cyan);border-radius:10px;padding:14px">
          <h4 style="margin:0 0 6px;font-size:0.92rem;color:var(--accent-cyan)">1. Carry Generate (Gᵢ)</h4>
          <p style="margin:0 0 6px;font-family:var(--font-mono);font-size:1rem;font-weight:700">Gᵢ = Aᵢ · Bᵢ</p>
          <p style="margin:0;font-size:0.84rem;color:var(--text-secondary);line-height:1.5">
            Bernilai 1 jika kedua input Aᵢ dan Bᵢ bernilai 1. Tahap ini <em>selalu membangkitkan carry baru</em> secara mandiri tanpa peduli ada tidaknya carry dari tahap sebelumnya.
          </p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--accent-violet);border-radius:10px;padding:14px">
          <h4 style="margin:0 0 6px;font-size:0.92rem;color:var(--accent-violet)">2. Carry Propagate (Pᵢ)</h4>
          <p style="margin:0 0 6px;font-family:var(--font-mono);font-size:1rem;font-weight:700">Pᵢ = Aᵢ ⊕ Bᵢ</p>
          <p style="margin:0;font-size:0.84rem;color:var(--text-secondary);line-height:1.5">
            Bernilai 1 jika salah satu input berlogika 1. Tahap ini akan <em>meneruskan (mempropagasi) carry yang datang dari tahap sebelumnya</em> ke tahap berikutnya.
          </p>
        </div>
      </div>

      <h4 style="margin:18px 0 10px;font-size:0.95rem;font-weight:700;color:var(--accent-amber)">Penurunan Rumus Carry Lookahead 4-Bit:</h4>
      <p style="margin:0 0 8px;font-size:0.9rem;color:var(--text-secondary)">Persamaan dasar carry: <code>Cᵢ₊₁ = Gᵢ + Pᵢ · Cᵢ</code>. Dengan mensubstitusi persamaan sebelumnya secara berantai:</p>
      ${w5Code([
        'C₁ = G₀ + P₀C₀',
        'C₂ = G₁ + P₁C₁ = G₁ + P₁(G₀ + P₀C₀) = G₁ + P₁G₀ + P₁P₀C₀',
        'C₃ = G₂ + P₂C₂ = G₂ + P₂G₁ + P₂P₁G₀ + P₂P₁P₀C₀',
        'C₄ = G₃ + P₃C₃ = G₃ + P₃G₂ + P₃P₂G₁ + P₃P₂P₁G₀ + P₃P₂P₁P₀C₀',
        '',
        'Persamaan Sum akhir: Sᵢ = Pᵢ ⊕ Cᵢ  (untuk i = 0, 1, 2, 3)'
      ], 'Ekspansi Persamaan Carry CLA')}

      <p style="margin:12px 0;font-size:0.88rem;color:var(--text-secondary);line-height:1.6">
        Perhatikan bahwa <strong>C₄ dihitung langsung dari G₀..G₃, P₀..P₃, dan C₀</strong> hanya dalam waktu 2 tingkatan gerbang logika (gerbang AND kemudian gerbang OR), sehingga waktu keterlambatannya konstan!
      </p>

      <!-- Diagram Blok CLA 4-bit -->
      <h4 style="margin:20px 0 8px;font-size:0.95rem;font-weight:700;color:var(--accent-violet)">Diagram Blok Carry Lookahead Adder (CLA) 4-Bit:</h4>
      ${w5SvgCLA4()}`
    )}

    <!-- Section 2: Perbandingan Mendalam RCA vs CLA -->
    ${w5Section('Tabel Perbandingan Komprehensif: RCA vs CLA', '--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        Dalam rekayasa sistem komputer, tidak ada arsitektur yang mutlak unggul dalam semua situasi. Insinyur memilih antara RCA dan CLA berdasarkan kompromi (trade-off) antara kecepatan eksekusi, luas area chip, dan konsumsi daya:
      </p>
      ${w5Table(
        ['Parameter Evaluasi', 'Ripple Carry Adder (RCA)', 'Carry Lookahead Adder (CLA)'],
        [
          ['Struktur Rangkaian', 'Serial berantai (output Cout tahap n menjadi Cin tahap n+1)', 'Paralel dengan blok Lookahead Carry Unit terpisah'],
          ['Mekanisme Carry', 'Carry merambat perlahan melalui setiap gerbang Full Adder', 'Seluruh Carry dihitung serempak menggunakan rumus G dan P'],
          ['Propagation Delay', 'Tinggi: sebanding dengan jumlah bit O(N)', 'Sangat Rendah: konstan O(log N) atau O(1) level gerbang'],
          ['Jumlah Gerbang (Area)', 'Sedikit (struktur kompak dan hemat silikon)', 'Banyak (persamaan meluas, fan-in gerbang tinggi)'],
          ['Kompleksitas Pengkabelan', 'Sederhana dan teratur', 'Rumit karena banyaknya jalur sinyal paralel'],
          ['Penggunaan Ideal', 'Sistem sederhana, frekuensi rendah, perangkat IoT berdaya rendah', 'ALU prosesor komputer kecepatan tinggi, DSP, GPU']
        ]
      )}
      ${w5Alert('info', '<strong>Catatan Desain:</strong> Untuk data yang sangat lebar (misal 64-bit), CLA murni membutuhkan gerbang AND dengan 65 masukan (fan-in terlalu besar). Oleh karena itu, industri menggunakan <strong>Hierarchical CLA</strong>: menggabungkan beberapa blok CLA 4-bit atau 16-bit secara berjenjang.')}`
    )}
  `;
}



/* ══════════════════════════════════════════════════════
   TOPIK 7: HALF SUBTRACTOR & FULL SUBTRACTOR
   ══════════════════════════════════════════════════════ */
function renderWeek5Subtractors(el) {
  el.innerHTML = `
    <!-- Section 1: Half Subtractor -->
    ${w5Section('Half Subtractor (Pengurang Setengah)', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        <strong>Half Subtractor (HS)</strong> adalah rangkaian logika yang mengurangkan satu bit subtrahend (B) dari satu bit minuend (A) tanpa memperhitungkan pinjaman dari bit sebelumnya.
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;margin-bottom:16px">
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:12px 14px">
          <p style="margin:0 0 4px;font-weight:700;color:var(--text-faint);font-size:0.75rem;text-transform:uppercase">MASUKAN (INPUT)</p>
          <p style="margin:0;font-weight:700">A (Minuend), B (Subtrahend)</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:12px 14px">
          <p style="margin:0 0 4px;font-weight:700;color:var(--accent-cyan);font-size:0.75rem;text-transform:uppercase">SELISIH (DIFFERENCE)</p>
          <p style="margin:0;font-weight:700;font-family:var(--font-mono)">D = A ⊕ B</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:12px 14px">
          <p style="margin:0 0 4px;font-weight:700;color:var(--danger);font-size:0.75rem;text-transform:uppercase">PINJAMAN (BORROW-OUT)</p>
          <p style="margin:0;font-weight:700;font-family:var(--font-mono)">Bout = A\' · B</p>
        </div>
      </div>

      <h4 style="margin:18px 0 10px;font-size:0.95rem;font-weight:700">Tabel Kebenaran Half Subtractor:</h4>
      ${w5Table(
        ['Minuend (A)', 'Subtrahend (B)', 'Difference (D)', 'Borrow-out (Bout)', 'Operasi Aritmatika'],
        [
          ['0', '0', '0', '0', '0 − 0 = 0'],
          ['0', '1', '1', '1', '0 − 1 = 1 (dengan meminjam 1 dari kolom kiri)'],
          ['1', '0', '1', '0', '1 − 0 = 1'],
          ['1', '1', '0', '0', '1 − 1 = 0']
        ]
      )}

      <!-- Diagram Skematik SVG Half Subtractor -->
      <h4 style="margin:20px 0 8px;font-size:0.95rem;font-weight:700;color:var(--accent-cyan)">Diagram Gerbang Logika Half Subtractor:</h4>
      <div style="text-align:center;margin:16px 0;background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px">
        <svg width="400" height="170" viewBox="0 0 400 170" style="display:inline-block;max-width:100%">
          <!-- Input A -->
          <text x="20" y="45" font-size="13" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">A</text>
          <line x1="38" y1="42" x2="160" y2="42" stroke="var(--line-strong)" stroke-width="2"/>
          <circle cx="70" cy="42" r="3.5" fill="var(--accent-cyan)"/>
          <line x1="70" y1="42" x2="70" y2="120" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="70" y1="120" x2="105" y2="120" stroke="var(--line-strong)" stroke-width="2"/>

          <!-- NOT Gate on A -->
          <polygon points="105,110 105,130 125,120" fill="var(--accent-amber-dim)" stroke="var(--accent-amber)" stroke-width="1.8"/>
          <circle cx="128" cy="120" r="3" fill="var(--bg-card)" stroke="var(--accent-amber)" stroke-width="1.8"/>
          <line x1="131" y1="120" x2="160" y2="120" stroke="var(--line-strong)" stroke-width="2"/>

          <!-- Input B -->
          <text x="20" y="75" font-size="13" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">B</text>
          <line x1="38" y1="72" x2="160" y2="72" stroke="var(--line-strong)" stroke-width="2"/>
          <circle cx="90" cy="72" r="3.5" fill="var(--accent-violet)"/>
          <line x1="90" y1="72" x2="90" y2="142" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="90" y1="142" x2="160" y2="142" stroke="var(--line-strong)" stroke-width="2"/>

          <!-- XOR Gate (D = A ⊕ B) -->
          <path d="M 152 32 Q 167 57 152 82" fill="none" stroke="var(--accent-cyan)" stroke-width="2.2"/>
          <path d="M 160 32 Q 175 57 160 82 Q 200 82 218 57 Q 200 32 160 32 Z" fill="var(--accent-cyan-dim)" stroke="var(--accent-cyan)" stroke-width="2.2"/>
          <text x="178" y="61" font-size="10" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-ui)">XOR</text>
          <line x1="218" y1="57" x2="310" y2="57" stroke="var(--line-strong)" stroke-width="2"/>
          <circle cx="310" cy="57" r="4" fill="var(--accent-cyan)"/>
          <text x="322" y="61" font-size="13" font-weight="800" fill="var(--accent-cyan)" font-family="var(--font-mono)">D (Difference = A ⊕ B)</text>

          <!-- AND Gate (Bout = A' · B) -->
          <path d="M 160 110 L 188 110 A 21 21 0 0 1 188 152 L 160 152 Z" fill="var(--danger-dim)" stroke="var(--danger)" stroke-width="2.2"/>
          <text x="173" y="135" font-size="10" font-weight="700" fill="var(--danger)" font-family="var(--font-ui)">AND</text>
          <line x1="209" y1="131" x2="310" y2="131" stroke="var(--line-strong)" stroke-width="2"/>
          <circle cx="310" cy="131" r="4" fill="var(--danger)"/>
          <text x="322" y="135" font-size="13" font-weight="800" fill="var(--danger)" font-family="var(--font-mono)">Bout (A\' · B)</text>
        </svg>
        <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 5.6: Skematik Logika Half Subtractor menggunakan XOR, NOT, dan AND</p>
      </div>`
    )}

    <!-- Section 2: Full Subtractor -->
    ${w5Section('Full Subtractor (Pengurang Penuh)', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        <strong>Full Subtractor (FS)</strong> menghitung pengurangan antara tiga masukan bit: <code>A − B − Bin</code>, di mana <strong>Bin (Borrow-in)</strong> adalah bit pinjaman yang telah diambil oleh tahap sebelumnya.
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px;margin-bottom:16px">
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:12px 14px">
          <p style="margin:0 0 4px;font-weight:700;color:var(--accent-cyan);font-size:0.75rem;text-transform:uppercase">PERSAMAAN DIFFERENCE (D)</p>
          <p style="margin:0;font-weight:700;font-family:var(--font-mono);font-size:1.05rem">D = A ⊕ B ⊕ Bin</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:12px 14px">
          <p style="margin:0 0 4px;font-weight:700;color:var(--danger);font-size:0.75rem;text-transform:uppercase">PERSAMAAN BORROW-OUT (Bout)</p>
          <p style="margin:0;font-weight:700;font-family:var(--font-mono);font-size:1.05rem">Bout = A\'B + A\'Bin + B·Bin</p>
        </div>
      </div>

      <h4 style="margin:18px 0 10px;font-size:0.95rem;font-weight:700">Tabel Kebenaran Full Subtractor:</h4>
      ${w5Table(
        ['A', 'B', 'Bin', 'Difference (D)', 'Borrow-out (Bout)', 'Proses Operasi (A − B − Bin)'],
        [
          ['0', '0', '0', '0', '0', '0 − 0 − 0 = 0'],
          ['0', '0', '1', '1', '1', '0 − 0 − 1 → pinjam 1 (2−1=1), Bout=1'],
          ['0', '1', '0', '1', '1', '0 − 1 − 0 → pinjam 1 (2−1=1), Bout=1'],
          ['0', '1', '1', '0', '1', '0 − 1 − 1 → pinjam 1 (2−2=0), Bout=1'],
          ['1', '0', '0', '1', '0', '1 − 0 − 0 = 1'],
          ['1', '0', '1', '0', '0', '1 − 0 − 1 = 0'],
          ['1', '1', '0', '0', '0', '1 − 1 − 0 = 0'],
          ['1', '1', '1', '1', '1', '1 − 1 − 1 = −1 → pinjam 1 (1+2−2=1), Bout=1']
        ]
      )}

      <!-- Penurunan Rumus Full Subtractor -->
      <h4 style="margin:20px 0 8px;font-size:0.95rem;font-weight:700;color:var(--accent-violet)">Penurunan Aljabar Persamaan Full Subtractor:</h4>
      ${w5Code([
        '1. Difference (D):',
        '   Identik persis dengan persamaan Sum pada Full Adder!',
        '   D bernilai 1 pada baris {1, 2, 4, 7}:',
        '   D = A\'B\'Bin + A\'BBin\' + AB\'Bin\' + ABBin = A ⊕ B ⊕ Bin',
        '',
        '2. Borrow-out (Bout):',
        '   Bout bernilai 1 pada baris {1, 2, 3, 7}:',
        '   Bout = A\'B\'Bin + A\'BBin\' + A\'BBin + ABBin',
        '   Bout = A\'B(Bin\' + Bin) + Bin(A\'B\' + AB)',
        '   Bout = A\'B + Bin(A ⊕ B)\'',
        '   Atau dalam bentuk SOP standar 3 suku: Bout = A\'B + A\'Bin + BBin'
      ], 'Langkah Penurunan Rumus')}

      <!-- Diagram Skematik SVG Full Subtractor -->
      <h4 style="margin:20px 0 8px;font-size:0.95rem;font-weight:700;color:var(--accent-violet)">Diagram Gerbang Logika Full Subtractor:</h4>
      <div style="text-align:center;margin:16px 0;background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px">
        <svg width="490" height="230" viewBox="0 0 490 230" style="display:inline-block;max-width:100%">
          <!-- Inputs A, B -->
          <text x="15" y="38" font-size="13" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">A</text>
          <line x1="32" y1="35" x2="90" y2="35" stroke="var(--line-strong)" stroke-width="2"/>
          <circle cx="45" cy="35" r="3.5" fill="var(--accent-cyan)"/>
          <line x1="45" y1="35" x2="45" y2="125" stroke="var(--line-strong)" stroke-width="2"/>

          <!-- NOT Gate on A -->
          <polygon points="45,117 45,133 60,125" fill="var(--accent-amber-dim)" stroke="var(--accent-amber)" stroke-width="1.8"/>
          <circle cx="63" cy="125" r="2.5" fill="var(--bg-card)" stroke="var(--accent-amber)" stroke-width="1.8"/>
          <line x1="66" y1="125" x2="220" y2="125" stroke="var(--line-strong)" stroke-width="2"/>

          <text x="15" y="65" font-size="13" font-weight="700" fill="var(--text-primary)" font-family="var(--font-mono)">B</text>
          <line x1="32" y1="62" x2="90" y2="62" stroke="var(--line-strong)" stroke-width="2"/>
          <circle cx="75" cy="62" r="3.5" fill="var(--accent-violet)"/>
          <line x1="75" y1="62" x2="75" y2="145" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="75" y1="145" x2="220" y2="145" stroke="var(--line-strong)" stroke-width="2"/>

          <!-- XOR 1 (A ⊕ B) -->
          <path d="M 83 25 Q 96 48 83 71" fill="none" stroke="var(--accent-cyan)" stroke-width="2"/>
          <path d="M 90 25 Q 103 48 90 71 Q 125 71 140 48 Q 125 25 90 25 Z" fill="var(--accent-cyan-dim)" stroke="var(--accent-cyan)" stroke-width="2"/>
          <text x="103" y="52" font-size="9" font-weight="700" fill="var(--accent-cyan)" font-family="var(--font-ui)">XOR1</text>

          <!-- XOR 1 output line to XOR2 & inverter for AND2 -->
          <line x1="140" y1="48" x2="210" y2="48" stroke="var(--line-strong)" stroke-width="2"/>
          <circle cx="160" cy="48" r="3.5" fill="var(--accent-cyan)"/>
          <line x1="160" y1="48" x2="160" y2="185" stroke="var(--line-strong)" stroke-width="2"/>
          <polygon points="160,177 160,193 175,185" fill="var(--accent-amber-dim)" stroke="var(--accent-amber)" stroke-width="1.8"/>
          <circle cx="178" cy="185" r="2.5" fill="var(--bg-card)" stroke="var(--accent-amber)" stroke-width="1.8"/>
          <line x1="181" y1="185" x2="220" y2="185" stroke="var(--line-strong)" stroke-width="2"/>

          <!-- Input Bin -->
          <text x="15" y="95" font-size="13" font-weight="700" fill="var(--accent-amber)" font-family="var(--font-mono)">Bin</text>
          <line x1="42" y1="92" x2="195" y2="92" stroke="var(--accent-amber)" stroke-width="2"/>
          <circle cx="195" cy="92" r="3.5" fill="var(--accent-amber)"/>
          <line x1="195" y1="92" x2="195" y2="68" stroke="var(--accent-amber)" stroke-width="2"/>
          <line x1="195" y1="68" x2="210" y2="68" stroke="var(--accent-amber)" stroke-width="2"/>
          <line x1="195" y1="92" x2="195" y2="205" stroke="var(--accent-amber)" stroke-width="2"/>
          <line x1="195" y1="205" x2="220" y2="205" stroke="var(--accent-amber)" stroke-width="2"/>

          <!-- XOR 2 (D = (A ⊕ B) ⊕ Bin) -->
          <path d="M 203 38 Q 216 58 203 78" fill="none" stroke="var(--success)" stroke-width="2"/>
          <path d="M 210 38 Q 223 58 210 78 Q 245 78 260 58 Q 245 38 210 38 Z" fill="var(--success-dim)" stroke="var(--success)" stroke-width="2"/>
          <text x="223" y="62" font-size="9" font-weight="700" fill="var(--success)" font-family="var(--font-ui)">XOR2</text>
          <line x1="260" y1="58" x2="380" y2="58" stroke="var(--line-strong)" stroke-width="2"/>
          <circle cx="380" cy="58" r="4" fill="var(--success)"/>
          <text x="392" y="62" font-size="13" font-weight="800" fill="var(--success)" font-family="var(--font-mono)">D (Diff = A ⊕ B ⊕ Bin)</text>

          <!-- AND 1 (A' · B) -->
          <path d="M 220 115 L 242 115 A 18 18 0 0 1 242 151 L 220 151 Z" fill="var(--accent-violet-dim)" stroke="var(--accent-violet)" stroke-width="2"/>
          <text x="228" y="137" font-size="9" font-weight="700" fill="var(--accent-violet)" font-family="var(--font-ui)">AND</text>
          <line x1="260" y1="133" x2="310" y2="133" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="310" y1="133" x2="310" y2="153" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="310" y1="153" x2="330" y2="153" stroke="var(--line-strong)" stroke-width="2"/>

          <!-- AND 2 (Bin · (A ⊕ B)') -->
          <path d="M 220 175 L 242 175 A 18 18 0 0 1 242 211 L 220 211 Z" fill="var(--accent-amber-dim)" stroke="var(--accent-amber)" stroke-width="2"/>
          <text x="228" y="197" font-size="9" font-weight="700" fill="var(--accent-amber)" font-family="var(--font-ui)">AND</text>
          <line x1="260" y1="193" x2="310" y2="193" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="310" y1="193" x2="310" y2="173" stroke="var(--line-strong)" stroke-width="2"/>
          <line x1="310" y1="173" x2="330" y2="173" stroke="var(--line-strong)" stroke-width="2"/>

          <!-- OR Gate (Bout) -->
          <path d="M 330 145 Q 343 163 330 181 Q 365 181 380 163 Q 365 145 330 145 Z" fill="var(--danger-dim)" stroke="var(--danger)" stroke-width="2"/>
          <text x="345" y="167" font-size="9" font-weight="700" fill="var(--danger)" font-family="var(--font-ui)">OR</text>
          <line x1="380" y1="163" x2="430" y2="163" stroke="var(--line-strong)" stroke-width="2"/>
          <circle cx="430" cy="163" r="4" fill="var(--danger)"/>
          <text x="440" y="167" font-size="13" font-weight="800" fill="var(--danger)" font-family="var(--font-mono)">Bout</text>
        </svg>
        <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-secondary);font-style:italic">Gambar 5.7: Skematik Logika Full Subtractor (FS) tersusun dari 2 HS dan 1 OR</p>
      </div>`
    )}
  `;
}



/* ══════════════════════════════════════════════════════
   TOPIK 8: ADDER-SUBTRACTOR TERINTEGRASI
   ══════════════════════════════════════════════════════ */
function renderWeek5AdderSubtractor(el) {
  el.innerHTML = `
    <!-- Section 1: Konsep Rangkaian Terintegrasi -->
    ${w5Section('Rangkaian Adder-Subtractor Terintegrasi', '--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
      `<p style="margin:0 0 14px;font-size:0.95rem;line-height:1.7">
        Alih-alih membuat sirkuit adder dan subtractor yang terpisah di dalam CPU, perancang sistem digital memanfaatkan prinsip matematis <strong>Two\'s Complement: A − B = A + B\' + 1</strong>. Dengan menambahkan gerbang XOR pengendali pada setiap bit B dan menghubungkan Carry-in awal ke sinyal mode M, satu rangkaian yang sama dapat melakukan penjumlahan dan pengurangan secara otomatis!
      </p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;margin-bottom:16px">
        <div style="background:var(--bg-inset);border-left:3px solid var(--accent-cyan);border-radius:0 10px 10px 0;padding:14px">
          <p style="margin:0 0 6px;font-weight:700;color:var(--accent-cyan);font-size:0.92rem">1. Gerbang XOR sebagai Inverter Terkontrol</p>
          <p style="margin:0;font-size:0.86rem;color:var(--text-secondary);line-height:1.6">
            Input B dilewatkan ke gerbang XOR bersama sinyal Mode M: <code>B_in = Bᵢ ⊕ M</code>.<br>
            • Saat <strong>M = 0</strong>: <code>Bᵢ ⊕ 0 = Bᵢ</code> (Data B diteruskan asli tanpa perubahan).<br>
            • Saat <strong>M = 1</strong>: <code>Bᵢ ⊕ 1 = Bᵢ\'</code> (Setiap bit B dibalik/diinversi menjadi One\'s Complement).
          </p>
        </div>
        <div style="background:var(--bg-inset);border-left:3px solid var(--accent-amber);border-radius:0 10px 10px 0;padding:14px">
          <p style="margin:0 0 6px;font-weight:700;color:var(--accent-amber);font-size:0.92rem">2. Sinyal Carry-in Awal (C₀ = M)</p>
          <p style="margin:0;font-size:0.86rem;color:var(--text-secondary);line-height:1.6">
            Carry-in tahap paling awal (C₀) dihubungkan langsung ke sinyal M:<br>
            • Saat <strong>M = 0</strong>: C₀ = 0 → Operasi: <code>A + B + 0 = A + B</code> (Penjumlahan normal).<br>
            • Saat <strong>M = 1</strong>: C₀ = 1 → Operasi: <code>A + B\' + 1 = A − B</code> (Pengurangan Two\'s Complement presisi!).
          </p>
        </div>
      </div>

      <!-- Diagram Skematik SVG -->
      <h4 style="margin:20px 0 8px;font-size:0.95rem;font-weight:700;color:var(--accent-amber)">Skematik Rangkaian 4-bit Adder-Subtractor Terintegrasi:</h4>
      ${w5SvgAdderSubtractor()}

      <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px;margin-top:16px">
        <h4 style="margin:0 0 8px;font-size:0.92rem;color:var(--danger)">Penting: Perbedaan Interpretasi Carry-out vs Borrow-out</h4>
        <p style="margin:0;font-size:0.86rem;color:var(--text-secondary);line-height:1.6">
          Jangan menyamakan Carry-out (C₄) pada mode pengurangan dengan Borrow-out secara sembarangan! Dalam pengurangan Two\'s Complement biner tak bertanda:<br>
          • <strong>Jika C₄ = 1 (Ada Carry-out):</strong> Menandakan <strong>TIDAK TERJADI BORROW (A ≥ B)</strong>. Hasil 4-bit (S₃S₂S₁S₀) adalah selisih positif yang valid.<br>
          • <strong>Jika C₄ = 0 (Tanpa Carry-out):</strong> Menandakan <strong>TERJADI BORROW (A &lt; B)</strong>. Hasil bernilai negatif dan tersimpan dalam representasi Two\'s Complement!
        </p>
      </div>`
    )}

    <!-- Section 2: Contoh Perhitungan Langkah Demi Langkah -->
    ${w5Section('Contoh Perhitungan Bit-per-Bit Adder-Subtractor', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>',
      `<!-- Contoh A: Penjumlahan -->
      <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px;margin-bottom:18px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <span style="background:var(--accent-cyan-dim);color:var(--accent-cyan);padding:2px 8px;border-radius:4px;font-size:0.75rem;font-weight:700">CONTOH A</span>
          <h4 style="margin:0;font-size:0.95rem;font-weight:700">Mode Penjumlahan (M = 0): A = 1011₂ (11₁₀) dan B = 0110₂ (6₁₀)</h4>
        </div>
        <p style="margin:0 0 10px;font-size:0.86rem;color:var(--text-secondary)">Karena M = 0, maka C₀ = 0 dan B lewat tanpa inversi (0110₂).</p>
        ${w5Table(
          ['Tahap Bit', 'Aᵢ', 'Bᵢ ⊕ M', 'Carry-in (Cᵢ)', 'Sum (Sᵢ)', 'Carry-out (Cᵢ₊₁)'],
          [
            ['Bit 0 (LSB)', '1', '0', '0 (C₀)', '1 ⊕ 0 ⊕ 0 = <strong>1</strong>', 'C₁ = (1·0) + 0·(1⊕0) = <strong>0</strong>'],
            ['Bit 1', '1', '1', '0 (C₁)', '1 ⊕ 1 ⊕ 0 = <strong>0</strong>', 'C₂ = (1·1) + 0·(1⊕1) = <strong>1</strong>'],
            ['Bit 2', '0', '1', '1 (C₂)', '0 ⊕ 1 ⊕ 1 = <strong>0</strong>', 'C₃ = (0·1) + 1·(0⊕1) = <strong>1</strong>'],
            ['Bit 3 (MSB)', '1', '0', '1 (C₃)', '1 ⊕ 0 ⊕ 1 = <strong>0</strong>', 'C₄ = (1·0) + 1·(1⊕0) = <strong>1</strong>']
          ]
        )}
        ${w5Alert('success', '<strong>Hasil Akhir Penjumlahan:</strong> S₃S₂S₁S₀ = 0001₂ dengan Carry-out C₄ = 1 → <strong>10001₂ = 17₁₀ (11 + 6 = 17)</strong>.')}
      </div>

      <!-- Contoh B: Pengurangan -->
      <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <span style="background:var(--accent-violet-dim);color:var(--accent-violet);padding:2px 8px;border-radius:4px;font-size:0.75rem;font-weight:700">CONTOH B</span>
          <h4 style="margin:0;font-size:0.95rem;font-weight:700">Mode Pengurangan (M = 1): A = 1001₂ (9₁₀) dan B = 0101₂ (5₁₀)</h4>
        </div>
        <p style="margin:0 0 10px;font-size:0.86rem;color:var(--text-secondary)">
          Karena M = 1, maka C₀ = 1 dan B diinversi: <code>B\' = 0101₂ ⊕ 1111₂ = 1010₂</code>. Rangkaian mengeksekusi 1001₂ + 1010₂ + 1:
        </p>
        ${w5Table(
          ['Tahap Bit', 'Aᵢ', 'Bᵢ ⊕ M (Bᵢ\')', 'Carry-in (Cᵢ)', 'Sum (Sᵢ)', 'Carry-out (Cᵢ₊₁)'],
          [
            ['Bit 0 (LSB)', '1', '0', '1 (C₀=M)', '1 ⊕ 0 ⊕ 1 = <strong>0</strong>', 'C₁ = (1·0) + 1·(1⊕0) = <strong>1</strong>'],
            ['Bit 1', '0', '1', '1 (C₁)', '0 ⊕ 1 ⊕ 1 = <strong>0</strong>', 'C₂ = (0·1) + 1·(0⊕1) = <strong>1</strong>'],
            ['Bit 2', '0', '0', '1 (C₂)', '0 ⊕ 0 ⊕ 1 = <strong>1</strong>', 'C₃ = (0·0) + 1·(0⊕0) = <strong>0</strong>'],
            ['Bit 3 (MSB)', '1', '1', '0 (C₃)', '1 ⊕ 1 ⊕ 0 = <strong>0</strong>', 'C₄ = (1·1) + 0·(1⊕1) = <strong>1</strong>']
          ]
        )}
        ${w5Alert('success', '<strong>Hasil Akhir Pengurangan:</strong> S₃S₂S₁S₀ = <strong>0100₂ = 4₁₀ (9 − 5 = 4)</strong>. Sinyal Carry-out C₄ = 1 menandakan hasil positif (tidak ada pinjaman/borrow)!')}
      </div>`
    )}
  `;
}



/* ══════════════════════════════════════════════════════
   TOPIK 9: SIMULATOR RANGKAIAN ARITMATIKA INTERAKTIF
   ══════════════════════════════════════════════════════ */
function renderWeek5Simulator(el) {
  el.innerHTML = `
    ${w5Section('Simulator Aritmatika Digital Real-Time', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
      `<p style="margin:0 0 16px;font-size:0.95rem;line-height:1.7">
        Uji dan eksplorasi perilaku sirkuit aritmatika secara langsung. Seluruh keluaran dihitung secara deterministik dan presisi menggunakan persamaan logika Boolean yang sesungguhnya.
      </p>

      <!-- Tabs Navigation -->
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px">
        <button type="button" class="w5-tab-btn active" onclick="window.w5SwitchSimTab('ha')" style="background:var(--accent-cyan);color:#000;border:none;padding:8px 14px;border-radius:8px;font-weight:700;font-size:0.85rem;cursor:pointer">Half Adder</button>
        <button type="button" class="w5-tab-btn" onclick="window.w5SwitchSimTab('fa')" style="background:var(--bg-inset);color:var(--text-secondary);border:1px solid var(--line);padding:8px 14px;border-radius:8px;font-weight:700;font-size:0.85rem;cursor:pointer">Full Adder</button>
        <button type="button" class="w5-tab-btn" onclick="window.w5SwitchSimTab('hs')" style="background:var(--bg-inset);color:var(--text-secondary);border:1px solid var(--line);padding:8px 14px;border-radius:8px;font-weight:700;font-size:0.85rem;cursor:pointer">Half Subtractor</button>
        <button type="button" class="w5-tab-btn" onclick="window.w5SwitchSimTab('fs')" style="background:var(--bg-inset);color:var(--text-secondary);border:1px solid var(--line);padding:8px 14px;border-radius:8px;font-weight:700;font-size:0.85rem;cursor:pointer">Full Subtractor</button>
        <button type="button" class="w5-tab-btn" onclick="window.w5SwitchSimTab('as4')" style="background:var(--bg-inset);color:var(--text-secondary);border:1px solid var(--line);padding:8px 14px;border-radius:8px;font-weight:700;font-size:0.85rem;cursor:pointer">4-Bit Adder-Subtractor</button>
      </div>

      <!-- Tab Content 1: Half Adder -->
      <div id="w5_sim_ha" class="w5-sim-pane" style="background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px">
        <h4 style="margin:0 0 12px;font-size:0.95rem;color:var(--accent-cyan)">Simulasi 1-Bit Half Adder</h4>
        <div style="display:flex;gap:20px;align-items:center;flex-wrap:wrap">
          <div>
            <span style="font-size:0.8rem;color:var(--text-faint);display:block;margin-bottom:4px">Input A</span>
            <button type="button" id="w5_ha_a" onclick="window.w5ToggleBtn(this);window.w5CalcHA()" style="width:48px;height:48px;border-radius:10px;border:2px solid var(--line);background:var(--bg-card);font-size:1.2rem;font-weight:800;cursor:pointer">0</button>
          </div>
          <span style="font-size:1.4rem;font-weight:800;color:var(--text-faint)">+</span>
          <div>
            <span style="font-size:0.8rem;color:var(--text-faint);display:block;margin-bottom:4px">Input B</span>
            <button type="button" id="w5_ha_b" onclick="window.w5ToggleBtn(this);window.w5CalcHA()" style="width:48px;height:48px;border-radius:10px;border:2px solid var(--line);background:var(--bg-card);font-size:1.2rem;font-weight:800;cursor:pointer">0</button>
          </div>
          <span style="font-size:1.4rem;font-weight:800;color:var(--text-faint)">=</span>
          <div style="display:flex;gap:12px">
            <div style="background:var(--bg-card);border:2px solid var(--accent-violet);border-radius:10px;padding:8px 14px;text-align:center">
              <span style="font-size:0.75rem;color:var(--accent-violet);font-weight:700;display:block">Carry (C = A·B)</span>
              <span id="w5_ha_c" style="font-size:1.3rem;font-weight:800;font-family:var(--font-mono)">0</span>
            </div>
            <div style="background:var(--bg-card);border:2px solid var(--success);border-radius:10px;padding:8px 14px;text-align:center">
              <span style="font-size:0.75rem;color:var(--success);font-weight:700;display:block">Sum (S = A⊕B)</span>
              <span id="w5_ha_s" style="font-size:1.3rem;font-weight:800;font-family:var(--font-mono);color:var(--success)">0</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Content 2: Full Adder -->
      <div id="w5_sim_fa" class="w5-sim-pane" hidden style="background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px">
        <h4 style="margin:0 0 12px;font-size:0.95rem;color:var(--accent-violet)">Simulasi 1-Bit Full Adder</h4>
        <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
          <div>
            <span style="font-size:0.8rem;color:var(--text-faint);display:block;margin-bottom:4px">Input A</span>
            <button type="button" id="w5_fa_a" onclick="window.w5ToggleBtn(this);window.w5CalcFA()" style="width:48px;height:48px;border-radius:10px;border:2px solid var(--line);background:var(--bg-card);font-size:1.2rem;font-weight:800;cursor:pointer">0</button>
          </div>
          <div>
            <span style="font-size:0.8rem;color:var(--text-faint);display:block;margin-bottom:4px">Input B</span>
            <button type="button" id="w5_fa_b" onclick="window.w5ToggleBtn(this);window.w5CalcFA()" style="width:48px;height:48px;border-radius:10px;border:2px solid var(--line);background:var(--bg-card);font-size:1.2rem;font-weight:800;cursor:pointer">0</button>
          </div>
          <div>
            <span style="font-size:0.8rem;color:var(--accent-amber);display:block;margin-bottom:4px">Carry-in (Cin)</span>
            <button type="button" id="w5_fa_cin" onclick="window.w5ToggleBtn(this);window.w5CalcFA()" style="width:48px;height:48px;border-radius:10px;border:2px solid var(--accent-amber);background:var(--bg-card);font-size:1.2rem;font-weight:800;color:var(--accent-amber);cursor:pointer">0</button>
          </div>
          <span style="font-size:1.4rem;font-weight:800;color:var(--text-faint)">➔</span>
          <div style="display:flex;gap:12px">
            <div style="background:var(--bg-card);border:2px solid var(--danger);border-radius:10px;padding:8px 14px;text-align:center">
              <span style="font-size:0.75rem;color:var(--danger);font-weight:700;display:block">Cout</span>
              <span id="w5_fa_cout" style="font-size:1.3rem;font-weight:800;font-family:var(--font-mono);color:var(--danger)">0</span>
            </div>
            <div style="background:var(--bg-card);border:2px solid var(--success);border-radius:10px;padding:8px 14px;text-align:center">
              <span style="font-size:0.75rem;color:var(--success);font-weight:700;display:block">Sum (S)</span>
              <span id="w5_fa_s" style="font-size:1.3rem;font-weight:800;font-family:var(--font-mono);color:var(--success)">0</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Content 3: Half Subtractor -->
      <div id="w5_sim_hs" class="w5-sim-pane" hidden style="background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px">
        <h4 style="margin:0 0 12px;font-size:0.95rem;color:var(--accent-cyan)">Simulasi 1-Bit Half Subtractor</h4>
        <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
          <div>
            <span style="font-size:0.8rem;color:var(--text-faint);display:block;margin-bottom:4px">Minuend A</span>
            <button type="button" id="w5_hs_a" onclick="window.w5ToggleBtn(this);window.w5CalcHS()" style="width:48px;height:48px;border-radius:10px;border:2px solid var(--line);background:var(--bg-card);font-size:1.2rem;font-weight:800;cursor:pointer">0</button>
          </div>
          <span style="font-size:1.4rem;font-weight:800;color:var(--text-faint)">−</span>
          <div>
            <span style="font-size:0.8rem;color:var(--text-faint);display:block;margin-bottom:4px">Subtrahend B</span>
            <button type="button" id="w5_hs_b" onclick="window.w5ToggleBtn(this);window.w5CalcHS()" style="width:48px;height:48px;border-radius:10px;border:2px solid var(--line);background:var(--bg-card);font-size:1.2rem;font-weight:800;cursor:pointer">0</button>
          </div>
          <span style="font-size:1.4rem;font-weight:800;color:var(--text-faint)">=</span>
          <div style="display:flex;gap:12px">
            <div style="background:var(--bg-card);border:2px solid var(--danger);border-radius:10px;padding:8px 14px;text-align:center">
              <span style="font-size:0.75rem;color:var(--danger);font-weight:700;display:block">Borrow-out (Bout)</span>
              <span id="w5_hs_bout" style="font-size:1.3rem;font-weight:800;font-family:var(--font-mono);color:var(--danger)">0</span>
            </div>
            <div style="background:var(--bg-card);border:2px solid var(--accent-cyan);border-radius:10px;padding:8px 14px;text-align:center">
              <span style="font-size:0.75rem;color:var(--accent-cyan);font-weight:700;display:block">Difference (D)</span>
              <span id="w5_hs_d" style="font-size:1.3rem;font-weight:800;font-family:var(--font-mono);color:var(--accent-cyan)">0</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Content 4: Full Subtractor -->
      <div id="w5_sim_fs" class="w5-sim-pane" hidden style="background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px">
        <h4 style="margin:0 0 12px;font-size:0.95rem;color:var(--accent-violet)">Simulasi 1-Bit Full Subtractor</h4>
        <div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
          <div>
            <span style="font-size:0.8rem;color:var(--text-faint);display:block;margin-bottom:4px">Minuend A</span>
            <button type="button" id="w5_fs_a" onclick="window.w5ToggleBtn(this);window.w5CalcFS()" style="width:48px;height:48px;border-radius:10px;border:2px solid var(--line);background:var(--bg-card);font-size:1.2rem;font-weight:800;cursor:pointer">0</button>
          </div>
          <div>
            <span style="font-size:0.8rem;color:var(--text-faint);display:block;margin-bottom:4px">Subtrahend B</span>
            <button type="button" id="w5_fs_b" onclick="window.w5ToggleBtn(this);window.w5CalcFS()" style="width:48px;height:48px;border-radius:10px;border:2px solid var(--line);background:var(--bg-card);font-size:1.2rem;font-weight:800;cursor:pointer">0</button>
          </div>
          <div>
            <span style="font-size:0.8rem;color:var(--accent-amber);display:block;margin-bottom:4px">Borrow-in (Bin)</span>
            <button type="button" id="w5_fs_bin" onclick="window.w5ToggleBtn(this);window.w5CalcFS()" style="width:48px;height:48px;border-radius:10px;border:2px solid var(--accent-amber);background:var(--bg-card);font-size:1.2rem;font-weight:800;color:var(--accent-amber);cursor:pointer">0</button>
          </div>
          <span style="font-size:1.4rem;font-weight:800;color:var(--text-faint)">➔</span>
          <div style="display:flex;gap:12px">
            <div style="background:var(--bg-card);border:2px solid var(--danger);border-radius:10px;padding:8px 14px;text-align:center">
              <span style="font-size:0.75rem;color:var(--danger);font-weight:700;display:block">Borrow-out (Bout)</span>
              <span id="w5_fs_bout" style="font-size:1.3rem;font-weight:800;font-family:var(--font-mono);color:var(--danger)">0</span>
            </div>
            <div style="background:var(--bg-card);border:2px solid var(--accent-cyan);border-radius:10px;padding:8px 14px;text-align:center">
              <span style="font-size:0.75rem;color:var(--accent-cyan);font-weight:700;display:block">Difference (D)</span>
              <span id="w5_fs_d" style="font-size:1.3rem;font-weight:800;font-family:var(--font-mono);color:var(--accent-cyan)">0</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Content 5: 4-Bit Adder-Subtractor -->
      <div id="w5_sim_as4" class="w5-sim-pane" hidden style="background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:20px">
        <h4 style="margin:0 0 12px;font-size:0.95rem;color:var(--accent-amber)">Simulasi Interaktif 4-Bit Adder-Subtractor Terintegrasi</h4>
        <div style="display:flex;gap:20px;flex-wrap:wrap;align-items:flex-start;margin-bottom:16px">
          <!-- Mode Selector -->
          <div style="background:var(--bg-card);border:1px solid var(--line);border-radius:10px;padding:12px 16px">
            <span style="font-size:0.78rem;font-weight:700;color:var(--text-faint);display:block;margin-bottom:6px">MODE KONTROL (M)</span>
            <div style="display:flex;gap:8px">
              <button type="button" id="w5_btn_m0" onclick="window.w5SetMode(0)" style="background:var(--accent-cyan);color:#000;border:none;padding:6px 14px;border-radius:6px;font-weight:800;cursor:pointer">M=0 (ADD)</button>
              <button type="button" id="w5_btn_m1" onclick="window.w5SetMode(1)" style="background:var(--bg-inset);color:var(--text-secondary);border:1px solid var(--line);padding:6px 14px;border-radius:6px;font-weight:800;cursor:pointer">M=1 (SUB)</button>
            </div>
          </div>

          <!-- Input A 4-bit -->
          <div>
            <span style="font-size:0.78rem;font-weight:700;color:var(--text-faint);display:block;margin-bottom:6px">INPUT A [A₃ A₂ A₁ A₀]</span>
            <div style="display:flex;gap:6px">
              ${[3, 2, 1, 0].map(i => `<button type="button" id="w5_a_${i}" onclick="window.w5ToggleBit('a',${i})" style="width:36px;height:40px;border-radius:6px;border:1.5px solid var(--line);background:var(--bg-card);font-size:1.1rem;font-weight:800;cursor:pointer">0</button>`).join('')}
            </div>
          </div>

          <!-- Input B 4-bit -->
          <div>
            <span style="font-size:0.78rem;font-weight:700;color:var(--text-faint);display:block;margin-bottom:6px">INPUT B [B₃ B₂ B₁ B₀]</span>
            <div style="display:flex;gap:6px">
              ${[3, 2, 1, 0].map(i => `<button type="button" id="w5_b_${i}" onclick="window.w5ToggleBit('b',${i})" style="width:36px;height:40px;border-radius:6px;border:1.5px solid var(--line);background:var(--bg-card);font-size:1.1rem;font-weight:800;cursor:pointer">0</button>`).join('')}
            </div>
          </div>
        </div>

        <!-- Output Dashboard -->
        <div style="background:var(--bg-card);border:1.5px solid var(--line);border-radius:10px;padding:16px;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px">
          <div>
            <span style="font-size:0.75rem;color:var(--text-faint);font-weight:700;text-transform:uppercase">Operasi Dieksekusi</span>
            <p id="w5_out_op" style="margin:4px 0 0;font-size:1rem;font-weight:800;color:var(--accent-amber)">A + B (Penjumlahan)</p>
          </div>
          <div>
            <span style="font-size:0.75rem;color:var(--text-faint);font-weight:700;text-transform:uppercase">Hasil 4-Bit [S₃S₂S₁S₀]</span>
            <p id="w5_out_sum" style="margin:4px 0 0;font-size:1.15rem;font-weight:800;font-family:var(--font-mono);color:var(--success)">0000₂ (0₁₀)</p>
          </div>
          <div>
            <span style="font-size:0.75rem;color:var(--text-faint);font-weight:700;text-transform:uppercase">Carry-out (C₄)</span>
            <p id="w5_out_c4" style="margin:4px 0 0;font-size:1.15rem;font-weight:800;font-family:var(--font-mono);color:var(--danger)">0</p>
          </div>
          <div>
            <span style="font-size:0.75rem;color:var(--text-faint);font-weight:700;text-transform:uppercase">Interpretasi Status</span>
            <p id="w5_out_status" style="margin:4px 0 0;font-size:0.88rem;font-weight:700;color:var(--text-secondary)">Hasil Valid (Tanpa Overflow)</p>
          </div>
        </div>
      </div>`
    )}
  `;

  // Simulator helper logic registered to window
  window.w5SimMode = 0;
  window.w5BitsA = [0, 0, 0, 0];
  window.w5BitsB = [0, 0, 0, 0];

  window.w5SwitchSimTab = function(tab) {
    document.querySelectorAll('.w5-sim-pane').forEach(p => p.hidden = true);
    document.querySelectorAll('.w5-tab-btn').forEach(b => {
      b.style.background = 'var(--bg-inset)';
      b.style.color = 'var(--text-secondary)';
      b.style.border = '1px solid var(--line)';
    });
    const pane = document.getElementById('w5_sim_' + tab);
    if (pane) pane.hidden = false;
    const activeBtn = event.currentTarget;
    if (activeBtn) {
      activeBtn.style.background = 'var(--accent-cyan)';
      activeBtn.style.color = '#000';
      activeBtn.style.border = 'none';
    }
  };

  window.w5ToggleBtn = function(btn) {
    const cur = btn.textContent.trim();
    const next = cur === '0' ? '1' : '0';
    btn.textContent = next;
    btn.style.borderColor = next === '1' ? 'var(--success)' : 'var(--line)';
    btn.style.color = next === '1' ? 'var(--success)' : 'inherit';
  };

  window.w5CalcHA = function() {
    const a = parseInt(document.getElementById('w5_ha_a')?.textContent || '0', 10);
    const b = parseInt(document.getElementById('w5_ha_b')?.textContent || '0', 10);
    const s = a ^ b;
    const c = a & b;
    const sEl = document.getElementById('w5_ha_s');
    const cEl = document.getElementById('w5_ha_c');
    if (sEl) sEl.textContent = s;
    if (cEl) cEl.textContent = c;
  };

  window.w5CalcFA = function() {
    const a = parseInt(document.getElementById('w5_fa_a')?.textContent || '0', 10);
    const b = parseInt(document.getElementById('w5_fa_b')?.textContent || '0', 10);
    const cin = parseInt(document.getElementById('w5_fa_cin')?.textContent || '0', 10);
    const s = a ^ b ^ cin;
    const cout = (a & b) | (cin & (a ^ b));
    const sEl = document.getElementById('w5_fa_s');
    const coutEl = document.getElementById('w5_fa_cout');
    if (sEl) sEl.textContent = s;
    if (coutEl) coutEl.textContent = cout;
  };

  window.w5CalcHS = function() {
    const a = parseInt(document.getElementById('w5_hs_a')?.textContent || '0', 10);
    const b = parseInt(document.getElementById('w5_hs_b')?.textContent || '0', 10);
    const d = a ^ b;
    const bout = (!a) & b ? 1 : 0;
    const dEl = document.getElementById('w5_hs_d');
    const boutEl = document.getElementById('w5_hs_bout');
    if (dEl) dEl.textContent = d;
    if (boutEl) boutEl.textContent = bout;
  };

  window.w5CalcFS = function() {
    const a = parseInt(document.getElementById('w5_fs_a')?.textContent || '0', 10);
    const b = parseInt(document.getElementById('w5_fs_b')?.textContent || '0', 10);
    const bin = parseInt(document.getElementById('w5_fs_bin')?.textContent || '0', 10);
    const d = a ^ b ^ bin;
    const bout = ((!a) & b) | ((!a) & bin) | (b & bin) ? 1 : 0;
    const dEl = document.getElementById('w5_fs_d');
    const boutEl = document.getElementById('w5_fs_bout');
    if (dEl) dEl.textContent = d;
    if (boutEl) boutEl.textContent = bout;
  };

  window.w5SetMode = function(m) {
    window.w5SimMode = m;
    const btnM0 = document.getElementById('w5_btn_m0');
    const btnM1 = document.getElementById('w5_btn_m1');
    if (btnM0 && btnM1) {
      if (m === 0) {
        btnM0.style.background = 'var(--accent-cyan)';
        btnM0.style.color = '#000';
        btnM1.style.background = 'var(--bg-inset)';
        btnM1.style.color = 'var(--text-secondary)';
      } else {
        btnM1.style.background = 'var(--danger)';
        btnM1.style.color = '#fff';
        btnM0.style.background = 'var(--bg-inset)';
        btnM0.style.color = 'var(--text-secondary)';
      }
    }
    window.w5CalcAS4();
  };

  window.w5ToggleBit = function(type, i) {
    const btn = document.getElementById('w5_' + type + '_' + i);
    if (!btn) return;
    const cur = parseInt(btn.textContent.trim(), 10);
    const next = cur === 0 ? 1 : 0;
    btn.textContent = next;
    btn.style.borderColor = next === 1 ? 'var(--success)' : 'var(--line)';
    if (type === 'a') window.w5BitsA[i] = next;
    else window.w5BitsB[i] = next;
    window.w5CalcAS4();
  };

  window.w5CalcAS4 = function() {
    const M = window.w5SimMode;
    let carry = M; // C0 = M
    const sumBits = [];
    const valA = window.w5BitsA[3]*8 + window.w5BitsA[2]*4 + window.w5BitsA[1]*2 + window.w5BitsA[0];
    const valB = window.w5BitsB[3]*8 + window.w5BitsB[2]*4 + window.w5BitsB[1]*2 + window.w5BitsB[0];

    for (let i = 0; i < 4; i++) {
      const a = window.w5BitsA[i];
      const bIn = window.w5BitsB[i] ^ M;
      const s = a ^ bIn ^ carry;
      carry = (a & bIn) | (carry & (a ^ bIn));
      sumBits.push(s);
    }
    const c4 = carry;
    const sum4Val = sumBits[3]*8 + sumBits[2]*4 + sumBits[1]*2 + sumBits[0];
    const sumStr = sumBits[3] + '' + sumBits[2] + '' + sumBits[1] + '' + sumBits[0] + '₂ (' + sum4Val + '₁₀)';

    const opEl = document.getElementById('w5_out_op');
    const sumEl = document.getElementById('w5_out_sum');
    const c4El = document.getElementById('w5_out_c4');
    const statEl = document.getElementById('w5_out_status');

    if (opEl) opEl.textContent = M === 0 ? ('A + B = ' + valA + ' + ' + valB) : ('A − B = ' + valA + ' − ' + valB);
    if (sumEl) sumEl.textContent = sumStr;
    if (c4El) c4El.textContent = c4;

    if (statEl) {
      if (M === 0) {
        statEl.textContent = c4 === 1 ? 'Ada Carry-out luapan (Total: ' + (16 + sum4Val) + ')' : 'Normal (Tanpa Carry-out)';
      } else {
        if (c4 === 1) {
          statEl.innerHTML = '<span style="color:var(--success)">Positif (A ≥ B), Tidak ada Borrow</span>';
        } else {
          statEl.innerHTML = '<span style="color:var(--danger)">Negatif (A &lt; B), Terjadi Borrow</span>';
        }
      }
    }
  };
}



/* ══════════════════════════════════════════════════════
   TOPIK 10: LATIHAN DAN EVALUASI TERBIMBING
   ══════════════════════════════════════════════════════ */
function renderWeek5Exercises(el) {
  el.innerHTML = `
    <!-- Latihan 1: Half Adder -->
    ${w5Section('Latihan 1: Analisis Gerbang Half Adder', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
      `<div style="background:var(--accent-cyan-dim);border:1px solid var(--accent-cyan);border-radius:10px;padding:14px 18px;margin-bottom:14px">
        <p style="margin:0 0 6px;font-size:0.8rem;font-weight:700;color:var(--accent-cyan);letter-spacing:.04em;text-transform:uppercase">SOAL LATIHAN 1</p>
        <p style="margin:0;font-size:1rem;font-weight:700">Diberikan masukan bit A = 1 dan B = 1 pada sebuah rangkaian Half Adder.</p>
        <p style="margin:8px 0 0;font-size:0.86rem;color:var(--text-secondary)">Tentukan: (a) Nilai keluaran Sum (S), (b) Nilai keluaran Carry (C), (c) Persamaan Boolean yang digunakan, dan (d) Jenis gerbang logika yang menghasilkan masing-masing keluaran!</p>
      </div>

      ${w5Spoiler('📖 Buka Pembahasan Latihan 1', `
        ${w5Code([
          '(a) Sum (S)   = A ⊕ B = 1 ⊕ 1 = 0',
          '(b) Carry (C) = A · B = 1 · 1 = 1',
          '(c) Persamaan : S = A ⊕ B  dan  C = A · B',
          '(d) Gerbang   : Gerbang XOR menghasilkan Sum, Gerbang AND menghasilkan Carry.'
        ])}
        ${w5Alert('info', 'Secara aritmatika: 1 + 1 = 2₁₀ = 10₂, sehingga Sum bernilai 0 dan Carry bernilai 1.')}`
      )}`
    )}

    <!-- Latihan 2: Full Adder -->
    ${w5Section('Latihan 2: Evaluasi Full Adder 3-Input', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
      `<div style="background:var(--accent-violet-dim);border:1px solid var(--accent-violet);border-radius:10px;padding:14px 18px;margin-bottom:14px">
        <p style="margin:0 0 6px;font-size:0.8rem;font-weight:700;color:var(--accent-violet);letter-spacing:.04em;text-transform:uppercase">SOAL LATIHAN 2</p>
        <p style="margin:0;font-size:1rem;font-weight:700">Diberikan masukan A = 1, B = 0, dan Carry-in (Cin) = 1 pada rangkaian Full Adder.</p>
        <p style="margin:8px 0 0;font-size:0.86rem;color:var(--text-secondary)">Tentukan nilai Sum (S) dan Carry-out (Cout) serta jelaskan proses perhitungannya langkah demi langkah!</p>
      </div>

      ${w5Spoiler('📖 Buka Pembahasan Latihan 2', `
        ${w5Code([
          '1. Perhitungan Sum (S):',
          '   S = A ⊕ B ⊕ Cin = (1 ⊕ 0) ⊕ 1 = 1 ⊕ 1 = 0',
          '',
          '2. Perhitungan Carry-out (Cout):',
          '   Cout = AB + Cin(A ⊕ B)',
          '        = (1 · 0) + 1 · (1 ⊕ 0)',
          '        = 0 + 1 · (1) = 0 + 1 = 1'
        ])}
        ${w5Alert('success', 'Hasil: <strong>Sum (S) = 0</strong> dan <strong>Cout = 1</strong>. Secara aritmatika: 1 + 0 + 1 = 2₁₀ = 10₂.')}`
      )}`
    )}

    <!-- Latihan 3: RCA 4-bit -->
    ${w5Section('Latihan 3: Penjumlahan Berantai RCA 4-Bit', '--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 11a9 9 0 019 9M4 4a16 16 0 0116 16"/></svg>',
      `<div style="background:var(--accent-amber-dim);border:1px solid var(--accent-amber);border-radius:10px;padding:14px 18px;margin-bottom:14px">
        <p style="margin:0 0 6px;font-size:0.8rem;font-weight:700;color:var(--accent-amber);letter-spacing:.04em;text-transform:uppercase">SOAL LATIHAN 3</p>
        <p style="margin:0;font-size:1rem;font-weight:700">Diberikan operand biner 4-bit A = 1011₂ dan B = 0110₂ dengan Cin awal = 0.</p>
        <p style="margin:8px 0 0;font-size:0.86rem;color:var(--text-secondary)">Tunjukkan jalannya perhitungan pada masing-masing 4 tahap Full Adder beserta nilai Carry yang dirambatkan!</p>
      </div>

      ${w5Spoiler('📖 Buka Pembahasan Latihan 3', `
        ${w5Table(
          ['Tahap FA', 'Bit A', 'Bit B', 'Cin (Cᵢ)', 'Perhitungan', 'Sum (Sᵢ)', 'Carry Keluar (Cᵢ₊₁)'],
          [
            ['FA0 (LSB)', 'A₀ = 1', 'B₀ = 0', 'C₀ = 0', '1 + 0 + 0 = 1', 'S₀ = 1', 'C₁ = 0'],
            ['FA1', 'A₁ = 1', 'B₁ = 1', 'C₁ = 0', '1 + 1 + 0 = 2', 'S₁ = 0', 'C₂ = 1'],
            ['FA2', 'A₂ = 0', 'B₂ = 1', 'C₂ = 1', '0 + 1 + 1 = 2', 'S₂ = 0', 'C₃ = 1'],
            ['FA3 (MSB)', 'A₃ = 1', 'B₃ = 0', 'C₃ = 1', '1 + 0 + 1 = 2', 'S₃ = 0', 'C₄ = 1 (Cout akhir)']
          ]
        )}
        ${w5Alert('success', 'Hasil akhir biner: <strong>C₄ S₃ S₂ S₁ S₀ = 10001₂ = 17₁₀</strong> (11 + 6 = 17).')}`
      )}`
    )}

    <!-- Latihan 4: Half Subtractor -->
    ${w5Section('Latihan 4: Half Subtractor (Analisis Kasus Borrow)', '--danger',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
      `<div style="background:var(--danger-dim);border:1px solid var(--danger);border-radius:10px;padding:14px 18px;margin-bottom:14px">
        <p style="margin:0 0 6px;font-size:0.8rem;font-weight:700;color:var(--danger);letter-spacing:.04em;text-transform:uppercase">SOAL LATIHAN 4</p>
        <p style="margin:0;font-size:1rem;font-weight:700">Diberikan masukan A = 0 dan B = 1 pada Half Subtractor.</p>
        <p style="margin:8px 0 0;font-size:0.86rem;color:var(--text-secondary)">Tentukan Difference (D) dan Borrow-out (Bout), serta jelaskan mengapa sinyal Borrow harus bernilai 1!</p>
      </div>

      ${w5Spoiler('📖 Buka Pembahasan Latihan 4', `
        ${w5Code([
          '• Difference (D)   = A ⊕ B   = 0 ⊕ 1 = 1',
          '• Borrow-out (Bout) = A\' · B = (0)\' · 1 = 1 · 1 = 1'
        ])}
        <p style="margin:8px 0;font-size:0.86rem;line-height:1.6;color:var(--text-secondary)">
          <strong>Penjelasan:</strong> Nilai 0 tidak cukup dikurangi 1. Sirkuit harus meminjam 1 dari kolom yang berbobot lebih tinggi. Pada sistem biner, 1 yang dipinjam berbobot 2 pada kolom saat ini, sehingga perhitungan menjadi: <code>(2 + 0) − 1 = 1</code> dengan mencatat pinjaman <code>Bout = 1</code>.
        </p>`
      )}`
    )}

    <!-- Latihan 5: Full Subtractor -->
    ${w5Section('Latihan 5: Pengurangan 3-Input Full Subtractor', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
      `<div style="background:var(--accent-violet-dim);border:1px solid var(--accent-violet);border-radius:10px;padding:14px 18px;margin-bottom:14px">
        <p style="margin:0 0 6px;font-size:0.8rem;font-weight:700;color:var(--accent-violet);letter-spacing:.04em;text-transform:uppercase">SOAL LATIHAN 5</p>
        <p style="margin:0;font-size:1rem;font-weight:700">Diberikan A = 1, B = 1, dan Bin = 1 pada rangkaian Full Subtractor.</p>
        <p style="margin:8px 0 0;font-size:0.86rem;color:var(--text-secondary)">Hitung nilai Difference (D) dan Borrow-out (Bout) menggunakan persamaan logika dan verifikasi dengan tabel kebenaran!</p>
      </div>

      ${w5Spoiler('📖 Buka Pembahasan Latihan 5', `
        ${w5Code([
          '1. Difference (D):',
          '   D = A ⊕ B ⊕ Bin = (1 ⊕ 1) ⊕ 1 = 0 ⊕ 1 = 1',
          '',
          '2. Borrow-out (Bout):',
          '   Bout = A\'B + A\'Bin + BBin',
          '        = (0 · 1) + (0 · 1) + (1 · 1)',
          '        = 0 + 0 + 1 = 1'
        ])}
        <p style="margin:8px 0;font-size:0.86rem;line-height:1.6;color:var(--text-secondary)">
          <strong>Verifikasi Tabel:</strong> Kondisi A=1, B=1, Bin=1 adalah baris ke-7 pada tabel kebenaran Full Subtractor, yang secara tepat menghasilkan <strong>D = 1</strong> dan <strong>Bout = 1</strong>. Operasi aritmatika: 1 − 1 − 1 = −1 (meminjam 2 menghasilkan 2 − 1 = 1, dengan pinjaman 1).
        </p>`
      )}`
    )}

    <!-- Latihan 6: Adder-Subtractor -->
    ${w5Section('Latihan 6: Adder-Subtractor Terintegrasi (Two\'s Complement)', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0"/></svg>',
      `<div style="background:var(--accent-cyan-dim);border:1px solid var(--accent-cyan);border-radius:10px;padding:14px 18px;margin-bottom:14px">
        <p style="margin:0 0 6px;font-size:0.8rem;font-weight:700;color:var(--accent-cyan);letter-spacing:.04em;text-transform:uppercase">SOAL LATIHAN 6</p>
        <p style="margin:0;font-size:1rem;font-weight:700">Diberikan A = 1001₂ (9₁₀) dan B = 0101₂ (5₁₀) pada sirkuit Adder-Subtractor 4-bit.</p>
        <p style="margin:8px 0 0;font-size:0.86rem;color:var(--text-secondary)">
          (a) Hitung hasil operasi saat M = 0.<br>
          (b) Hitung hasil operasi saat M = 1.<br>
          (c) Jelaskan fungsi gerbang XOR pada input B dan peran sinyal Carry-in awal C₀ = M!
        </p>
      </div>

      ${w5Spoiler('📖 Buka Pembahasan Latihan 6', `
        ${w5Code([
          '(a) Saat M = 0 (Mode Penjumlahan):',
          '    C₀ = 0, B tetap 0101₂',
          '    Hasil = 1001₂ + 0101₂ = 1110₂ = 14₁₀ (Cout = 0)',
          '',
          '(b) Saat M = 1 (Mode Pengurangan):',
          '    C₀ = 1, B diinversi oleh XOR: B\' = 1010₂',
          '    Operasi: 1001₂ + 1010₂ + 1 = 10100₂',
          '    Hasil 4-bit S = 0100₂ = 4₁₀, dengan Cout = 1 (menandakan tanpa borrow)',
          '',
          '(c) Fungsi XOR & Peran C₀:',
          '    • Gerbang XOR berfungsi sebagai pembalik terkontrol (conditional inverter).',
          '      Saat M=1, B di-XOR dengan 1 menghasilkan One\'s Complement (B\').',
          '    • Sinyal C₀ = M = 1 menambahkan angka 1 pada LSB, menyempurnakan bentuk',
          '      Two\'s Complement sehingga A + B\' + 1 ekuivalen sempurna dengan A − B.'
        ])}`
      )}`
    )}
  `;
}



/* ══════════════════════════════════════════════════════
   TOPIK 11: RINGKASAN MATERI & KUIS EVALUASI AKHIR
   ══════════════════════════════════════════════════════ */
function renderWeek5Summary(el) {
  el.innerHTML = `
    <!-- Ringkasan Komprehensif -->
    ${w5Section('Rangkuman Komprehensif: Adder & Subtractor', '--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>',
      `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;margin-bottom:16px">
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px">
          <p style="margin:0 0 6px;font-weight:700;color:var(--accent-cyan);font-size:0.9rem">1. Half Adder vs Full Adder</p>
          <p style="margin:0;font-size:0.84rem;color:var(--text-secondary);line-height:1.6">Half Adder menjumlahkan 2 bit tanpa Cin (hanya untuk LSB). Full Adder menjumlahkan 3 bit (A, B, Cin) dan dapat dirangkai untuk penjumlahan berapapun lebarnya.</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px">
          <p style="margin:0 0 6px;font-weight:700;color:var(--accent-violet);font-size:0.9rem">2. Ripple Carry vs Carry Lookahead</p>
          <p style="margin:0;font-size:0.84rem;color:var(--text-secondary);line-height:1.6">RCA sederhana namun lambat karena carry merambat berantai O(N). CLA cepat berkecepatan tinggi O(1) karena menghitung carry serempak menggunakan logika Generate (G) dan Propagate (P).</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px">
          <p style="margin:0 0 6px;font-weight:700;color:var(--accent-amber);font-size:0.9rem">3. Subtractor Digital</p>
          <p style="margin:0;font-size:0.84rem;color:var(--text-secondary);line-height:1.6">Half Subtractor mengurangkan 2 bit (D=A⊕B, Bout=A\'B). Full Subtractor mengurangkan 3 bit (D=A⊕B⊕Bin, Bout=A\'B + A\'Bin + BBin).</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px">
          <p style="margin:0 0 6px;font-weight:700;color:var(--success);font-size:0.9rem">4. Adder-Subtractor Terintegrasi</p>
          <p style="margin:0;font-size:0.84rem;color:var(--text-secondary);line-height:1.6">Menggunakan XOR pada input B dan C₀ = M. Saat M=0 melakukan A+B; saat M=1 melakukan A+B\'+1 (pengurangan Two\'s Complement murni menggunakan sirkuit adder yang sama).</p>
        </div>
      </div>

      <h4 style="margin:18px 0 10px;font-size:0.95rem;font-weight:700;color:var(--accent-cyan)">Tabel Rumus Penting Rangkaian Aritmatika:</h4>
      ${w5Table(
        ['Rangkaian', 'Input', 'Keluaran Utama (Sum / Diff)', 'Keluaran Bawaan (Carry / Borrow)'],
        [
          ['Half Adder (HA)', 'A, B', 'S = A ⊕ B', 'C = A · B'],
          ['Full Adder (FA)', 'A, B, Cin', 'S = A ⊕ B ⊕ Cin', 'Cout = AB + Cin(A ⊕ B)'],
          ['Half Subtractor (HS)', 'A, B', 'D = A ⊕ B', 'Bout = A\' · B'],
          ['Full Subtractor (FS)', 'A, B, Bin', 'D = A ⊕ B ⊕ Bin', 'Bout = A\'B + A\'Bin + B·Bin'],
          ['CLA Lookahead', 'Pᵢ, Gᵢ, Cᵢ', 'Sᵢ = Pᵢ ⊕ Cᵢ', 'Cᵢ₊₁ = Gᵢ + Pᵢ·Cᵢ  (Gᵢ=AᵢBᵢ, Pᵢ=Aᵢ⊕Bᵢ)'],
          ['Adder-Subtractor', 'Aᵢ, Bᵢ, M, Cᵢ', 'Sᵢ = Aᵢ ⊕ (Bᵢ ⊕ M) ⊕ Cᵢ', 'C₀ = M,  Cᵢ₊₁ = Aᵢ(Bᵢ⊕M) + Cᵢ(Aᵢ⊕Bᵢ⊕M)']
        ]
      )}

      <h4 style="margin:18px 0 10px;font-size:0.95rem;font-weight:700;color:var(--danger)">Tips Menghindari Kesalahan Umum (Common Pitfalls):</h4>
      ${[
        '<strong>Jangan melupakan peran C₀ = M:</strong> Pada pengurangan Two\'s Complement, membalik bit B saja (One\'s Complement) belum cukup; angka 1 wajib ditambahkan pada LSB melalui C₀ = M = 1.',
        '<strong>Jangan terbalik menafsirkan Carry-out pada pengurangan:</strong> Jika C₄ = 1, artinya TIDAK ADA borrow (hasil positif). Jika C₄ = 0, artinya TERJADI borrow (hasil negatif).',
        '<strong>Perhatikan perbedaan rumus Bout pada FS:</strong> Persamaan Borrow-out adalah A\'B + Bin(A ⊕ B)\', BUKAN AB + Bin(A ⊕ B). Adanya komplemen pada A (karena minuend) sangat penting!',
        '<strong>Gunakan Half Adder hanya pada LSB:</strong> Jangan pernah menggunakan Half Adder untuk tahap pertengahan (bit 1, 2, 3) karena Half Adder tidak dapat menerima Carry-in dari tahap sebelumnya.'
      ].map((tip, i) => w5Step(i + 1, tip)).join('')}`
    )}

    <!-- Kuis Pilihan Ganda Interaktif -->
    ${w5Section('Kuis Pilihan Ganda Interaktif', '--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      `<p style="margin:0 0 16px;font-size:0.92rem;color:var(--text-secondary)">
        Uji pemahaman Anda mengenai arsitektur Adder dan Subtractor. Klik salah satu opsi jawaban untuk langsung melihat umpan balik:
      </p>
      ${[
        {
          q: "1. Mengapa rangkaian Half Adder tidak dapat digunakan untuk menjumlahkan bit-bit pada posisi pertengahan dalam penjumlahan biner multi-bit?",
          opts: [
            "A. Karena Half Adder menggunakan gerbang XOR yang terlalu lambat",
            "B. Karena Half Adder hanya memiliki dua terminal masukan (A dan B) tanpa masukan Carry-in untuk menerima carry dari tahap sebelumnya",
            "C. Karena Half Adder hanya bisa bekerja pada bilangan genap",
            "D. Karena tegangan keluaran Half Adder tidak kompatibel dengan Full Adder"
          ],
          ans: 1,
          exp: "Half Adder hanya memiliki 2 masukan (A dan B). Pada posisi bit pertengahan dan MSB, kita wajib menjumlahkan 3 bit: A, B, dan Carry-in (Cin) yang dihasilkan dari penjumlahan kolom sebelumnya. Karena itu dibutuhkan Full Adder."
        },
        {
          q: "2. Pada Full Adder, jika sinyal masukan A = 1, B = 1, dan Cin = 0, berapakah nilai keluaran Sum (S) dan Carry-out (Cout)?",
          opts: [
            "A. Sum = 1, Cout = 0",
            "B. Sum = 0, Cout = 1",
            "C. Sum = 1, Cout = 1",
            "D. Sum = 0, Cout = 0"
          ],
          ans: 1,
          exp: "Secara aljabar: S = 1 ⊕ 1 ⊕ 0 = 0 ⊕ 0 = 0. Cout = (1·1) + 0·(1⊕1) = 1 + 0 = 1. Secara aritmatika: 1 + 1 + 0 = 2₁₀ = 10₂ (Sum=0, Cout=1)."
        },
        {
          q: "3. Pada arsitektur Carry Lookahead Adder (CLA), kapankah sinyal Carry Generate (Gᵢ) akan bernilai 1?",
          opts: [
            "A. Ketika salah satu input Aᵢ atau Bᵢ bernilai 1",
            "B. Ketika kedua input Aᵢ dan Bᵢ bernilai 1 secara bersamaan (Gᵢ = Aᵢ · Bᵢ)",
            "C. Hanya ketika Carry-in dari tahap sebelumnya bernilai 1",
            "D. Ketika kedua input bernilai 0"
          ],
          ans: 1,
          exp: "Sinyal Generate Gᵢ didefinisikan sebagai Gᵢ = Aᵢ · Bᵢ. Sinyal ini bernilai 1 hanya ketika kedua bit input bernilai 1, yang menjamin bahwa tahap tersebut pasti membangkitkan carry secara mandiri."
        },
        {
          q: "4. Dalam rangkaian Adder-Subtractor 4-bit terintegrasi, apa fungsi gerbang XOR yang terhubung pada jalur masukan B ketika sinyal kontrol M bernilai 1?",
          opts: [
            "A. Mengalikan nilai B dengan 2",
            "B. Menghapus bit B menjadi 0",
            "C. Membalik nilai setiap bit B (Bᵢ ⊕ 1 = Bᵢ') untuk membentuk One's Complement",
            "D. Mematikan seluruh rangkaian adder"
          ],
          ans: 2,
          exp: "Sifat gerbang XOR dengan salah satu input berlogika 1 adalah inverter: Bᵢ ⊕ 1 = Bᵢ'. Hal ini membalik seluruh bit B menjadi One's Complement. Dikombinasikan dengan C₀ = M = 1, rangkaian mengeksekusi Two's Complement (B' + 1)."
        },
        {
          q: "5. Pada operasi pengurangan biner tak bertanda menggunakan Adder-Subtractor (M = 1), jika Carry-out akhir (C₄) bernilai 1, apakah arti dari status tersebut?",
          opts: [
            "A. Terjadi kesalahan sirkuit hardware",
            "B. Menandakan TIDAK TERJADI BORROW (A ≥ B) dan hasil 4-bit adalah nilai selisih positif yang valid",
            "C. Menandakan hasil bernilai negatif dan terjadi overflow",
            "D. Menandakan hasil pengurangan adalah nol"
          ],
          ans: 1,
          exp: "Dalam konvensi Two's Complement untuk bilangan tak bertanda, Carry-out akhir berfungsi sebagai Inverted Borrow (Cout = Borrow'). Cout = 1 menandakan tidak ada pinjaman (A ≥ B), sehingga selisihnya positif."
        }
      ].map((item, qi) => `
        <div id="w5_quiz_q${qi}" style="background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:16px 18px;margin-bottom:14px">
          <p style="margin:0 0 12px;font-size:0.92rem;font-weight:700">${item.q}</p>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${item.opts.map((opt, oi) => `
              <button type="button" class="w5-quiz-opt" onclick="window.w5CheckAnswer(this, 'w5_quiz', ${qi}, ${oi}, ${item.ans}, '${item.exp.replace(/'/g, "\\'")}')" style="background:var(--bg-card);border:1.5px solid var(--line);border-radius:8px;padding:10px 14px;text-align:left;font-size:0.86rem;cursor:pointer;color:var(--text-secondary);transition:all .15s ease">
                ${opt}
              </button>`).join('')}
          </div>
          <div id="w5_quiz_fb${qi}" hidden style="margin-top:12px"></div>
        </div>`).join('')}`
    )}

    <!-- Evaluasi Esai Komprehensif -->
    ${w5Section('Evaluasi Esai Komprehensif', '--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
      `<div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:16px 18px;margin-bottom:14px">
        <p style="margin:0 0 6px;font-weight:700;font-size:0.95rem;color:var(--accent-violet)">Soal Esai 1: Rasionalisasi Pemilihan Two\'s Complement dalam Arsitektur CPU</p>
        <p style="margin:0 0 10px;font-size:0.88rem;color:var(--text-secondary);line-height:1.6">
          Jelaskan secara mendalam mengapa seluruh prosesor modern menggunakan representasi Two\'s Complement untuk operasi aritmatika dibandingkan format Sign-Magnitude atau One\'s Complement, khususnya ditinjau dari penyederhanaan sirkuit hardware!
        </p>
        ${w5Spoiler('📖 Kunci Jawaban & Rubrik Esai 1', `
          <p style="margin:0;font-size:0.86rem;line-height:1.7;color:var(--text-secondary)">
            <strong>Poin Penilaian Utama:</strong><br>
            1. <strong>Representasi Nol Tunggal (Unique Zero):</strong> Sign-magnitude dan One\'s complement memiliki dua kode untuk nol (+0 dan -0), yang membutuhkan logika pendeteksi kesetaraan ganda. Two\'s complement hanya memiliki satu representasi nol (0000₂).<br>
            2. <strong>Penyatuan Sirkuit Adder dan Subtractor:</strong> Dalam Two\'s complement, <code>A − B = A + (−B) = A + B\' + 1</code>. Artinya sirkuit penjumlahan yang sama persis dapat digunakan untuk pengurangan tanpa perlu membuat sirkuit subtractor khusus.<br>
            3. <strong>Efisiensi Hardware:</strong> Cukup menambahkan gerbang XOR pengendali pada input B dan mengatur C₀ = 1. Ini menghemat hingga 50% luas area silikon chip dan mempermudah perancangan ALU.
          </p>
        `)}
      </div>

      <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:16px 18px">
        <p style="margin:0 0 6px;font-weight:700;font-size:0.95rem;color:var(--accent-violet)">Soal Esai 2: Analisis Delay Kritis RCA vs CLA 16-Bit</p>
        <p style="margin:0 0 10px;font-size:0.88rem;color:var(--text-secondary);line-height:1.6">
          Jika setiap Full Adder pada RCA memiliki keterlambatan carry sebesar 2 ns (t_carry = 2 ns), berapakah total delay perambatan carry pada 16-bit RCA? Bandingkan dengan CLA 16-bit bertingkat yang menghitung seluruh carry dalam waktu keterlambatan 4 tingkatan gerbang (8 ns), dan jelaskan implikasinya terhadap frekuensi clock maksimal prosesor!
        </p>
        ${w5Spoiler('📖 Kunci Jawaban & Rubrik Esai 2', `
          <p style="margin:0;font-size:0.86rem;line-height:1.7;color:var(--text-secondary)">
            <strong>Langkah Analisis:</strong><br>
            1. <strong>RCA 16-Bit:</strong> Delay total = 16 × t_carry = 16 × 2 ns = <strong>32 ns</strong>.<br>
            2. <strong>CLA 16-Bit:</strong> Delay total hanya <strong>8 ns</strong> (konstan karena perambatan paralel).<br>
            3. <strong>Perbandingan:</strong> CLA 4 kali lebih cepat (32 ns vs 8 ns).<br>
            4. <strong>Implikasi Frekuensi Clock:</strong> Periode clock minimal harus lebih besar dari delay kritis aritmatika. Pada RCA, f_max = 1 / 32 ns ≈ <strong>31,25 MHz</strong>. Pada CLA, f_max = 1 / 8 ns = <strong>125 MHz</strong>! Penerapan CLA memungkinkan peningkatan kecepatan kerja sistem sebesar 400%.
          </p>
        `)}
      </div>`
    )}
  `;

  // Quiz evaluation handler registered to window
  window.w5CheckAnswer = function(btn, qid, qi, selected, correct, explain) {
    const qDiv = document.getElementById(`${qid}_q${qi}`);
    const fbDiv = document.getElementById(`${qid}_fb${qi}`);
    if (!qDiv || !fbDiv) return;

    qDiv.querySelectorAll('.w5-quiz-opt').forEach(b => {
      b.style.pointerEvents = 'none';
      b.style.opacity = '0.7';
    });

    const isCorrect = selected === correct;
    btn.style.opacity = '1';
    if (isCorrect) {
      btn.style.borderColor = 'var(--success)';
      btn.style.background = 'var(--success-dim)';
    } else {
      btn.style.borderColor = 'var(--danger)';
      btn.style.background = 'var(--danger-dim)';
      const correctBtn = qDiv.querySelectorAll('.w5-quiz-opt')[correct];
      if (correctBtn) {
        correctBtn.style.opacity = '1';
        correctBtn.style.borderColor = 'var(--success)';
        correctBtn.style.background = 'var(--success-dim)';
      }
    }

    fbDiv.hidden = false;
    fbDiv.innerHTML = `
      <div style="display:flex;gap:8px;align-items:flex-start;background:${isCorrect ? 'var(--success-dim)' : 'var(--danger-dim)'};border-left:3px solid ${isCorrect ? 'var(--success)' : 'var(--danger)'};border-radius:0 8px 8px 0;padding:10px 14px;font-size:0.85rem;line-height:1.6">
        <span>${isCorrect ? '✅' : '❌'}</span>
        <span>${isCorrect ? '<strong>Benar!</strong> ' : '<strong>Kurang tepat.</strong> '}${explain}</span>
      </div>`;
  };
}
