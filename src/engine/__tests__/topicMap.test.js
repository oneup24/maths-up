/**
 * topicMap.test.js — topic_map.csv validation
 *
 * Verifies the Fractions prerequisite chain (2N5 → 3N5 → 4N6 → 5N2 → 5N3)
 * and the structural rules in MASTER_PLAN.md §I5h.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..', '..');
const CSV_PATH = join(ROOT, 'content', 'topic_map.csv');

const REQUIRED = ['topic_id', 'topic_name_zh', 'topic_name_en', 'quest_station_name_zh', 'grade', 'strand', 'prerequisites', 'unlocks', 'importance', 'status'];
const VALID_IMPORTANCE = new Set(['critical', 'high', 'medium', 'low']);
const VALID_STATUS = new Set(['active', 'planned', 'retired']);

function loadTopics() {
  if (!existsSync(CSV_PATH)) return { missing: true, topics: {}, header: [] };
  const lines = readFileSync(CSV_PATH, 'utf8').split('\n').filter(l => l.trim());
  const header = lines[0].split(',').map(c => c.trim());
  const topics = {};
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(',');
    const id = cols[0];
    if (!id) continue;
    topics[id] = {
      id,
      topic_name_zh: cols[1],
      topic_name_en: cols[2],
      quest_station_name_zh: cols[3],
      grade: parseInt(cols[4], 10),
      strand: cols[5],
      prereqs: (cols[6] || '').split('|').map(s => s.trim()).filter(Boolean),
      unlocks: (cols[7] || '').split('|').map(s => s.trim()).filter(Boolean),
      importance: cols[8],
      status: cols[9],
      line: i + 1,
    };
  }
  return { missing: false, topics, header };
}

describe('topic_map.csv', () => {
  it('exists', () => {
    expect(existsSync(CSV_PATH), 'content/topic_map.csv must exist').toBe(true);
  });

  it('has all required columns', () => {
    const { header } = loadTopics();
    const missing = REQUIRED.filter(c => !header.includes(c));
    expect(missing, `topic_map.csv missing columns: ${missing.join(', ')}`).toEqual([]);
  });

  it('Fractions prerequisite chain is correctly ordered', () => {
    const { topics } = loadTopics();
    /* Expected chain: 2N5 → 3N5 → 4N6 → 5N2 → 5N3 */
    expect(topics['2N5']?.prereqs).toEqual([]);
    expect(topics['2N5']?.unlocks).toEqual(['3N5']);
    expect(topics['3N5']?.prereqs).toEqual(['2N5']);
    expect(topics['3N5']?.unlocks).toEqual(['4N6']);
    expect(topics['4N6']?.prereqs).toEqual(['3N5']);
    expect(topics['4N6']?.unlocks).toEqual(['5N2']);
    expect(topics['5N2']?.prereqs).toEqual(['4N6']);
    expect(topics['5N2']?.unlocks).toEqual(['5N3']);
    expect(topics['5N3']?.prereqs).toEqual(['5N2']);
    expect(topics['5N3']?.unlocks).toEqual([]);
  });

  it('all topic_ids match the engine TOPICS config', async () => {
    const { topics } = loadTopics();
    const { TOPICS } = await import('../config.js');
    const allEngineTopicIds = new Set();
    for (const g of Object.keys(TOPICS)) {
      for (const t of TOPICS[g]) allEngineTopicIds.add(t.id);
    }
    for (const id of Object.keys(topics)) {
      expect(allEngineTopicIds.has(id), `topic_id ${id} in topic_map.csv but not in engine TOPICS`).toBe(true);
    }
  });

  it('all prereq/unlock FKs resolve', () => {
    const { topics } = loadTopics();
    const ids = new Set(Object.keys(topics));
    for (const t of Object.values(topics)) {
      for (const p of t.prereqs) {
        expect(ids.has(p), `${t.id} has prereq ${p} which is not in CSV`).toBe(true);
      }
      for (const u of t.unlocks) {
        expect(ids.has(u), `${t.id} has unlock ${u} which is not in CSV`).toBe(true);
      }
    }
  });

  it('no cycles in unlocks graph', () => {
    const { topics } = loadTopics();
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
    expect(hasCycle(g), 'unlocks graph must be acyclic').toBe(false);
  });

  it('all topics have valid importance and status', () => {
    const { topics } = loadTopics();
    for (const t of Object.values(topics)) {
      expect(VALID_IMPORTANCE.has(t.importance), `${t.id}: invalid importance "${t.importance}"`).toBe(true);
      expect(VALID_STATUS.has(t.status), `${t.id}: invalid status "${t.status}"`).toBe(true);
      expect(t.grade >= 1 && t.grade <= 6, `${t.id}: grade must be 1-6`).toBe(true);
    }
  });

  it('reverse edges are consistent (every unlock appears in prereq\'s unlocks list)', () => {
    const { topics } = loadTopics();
    for (const t of Object.values(topics)) {
      for (const p of t.prereqs) {
        expect(topics[p].unlocks.includes(t.id),
          `reverse edge: ${p} should have ${t.id} in unlocks`).toBe(true);
      }
    }
  });
});
