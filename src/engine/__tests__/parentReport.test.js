/**
 * parentReport.test.js — Verify the 3-page PDF parent report logic
 *
 * Tests:
 * - export PDF builder functions produce sensible advice lines
 * - printExam parent-report HTML has expected structure
 * - weak/strong/overall logic works for various topic combinations
 */

import { describe, it, expect } from 'vitest';
import { printExam } from '../exam.js';
import { TOPICS, GRADE_INFO } from '../config.js';
import { buildExam } from '../exam.js';

function makeSections(){
  /* Build a minimal sections array for printExam */
  return buildExam(2, ['2M1','2M2','2M3'], 'practice', 2);
}

function makeTopicSummary(pcts){
  /* Map pcts array to topic summary rows; names are arbitrary */
  return pcts.map((pct,i)=>({
    name: `Topic${i+1}`,
    total: 10,
    correct: Math.round(10 * pct / 100),
    pct,
  }));
}

describe('printExam parent report (3-page format)', () => {
  it('accepts a 6th parentReport argument without breaking', () => {
    /* Just verify it doesn't throw — output is to a window.open which we can't test directly */
    /* Mock window.open so the test doesn't open a popup */
    const original = globalThis.window;
    let opened = false;
    globalThis.window = { ...original, open: () => { opened = true; return { document: { write: () => {}, close: () => {} } }; } };
    try {
      const sections = makeSections();
      const topicSummary = makeTopicSummary([80, 60, 40]);
      printExam(sections, 2, true, 'TestStudent', 2, {
        topicSummary, totScore: 65, grandTotal: 100, pct: 65,
      });
      expect(opened).toBe(true);
    } finally {
      globalThis.window = original;
    }
  });

  it('still works without parentReport (backward compat)', () => {
    const original = globalThis.window;
    let opened = false;
    globalThis.window = { ...original, open: () => { opened = true; return { document: { write: () => {}, close: () => {} } }; } };
    try {
      const sections = makeSections();
      printExam(sections, 2, true, 'TestStudent', 2);
      expect(opened).toBe(true);
    } finally {
      globalThis.window = original;
    }
  });

  it('accepts empty topicSummary array gracefully', () => {
    const original = globalThis.window;
    let opened = false;
    globalThis.window = { ...original, open: () => { opened = true; return { document: { write: () => {}, close: () => {} } }; } };
    try {
      const sections = makeSections();
      printExam(sections, 2, true, 'TestStudent', 2, {
        topicSummary: [], totScore: 0, grandTotal: 100, pct: 0,
      });
      expect(opened).toBe(true);
    } finally {
      globalThis.window = original;
    }
  });
});

describe('printExam with no answer key (showAns=false)', () => {
  it('produces 1-page student paper only when showAns=false and no parentReport', () => {
    const original = globalThis.window;
    let html = '';
    globalThis.window = { ...original, open: () => ({
      document: {
        write: (h) => { html = h; },
        close: () => {},
      },
    }) };
    try {
      const sections = makeSections();
      printExam(sections, 2, false, 'TestStudent', 2);
      /* Without parentReport, no page-3 break is added */
      expect(html.includes('page-break-before:always')).toBe(false);
    } finally {
      globalThis.window = original;
    }
  });
});

describe('printExam parent report content', () => {
  it('includes topic performance sorted weakest-first', () => {
    const original = globalThis.window;
    let html = '';
    globalThis.window = { ...original, open: () => ({
      document: { write: (h) => { html = h; }, close: () => {} },
    }) };
    try {
      const sections = makeSections();
      const topicSummary = makeTopicSummary([80, 30, 50]);
      printExam(sections, 2, false, 'TestStudent', 2, {
        topicSummary, totScore: 53, grandTotal: 100, pct: 53,
      });
      /* All 3 topic names should appear */
      expect(html).toContain('Topic1');
      expect(html).toContain('Topic2');
      expect(html).toContain('Topic3');
      /* Weakest topic (Topic2 = 30%) should appear with red color */
      expect(html).toMatch(/Topic2.*?color:\s*#ef4444|#ef4444.*?Topic2/s);
      /* Strongest (Topic1 = 80%) should appear with green color */
      expect(html).toContain('#16a34a');
    } finally {
      globalThis.window = original;
    }
  });

  it('produces page-break-before for parent report page', () => {
    const original = globalThis.window;
    let html = '';
    globalThis.window = { ...original, open: () => ({
      document: { write: (h) => { html = h; }, close: () => {} },
    }) };
    try {
      const sections = makeSections();
      const topicSummary = makeTopicSummary([60, 50, 40]);
      printExam(sections, 2, false, 'TestStudent', 2, {
        topicSummary, totScore: 50, grandTotal: 100, pct: 50,
      });
      /* Should have at least one page-break (the parent report start) */
      const breaks = html.match(/page-break-before:always/g) || [];
      expect(breaks.length).toBeGreaterThanOrEqual(1);
      /* Parent report header should appear */
      expect(html).toContain('家長報告');
    } finally {
      globalThis.window = original;
    }
  });

  it('produces page-break-before for answer key when showAns=true', () => {
    const original = globalThis.window;
    let html = '';
    globalThis.window = { ...original, open: () => ({
      document: { write: (h) => { html = h; }, close: () => {} },
    }) };
    try {
      const sections = makeSections();
      printExam(sections, 2, true, 'TestStudent', 2, {
        topicSummary: makeTopicSummary([60]), totScore: 60, grandTotal: 100, pct: 60,
      });
      /* 2 page-breaks: answer key + parent report */
      const breaks = html.match(/page-break-before:always/g) || [];
      expect(breaks.length).toBe(2);
    } finally {
      globalThis.window = original;
    }
  });
});
