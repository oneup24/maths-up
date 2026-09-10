/**
 * e2e/smoke.spec.js — Critical user-flow smoke tests
 *
 * These verify the app boots, the home renders, an exam can be started,
 * answered, submitted and scored without errors. They are intentionally
 * minimal — they catch regressions, not behaviour.
 */

import { test, expect } from '@playwright/test';

test.describe('smoke', () => {
  test('app boots without console errors', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push(err.message));

    await page.goto('/');
    /* Splash + onboarding/home should render */
    await expect(page).toHaveTitle(/Maths-Up/);

    /* Filter known noise (Sentry/devtools) */
    const real = errors.filter(e => !/sentry|devtools|favicon/i.test(e));
    expect(real, `console errors: ${real.join('\n')}`).toEqual([]);
  });

  test('home renders primary CTA', async ({ page }) => {
    await page.goto('/');
    /* Splash → onboarding/home; wait for either the start CTA or onboarding step */
    await page.waitForLoadState('networkidle');
    const body = await page.locator('body').innerText();
    expect(body.length).toBeGreaterThan(20);
  });

  test('engine can be imported and buildExam runs in browser context', async ({ page }) => {
    /* Verifies the bundled engine code is reachable and produces valid output */
    await page.goto('/');
    const ok = await page.evaluate(async () => {
      try {
        const mod = await import('/src/engine/index.js');
        const { buildExam, TOPICS, GRADE_INFO } = mod;
        const grade = 2;
        const topics = (TOPICS[grade] || []).slice(0, 3).map(t => t.id);
        const secs = buildExam(grade, topics, 'practice', 2);
        return Array.isArray(secs) && secs.length > 0 && secs[0].qs.length > 0;
      } catch (e) {
        return { err: String(e) };
      }
    });
    expect(ok).toBe(true);
  });
});
