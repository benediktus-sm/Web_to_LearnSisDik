/**
 * week2.js — SisDik Learn: Pertemuan 2
 * ----------------------------------------
 * Materi: Representasi Bilangan Negatif & Operasi Bilangan Biner
 */

/* ───── HELPERS ───── */
function w2Section(title, accentVar, iconSvg, bodyHTML) {
  return `
    <div class="info-card" style="margin-bottom:28px;border-left:3px solid var(${accentVar})">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
        <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;background:var(${accentVar}-dim)">${iconSvg}</span>
        <h3 style="margin:0;font-size:1.05rem;font-weight:700;color:var(${accentVar})">${title}</h3>
      </div>
      <div>${bodyHTML}</div>
    </div>`;
}

function w2Code(lines, label) {
  const inner = Array.isArray(lines) ? lines.join('\n') : lines;
  return `<div style="margin:12px 0">${label ? `<p style="font-size:0.78rem;color:var(--text-faint);font-weight:600;letter-spacing:.06em;text-transform:uppercase;margin-bottom:6px">${label}</p>` : ''}
    <pre style="font-family:var(--font-mono);font-size:0.88rem;line-height:1.7;background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px 18px;overflow-x:auto;margin:0"><code>${inner}</code></pre></div>`;
}

function w2Step(n, text) {
  return `<div style="display:flex;align-items:flex-start;gap:12px;margin:10px 0">
    <span style="min-width:26px;height:26px;border-radius:50%;background:var(--accent-cyan-dim);border:1.5px solid var(--accent-cyan);color:var(--accent-cyan);font-size:0.78rem;font-weight:700;display:inline-flex;align-items:center;justify-content:center;margin-top:1px">${n}</span>
    <span style="font-size:0.95rem;line-height:1.6">${text}</span></div>`;
}

function w2Alert(type, text) {
  const map = { info:['var(--accent-cyan)','💡'], warning:['var(--accent-amber)','⚠️'], success:['var(--success)','✅'], danger:['var(--danger)','🚨'] };
  const [color, icon] = map[type] || map.info;
  return `<div style="display:flex;gap:10px;align-items:flex-start;background:var(--bg-inset);border-left:3px solid ${color};border-radius:0 8px 8px 0;padding:12px 14px;margin:14px 0;font-size:0.9rem;line-height:1.6">
    <span>${icon}</span><span>${text}</span></div>`;
}

function w2CompTable(rows) {
  return `<div style="overflow-x:auto;margin:16px 0">
    <table style="width:100%;border-collapse:collapse;font-size:0.88rem">
      <thead><tr style="border-bottom:2px solid var(--line)">
        <th style="padding:10px 14px;text-align:left;color:var(--text-faint);font-weight:600">Skema</th>
        <th style="padding:10px 14px;text-align:left;color:var(--text-faint);font-weight:600">Rentang 8-bit</th>
        <th style="padding:10px 14px;text-align:left;color:var(--text-faint);font-weight:600">Cara Membentuk -X</th>
        <th style="padding:10px 14px;text-align:left;color:var(--text-faint);font-weight:600">Catatan</th>
      </tr></thead>
      <tbody>${rows.map((r,i)=>`<tr style="border-bottom:1px solid var(--line);${i%2===0?'background:var(--bg-inset)':''}">${r.map(c=>`<td style="padding:10px 14px">${c}</td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>`;
}

/* ───── WEEK 2 INTRO ───── */
function renderWeek2Intro(el) {
  el.innerHTML = `
    <div style="background:linear-gradient(135deg,var(--accent-violet-dim) 0%,var(--accent-cyan-dim) 100%);border:1px solid var(--line);border-radius:16px;padding:28px 32px;margin-bottom:32px;position:relative;overflow:hidden">
      <div style="position:absolute;top:-20px;right:-20px;width:120px;height:120px;border-radius:50%;background:var(--accent-violet-glow);filter:blur(40px)"></div>
      <div style="position:relative">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
          <span style="background:var(--accent-violet-dim);color:var(--accent-violet);border:1px solid var(--accent-violet);padding:4px 12px;border-radius:99px;font-size:0.75rem;font-weight:700;letter-spacing:.06em">PERTEMUAN 2</span>
          <span style="font-size:0.78rem;color:var(--text-faint)">Sistem Digital</span>
        </div>
        <h2 style="margin:0 0 10px;font-size:1.5rem;font-weight:800">Bilangan Negatif &amp; Operasi Biner</h2>
        <p style="margin:0;color:var(--text-secondary);font-size:0.95rem;max-width:520px;line-height:1.6">
          Pelajari tiga skema representasi bilangan negatif (Sign-Magnitude, 1's Complement, 2's Complement) serta cara melakukan operasi penjumlahan dan pengurangan biner.
        </p>
      </div>
    </div>

    ${w2Section('Identitas Mata Kuliah','--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>',
      `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px">
          <p style="margin:0 0 4px;font-size:0.75rem;color:var(--text-faint);font-weight:600;text-transform:uppercase;letter-spacing:.06em">Mata Kuliah</p>
          <p style="margin:0;font-weight:700">Sistem Digital</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px">
          <p style="margin:0 0 4px;font-size:0.75rem;color:var(--text-faint);font-weight:600;text-transform:uppercase;letter-spacing:.06em">Pertemuan</p>
          <p style="margin:0;font-weight:700">2 dari 14</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px">
          <p style="margin:0 0 8px;font-size:0.75rem;color:var(--text-faint);font-weight:600;text-transform:uppercase;letter-spacing:.06em">Dosen Pengampu</p>
          <p style="margin:0 0 3px;font-size:0.87rem">Dr. Swadexi Istiqphara, S.T., M.T.</p>
          <p style="margin:0 0 3px;font-size:0.87rem">Efa Maydhona, S.T., M.T.</p>
          <p style="margin:0;font-size:0.87rem">Nia Saputri Utami, S.T., M.T.</p>
        </div>
      </div>`
    )}

    ${w2Section('Referensi','--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>',
      `<ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:10px">
        ${[['Frank Vahid & Tony Givargis','Embedded System Design: A Unified Hardware/Software Introduction','Wiley, 2nd Ed., 2010'],
           ['Raj Kamal','Embedded Systems: Architecture, Programming and Design','McGraw-Hill, 3rd Ed., 2014'],
           ['Peter Barry & Patrick Crowley','Modern Embedded Computing','Morgan Kaufmann, 2012']].map(([a,t,p])=>`
        <li style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:12px 16px">
          <p style="margin:0 0 2px;font-size:0.78rem;color:var(--accent-amber);font-weight:600">${a}</p>
          <p style="margin:0 0 2px;font-size:0.9rem;font-weight:600;font-style:italic">${t}</p>
          <p style="margin:0;font-size:0.8rem;color:var(--text-faint)">${p}</p>
        </li>`).join('')}
      </ul>`
    )}

    ${w2Section('Capaian Pembelajaran (CPMK-2)','--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      `<div style="background:var(--accent-violet-dim);border:1px solid var(--accent-violet);border-radius:10px;padding:14px 16px;margin-bottom:16px">
        <p style="margin:0;font-size:0.95rem;line-height:1.6;font-weight:500">Mahasiswa mampu <strong>menghitung</strong> dan <strong>mempraktikkan</strong> konversi bilangan serta operasi bilangan biner.</p>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:12px 14px">
          <p style="margin:0 0 8px;font-size:0.8rem;font-weight:700;color:var(--accent-violet)">Bilangan Negatif</p>
          <ul style="margin:0;padding-left:18px;font-size:0.88rem;line-height:1.8"><li>Sign-Magnitude</li><li>1's Complement</li><li>2's Complement</li></ul>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:12px 14px">
          <p style="margin:0 0 8px;font-size:0.8rem;font-weight:700;color:var(--accent-cyan)">Operasi Biner</p>
          <ul style="margin:0;padding-left:18px;font-size:0.88rem;line-height:1.8"><li>Penjumlahan</li><li>Pengurangan</li></ul>
        </div>
      </div>`
    )}

    ${w2Section('Sub-CPMK & Indikator Pembelajaran','--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>',
      `<p style="margin:0 0 12px;font-size:0.88rem;font-weight:600;color:var(--text-secondary)">Setelah mengikuti pertemuan ini, mahasiswa mampu:</p>
      ${['Mengidentifikasi dan menjelaskan metode representasi bilangan negatif: Sign-Magnitude, 1\'s Complement, 2\'s Complement',
         'Mengaplikasikan metode tersebut pada soal konversi bilangan negatif',
         'Melakukan operasi bilangan biner untuk bilangan positif maupun negatif',
         'Menggunakan 1\'s Complement dan 2\'s Complement dalam operasi biner',
         'Mendeteksi kondisi overflow pada operasi bilangan biner'
        ].map((t,i)=>w2Step(i+1,t)).join('')}`
    )}

    ${w2Section('Notasi & Istilah Kunci','--accent-rose',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
      `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px">
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px">
          <p style="margin:0 0 8px;font-size:0.78rem;font-weight:700;color:var(--accent-rose);letter-spacing:.05em">MSB (Most Significant Bit)</p>
          <p style="margin:0 0 6px;font-size:0.88rem">Digunakan sebagai <strong>sign bit</strong>:</p>
          <div style="font-family:var(--font-mono);font-size:0.85rem;line-height:1.8">
            <span style="color:var(--success)">MSB = 0</span> &rarr; positif<br>
            <span style="color:var(--danger)">MSB = 1</span> &rarr; negatif (2's C)
          </div>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px">
          <p style="margin:0 0 8px;font-size:0.78rem;font-weight:700;color:var(--accent-violet);letter-spacing:.05em">Rentang 2's Complement</p>
          <div style="font-family:var(--font-mono);font-size:0.85rem;line-height:1.8">
            &minus;2<sup>(n-1)</sup> hingga 2<sup>(n-1)</sup>&minus;1
          </div>
          <p style="margin:6px 0 4px;font-size:0.83rem;color:var(--text-faint)">Contoh 8-bit:</p>
          <div style="font-family:var(--font-mono);font-size:0.85rem;color:var(--accent-amber)">-128 hingga +127</div>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px">
          <p style="margin:0 0 8px;font-size:0.78rem;font-weight:700;color:var(--accent-cyan);letter-spacing:.05em">Algoritma 2's Complement</p>
          ${w2Step(1,'Inversi seluruh bit (NOT)')}
          ${w2Step(2,'Tambahkan 1 pada LSB')}
        </div>
      </div>`
    )}
  `;
}

/* ───── WEEK 2: BILANGAN NEGATIF ───── */
function renderWeek2Negative(el) {
  el.innerHTML = `
    <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:14px;padding:20px 24px;margin-bottom:28px">
      <h3 style="margin:0 0 16px;font-size:1rem;font-weight:700">Tiga Skema Representasi Bilangan Negatif</h3>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;margin-bottom:16px">
        ${[['Sign-Magnitude','SM','--accent-amber','MSB = sign bit, paling intuitif'],
           ["1's Complement",'C1','--accent-violet','Inversi seluruh bit dari bilangan positif'],
           ["2's Complement",'C2','--accent-cyan','Standar CPU/MCU: NOT + tambah 1']
          ].map(([name,abbr,color,desc])=>`
          <div style="background:var(--bg-raised);border:1px solid var(${color});border-radius:10px;padding:14px 16px;position:relative;overflow:hidden">
            <div style="position:absolute;top:-8px;right:-8px;width:50px;height:50px;border-radius:50%;background:var(${color}-glow);filter:blur(16px)"></div>
            <span style="font-family:var(--font-mono);font-size:1.3rem;font-weight:800;color:var(${color})">${abbr}</span>
            <p style="margin:6px 0 4px;font-weight:700;font-size:0.9rem">${name}</p>
            <p style="margin:0;font-size:0.8rem;color:var(--text-faint)">${desc}</p>
          </div>`).join('')}
      </div>
      ${w2Alert('info',"2's Complement merupakan standar yang digunakan pada CPU dan MCU modern karena operasi aritmetikanya lebih sederhana dan hanya memiliki satu representasi nol.")}
    </div>

    ${w2Section('Ilustrasi: Bilangan 13 (8-bit)','--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
      `<div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-family:var(--font-mono);font-size:0.9rem">
          <thead><tr style="border-bottom:2px solid var(--line)">
            <th style="padding:10px 14px;text-align:left;font-family:var(--font-ui);font-size:0.78rem;color:var(--text-faint);font-weight:600">Skema</th>
            <th style="padding:10px 14px;text-align:center;font-family:var(--font-ui);font-size:0.78rem;color:var(--text-faint);font-weight:600">+13</th>
            <th style="padding:10px 14px;text-align:center;font-family:var(--font-ui);font-size:0.78rem;color:var(--text-faint);font-weight:600">-13</th>
          </tr></thead>
          <tbody>
            ${[['Sign-Magnitude','SM','0000 1101','1000 1101','--accent-amber'],
               ["1's Complement",'C1','0000 1101','1111 0010','--accent-violet'],
               ["2's Complement",'C2','0000 1101','1111 0011','--accent-cyan']
              ].map(([name,abbr,pos,neg,col])=>`
              <tr style="border-bottom:1px solid var(--line)">
                <td style="padding:12px 14px;font-family:var(--font-ui)">
                  <span style="background:var(${col}-dim);color:var(${col});padding:2px 8px;border-radius:99px;font-size:0.78rem;font-weight:700">${abbr}</span>
                  <span style="margin-left:8px;font-size:0.88rem">${name}</span>
                </td>
                <td style="padding:12px 14px;text-align:center;color:var(--success)">${pos}</td>
                <td style="padding:12px 14px;text-align:center;color:var(--danger)">${neg}</td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:14px">
        <div style="background:var(--accent-amber-dim);border:1px solid var(--accent-amber);border-radius:8px;padding:10px 12px;font-size:0.82rem"><strong style="color:var(--accent-amber)">SM:</strong> Ubah MSB ke 1</div>
        <div style="background:var(--accent-violet-dim);border:1px solid var(--accent-violet);border-radius:8px;padding:10px 12px;font-size:0.82rem"><strong style="color:var(--accent-violet)">C1:</strong> NOT semua bit</div>
        <div style="background:var(--accent-cyan-dim);border:1px solid var(--accent-cyan);border-radius:8px;padding:10px 12px;font-size:0.82rem"><strong style="color:var(--accent-cyan)">C2:</strong> NOT semua bit + 1</div>
      </div>`
    )}

    ${w2Section('Sign-Magnitude (SM)','--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
      `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
        <div>
          <p style="margin:0 0 10px;font-size:0.9rem;line-height:1.6"><strong>MSB</strong> berfungsi sebagai <em>sign bit</em>:<br>
            <span style="color:var(--success)">MSB = 0 &rarr; Positif</span><br>
            <span style="color:var(--danger)">MSB = 1 &rarr; Negatif</span>
          </p>
          <p style="margin:0 0 10px;font-size:0.9rem;line-height:1.6">Bit sisanya menunjukkan <strong>magnitudo</strong>.</p>
          ${w2Alert('warning','Terdapat dua representasi nol:<br><code>+0 = 0000 0000</code><br><code>-0 = 1000 0000</code>')}
        </div>
        ${w2Code([
          '// Rentang 8-bit: -127 sampai +127',
          '',
          '+13 = 0000 1101',
          '      ^ Sign=0 (positif)',
          '',
          '-13 = 1000 1101',
          '      ^ Sign=1 (negatif)',
        ], 'Contoh +/-13')}
      </div>`
    )}

    ${w2Section("1's Complement (C1)",'--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>',
      `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <p style="margin:0 0 10px;font-size:0.9rem;line-height:1.6">Bilangan negatif diperoleh dengan <strong>menginversi seluruh bit</strong> (0&rarr;1, 1&rarr;0).</p>
          <div style="background:var(--accent-violet-dim);border:1px solid var(--accent-violet);border-radius:8px;padding:12px 14px;font-family:var(--font-mono);font-size:0.88rem;line-height:1.8">0 &rarr; 1 &nbsp; (inversi)<br>1 &rarr; 0 &nbsp; (inversi)</div>
          ${w2Alert('warning',"Seperti SM, 1's Complement memiliki <strong>dua representasi nol</strong>. Jika ada carry keluar MSB, harus ditambahkan ke LSB (<em>End-Around Carry</em>).")}
        </div>
        ${w2Code([
          "// Rentang 8-bit: -127 sampai +127",
          '',
          '+13 = 0000 1101',
          '      | NOT (inversi)',
          '-13 = 1111 0010',
          '',
          '// Contoh lain:',
          '1010 1011',
          '  | NOT',
          '0101 0100',
        ], "Contoh Inversi C1")}
      </div>`
    )}

    ${w2Section("2's Complement (C2)",'--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
      `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
        <div>
          <p style="margin:0 0 12px;font-size:0.9rem;line-height:1.6"><strong>Cara mendapatkan bilangan negatif:</strong></p>
          ${w2Step(1,'Inversi seluruh bit (NOT)')}
          ${w2Step(2,'Tambahkan 1 pada LSB')}
          <div style="margin-top:14px;background:var(--accent-cyan-dim);border:1px solid var(--accent-cyan);border-radius:8px;padding:12px 14px">
            <p style="margin:0 0 6px;font-size:0.78rem;font-weight:700;color:var(--accent-cyan)">Keunggulan 2's Complement:</p>
            <ul style="margin:0;padding-left:18px;font-size:0.85rem;line-height:1.8">
              <li>Hanya <strong>satu representasi nol</strong></li>
              <li>Operasi aritmetika lebih sederhana</li>
              <li>Rentang 8-bit: <strong>-128 sampai +127</strong></li>
              <li>Standar pada CPU dan MCU modern</li>
            </ul>
          </div>
        </div>
        ${w2Code([
          "// Rentang 8-bit: -128 sampai +127",
          '',
          '+13 = 0000 1101',
          '',
          'Langkah 1: NOT',
          '     = 1111 0010',
          '',
          'Langkah 2: + 1',
          '     1111 0010',
          '   +         1',
          '   ----------',
          '-13 = 1111 0011',
        ], 'Konversi +13 ke -13')}
      </div>
      <p style="margin:16px 0 8px;font-weight:600">Rumus Nilai 2's Complement:</p>
      <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 18px;font-family:var(--font-mono);font-size:0.9rem;line-height:2">
        Nilai = -b<sub>(n-1)</sub> x 2<sup>(n-1)</sup> + Sigma [b<sub>i</sub> x 2<sup>i</sup>] &nbsp; (i = 0 s.d. n-2)
      </div>`
    )}

    <!-- Konverter Interaktif -->
    <div class="info-card" style="border-left:3px solid var(--accent-cyan);margin-bottom:28px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px">
        <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;background:var(--accent-cyan-dim)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2.2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        </span>
        <h3 style="margin:0;font-size:1.05rem;font-weight:700;color:var(--accent-cyan)">Konverter Interaktif — Desimal &harr; 2's Complement (8-bit)</h3>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:18px">
          <p style="margin:0 0 12px;font-size:0.85rem;font-weight:600;color:var(--text-secondary)">Desimal Negatif &rarr; 2's Complement</p>
          <div style="display:flex;gap:8px;margin-bottom:12px">
            <input type="number" id="w2-dec-input" placeholder="-1 s.d. -128" min="-128" max="-1"
              style="flex:1;background:var(--bg-raised);border:1.5px solid var(--line);border-radius:8px;padding:9px 13px;font-size:0.9rem;color:var(--text-primary);outline:none;transition:border .2s"
              onfocus="this.style.borderColor='var(--accent-cyan)'" onblur="this.style.borderColor='var(--line)'" />
            <button onclick="w2ConvertDecTo2C()" style="background:var(--accent-cyan);color:#000;border:none;border-radius:8px;padding:9px 16px;font-size:0.85rem;font-weight:700;cursor:pointer">Hitung</button>
          </div>
          <div id="w2-dec-result" style="min-height:60px;font-family:var(--font-mono);font-size:0.88rem;line-height:1.8;color:var(--text-faint)">Masukkan bilangan desimal negatif...</div>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:18px">
          <p style="margin:0 0 12px;font-size:0.85rem;font-weight:600;color:var(--text-secondary)">2's Complement (8-bit) &rarr; Desimal</p>
          <div style="display:flex;gap:8px;margin-bottom:12px">
            <input type="text" id="w2-bin-input" placeholder="Contoh: 11110011" maxlength="8"
              style="flex:1;background:var(--bg-raised);border:1.5px solid var(--line);border-radius:8px;padding:9px 13px;font-size:0.9rem;font-family:var(--font-mono);color:var(--text-primary);outline:none;transition:border .2s"
              onfocus="this.style.borderColor='var(--accent-violet)'" onblur="this.style.borderColor='var(--line)'" />
            <button onclick="w2ConvertBinToDec()" style="background:var(--accent-violet);color:#fff;border:none;border-radius:8px;padding:9px 16px;font-size:0.85rem;font-weight:700;cursor:pointer">Hitung</button>
          </div>
          <div id="w2-bin-result" style="min-height:60px;font-family:var(--font-mono);font-size:0.88rem;line-height:1.8;color:var(--text-faint)">Masukkan 8-bit biner...</div>
        </div>
      </div>
    </div>

    ${w2Section('Contoh Konversi Step-by-Step','--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
      `<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        ${w2Code([
          "// -13 ke 8-bit 2's Complement",
          '+13  = 0000 1101',
          'NOT  = 1111 0010',
          '       1111 0010',
          '     +         1',
          '     ----------',
          '-13  = 1111 0011',
        ], 'Contoh 1: -13')}
        ${w2Code([
          "// -37 ke 8-bit 2's Complement",
          '+37  = 0010 0101',
          'NOT  = 1101 1010',
          '       1101 1010',
          '     +         1',
          '     ----------',
          '-37  = 1101 1011',
        ], 'Contoh 2: -37')}
        ${w2Code([
          '// 1110 0110 ke Desimal',
          'MSB = 1 (negatif)',
          'U = 128+64+32+4+2 = 230',
          '2^8 - U = 256 - 230 = 26',
          '1110 0110 = -26',
        ], 'Contoh 3: Biner ke Desimal')}
        ${w2Code([
          '// Sign Extension: 8-bit ke 16-bit',
          '8-bit:  1101 1011  (-37)',
          '',
          'Salin MSB ke kiri:',
          '',
          '16-bit: 1111 1111 1101 1011',
          '',
          'Nilai tetap: -37 v',
        ], 'Contoh 4: Sign Extension')}
      </div>`
    )}

    ${w2Section('Perbandingan Tiga Skema (8-bit)','--accent-rose',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>',
      w2CompTable([
        ['<span style="background:var(--accent-amber-dim);color:var(--accent-amber);padding:2px 8px;border-radius:99px;font-size:0.78rem;font-weight:700">SM</span> Sign-Magnitude','-127 sampai +127','Set MSB = 1','Memiliki +0 dan -0'],
        ["<span style=\"background:var(--accent-violet-dim);color:var(--accent-violet);padding:2px 8px;border-radius:99px;font-size:0.78rem;font-weight:700\">C1</span> 1's Complement",'-127 sampai +127','NOT semua bit','Memiliki +0 dan -0; butuh End-Around Carry'],
        ["<span style=\"background:var(--accent-cyan-dim);color:var(--accent-cyan);padding:2px 8px;border-radius:99px;font-size:0.78rem;font-weight:700\">C2</span> 2's Complement",'<strong>-128 sampai +127</strong>','NOT semua bit + 1','<strong>Standar CPU/MCU</strong>'],
      ])
    )}
  `;

  window.w2ConvertDecTo2C = function() {
    const inp = document.getElementById('w2-dec-input');
    const res = document.getElementById('w2-dec-result');
    const val = parseInt(inp.value, 10);
    if (isNaN(val) || val >= 0 || val < -128) {
      res.innerHTML = '<span style="color:var(--danger)">Masukkan bilangan antara -128 sampai -1</span>';
      return;
    }
    const abs = Math.abs(val);
    const posBin = abs.toString(2).padStart(8,'0').match(/.{4}/g).join(' ');
    const u = 256 + val;
    const twosComp = u.toString(2).padStart(8,'0').match(/.{4}/g).join(' ');
    const notBin = ((~abs) & 0xFF).toString(2).padStart(8,'0').match(/.{4}/g).join(' ');
    const hex = u.toString(16).toUpperCase().padStart(2,'0');
    const oct = u.toString(8).padStart(3,'0');
    res.innerHTML = `
      <span style="color:var(--text-faint)">+${abs}</span> = <span style="color:var(--success)">${posBin}</span><br>
      <span style="color:var(--text-faint)">NOT</span> = <span style="color:var(--accent-violet)">${notBin}</span><br>
      <span style="color:var(--text-faint)">+ 1</span> = <span style="color:var(--danger)">${twosComp}</span><br>
      <span style="color:var(--text-faint)">Hex</span> = <span style="color:var(--accent-amber)">0x${hex}</span> &nbsp;|&nbsp; <span style="color:var(--text-faint)">Oct</span> = <span style="color:var(--accent-violet)">0o${oct}</span>
    `;
  };

  window.w2ConvertBinToDec = function() {
    const inp = document.getElementById('w2-bin-input');
    const res = document.getElementById('w2-bin-result');
    const raw = inp.value.trim().replace(/\s/g,'');
    if (!/^[01]{8}$/.test(raw)) {
      res.innerHTML = '<span style="color:var(--danger)">Masukkan tepat 8 digit biner (0 atau 1)</span>';
      return;
    }
    const unsigned = parseInt(raw, 2);
    const formatted = raw.match(/.{4}/g).join(' ');
    if (raw[0] === '0') {
      res.innerHTML = `<span style="color:var(--text-faint)">MSB = 0</span> &rarr; non-negatif<br><span style="color:var(--success)">${formatted}</span> = <span style="color:var(--success);font-size:1.05rem;font-weight:700">+${unsigned}</span>`;
    } else {
      const value = unsigned - 256;
      res.innerHTML = `<span style="color:var(--text-faint)">MSB = 1</span> &rarr; negatif<br>U = ${unsigned}<br>2^8 - U = 256 - ${unsigned} = ${Math.abs(value)}<br><span style="color:var(--danger)">${formatted}</span> = <span style="color:var(--danger);font-size:1.05rem;font-weight:700">${value}</span>`;
    }
  };
}

/* ───── WEEK 2: OPERASI BINER ───── */
function renderWeek2Ops(el) {
  el.innerHTML = `
    <div style="background:linear-gradient(135deg,var(--accent-amber-dim),var(--accent-rose-dim));border:1px solid var(--line);border-radius:14px;padding:20px 24px;margin-bottom:28px">
      <h3 style="margin:0 0 8px;font-size:1.1rem;font-weight:800">Operasi Bilangan Biner</h3>
      <p style="margin:0;color:var(--text-secondary);font-size:0.9rem">Pada 2's Complement, operasi <strong>pengurangan</strong> dilakukan melalui <strong>penjumlahan</strong>. CPU hanya membutuhkan satu rangkaian <em>adder</em> untuk keduanya.</p>
    </div>

    ${w2Section("Pengurangan via 2's Complement",'--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
      `<div style="background:var(--accent-amber-dim);border:1px solid var(--accent-amber);border-radius:10px;padding:14px 18px;margin-bottom:14px;text-align:center;font-family:var(--font-mono);font-size:1rem;font-weight:700">
        A - B = A + (2's Complement dari B)
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div>
          <p style="margin:0 0 10px;font-size:0.9rem;line-height:1.6">Pada aritmetika modular, mengurangi B sama dengan menambahkan komplemen B.</p>
          ${w2Step(1,"Ambil 2's Complement dari B")}
          ${w2Step(2,'Lakukan penjumlahan A + C2(B)')}
          ${w2Step(3,'Abaikan carry melewati batas bit')}
          ${w2Alert('success','CPU hanya membutuhkan satu rangkaian <strong>adder</strong> untuk penjumlahan maupun pengurangan!')}
        </div>
        ${w2Code([
          '// Contoh: 18 - 25',
          '+18 = 0001 0010',
          '+25 = 0001 1001',
          '',
          "2's Complement 25:",
          'NOT = 1110 0110',
          '+1  = 1110 0111',
          '',
          '  0001 0010  (+18)',
          '+ 1110 0111  (-25)',
          '  ----------',
          '  1111 1001',
          '',
          'U = 249, 256-249 = 7',
          'Hasil = -7  (18-25=-7 v)',
        ], 'Contoh: 18 - 25')}
      </div>`
    )}

    <!-- Kalkulator Biner -->
    <div class="info-card" style="border-left:3px solid var(--accent-amber);margin-bottom:28px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px">
        <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;background:var(--accent-amber-dim)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-amber)" stroke-width="2.2"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>
        </span>
        <h3 style="margin:0;font-size:1.05rem;font-weight:700;color:var(--accent-amber)">Kalkulator Biner 8-bit (2's Complement)</h3>
      </div>
      <div style="display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:end;margin-bottom:14px">
        <div>
          <label style="display:block;font-size:0.78rem;font-weight:600;color:var(--text-faint);margin-bottom:6px">Bilangan A (-128 s.d. 127)</label>
          <input type="number" id="w2-op-a" value="75" min="-128" max="127"
            style="width:100%;box-sizing:border-box;background:var(--bg-inset);border:1.5px solid var(--line);border-radius:8px;padding:9px 13px;font-size:0.9rem;color:var(--text-primary);outline:none"
            onfocus="this.style.borderColor='var(--accent-amber)'" onblur="this.style.borderColor='var(--line)'" />
        </div>
        <div>
          <select id="w2-op-type" style="background:var(--bg-inset);border:1.5px solid var(--line);border-radius:8px;padding:9px 13px;font-size:1rem;color:var(--text-primary);cursor:pointer">
            <option value="add">+</option>
            <option value="sub" selected>-</option>
          </select>
        </div>
        <div>
          <label style="display:block;font-size:0.78rem;font-weight:600;color:var(--text-faint);margin-bottom:6px">Bilangan B (-128 s.d. 127)</label>
          <input type="number" id="w2-op-b" value="103" min="-128" max="127"
            style="width:100%;box-sizing:border-box;background:var(--bg-inset);border:1.5px solid var(--line);border-radius:8px;padding:9px 13px;font-size:0.9rem;color:var(--text-primary);outline:none"
            onfocus="this.style.borderColor='var(--accent-amber)'" onblur="this.style.borderColor='var(--line)'" />
        </div>
      </div>
      <button onclick="w2CalcOp()" style="width:100%;background:var(--accent-amber);color:#000;border:none;border-radius:8px;padding:11px;font-size:0.9rem;font-weight:700;cursor:pointer;margin-bottom:16px;transition:opacity .2s" onmouseover="this.style.opacity='.8'" onmouseout="this.style.opacity='1'">Hitung Langkah demi Langkah</button>
      <div id="w2-op-result" style="font-family:var(--font-mono);font-size:0.88rem;line-height:1.9;min-height:40px;color:var(--text-faint)">Masukkan dua bilangan dan pilih operasi...</div>
    </div>

    ${w2Section("Overflow pada 2's Complement",'--accent-rose',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      `<p style="margin:0 0 12px;font-size:0.9rem;line-height:1.6">Overflow terjadi ketika hasil operasi berada <strong>di luar rentang</strong> yang dapat direpresentasikan (8-bit: -128 s.d. +127).</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px">
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px">
          <p style="margin:0 0 8px;font-size:0.83rem;font-weight:700;color:var(--danger)">Kondisi Overflow</p>
          <ul style="margin:0;padding-left:18px;font-size:0.88rem;line-height:1.9">
            <li>Positif + Positif &rarr; hasil <strong>negatif</strong></li>
            <li>Negatif + Negatif &rarr; hasil <strong>positif</strong></li>
          </ul>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:14px 16px">
          <p style="margin:0 0 8px;font-size:0.83rem;font-weight:700;color:var(--accent-cyan)">Deteksi Overflow</p>
          <div style="font-family:var(--font-mono);font-size:0.85rem;line-height:1.7">
            Carry-in XOR Carry-out MSB = 1<br>
            <span style="color:var(--danger)">&rarr; OVERFLOW terjadi</span>
          </div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        ${w2Code([
          '// Overflow POSITIF',
          '+100 = 0110 0100',
          ' +60 = 0011 1100',
          ' ----------------',
          '       1001 1000',
          '',
          'MSB=1 terbaca -104',
          'Padahal 100+60=160',
          '160 > 127 => OVERFLOW!',
        ],'Contoh Overflow +')}
        ${w2Code([
          '// Overflow NEGATIF',
          '-100 = 1001 1100',
          ' -50 = 1100 1110',
          ' ----------------',
          '     0101 1010',
          '',
          'MSB=0 terbaca +90',
          'Padahal -100+(-50)=-150',
          '-150 < -128 => OVERFLOW!',
        ],'Contoh Overflow -')}
      </div>`
    )}

    ${w2Section('Sign Extension','--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>',
      `<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div>
          <p style="margin:0 0 10px;font-size:0.9rem;line-height:1.6">Digunakan saat bilangan bertanda <strong>diperlebar jumlah bitnya</strong> (misal 8-bit &rarr; 16-bit).</p>
          <div style="background:var(--accent-violet-dim);border:1px solid var(--accent-violet);border-radius:8px;padding:12px 14px;font-size:0.9rem;line-height:1.7">Salin <strong>MSB</strong> (sign bit) ke semua bit tambahan di sebelah kiri.</div>
          ${w2Alert('warning','Sign extension <strong>wajib diperhatikan</strong> saat melakukan casting tipe data bertanda (signed), misalnya <code>int8_t</code> &rarr; <code>int16_t</code>.')}
        </div>
        ${w2Code([
          '// -37 (8-bit) -> 16-bit',
          '',
          '8-bit:  1101 1011  (-37)',
          '        ^ MSB = 1',
          '',
          'Salin MSB ke kiri (8 bit):',
          '',
          '16-bit: 1111 1111 1101 1011',
          '',
          'Nilai tetap: -37 v',
        ],'Contoh Sign Extension')}
      </div>`
    )}
  `;

  window.w2CalcOp = function() {
    const aVal = parseInt(document.getElementById('w2-op-a').value, 10);
    const bVal = parseInt(document.getElementById('w2-op-b').value, 10);
    const op = document.getElementById('w2-op-type').value;
    const res = document.getElementById('w2-op-result');
    if (isNaN(aVal)||isNaN(bVal)||aVal<-128||aVal>127||bVal<-128||bVal>127) {
      res.innerHTML='<span style="color:var(--danger)">Masukkan bilangan valid (-128 s.d. 127)</span>';
      return;
    }
    const toBin8 = n => ((n & 0xFF) >>> 0).toString(2).padStart(8,'0').match(/.{4}/g).join(' ');
    const aBin = toBin8(aVal);
    const bBin = toBin8(bVal);
    const rawResult = aVal + (op==='sub' ? -bVal : bVal);
    const overflow = rawResult > 127 || rawResult < -128;
    const resultBin = toBin8(rawResult);
    let html = `A = ${aVal} = <span style="color:var(--success)">${aBin}</span><br>B = ${bVal} = <span style="color:var(--success)">${bBin}</span><br>`;
    if (op==='sub') {
      const notBVal = (~(bVal & 0xFF)) & 0xFF;
      const c2BVal = (notBVal+1) & 0xFF;
      html += `<br>2's Complement B:<br>NOT(${bBin}) = <span style="color:var(--accent-violet)">${toBin8(notBVal)}</span><br>+ 1 = <span style="color:var(--danger)">${toBin8(c2BVal)}</span><br>`;
    }
    // Fix: correct 2’s complement: parenthesise (NOT b) before +1
    const bEff = op==='sub' ? (((~(bVal & 0xFF)) + 1) & 0xFF) : (bVal & 0xFF);
    const bEffLabel = op==='sub' ? -bVal : bVal;
    html += `<br>  <span style="color:var(--success)">${aBin}</span>  (${aVal})<br>+ <span style="color:var(--danger)">${toBin8(bEff)}</span>  (${op==='sub'?-bVal:bVal})<br>-----------<br>  <span style="color:${overflow?'var(--danger)':'var(--accent-amber)'}">${resultBin}</span> = <span style="color:${overflow?'var(--danger)':'var(--success)'};font-size:1.05rem;font-weight:700">${overflow?'OVERFLOW! (nilai nyata: '+rawResult+')':rawResult}</span>`;
    res.innerHTML = html;
  };
}

/* ───── WEEK 2: HEX & OCTAL ───── */
function renderWeek2Hex(el) {
  el.innerHTML = `
    <div style="background:linear-gradient(135deg,var(--accent-cyan-dim),var(--accent-amber-dim));border:1px solid var(--line);border-radius:14px;padding:20px 24px;margin-bottom:28px">
      <h3 style="margin:0 0 8px;font-size:1.1rem;font-weight:800">Bilangan Negatif dalam Hex &amp; Oktal</h3>
      <p style="margin:0;color:var(--text-secondary);font-size:0.9rem">Gunakan representasi 2's Complement lalu konversi ke basis yang diinginkan.</p>
    </div>

    ${w2Section('Formula Umum (8-bit)','--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>',
      `<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px 18px;text-align:center">
          <p style="margin:0 0 8px;font-size:0.78rem;font-weight:700;color:var(--accent-cyan);text-transform:uppercase;letter-spacing:.06em">Nilai Unsigned</p>
          <div style="font-family:var(--font-mono);font-size:1.1rem;font-weight:700">U = 2<sup>n</sup> - |x|</div>
          <p style="margin:8px 0 0;font-size:0.82rem;color:var(--text-faint)">n = jumlah bit | x = bilangan negatif</p>
        </div>
        <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px 18px">
          <p style="margin:0 0 8px;font-size:0.78rem;font-weight:700;color:var(--accent-amber);text-transform:uppercase;letter-spacing:.06em">Untuk 8-bit</p>
          <div style="font-family:var(--font-mono);font-size:0.9rem;line-height:1.8">2<sup>8</sup> = 256<br>Hex: U &rarr; basis 16<br>Oct: U &rarr; basis 8</div>
        </div>
      </div>`
    )}

    ${w2Section('Tabel Contoh — Heksadesimal (8-bit)','--accent-amber',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></svg>',
      `<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:0.88rem">
        <thead><tr style="border-bottom:2px solid var(--line)">
          ${['Desimal','Rumus','Unsigned (U)','Biner 8-bit','Hex'].map(h=>`<th style="padding:10px 14px;text-align:center;color:var(--text-faint);font-weight:600;font-size:0.78rem">${h}</th>`).join('')}
        </tr></thead>
        <tbody>${[[-26,'var(--accent-amber)'],[-37,'var(--accent-violet)'],[-42,'var(--accent-cyan)'],[-1,'var(--accent-rose)'],[-128,'var(--danger)']].map(([val,col],i)=>{
          const u=256+val; const hex=u.toString(16).toUpperCase().padStart(2,'0'); const bin=u.toString(2).padStart(8,'0').match(/.{4}/g).join(' ');
          return `<tr style="border-bottom:1px solid var(--line);${i%2===0?'background:var(--bg-inset)':''}">
            <td style="padding:10px 14px;text-align:center;color:${col};font-weight:700;font-family:var(--font-mono)">${val}</td>
            <td style="padding:10px 14px;text-align:center;font-family:var(--font-mono);font-size:0.82rem">256-${Math.abs(val)}=${u}</td>
            <td style="padding:10px 14px;text-align:center;font-family:var(--font-mono)">${u}</td>
            <td style="padding:10px 14px;text-align:center;font-family:var(--font-mono)">${bin}</td>
            <td style="padding:10px 14px;text-align:center;font-family:var(--font-mono);font-weight:700;color:var(--accent-amber)">0x${hex}</td>
          </tr>`;}).join('')}</tbody>
      </table></div>`
    )}

    ${w2Section('Tabel Contoh — Oktal (8-bit)','--accent-violet',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
      `<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:0.88rem">
        <thead><tr style="border-bottom:2px solid var(--line)">
          ${['Desimal','Rumus','Unsigned (U)','Biner 8-bit','Oktal'].map(h=>`<th style="padding:10px 14px;text-align:center;color:var(--text-faint);font-weight:600;font-size:0.78rem">${h}</th>`).join('')}
        </tr></thead>
        <tbody>${[[-26,'var(--accent-amber)'],[-37,'var(--accent-violet)'],[-1,'var(--accent-rose)'],[-128,'var(--danger)']].map(([val,col],i)=>{
          const u=256+val; const oct=u.toString(8).padStart(3,'0'); const bin=u.toString(2).padStart(8,'0').match(/.{4}/g).join(' ');
          return `<tr style="border-bottom:1px solid var(--line);${i%2===0?'background:var(--bg-inset)':''}">
            <td style="padding:10px 14px;text-align:center;color:${col};font-weight:700;font-family:var(--font-mono)">${val}</td>
            <td style="padding:10px 14px;text-align:center;font-family:var(--font-mono);font-size:0.82rem">256-${Math.abs(val)}=${u}</td>
            <td style="padding:10px 14px;text-align:center;font-family:var(--font-mono)">${u}</td>
            <td style="padding:10px 14px;text-align:center;font-family:var(--font-mono)">${bin}</td>
            <td style="padding:10px 14px;text-align:center;font-family:var(--font-mono);font-weight:700;color:var(--accent-violet)">0o${oct}</td>
          </tr>`;}).join('')}</tbody>
      </table></div>`
    )}

    ${w2Section('Konversi Biner &rarr; Hex (Metode Nibble)','--accent-cyan',
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/></svg>',
      `<p style="margin:0 0 12px;font-size:0.9rem;line-height:1.6">Konversi dilakukan per <strong>4 bit (nibble)</strong> — setiap nibble menjadi satu digit hexadecimal.</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:16px">
        ${w2Code(['1101 0110','  D     6','','1101 0110 = 0xD6'],'Contoh: 1101 0110')}
        ${w2Code(['// -42 dalam 8-bit','+42 = 0010 1010','NOT = 1101 0101','+1  = 1101 0110','1101 -> D   0110 -> 6','-42 = 0xD6'],'Contoh: -42 ke Hex')}
      </div>
      <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:12px;padding:18px">
        <p style="margin:0 0 12px;font-size:0.85rem;font-weight:600;color:var(--text-secondary)">Konverter Cepat — Negatif ke Hex &amp; Oktal (8-bit)</p>
        <div style="display:flex;gap:8px;margin-bottom:12px">
          <input type="number" id="w2-hex-input" placeholder="-128 s.d. -1" min="-128" max="-1"
            style="flex:1;background:var(--bg-raised);border:1.5px solid var(--line);border-radius:8px;padding:9px 13px;font-size:0.9rem;color:var(--text-primary);outline:none"
            onfocus="this.style.borderColor='var(--accent-cyan)'" onblur="this.style.borderColor='var(--line)'" />
          <button onclick="w2ConvertHex()" style="background:var(--accent-cyan);color:#000;border:none;border-radius:8px;padding:9px 16px;font-size:0.85rem;font-weight:700;cursor:pointer">Konversi</button>
        </div>
        <div id="w2-hex-result" style="font-family:var(--font-mono);font-size:0.88rem;line-height:1.9;color:var(--text-faint)">Masukkan bilangan negatif...</div>
      </div>`
    )}
  `;

  window.w2ConvertHex = function() {
    const inp = document.getElementById('w2-hex-input');
    const res = document.getElementById('w2-hex-result');
    const val = parseInt(inp.value, 10);
    if (isNaN(val)||val>=0||val<-128) {
      res.innerHTML='<span style="color:var(--danger)">Masukkan bilangan antara -128 sampai -1</span>';
      return;
    }
    const u=256+val; const hex=u.toString(16).toUpperCase().padStart(2,'0');
    const oct=u.toString(8).padStart(3,'0');
    const bin=u.toString(2).padStart(8,'0');
    const formatted=bin.match(/.{4}/g).join(' ');
    const h1=parseInt(bin.slice(0,4),2).toString(16).toUpperCase();
    const h2=parseInt(bin.slice(4),2).toString(16).toUpperCase();
    res.innerHTML=`2^8 - |${val}| = 256 - ${Math.abs(val)} = <span style="color:var(--accent-amber)">${u}</span><br>Biner : <span style="color:var(--danger)">${formatted}</span><br>Nibble: [${bin.slice(0,4)}&rarr;${h1}] [${bin.slice(4)}&rarr;${h2}]<br>Hex   : <span style="color:var(--accent-amber);font-weight:700">0x${hex}</span><br>Oktal : <span style="color:var(--accent-violet);font-weight:700">0o${oct}</span>`;
  };
}

/* ── Helper: generate 2's complement explanation (Week 2) ── */
function buildW2Explanation(typeId, n) {
  const toBin8 = x => ((x & 0xFF) >>> 0).toString(2).padStart(8,'0').match(/.{4}/g).join(' ');
  if (typeId === 'neg2comp') {
    const abs = Math.abs(n);
    const posBin = toBin8(abs);
    const notBin = toBin8(~abs);
    const c2 = (256 + n);
    const c2Bin = toBin8(c2);
    const hex = c2.toString(16).toUpperCase().padStart(2,'0');
    const oct = c2.toString(8).padStart(3,'0');
    return `
      <p style="margin:0 0 10px;font-size:0.88rem">Langkah konversi <strong>${n}</strong> ke 2's Complement 8-bit:</p>
      <div style="font-family:var(--font-mono);font-size:0.88rem;line-height:2;background:var(--bg-inset);border-radius:8px;padding:14px 16px">
        <div><span style="color:var(--text-faint)">+${abs}</span> = <span style="color:var(--success)">${posBin}</span> &nbsp; <em style="color:var(--text-faint);font-size:0.8rem">(biner positif)</em></div>
        <div><span style="color:var(--text-faint)">NOT</span> = <span style="color:var(--accent-violet)">${notBin}</span> &nbsp; <em style="color:var(--text-faint);font-size:0.8rem">(inversi semua bit)</em></div>
        <div><span style="color:var(--text-faint)">+ 1</span> = <span style="color:var(--danger)">${c2Bin}</span> &nbsp; <em style="color:var(--text-faint);font-size:0.8rem">(tambah 1 = 2's Complement)</em></div>
        <div style="margin-top:6px;padding-top:6px;border-top:1px solid var(--line)"><span style="color:var(--text-faint)">Hex</span> = <span style="color:var(--accent-amber);font-weight:700">0x${hex}</span> &nbsp;|&nbsp; <span style="color:var(--text-faint)">Oct</span> = <span style="color:var(--accent-violet);font-weight:700">0o${oct}</span></div>
      </div>`;
  }
  return '';
}

function renderWeek2Quiz(el) {
  el.innerHTML = `
    <div style="background:linear-gradient(135deg,var(--accent-violet-dim),var(--success-dim));border:1px solid var(--line);border-radius:14px;padding:20px 24px;margin-bottom:28px">
      <h3 style="margin:0 0 8px;font-size:1.1rem;font-weight:800">Latihan &amp; Soal</h3>
      <p style="margin:0;color:var(--text-secondary);font-size:0.9rem">Kerjakan soal berikut, lalu klik <strong>"Lihat Jawaban"</strong> untuk memeriksa hasil. Setiap jawaban dilengkapi <strong>penjelasan langkah demi langkah</strong> agar kamu tahu letak kesalahan dan cara menyelesaikannya.</p>
    </div>

    <!-- Latihan 1 -->
    <div class="info-card" style="border-left:3px solid var(--accent-cyan);margin-bottom:24px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
        <span style="background:var(--accent-cyan-dim);color:var(--accent-cyan);border:1px solid var(--accent-cyan);padding:4px 14px;border-radius:99px;font-size:0.82rem;font-weight:700">LATIHAN 1</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px">
        ${[['Soal 1','Ubah <strong>-58</strong> ke:<br>a. Biner 8-bit (2\'s Complement)<br>b. Oktal<br>c. Heksadesimal','--accent-cyan'],
           ['Soal 2','Ubah <strong>1011 1111</strong><br>(8-bit 2\'s Complement)<br>ke desimal.','--accent-violet'],
           ['Soal 3','Hitung <strong>75 - 103</strong><br>menggunakan 8-bit 2\'s Complement<br>melalui penjumlahan.','--accent-amber']
          ].map(([num,soal,col])=>`
          <div style="background:var(--bg-inset);border:1px solid var(${col});border-radius:10px;padding:14px 16px">
            <p style="margin:0 0 8px;font-size:0.78rem;font-weight:700;color:var(${col})">${num}</p>
            <p style="margin:0;font-size:0.88rem;line-height:1.7">${soal}</p>
          </div>`).join('')}
      </div>
      <button onclick="w2ToggleAnswer('lat1','btn-lat1')" id="btn-lat1"
        style="background:var(--accent-cyan-dim);color:var(--accent-cyan);border:1.5px solid var(--accent-cyan);border-radius:8px;padding:9px 20px;font-size:0.87rem;font-weight:700;cursor:pointer;transition:all .2s"
        onmouseover="this.style.background='var(--accent-cyan)';this.style.color='#000'"
        onmouseout="this.style.background='var(--accent-cyan-dim)';this.style.color='var(--accent-cyan)'">
        Lihat Jawaban
      </button>
      <div id="lat1" hidden style="margin-top:16px">
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
          ${w2Code([
            "// Jawaban Soal 1: -58",
            '+58 = 0011 1010',
            'NOT = 1100 0101',
            '+1  = 1100 0110',
            '-58 (Bin) = 1100 0110',
            '-58 (Hex) = 0xC6',
            '-58 (Oct) = 0o306',
          ],'Jawaban 1')}
          ${w2Code([
            '// Jawaban Soal 2: 1011 1111',
            'MSB = 1 -> negatif',
            'U = 128+32+16+8+4+2+1 = 191',
            '2^8 - 191 = 256-191 = 65',
            '1011 1111 = -65',
          ],'Jawaban 2')}
          ${w2Code([
            '// Jawaban Soal 3: 75 - 103',
            '+75  = 0100 1011',
            '+103 = 0110 0111',
            "C2(103):",
            'NOT  = 1001 1000',
            '+1   = 1001 1001',
            '',
            '  0100 1011  (+75)',
            '+ 1001 1001  (-103)',
            '  ----------',
            '  1110 0100',
            '',
            'U=228, 256-228=28',
            '75 - 103 = -28 v',
          ],'Jawaban 3')}
        </div>
        <!-- Penjelasan langkah soal 1 -->
        <div style="margin-top:18px">
          <p style="margin:0 0 12px;font-size:0.85rem;font-weight:700;color:var(--accent-cyan)">📖 Penjelasan Langkah demi Langkah</p>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px">
            <div style="background:var(--bg-inset);border:1px solid var(--accent-cyan);border-radius:10px;padding:14px 16px">
              <p style="margin:0 0 8px;font-size:0.8rem;font-weight:700;color:var(--accent-cyan)">Soal 1 — Desimal Negatif ke Biner</p>
              <div style="font-size:0.85rem;line-height:1.8">
                ${w2Step(1,'Ambil nilai positifnya: <strong>+58</strong>')}
                ${w2Step(2,'Tulis 58 dalam 8-bit biner: <code>0011 1010</code>')}
                ${w2Step(3,'Inversi semua bit (NOT): <code>1100 0101</code> — setiap 0 jadi 1 dan sebaliknya')}
                ${w2Step(4,'Tambahkan 1 pada bit paling kanan (LSB): <code>1100 0110</code> — ini adalah -58 dalam 2\'s Complement')}
                ${w2Step(5,'Konversi ke Hex: bagi 2 nibble → <code>1100</code>=C, <code>0110</code>=6 → <strong>0xC6</strong>')}
                ${w2Step(6,'Konversi ke Oktal: U = 256 - 58 = 198 → 198 dalam oktal = <strong>0o306</strong>')}
              </div>
              ${w2Alert('info','Cara cek: ubah balik 1100 0110 → NOT = 0011 1001, +1 = 0011 1010 = 58. Benar!')}
            </div>
            <div style="background:var(--bg-inset);border:1px solid var(--accent-violet);border-radius:10px;padding:14px 16px">
              <p style="margin:0 0 8px;font-size:0.8rem;font-weight:700;color:var(--accent-violet)">Soal 2 — Biner ke Desimal (MSB=1)</p>
              <div style="font-size:0.85rem;line-height:1.8">
                ${w2Step(1,'MSB = <strong>1</strong> → bilangan ini <strong>negatif</strong> dalam 2\'s Complement')}
                ${w2Step(2,'Hitung nilai unsigned-nya: bit-bit yang 1 adalah posisi 7,5,4,3,2,1,0')}
                ${w2Step(3,'U = 128 + 32 + 16 + 8 + 4 + 2 + 1 = <strong>191</strong>')}
                ${w2Step(4,'Nilai sesungguhnya: U - 2⁸ = 191 - 256 = <strong>-65</strong>')}
              </div>
              ${w2Alert('info','Kesalahan umum: membaca langsung seperti biner positif. Ingat: jika MSB=1, wajib kurangkan 256!')}
            </div>
            <div style="background:var(--bg-inset);border:1px solid var(--accent-amber);border-radius:10px;padding:14px 16px">
              <p style="margin:0 0 8px;font-size:0.8rem;font-weight:700;color:var(--accent-amber)">Soal 3 — Pengurangan via 2\'s Complement</p>
              <div style="font-size:0.85rem;line-height:1.8">
                ${w2Step(1,'Rumus: A - B = A + 2\'s Complement(B)')}
                ${w2Step(2,'Tulis 75 dan 103 dalam 8-bit biner')}
                ${w2Step(3,'Ambil 2\'s Complement dari 103: NOT(0110 0111) = 1001 1000, +1 = <strong>1001 1001</strong>')}
                ${w2Step(4,'Jumlahkan: 0100 1011 + 1001 1001 = <strong>1110 0100</strong>')}
                ${w2Step(5,'MSB=1 → negatif. U = 128+64+32+4 = 228. Nilai = 228 - 256 = <strong>-28</strong>')}
              </div>
              ${w2Alert('info','Cek: 75 - 103 = -28 ✓. Jika hasilnya bukan -28, kemungkinan salah di langkah 2\'s Complement atau penjumlahannya.')}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Latihan 2 -->
    <div class="info-card" style="border-left:3px solid var(--accent-violet);margin-bottom:24px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
        <span style="background:var(--accent-violet-dim);color:var(--accent-violet);border:1px solid var(--accent-violet);padding:4px 14px;border-radius:99px;font-size:0.82rem;font-weight:700">LATIHAN 2</span>
        <span style="font-size:0.82rem;color:var(--text-faint)">Sign-Magnitude &amp; 1's Complement</span>
      </div>
      <div style="background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:16px 18px;margin-bottom:16px">
        <p style="margin:0 0 8px;font-size:0.9rem;font-weight:600">Tuliskan bilangan <strong>-25</strong> dalam:</p>
        <ul style="margin:0;padding-left:20px;font-size:0.9rem;line-height:1.9">
          <li>a. <strong>Sign-Magnitude</strong> 8-bit</li>
          <li>b. <strong>1's Complement</strong> 8-bit</li>
        </ul>
      </div>
      <button onclick="w2ToggleAnswer('lat2','btn-lat2')" id="btn-lat2"
        style="background:var(--accent-violet-dim);color:var(--accent-violet);border:1.5px solid var(--accent-violet);border-radius:8px;padding:9px 20px;font-size:0.87rem;font-weight:700;cursor:pointer;transition:all .2s"
        onmouseover="this.style.background='var(--accent-violet)';this.style.color='#fff'"
        onmouseout="this.style.background='var(--accent-violet-dim)';this.style.color='var(--accent-violet)'">
        Lihat Jawaban
      </button>
      <div id="lat2" hidden style="margin-top:16px">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          ${w2Code([
            '// Sign-Magnitude',
            '+25 = 0001 1001',
            'Set MSB = 1 (negatif):',
            '-25 = 1001 1001',
            '      ^ Sign=1',
          ],'a. Sign-Magnitude')}
          ${w2Code([
            "// 1's Complement",
            '+25 = 0001 1001',
            'NOT (inversi semua bit):',
            '-25 = 1110 0110',
          ],"b. 1's Complement")}
        </div>
        <!-- Penjelasan langkah -->
        <div style="margin-top:18px">
          <p style="margin:0 0 12px;font-size:0.85rem;font-weight:700;color:var(--accent-violet)">📖 Penjelasan Langkah demi Langkah</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
            <div style="background:var(--bg-inset);border:1px solid var(--accent-amber);border-radius:10px;padding:14px 16px">
              <p style="margin:0 0 8px;font-size:0.8rem;font-weight:700;color:var(--accent-amber)">a. Sign-Magnitude</p>
              <div style="font-size:0.85rem;line-height:1.8">
                ${w2Step(1,'Tulis nilai absolut 25 dalam 8-bit: <code>0001 1001</code>')}
                ${w2Step(2,'Ganti MSB (bit paling kiri) dari 0 menjadi <strong>1</strong> untuk menandai bilangan negatif')}
                ${w2Step(3,'Hasilnya: <code>1001 1001</code> — MSB=1 artinya negatif, 7 bit sisanya = magnitudo 25')}
              </div>
              ${w2Alert('warning','Perhatian: Sign-Magnitude punya dua nol: +0 (0000 0000) dan -0 (1000 0000). Ini yang membuatnya tidak efisien.')}
            </div>
            <div style="background:var(--bg-inset);border:1px solid var(--accent-violet);border-radius:10px;padding:14px 16px">
              <p style="margin:0 0 8px;font-size:0.8rem;font-weight:700;color:var(--accent-violet)">b. 1's Complement</p>
              <div style="font-size:0.85rem;line-height:1.8">
                ${w2Step(1,'Tulis nilai positif 25 dalam 8-bit: <code>0001 1001</code>')}
                ${w2Step(2,'Inversi <strong>SEMUA</strong> bit (0→1, 1→0): <code>1110 0110</code>')}
                ${w2Step(3,'Tidak perlu tambah 1 — ini bedanya dengan 2\'s Complement!')}
              </div>
              ${w2Alert('info','Cara cek: NOT(1110 0110) = 0001 1001 = 25. Benar! Jika MSB=1 → bilangan negatif.')}
            </div>
          </div>
          ${w2Alert('success','<strong>Perbedaan kunci ketiga skema untuk -25:</strong><br>SM: <code>1001 1001</code> (ubah MSB saja)<br>1\'s C: <code>1110 0110</code> (NOT semua bit)<br>2\'s C: <code>1110 0111</code> (NOT semua bit + tambah 1)')}
        </div>
      </div>
    </div>

    <!-- Ringkasan -->
    <div class="info-card" style="border-left:3px solid var(--success);margin-bottom:24px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
        <span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:8px;background:var(--success-dim)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2.2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
        </span>
        <h3 style="margin:0;font-size:1.05rem;font-weight:700;color:var(--success)">Ringkasan Pertemuan 2</h3>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px">
        ${[
          ['Sign-Magnitude','var(--accent-amber)','MSB = sign bit. +0 dan -0. Intuitif tapi tidak efisien secara aritmetika.'],
          ["1's Complement",'var(--accent-violet)',"NOT semua bit. +0 dan -0. Butuh End-Around Carry."],
          ["2's Complement",'var(--accent-cyan)',"NOT + 1. Satu nol. Standar CPU/MCU. Rentang -128 s.d. +127 (8-bit)."],
          ['Pengurangan','var(--accent-amber)',"A - B = A + C2(B). CPU hanya butuh satu adder."],
          ['Overflow','var(--danger)','Terjadi jika hasil di luar rentang. Deteksi: Carry-in XOR Carry-out MSB.'],
          ['Sign Extension','var(--accent-violet)','Perlebar bit: salin MSB ke kiri. Nilai tidak berubah.'],
        ].map(([title,color,desc])=>`
          <div style="background:var(--bg-inset);border-left:3px solid ${color};border-radius:0 10px 10px 0;padding:12px 14px">
            <p style="margin:0 0 4px;font-size:0.83rem;font-weight:700;color:${color}">${title}</p>
            <p style="margin:0;font-size:0.82rem;color:var(--text-secondary);line-height:1.6">${desc}</p>
          </div>`).join('')}
      </div>
    </div>
  `;

  window.w2ToggleAnswer = function(id, btnId) {
    const pane = document.getElementById(id);
    const btn = document.getElementById(btnId);
    if (!pane) return;
    pane.hidden = !pane.hidden;
    btn.textContent = pane.hidden ? 'Lihat Jawaban' : 'Sembunyikan Jawaban';
  };
}

/* ═══════════════════════════════════════════════════════════════
   WEEK 2: INTERACTIVE QUIZ (Kuis Interaktif)
   ═══════════════════════════════════════════════════════════════ */

/* ── Helpers ── */
const _toBin8 = x => ((x & 0xFF) >>> 0).toString(2).padStart(8, '0');
const _fmtBin = bin => bin.slice(0, 4) + ' ' + bin.slice(4);

function w2NormAnswer(str) {
  return str.trim().toLowerCase().replace(/\s+/g, '');
}

/* ── Step-by-step explanation builder ── */
function buildW2QuizExplanation(typeId, n) {
  const stepHtml = (num, text) =>
    `<div style="display:flex;align-items:flex-start;gap:10px;margin:8px 0">
       <span style="min-width:24px;height:24px;border-radius:50%;background:var(--accent-cyan-dim);border:1.5px solid var(--accent-cyan);color:var(--accent-cyan);font-size:0.75rem;font-weight:700;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0">${num}</span>
       <span style="font-size:0.88rem;line-height:1.6">${text}</span>
     </div>`;
  const codeBox = (lines) =>
    `<pre style="font-family:var(--font-mono);font-size:0.85rem;line-height:1.9;background:var(--bg-inset);border:1px solid var(--line);border-radius:8px;padding:12px 16px;overflow-x:auto;margin:10px 0">${lines}</pre>`;
  const alertBox = (color, text) =>
    `<div style="display:flex;gap:8px;background:var(--bg-inset);border-left:3px solid ${color};border-radius:0 8px 8px 0;padding:10px 13px;margin:10px 0;font-size:0.85rem;line-height:1.6"><span style="color:${color}">💡</span><span>${text}</span></div>`;

  /* ── dec2twos ── */
  if (typeId === 'dec2twos') {
    const abs = Math.abs(n);
    const posBin = _toBin8(abs);
    const notVal = (~abs) & 0xFF;
    const notBin = _toBin8(notVal);
    const c2Bin  = _toBin8((256 + n) & 0xFF);
    return `
      <p style="margin:0 0 10px;font-size:0.88rem">Konversi <strong>${n}</strong> ke 8-bit 2's Complement:</p>
      ${stepHtml(1, `Ambil nilai positifnya: <strong>+${abs}</strong>`)}
      ${stepHtml(2, `Tulis dalam 8-bit biner:`)}
      ${codeBox(`+${abs} = <span style="color:var(--success)">${_fmtBin(posBin)}</span>`)}
      ${stepHtml(3, `Inversi semua bit (NOT — setiap 0 jadi 1, setiap 1 jadi 0):`)}
      ${codeBox(`NOT = <span style="color:var(--accent-violet)">${_fmtBin(notBin)}</span>`)}
      ${stepHtml(4, `Tambahkan 1 pada bit paling kanan (LSB):`)}
      ${codeBox(`    <span style="color:var(--accent-violet)">${_fmtBin(notBin)}</span>\n+                  1\n─────────────────────\n <strong style="color:var(--danger)">${_fmtBin(c2Bin)}</strong>  ← jawaban`)}
      ${alertBox('var(--accent-cyan)', `Cara verifikasi: NOT(${_fmtBin(c2Bin)}) = ${_fmtBin(notBin)}, lalu +1 = ${_fmtBin(posBin)} = ${abs} ✓`)}`;
  }

  /* ── twos2dec ── */
  if (typeId === 'twos2dec') {
    const c2 = (256 + n) & 0xFF;
    const c2Bin = _toBin8(c2);
    const bits = c2Bin.split('');
    const posRows = bits.map((b, i) => ({ b, pow: 7 - i, val: b === '1' ? Math.pow(2, 7 - i) : 0 }));
    const sumStr = posRows.filter(r => r.b === '1').map(r => r.val).join(' + ');
    const powRow = posRows.map(r => `<td style="padding:4px 8px;text-align:center;color:var(--text-faint);border:1px solid var(--line);font-size:0.78rem">2<sup>${r.pow}</sup></td>`).join('');
    const bitRow = posRows.map(r => `<td style="padding:4px 8px;text-align:center;font-weight:700;color:${r.b==='1'?'var(--accent-cyan)':'var(--text-faint)'};border:1px solid var(--line)">${r.b}</td>`).join('');
    const valRow = posRows.map(r => `<td style="padding:4px 8px;text-align:center;color:${r.val>0?'var(--success)':'var(--text-faint)'};border:1px solid var(--line)">${r.val}</td>`).join('');
    return `
      <p style="margin:0 0 10px;font-size:0.88rem">Baca <strong class="mono">${_fmtBin(c2Bin)}</strong> sebagai 2's Complement 8-bit:</p>
      ${stepHtml(1, `MSB = <strong style="color:var(--danger)">1</strong> → bilangan ini <strong>negatif</strong>. Hitung dulu nilai unsigned-nya.`)}
      <div style="overflow-x:auto"><table style="border-collapse:collapse;font-family:var(--font-mono);font-size:0.82rem;margin:10px 0">
        <tr><th style="padding:4px 8px;text-align:left;border:1px solid var(--line);color:var(--text-faint);font-size:0.75rem">Posisi</th>${powRow}</tr>
        <tr><th style="padding:4px 8px;text-align:left;border:1px solid var(--line);color:var(--text-faint);font-size:0.75rem">Bit</th>${bitRow}</tr>
        <tr><th style="padding:4px 8px;text-align:left;border:1px solid var(--line);color:var(--text-faint);font-size:0.75rem">Nilai</th>${valRow}</tr>
      </table></div>
      ${stepHtml(2, `U (unsigned) = ${sumStr} = <strong>${c2}</strong>`)}
      ${stepHtml(3, `Nilai sesungguhnya = U − 2⁸ = ${c2} − 256 = <strong style="color:var(--danger)">${n}</strong>`)}
      ${alertBox('var(--accent-violet)', `Ingat: untuk 8-bit 2's Complement dengan MSB=1, selalu kurangkan 256 dari nilai unsigned!`)}`;
  }

  /* ── dec2sm ── */
  if (typeId === 'dec2sm') {
    const abs = Math.abs(n);
    const absBin7 = abs.toString(2).padStart(7, '0');
    const smBin = '1' + absBin7;
    return `
      <p style="margin:0 0 10px;font-size:0.88rem">Konversi <strong>${n}</strong> ke 8-bit Sign-Magnitude:</p>
      ${stepHtml(1, `Ambil nilai absolut: <strong>|${n}| = ${abs}</strong>`)}
      ${stepHtml(2, `Tulis ${abs} dalam 7-bit biner (bukan 8-bit!):`)}
      ${codeBox(`${abs} = <span style="color:var(--success)">${absBin7}</span>  (7 bit)`)}
      ${stepHtml(3, `Tambahkan <strong style="color:var(--danger)">1</strong> di depan sebagai sign bit (MSB = 1 = negatif):`)}
      ${codeBox(`<span style="color:var(--danger)">1</span><span style="color:var(--success)">${absBin7}</span>  = <strong style="color:var(--accent-amber)">${smBin}</strong>`)}
      ${alertBox('var(--accent-amber)', `Sign-Magnitude: <strong>MSB = tanda</strong> (1=negatif, 0=positif), 7 bit sisanya = besar/magnitudo. Dua representasi nol: +0 = 00000000, -0 = 10000000.`)}`;
  }

  /* ── dec2ones ── */
  if (typeId === 'dec2ones') {
    const abs = Math.abs(n);
    const posBin = _toBin8(abs);
    const onesBin = posBin.split('').map(b => b === '0' ? '1' : '0').join('');
    const pairHtml = posBin.split('').map((b, i) =>
      `<div style="text-align:center;padding:4px 8px;border:1px solid var(--line);border-radius:4px;min-width:28px">
         <div style="color:var(--success);font-weight:700">${b}</div>
         <div style="font-size:0.7rem;color:var(--text-faint)">↓</div>
         <div style="color:var(--accent-violet);font-weight:700">${onesBin[i]}</div>
       </div>`
    ).join('');
    return `
      <p style="margin:0 0 10px;font-size:0.88rem">Konversi <strong>${n}</strong> ke 8-bit 1's Complement:</p>
      ${stepHtml(1, `Tulis nilai positif <strong>+${abs}</strong> dalam 8-bit biner:`)}
      ${codeBox(`+${abs} = <span style="color:var(--success)">${_fmtBin(posBin)}</span>`)}
      ${stepHtml(2, `Inversi <strong>SEMUA</strong> bit (0→1, 1→0) — ini yang disebut NOT / 1's Complement:`)}
      <div style="display:flex;flex-wrap:wrap;gap:4px;margin:8px 0">${pairHtml}</div>
      ${codeBox(`1's C = <strong style="color:var(--accent-violet)">${_fmtBin(onesBin)}</strong>`)}
      ${alertBox('var(--accent-violet)', `Perbedaan dari 2's Complement: <strong>TIDAK perlu tambah 1</strong>. 1's C = NOT saja, 2's C = NOT + 1.`)}`;
  }

  /* ── binsub ── */
  if (typeId === 'binsub') {
    const a = Math.floor(n / 1000), b = n % 1000;
    const result = a - b;
    const aBin  = _toBin8(a);
    const bBin  = _toBin8(b);
    const notB  = (~b) & 0xFF;
    const c2B   = (notB + 1) & 0xFF;
    const notBBin = _toBin8(notB);
    const c2BBin  = _toBin8(c2B);
    const rawSum  = a + c2B;
    const sumBin  = _toBin8(rawSum & 0xFF);
    const isNeg   = result < 0;
    return `
      <p style="margin:0 0 10px;font-size:0.88rem">Hitung <strong>${a} − ${b}</strong> menggunakan 2's Complement:</p>
      ${stepHtml(1, `Rumus: <strong>A − B = A + 2's Complement(B)</strong>`)}
      ${stepHtml(2, `Tulis A dan B dalam 8-bit:`)}
      ${codeBox(`A = ${a} = <span style="color:var(--success)">${_fmtBin(aBin)}</span>\nB = ${b} = <span style="color:var(--success)">${_fmtBin(bBin)}</span>`)}
      ${stepHtml(3, `Ambil 2's Complement dari B (${b}):`)}
      ${codeBox(`NOT = <span style="color:var(--accent-violet)">${_fmtBin(notBBin)}</span>\n + 1 = <span style="color:var(--danger)">${_fmtBin(c2BBin)}</span>  ← 2'sC(${b}) = -${b}`)}
      ${stepHtml(4, `Jumlahkan A + 2'sC(B):`)}
      ${codeBox(`  <span style="color:var(--success)">${_fmtBin(aBin)}</span>  (+${a})\n+ <span style="color:var(--danger)">${_fmtBin(c2BBin)}</span>  (-${b})\n─────────────\n  <span style="color:var(--accent-amber)">${_fmtBin(sumBin)}</span>${isNeg ? `  (MSB=1 → negatif)` : ''}`)}
      ${stepHtml(5, isNeg
        ? `MSB = 1 → negatif. U = ${rawSum & 0xFF}, nilai = ${rawSum & 0xFF} − 256 = <strong style="color:var(--danger)">${result}</strong>`
        : `MSB = 0 → positif. Hasil = <strong style="color:var(--success)">${result}</strong>`)}
      ${alertBox('var(--accent-cyan)', `Cek: ${a} − ${b} = ${result} ✓. CPU menggunakan trik ini sehingga hanya butuh satu <em>adder</em> untuk penjumlahan maupun pengurangan!`)}`;
  }

  /* ── binadd ── */
  if (typeId === 'binadd') {
    const a = Math.floor(n / 1000), b = n % 1000;
    const result = a + b;
    const aBin   = _toBin8(a);
    const bBin   = _toBin8(b);
    const sumBin = _toBin8(result & 0xFF);
    const overflow = result > 127;
    return `
      <p style="margin:0 0 10px;font-size:0.88rem">Hitung <strong>${a} + ${b}</strong> dalam 8-bit biner:</p>
      ${stepHtml(1, `Tulis keduanya dalam 8-bit biner:`)}
      ${codeBox(`A = ${a} = <span style="color:var(--success)">${_fmtBin(aBin)}</span>\nB = ${b} = <span style="color:var(--success)">${_fmtBin(bBin)}</span>`)}
      ${stepHtml(2, `Jumlahkan secara biner (seperti penjumlahan biasa, tapi hanya ada 0 dan 1):`)}
      ${codeBox(`  <span style="color:var(--success)">${_fmtBin(aBin)}</span>  (+${a})\n+ <span style="color:var(--success)">${_fmtBin(bBin)}</span>  (+${b})\n─────────────\n  <span style="color:${overflow?'var(--danger)':'var(--accent-amber)'}">${_fmtBin(sumBin)}</span>${overflow ? '  ⚠ OVERFLOW!' : ''}`)}
      ${overflow
        ? stepHtml(3, `⚠ <strong style="color:var(--danger)">OVERFLOW!</strong> ${a} + ${b} = ${result} > 127. Hasil 8-bit melebihi rentang 2's Complement.`)
        : stepHtml(3, `MSB = 0 → positif. Hasil = <strong style="color:var(--success)">${result}</strong>`)}
      ${alertBox(overflow ? 'var(--danger)' : 'var(--accent-cyan)',
        overflow
          ? `Overflow terjadi! Hasil nyata = ${result} tapi rentang 8-bit hanya −128 s.d. +127.`
          : `Cek: ${a} + ${b} = ${result} ✓`)}`;
  }

  return `<p>Jawaban: <strong class="mono">${n}</strong></p>`;
}

/* ── Quiz Types untuk Pertemuan 2 ── */
const W2_QUIZ_TYPES = [
  {
    id: 'dec2twos',
    label: "Desimal → 2's Complement",
    genN: () => -(1 + Math.floor(Math.random() * 127)),
    ask: (n) => `Tulis bilangan <strong class="mono">${n}</strong> <span style="color:var(--text-faint)">(desimal)</span> dalam 8-bit <strong>2's Complement</strong>.<br><small style="color:var(--text-faint);font-size:0.8rem">Tulis 8 digit biner tanpa spasi, contoh: <code>10110011</code></small>`,
    hint: "1) Tulis |n| dalam 8-bit biner, 2) Inversi semua bit (NOT), 3) Tambahkan 1 pada bit paling kanan.",
    answer: (n) => _toBin8((256 + n) & 0xFF),
    color: 'var(--accent-cyan)',
  },
  {
    id: 'twos2dec',
    label: "2's Complement → Desimal",
    genN: () => -(1 + Math.floor(Math.random() * 127)),
    ask: (n) => {
      const bin = _toBin8((256 + n) & 0xFF);
      return `Bilangan 8-bit berikut adalah 2's Complement: <strong class="mono">${_fmtBin(bin)}</strong><br>Berapa nilai <strong>desimalnya</strong>? <small style="color:var(--text-faint);font-size:0.8rem">(sertakan tanda minus jika negatif, contoh: -65)</small>`;
    },
    hint: "MSB = 1 → negatif. Hitung U (nilai unsigned semua 8 bit), lalu nilai = U − 256.",
    answer: (n) => n.toString(10),
    color: 'var(--accent-violet)',
  },
  {
    id: 'dec2sm',
    label: "Desimal → Sign-Magnitude",
    genN: () => -(1 + Math.floor(Math.random() * 127)),
    ask: (n) => `Tulis <strong class="mono">${n}</strong> dalam 8-bit <strong>Sign-Magnitude</strong>.<br><small style="color:var(--text-faint);font-size:0.8rem">Tulis 8 digit biner tanpa spasi</small>`,
    hint: "MSB = 1 (tanda negatif). 7 bit sisanya = nilai absolut bilangan dalam biner 7-bit.",
    answer: (n) => '1' + Math.abs(n).toString(2).padStart(7, '0'),
    color: 'var(--accent-amber)',
  },
  {
    id: 'dec2ones',
    label: "Desimal → 1's Complement",
    genN: () => -(1 + Math.floor(Math.random() * 127)),
    ask: (n) => `Tulis <strong class="mono">${n}</strong> dalam 8-bit <strong>1's Complement</strong>.<br><small style="color:var(--text-faint);font-size:0.8rem">Tulis 8 digit biner tanpa spasi</small>`,
    hint: "Tulis nilai positif dalam 8-bit biner, lalu inversi semua bit (0→1, 1→0). Tidak perlu tambah 1!",
    answer: (n) => Math.abs(n).toString(2).padStart(8,'0').split('').map(b=>b==='0'?'1':'0').join(''),
    color: 'var(--accent-violet)',
  },
  {
    id: 'binsub',
    label: "Pengurangan via 2's Complement",
    genN: () => {
      const a = 15 + Math.floor(Math.random() * 85); // 15–99
      const b = 15 + Math.floor(Math.random() * 85); // 15–99
      // make sure result is in range -128..127
      if (Math.abs(a - b) > 127) return 20 * 1000 + 15;
      return a * 1000 + b;
    },
    ask: (n) => {
      const a = Math.floor(n / 1000), b = n % 1000;
      return `Hitung <strong class="mono">${a} − ${b}</strong> menggunakan metode <strong>2's Complement</strong> 8-bit.<br><small style="color:var(--text-faint);font-size:0.8rem">Jawab dalam desimal, contoh: -28</small>`;
    },
    hint: "A − B = A + 2's Complement(B). Jika MSB hasil = 1, nilai = U − 256.",
    answer: (n) => (Math.floor(n / 1000) - n % 1000).toString(10),
    color: 'var(--accent-rose)',
  },
  {
    id: 'binadd',
    label: "Penjumlahan Biner 8-bit",
    genN: () => {
      const a = 10 + Math.floor(Math.random() * 55);
      const b = 10 + Math.floor(Math.random() * 55);
      return a * 1000 + b;
    },
    ask: (n) => {
      const a = Math.floor(n / 1000), b = n % 1000;
      return `Hitung <strong class="mono">${a} + ${b}</strong> dalam 8-bit 2's Complement.<br><small style="color:var(--text-faint);font-size:0.8rem">Jawab dalam desimal</small>`;
    },
    hint: "Konversi keduanya ke 8-bit biner, jumlahkan. Jika MSB hasil = 1 → negatif: nilai = U − 256.",
    answer: (n) => (Math.floor(n / 1000) + n % 1000).toString(10),
    color: 'var(--success)',
  },
];

/* ── Main render function ── */
function renderWeek2InteractiveQuiz(container) {
  container.innerHTML = `
    <p class="lead">
      Enam jenis soal mencakup seluruh materi Pertemuan 2: representasi bilangan negatif,
      operasi biner, dan pengurangan via 2's Complement.
      Setelah menjawab, klik <strong>Lihat Penjelasan Lengkap</strong> untuk tahu cara penyelesaiannya!
    </p>

    <!-- Stats -->
    <div class="quiz-stats">
      <div class="quiz-stat-chip">
        <span class="stat-chip-icon stat-chip-icon--cyan">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
        </span>
        <span>Skor: <strong id="w2qScore">0</strong></span>
      </div>
      <div class="quiz-stat-chip quiz-stat-chip--streak">
        <span class="stat-chip-icon stat-chip-icon--amber">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent-amber)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 003.5 2.5z"/></svg>
        </span>
        <span>Beruntun: <strong id="w2qStreak">0</strong></span>
      </div>
      <div class="quiz-stat-chip">
        <span class="stat-chip-icon stat-chip-icon--violet">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        </span>
        <span>Soal: <strong id="w2qCount">0</strong></span>
      </div>
    </div>

    <!-- Referensi cepat -->
    <details style="margin-bottom:16px;background:var(--bg-inset);border:1px solid var(--line);border-radius:10px;padding:0">
      <summary style="cursor:pointer;padding:12px 16px;font-size:0.85rem;font-weight:600;color:var(--accent-violet);display:flex;align-items:center;gap:8px;user-select:none">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        Buka Referensi Cepat (boleh dibuka saat mengerjakan)
      </summary>
      <div style="padding:0 16px 14px;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px">
        <div style="background:var(--bg-raised);border:1px solid var(--accent-amber);border-radius:8px;padding:11px 14px">
          <p style="margin:0 0 6px;font-size:0.75rem;font-weight:700;color:var(--accent-amber)">SIGN-MAGNITUDE (SM)</p>
          <div style="font-family:var(--font-mono);font-size:0.82rem;line-height:1.8">
            MSB = tanda (1=negatif)<br>
            7 bit sisanya = |nilai|<br>
            <span style="color:var(--text-faint)">-25 → <strong>1</strong>001 1001</span>
          </div>
        </div>
        <div style="background:var(--bg-raised);border:1px solid var(--accent-violet);border-radius:8px;padding:11px 14px">
          <p style="margin:0 0 6px;font-size:0.75rem;font-weight:700;color:var(--accent-violet)">1'S COMPLEMENT (C1)</p>
          <div style="font-family:var(--font-mono);font-size:0.82rem;line-height:1.8">
            NOT semua bit saja<br>
            +25 = 0001 1001<br>
            <span style="color:var(--accent-violet)">-25 = 1110 0110</span>
          </div>
        </div>
        <div style="background:var(--bg-raised);border:1px solid var(--accent-cyan);border-radius:8px;padding:11px 14px">
          <p style="margin:0 0 6px;font-size:0.75rem;font-weight:700;color:var(--accent-cyan)">2'S COMPLEMENT (C2)</p>
          <div style="font-family:var(--font-mono);font-size:0.82rem;line-height:1.8">
            NOT semua bit + 1<br>
            +25 = 0001 1001<br>
            <span style="color:var(--accent-cyan)">-25 = 1110 0111</span>
          </div>
        </div>
        <div style="background:var(--bg-raised);border:1px solid var(--accent-rose);border-radius:8px;padding:11px 14px">
          <p style="margin:0 0 6px;font-size:0.75rem;font-weight:700;color:var(--accent-rose)">PENGURANGAN</p>
          <div style="font-family:var(--font-mono);font-size:0.82rem;line-height:1.8">
            A - B = A + C2(B)<br>
            MSB=1 → nilai = U-256<br>
            MSB=0 → nilai = U
          </div>
        </div>
      </div>
    </details>

    <!-- Quiz Card -->
    <div class="quiz-card" id="w2qCard">
      <div class="quiz-question-num" id="w2qTypeLabel">Memuat soal…</div>
      <p class="quiz-question" id="w2qQuestion"></p>
      <details class="quiz-hint">
        <summary>
          <span class="hint-toggle-icon">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </span>
          <span>Tampilkan petunjuk</span>
        </summary>
        <p id="w2qHintText"></p>
      </details>
      <div class="input-row">
        <input type="text" id="w2qAnswer" placeholder="Ketik jawabanmu di sini…" autocomplete="off" spellcheck="false" aria-label="Kolom jawaban kuis Pertemuan 2">
        <button type="button" id="w2qCheck" class="btn-primary">
          <span class="btn-icon-frame">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
          <span>Cek Jawaban</span>
        </button>
      </div>
      <div class="quiz-feedback" id="w2qFeedback" aria-live="assertive"></div>
      <div class="quiz-action-row" id="w2qActionRow" style="display:none;gap:10px;margin-top:10px;flex-wrap:wrap">
        <button type="button" id="w2qExplainBtn" class="btn-explain">
          <span class="btn-icon-frame">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          </span>
          <span id="w2qExplainLabel">Lihat Penjelasan Lengkap</span>
        </button>
        <button type="button" id="w2qNext" class="btn-secondary">
          <span>Soal Berikutnya</span>
          <span class="btn-icon-frame" style="margin-left:6px">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </span>
        </button>
      </div>
      <div class="quiz-explanation" id="w2qExplanation" hidden aria-live="polite"></div>
    </div>
  `;

  const scoreEl      = container.querySelector('#w2qScore');
  const streakEl     = container.querySelector('#w2qStreak');
  const countEl      = container.querySelector('#w2qCount');
  const typeLabel    = container.querySelector('#w2qTypeLabel');
  const qEl          = container.querySelector('#w2qQuestion');
  const hintEl       = container.querySelector('#w2qHintText');
  const answerEl     = container.querySelector('#w2qAnswer');
  const checkBtn     = container.querySelector('#w2qCheck');
  const nextBtn      = container.querySelector('#w2qNext');
  const feedbackEl   = container.querySelector('#w2qFeedback');
  const actionRow    = container.querySelector('#w2qActionRow');
  const explainBtn   = container.querySelector('#w2qExplainBtn');
  const explainLabel = container.querySelector('#w2qExplainLabel');
  const explanationEl= container.querySelector('#w2qExplanation');

  let score = 0, streak = 0, totalQ = 0, current = null, answered = false;

  function newQuestion() {
    const type = W2_QUIZ_TYPES[Math.floor(Math.random() * W2_QUIZ_TYPES.length)];
    const n    = type.genN();
    current = { n, type };
    totalQ++;

    typeLabel.textContent = type.label;
    typeLabel.style.color = type.color;
    qEl.innerHTML = type.ask(n);
    hintEl.textContent = type.hint;
    answerEl.value = '';
    answerEl.disabled = false;
    checkBtn.hidden = false;
    actionRow.style.display = 'none';
    explanationEl.hidden = true;
    explanationEl.innerHTML = '';
    explainLabel.textContent = 'Lihat Penjelasan Lengkap';
    feedbackEl.textContent = '';
    feedbackEl.className = 'quiz-feedback';
    countEl.textContent = totalQ;
    answered = false;
    answerEl.focus();

    const details = container.querySelector('.quiz-hint');
    if (details && details.open) details.open = false;
  }

  function checkAnswer() {
    if (answered || !answerEl.value.trim()) return;
    answered = true;

    const correct   = w2NormAnswer(current.type.answer(current.n));
    const given     = w2NormAnswer(answerEl.value);
    const isCorrect = given === correct;

    score  += isCorrect ? 1 : 0;
    streak  = isCorrect ? streak + 1 : 0;
    scoreEl.textContent  = score;
    streakEl.textContent = streak;

    if (isCorrect) {
      const rawAns = current.type.answer(current.n);
      const msg = streak >= 3
        ? `${streak}x beruntun benar! 🔥 Jawaban: <strong class="mono">${rawAns}</strong>`
        : `Tepat sekali! Jawaban: <strong class="mono">${rawAns}</strong>`;
      feedbackEl.innerHTML = `
        <span class="feedback-icon-frame feedback-icon-frame--ok">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </span>
        <span>${msg}</span>`;
      feedbackEl.className = 'quiz-feedback quiz-feedback--ok';
      if (window.showToast && streak >= 5) window.showToast(`Streak ${streak}! Kamu luar biasa!`);
    } else {
      const rawAns = current.type.answer(current.n);
      feedbackEl.innerHTML = `
        <span class="feedback-icon-frame feedback-icon-frame--no">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </span>
        <span>Belum tepat. Jawaban yang benar: <strong class="mono">${rawAns}</strong> — coba lihat penjelasannya!</span>`;
      feedbackEl.className = 'quiz-feedback quiz-feedback--no';
    }

    answerEl.disabled = true;
    checkBtn.hidden = true;
    actionRow.style.display = 'flex';
    nextBtn.focus();
  }

  explainBtn.addEventListener('click', () => {
    if (explanationEl.hidden) {
      const exHTML = buildW2QuizExplanation(current.type.id, current.n);
      const isOk   = w2NormAnswer(current.type.answer(current.n)) === w2NormAnswer(answerEl.value);
      const hColor = isOk ? 'var(--success)' : 'var(--accent-amber)';
      const hText  = isOk ? 'Konfirmasi Cara Penyelesaian' : 'Cara Menyelesaikan Soal Ini';
      explanationEl.innerHTML = `
        <div class="quiz-explanation-inner">
          <div class="quiz-explanation-header" style="border-left:3px solid ${hColor}">
            <span class="quiz-explanation-header-icon" style="background:${hColor}20;border:1px solid ${hColor}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="${hColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            </span>
            <span style="font-size:0.88rem;font-weight:700;color:${hColor}">${hText}</span>
          </div>
          <div class="quiz-explanation-body">${exHTML}</div>
        </div>`;
      explanationEl.hidden = false;
      explainLabel.textContent = 'Sembunyikan Penjelasan';
      explanationEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      explanationEl.hidden = true;
      explainLabel.textContent = 'Lihat Penjelasan Lengkap';
    }
  });

  checkBtn.addEventListener('click', checkAnswer);
  answerEl.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });
  nextBtn.addEventListener('click', newQuestion);

  newQuestion();
}
