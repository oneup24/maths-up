/**
 * content-check.js v0 — basic CSV content validation
 *
 * Checks:
 *   1. content/ 目錄存在
 *   2. 所有 CSV 檔案：UTF-8 no BOM（Excel 常見問題）
 *   3. items.csv（如存在）：必要欄位完整
 *   4. ID_REGISTRY.json（如存在）：有效 JSON
 *
 * Run: node scripts/content-check.js
 * Exit 0 = all pass. Exit 1 = violations found.
 *
 * v0 scope: encoding + header checks only.
 * v1 will add cross-file ID resolution, cycle detection, template seed validation.
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
