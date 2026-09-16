/**
 * content-check.js v0 — basic CSV content validation
 *
 * Checks:
 *   1. content/ 目錄存在
 *   2. 所有 CSV 檔案：UTF-8 no BOM（Excel 常見問題）
 *   3. items.csv（如存在）：必要欄位完整
 *   4. ID_REGISTRY.json（如存在）：有效 JSON
 *   5. topic_map.csv（如存在）：必要欄位、prereq/unlocks FK、cycle detection
 *
 * Run: node scripts/content-check.js
 * Exit 0 = all pass. Exit 1 = violations found.
 *
 * v0 scope: encoding + header checks only.
 * v1 will add cross-file ID resolution, template seed validation.
 * Error output uses: Chinese label + filename + line number (where applicable).
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT    = join(__dirname, '..');
const CONTENT = join(ROOT, 'content');

let failed = 0;

function pass(label) { console.log(`✅ ${label}`); }
function fail(label, detail) {
  console.log(`❌ ${label}`);
  if (detail) console.log(`   ${detail}`);
  failed++;
}
function info(label) { console.log(`ℹ️  ${label}`); }

// --- 1: content/ 目錄存在
if (existsSync(CONTENT)) {
  pass('content/ 目錄存在');
} else {
  fail('content/ 目錄不存在', '請執行 mkdir content/');
  console.log('\n❌ content:check 終止：目錄不存在');
  process.exit(1);
}

// --- 2: UTF-8 no BOM on all CSV files
const csvFiles = readdirSync(CONTENT).filter(f => f.endsWith('.csv'));
if (csvFiles.length === 0) {
  info('content/ 內沒有 CSV 檔案（初始狀態）');
} else {
  for (const file of csvFiles) {
    const buf = readFileSync(join(CONTENT, file));
    const hasBOM = buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF;
    if (hasBOM) {
      fail(`UTF-8 no BOM：${file}`, `${file}:1 含有 BOM 標記。修復：sed -i 's/\\xEF\\xBB\\xBF//' content/${file}`);
    } else {
      pass(`UTF-8 no BOM：${file}`);
    }
  }
}

// --- 3: items.csv 必要欄位
const ITEMS_PATH = join(CONTENT, 'items.csv');
if (existsSync(ITEMS_PATH)) {
  const firstLine = readFileSync(ITEMS_PATH, 'utf8').split('\n')[0].trim();
  const REQUIRED = ['item_id', 'kind', 'grade', 'topic_id', 'generator_index', 'status', 'source'];
  const cols = firstLine.split(',').map(c => c.trim());
  const missing = REQUIRED.filter(c => !cols.includes(c));
  if (missing.length === 0) {
    pass('items.csv 欄位完整');
  } else {
    fail('items.csv 欄位不完整', `items.csv:1 缺少欄位：${missing.join(', ')}`);
  }
}

// --- 4: ID_REGISTRY.json valid JSON
const REGISTRY_PATH = join(CONTENT, 'ID_REGISTRY.json');
if (existsSync(REGISTRY_PATH)) {
  try {
    JSON.parse(readFileSync(REGISTRY_PATH, 'utf8'));
    pass('ID_REGISTRY.json 為有效 JSON');
  } catch (e) {
    fail('ID_REGISTRY.json JSON 語法錯誤', `ID_REGISTRY.json: ${e.message}`);
  }
}

// --- 5: topic_map.csv validation (column completeness + prereq/unlocks FK + cycle)
const TOPIC_MAP_PATH = join(CONTENT, 'topic_map.csv');
if (existsSync(TOPIC_MAP_PATH)) {
  const REQUIRED_COLS = ['topic_id', 'topic_name_zh', 'topic_name_en', 'quest_station_name_zh', 'grade', 'strand', 'prerequisites', 'unlocks', 'importance', 'status'];
  const raw = readFileSync(TOPIC_MAP_PATH, 'utf8').split('\n').filter(l => l.trim());
  const headerCols = raw[0].split(',').map(c => c.trim());
  const missingCols = REQUIRED_COLS.filter(c => !headerCols.includes(c));
  if (missingCols.length > 0) {
    fail('topic_map.csv 欄位不完整', `topic_map.csv:1 缺少欄位：${missingCols.join(', ')}`);
  } else {
    pass('topic_map.csv 欄位完整');
    /* Build topic index, validate FKs + cycle */
    const topics = {};
    for (let i = 1; i < raw.length; i++) {
      const cols = raw[i].split(',');
      const id = cols[0];
      if (!id) continue;
      const prereqs = (cols[6] || '').split('|').map(s => s.trim()).filter(Boolean);
      const unlocks = (cols[7] || '').split('|').map(s => s.trim()).filter(Boolean);
      const importance = (cols[8] || '').trim();
      const status = (cols[9] || '').trim();
      const grade = parseInt(cols[4], 10);
      if (isNaN(grade) || grade < 1 || grade > 6) {
        fail('topic_map.csv grade 範圍錯誤', `topic_map.csv:${i+1} topic_id=${id} grade=${cols[4]} 應為 1-6`);
      }
      if (!['critical', 'high', 'medium', 'low'].includes(importance)) {
        fail('topic_map.csv importance 不合法', `topic_map.csv:${i+1} topic_id=${id} importance=${importance} 應為 critical/high/medium/low`);
      }
      if (!['active', 'planned', 'retired'].includes(status)) {
        fail('topic_map.csv status 不合法', `topic_map.csv:${i+1} topic_id=${id} status=${status} 應為 active/planned/retired`);
      }
      topics[id] = { prereqs, unlocks };
    }
    const ids = Object.keys(topics);
    /* FK check: every prereq and unlock must be a known topic_id (in this CSV or another file) */
    for (const [id, t] of Object.entries(topics)) {
      for (const p of t.prereqs) {
        if (!ids.includes(p)) fail('topic_map.csv 孤立 prerequisite', `topic_map.csv topic_id=${id} prereq=${p} 不存在於本 CSV`);
      }
      for (const u of t.unlocks) {
        if (!ids.includes(u)) fail('topic_map.csv 孤立 unlock', `topic_map.csv topic_id=${id} unlock=${u} 不存在於本 CSV`);
      }
    }
    if (failed === 0) pass('topic_map.csv 所有 prerequisite / unlock 引用本 CSV 已存在的 topic_id');
    /* Cycle detection on unlocks graph */
    function hasCycle(graph) {
      const visited = new Set(), stack = new Set();
      function dfs(node) {
        if (stack.has(node)) return true;
        if (visited.has(node)) return false;
        visited.add(node); stack.add(node);
        for (const next of (graph[node] || [])) if (dfs(next)) return true;
        stack.delete(node);
        return false;
      }
      for (const n of Object.keys(graph)) if (dfs(n)) return true;
      return false;
    }
    const g = {};
    for (const [id, t] of Object.entries(topics)) g[id] = t.unlocks;
    if (hasCycle(g)) fail('topic_map.csv 含循環依賴', 'unlocks 圖存在環 — 會造成無限 Quest 路線');
    else pass('topic_map.csv 無循環依賴（unlocks 圖）');
  }
}

// --- summary
console.log('');
if (failed === 0) {
  const summary = csvFiles.length > 0 ? `（${csvFiles.length} 個 CSV 檔案）` : '（初始狀態）';
  console.log(`✅ content:check (v0) 全部通過 ${summary}`);
  process.exit(0);
} else {
  console.log(`❌ content:check (v0) 失敗：${failed} 項錯誤`);
  process.exit(1);
}
