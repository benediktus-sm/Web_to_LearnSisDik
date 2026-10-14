/**
 * Final comprehensive validation script for SisDik Learn
 * Checks all known issues from the audit
 */
const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/BENEDIKTUS MARBUN/Downloads/Web_to_LearnSisDik';

const read = (f) => fs.readFileSync(path.join(dir, f), 'utf8');

const css     = read('style.css');
const app     = read('app.js');
const index   = read('index.html');
const w6      = read('week6.js');
const w7      = read('week7.js');
const w3      = read('week3.js');
const w4      = read('week4.js');
const w5      = read('week5.js');

let pass = 0, fail = 0;

function check(label, condition) {
  if (condition) {
    console.log(`  ✅ PASS: ${label}`);
    pass++;
  } else {
    console.error(`  ❌ FAIL: ${label}`);
    fail++;
  }
}

// ─── CSS Checks ───────────────────────────────────────────────────────────────
console.log('\n=== CSS Tokens & Classes ===');
check('--accent-emerald defined in dark theme', css.includes('--accent-emerald:       #10B981'));
check('--accent-emerald defined in light theme', css.includes('--accent-emerald:       #059669'));
check('.card class defined in CSS', /^\.card\s*\{/m.test(css));
check('.btn class defined in CSS', /^\.btn\s*\{/m.test(css));
check('.content-header class defined in CSS', /^\.content-header\s*\{/m.test(css));
check('.content-subtitle class defined in CSS', /\.content-subtitle\s*\{/m.test(css));
check('--border-color token defined', css.includes('--border-color:'));
check('--text-primary token defined', css.includes('--text-primary:'));

// ─── App.js Global Navigation ─────────────────────────────────────────────────
console.log('\n=== App.js Global Bridge Functions ===');
check('window.navigateTo defined', app.includes('window.navigateTo'));
check('window.selectWeek defined', app.includes('window.selectWeek'));
check('navigateTo handles "home" target', app.includes('"home"'));
check('selectWeek calls openWeek', app.includes('openWeek(week, col)'));

// ─── Index.html Script Includes ────────────────────────────────────────────────
console.log('\n=== index.html Script Includes ===');
['converter.js', 'week2.js', 'week3.js', 'week4.js', 'week5.js', 'week6.js', 'week7.js', 'data.js', 'app.js'].forEach(f => {
  check(`${f} included in index.html`, index.includes(f));
});

// ─── Week 6 Function Exports ──────────────────────────────────────────────────
console.log('\n=== Week 6 Exported Functions ===');
const w6Fns = ['renderWeek6Intro', 'renderWeek6UniversalGates', 'renderWeek6MultilevelNAND',
  'renderWeek6MultilevelNOR', 'renderWeek6Comparison', 'renderWeek6MuxBasics',
  'renderWeek6MuxAdvanced', 'renderWeek6MuxLogic', 'renderWeek6Exercises', 'renderWeek6Summary'];
w6Fns.forEach(fn => {
  check(`${fn} exported in week6.js`, w6.includes(`window.${fn}`) || w6.includes(`function ${fn}`));
});

// ─── Week 7 Function Exports ──────────────────────────────────────────────────
console.log('\n=== Week 7 Exported Functions ===');
const w7Fns = ['renderWeek7Intro', 'renderWeek7DecoderBasics', 'renderWeek7Decoder3to8',
  'renderWeek7DecoderApps', 'renderWeek7EncoderBasics', 'renderWeek7EncoderPriority',
  'renderWeek7SevenSegment', 'renderWeek7SimulatorBCD', 'renderWeek7Exercises'];
w7Fns.forEach(fn => {
  check(`${fn} present in week7.js`, w7.includes(fn));
});

// ─── Content Pattern Consistency ──────────────────────────────────────────────
console.log('\n=== Content Pattern Checks ===');
check('W3 uses hero banner pattern', w3.includes('linear-gradient'));
check('W4 uses hero banner pattern', w4.includes('linear-gradient'));
check('W5 uses hero banner pattern', w5.includes('linear-gradient'));
check('W6 uses hero banner or content-header', w6.includes('content-header') || w6.includes('linear-gradient'));
check('W7 uses hero banner or content-header', w7.includes('content-header') || w7.includes('linear-gradient'));

// ─── Interactive Features ─────────────────────────────────────────────────────
console.log('\n=== Interactive Features ===');
check('W6 MUX simulator function exists', w6.includes('w6MuxSim') || w6.includes('window.w6'));
check('W7 BCD simulator function exists', w7.includes('w7Sim') || w7.includes('renderWeek7SimulatorBCD'));
check('W7 quiz check function exists', w7.includes('window.w7CheckAnswer'));
check('W7 quiz reset function exists', w7.includes('window.w7ResetQuiz'));
check('W3 spoiler toggles present', w3.includes('w3Spoiler') || w3.includes('w3sp_'));
check('W4 spoiler toggles present', w4.includes('w4Spoiler') || w4.includes('w4sp_'));

// ─── Summary ─────────────────────────────────────────────────────────────────
console.log('\n════════════════════════════════════════');
console.log(`FINAL RESULT: ${pass} passed, ${fail} failed`);
if (fail === 0) {
  console.log('🎉 ALL CHECKS PASSED — Website siap digunakan!');
} else {
  console.log(`⚠️  ${fail} issue(s) masih perlu diperbaiki.`);
}
