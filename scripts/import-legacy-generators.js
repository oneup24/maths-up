/**
 * import-legacy-generators.js — register all existing generators into content/items.csv
 *
 * Scans src/engine/grades/ via the Q export, cross-references quarantined.js,
 * and writes one row per generator to content/items.csv.
 *
 * Columns: item_id, kind, grade, topic_id, generator_index, status, source
 *   item_id:          legacy:{topicId}:{index}  (unique, stable, never reuse)
 *   kind:             legacy_generator
 *   grade:            1–6
 *   topic_id:         e.g. '1N1', '4F1'
 *   generator_index:  0-based position within the topic array
 *   status:           'live' | 'quarantined'  (from audit-generators.mjs output)
 *   source:           hardcode
 *
 * Run:   node scripts/import-legacy-generators.js
 * Idempotent — rewrites content/items.csv each time.
 * Re-run after: node scripts/audit-generators.mjs (updates quarantined.js)
 */

import { Q } from '../src/engine/grades/index.js';
import { quarantined } from '../src/engine/quarantined.js';
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'content');
const OUT = join(CONTENT_DIR, 'items.csv');

mkdirSync(CONTENT_DIR, { recursive: true });

const HEADER = 'item_id,kind,grade,topic_id,generator_index,status,source';
const rows = [HEADER];

let totalCount = 0;
let liveCount = 0;
let quarantinedCount = 0;

for (let grade = 1; grade <= 6; grade++) {
  const topics = Q[grade];
  if (!topics) {
    console.warn(`⚠️  Grade ${grade}: no topics found in Q`);
    continue;
  }
  for (const [topicId, generators] of Object.entries(topics)) {
    if (!Array.isArray(generators)) continue;
    for (let i = 0; i < generators.length; i++) {
      const key = `${topicId}:${i}`;
      const status = quarantined.has(key) ? 'quarantined' : 'live';
      const itemId = `legacy:${topicId}:${i}`;
      rows.push(`${itemId},legacy_generator,${grade},${topicId},${i},${status},hardcode`);
      totalCount++;
      if (status === 'live') liveCount++; else quarantinedCount++;
    }
  }
}

writeFileSync(OUT, rows.join('\n') + '\n', 'utf8');

console.log('✅ content/items.csv 已生成');
console.log(`   總計：${totalCount} 個 generator`);
console.log(`   live：${liveCount}  |  quarantined：${quarantinedCount}`);
console.log(`   路徑：${OUT}`);
