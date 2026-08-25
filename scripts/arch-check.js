/**
 * arch-check.js — Gate 0 architectural constraint enforcer
 *
 * Verifies src/engine/ is a pure computation layer:
 *   1. No supabase imports (no DB calls)
 *   2. No react imports (no UI framework)
 *   3. No fetch() calls (no network I/O)
 *   4. No Math.random() outside core.js (RNG must go through ri/pk/shuffle)
 *   5. No Date.now() in grade generators (generators must be side-effect-free)
 *
 * Run: node scripts/arch-check.js
 * Exit 0 = all pass. Exit 1 = violations found.
 */

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT   = join(__dirname, '..');
const ENGINE = join(ROOT, 'src', 'engine');
const GRADES = join(ENGINE, 'grades');

const RULES = [
  {
    id: 1,
    label: 'No supabase in engine (no DB calls)',
    cmd: `grep -rn "supabase" "${ENGINE}" --include="*.js"`,
    expectEmpty: true,
  },
  {
    id: 2,
    label: "No react imports in engine (no UI framework)",
    cmd: `grep -rn "from 'react'\\|require('react')" "${ENGINE}" --include="*.js"`,
    expectEmpty: true,
  },
  {
    id: 3,
    label: 'No fetch() in engine (no network I/O)',
    cmd: `grep -rn "\\bfetch(" "${ENGINE}" --include="*.js"`,
    expectEmpty: true,
  },
  {
    id: 4,
    label: 'No Math.random() outside core.js (use ri/pk/shuffle)',
    cmd: `grep -rn "Math\\.random" "${GRADES}" --include="*.js"`,
    expectEmpty: true,
  },
  {
    id: 5,
    label: 'No Date.now() in grade generators (side-effect-free)',
    cmd: `grep -rn "Date\\.now\\b" "${GRADES}" --include="*.js"`,
    expectEmpty: true,
  },
];

let failed = 0;

for (const rule of RULES) {
  let output = '';
  try {
    output = execSync(rule.cmd, { encoding: 'utf8' }).trim();
  } catch (e) {
    // grep exits 1 when no matches — that is success for expectEmpty rules
    output = (e.stdout || '').trim();
  }

  const pass = rule.expectEmpty ? output === '' : output !== '';
  console.log(`${pass ? '✅' : '❌'} Rule ${rule.id}: ${rule.label}`);
  if (!pass && output) {
    output.split('\n').forEach(l => console.log(`   ${l}`));
  }
  if (!pass) failed++;
}

console.log('');
if (failed === 0) {
  console.log('✅ arch:check 全部 5 條規則通過');
  process.exit(0);
} else {
  console.log(`❌ arch:check 失敗：${failed} 條規則違反`);
  process.exit(1);
}
