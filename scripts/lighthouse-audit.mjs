#!/usr/bin/env node
/**
 * lighthouse-audit.mjs — Run Lighthouse against dev server, output JSON + summary.
 *
 * Run: node scripts/lighthouse-audit.mjs [url]
 * Default URL: http://localhost:5175/
 * Requires Chrome at /Applications/Google Chrome.app/Contents/MacOS/Google Chrome (macOS).
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'docs', 'audits');

const url = process.argv[2] || 'http://localhost:5175/';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const LH_BIN = join(ROOT, 'node_modules', '.bin', 'lighthouse');

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

console.log(`Lighthouse audit against ${url}`);
console.log(`Chrome: ${CHROME}`);
console.log(`Output: ${OUT_DIR}`);
console.log('');

const args = [
  url,
  '--chrome-flags="--headless --no-sandbox --disable-gpu --disable-dev-shm-usage"',
  '--chrome-path=' + CHROME,
  '--output=json',
  '--output-path=stdout',
  '--only-categories=performance,accessibility,best-practices,seo',
  '--quiet',
  '--form-factor=mobile',
  '--throttling-method=simulate',
];

const child = spawn(LH_BIN, args, { stdio: ['ignore', 'pipe', 'inherit'] });
let stdout = '';
child.stdout.on('data', d => { stdout += d.toString(); });
child.on('close', code => {
  if (code !== 0) {
    console.error(`lighthouse exited with code ${code}`);
    process.exit(code || 1);
  }
  let report;
  try {
    report = JSON.parse(stdout);
  } catch (e) {
    console.error('Failed to parse lighthouse JSON:', e.message);
    process.exit(1);
  }
  const c = report.categories || {};
  const a = report.audits || {};
  const metrics = {
    url,
    timestamp: new Date().toISOString(),
    lighthouse_version: report.lighthouseVersion,
    user_agent: report.userAgent,
    scores: {
      performance: Math.round((c.performance?.score ?? 0) * 100),
      accessibility: Math.round((c.accessibility?.score ?? 0) * 100),
      'best-practices': Math.round((c['best-practices']?.score ?? 0) * 100),
      seo: Math.round((c.seo?.score ?? 0) * 100),
    },
    metrics: {
      first_contentful_paint: a['first-contentful-paint']?.displayValue,
      largest_contentful_paint: a['largest-contentful-paint']?.displayValue,
      total_blocking_time: a['total-blocking-time']?.displayValue,
      cumulative_layout_shift: a['cumulative-layout-shift']?.displayValue,
      speed_index: a['speed-index']?.displayValue,
      interactive: a['interactive']?.displayValue,
    },
    passed_audits: Object.values(a).filter(x => x.score === 1).length,
    failed_audits: Object.values(a).filter(x => x.score !== null && x.score < 1).length,
    top_failures: Object.values(a)
      .filter(x => x.score !== null && x.score < 1 && x.scoreDisplayMode !== 'manual')
      .sort((a2, b) => (a2.score ?? 1) - (b.score ?? 1))
      .slice(0, 10)
      .map(x => ({ id: x.id, title: x.title, score: x.score, displayValue: x.displayValue })),
  };

  /* Save raw + summary */
  const stamp = metrics.timestamp.replace(/[:.]/g, '-');
  const rawPath = join(OUT_DIR, `lighthouse-${stamp}.json`);
  const summaryPath = join(OUT_DIR, `lighthouse-latest.json`);
  writeFileSync(rawPath, JSON.stringify(report, null, 2));
  writeFileSync(summaryPath, JSON.stringify(metrics, null, 2));

  console.log('--- Lighthouse Summary ---');
  console.log(`URL:      ${url}`);
  console.log(`Time:     ${metrics.timestamp}`);
  console.log(`Chrome:   ${CHROME.split('/').pop()}`);
  console.log(`Lighths:  ${metrics.lighthouse_version}`);
  console.log('');
  console.log('Scores (0–100):');
  console.log(`  Performance:     ${metrics.scores.performance}`);
  console.log(`  Accessibility:   ${metrics.scores.accessibility}`);
  console.log(`  Best Practices:  ${metrics.scores['best-practices']}`);
  console.log(`  SEO:             ${metrics.scores.seo}`);
  console.log('');
  console.log('Core Web Vitals (mobile, simulated):');
  console.log(`  FCP:  ${metrics.metrics.first_contentful_paint}`);
  console.log(`  LCP:  ${metrics.metrics.largest_contentful_paint}`);
  console.log(`  TBT:  ${metrics.metrics.total_blocking_time}`);
  console.log(`  CLS:  ${metrics.metrics.cumulative_layout_shift}`);
  console.log(`  SI:   ${metrics.metrics.speed_index}`);
  console.log(`  TTI:  ${metrics.metrics.interactive}`);
  console.log('');
  console.log(`Audits: ${metrics.passed_audits} passed / ${metrics.failed_audits} failed`);
  if (metrics.top_failures.length > 0) {
    console.log('');
    console.log('Top failures:');
    for (const f of metrics.top_failures) {
      console.log(`  [${(f.score ?? 0).toFixed(2)}] ${f.id} — ${f.title}${f.displayValue ? ' (' + f.displayValue + ')' : ''}`);
    }
  }
  console.log('');
  console.log(`Raw report: ${rawPath}`);
  console.log(`Summary:    ${summaryPath}`);
});
