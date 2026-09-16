/**
 * e2e/flows.spec.js — End-to-end user flows
 *
 * Verifies the full happy path: home → settings → exam → submit → score report.
 * Selectors rely on `data-testid` attributes added in Day 2.
 *
 * Onboarding is bypassed via localStorage so the tests focus on the exam flow.
 */

import { test, expect } from '@playwright/test';

test.describe('settings → exam → submit → score', () => {
  test.beforeEach(async ({ page }) => {
    /* Pre-set localStorage/sessionStorage to skip onboarding + splash */
    await page.addInitScript(() => {
      try {
        window.localStorage.setItem('lang', 'zh');
        window.localStorage.setItem('selected_grade', '2');
        window.localStorage.setItem('onboarding_done', '1');
        window.sessionStorage.setItem('mq_splash_shown', '1');
      } catch {}
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    /* Click "continue as guest" if login is shown */
    const guestBtn = page.locator('button').filter({ hasText: /訪客繼續|Guest|Continue as Guest/ }).first();
    if (await guestBtn.isVisible({ timeout: 2_000 }).catch(() => false)) {
      await guestBtn.click();
      await page.waitForLoadState('networkidle');
    }
  });

  test('settings: topic toggle updates data-selected', async ({ page }) => {
    /* Click START EXAM (if visible) or navigate via OnboardingDone -> HomeDashboard */
    const startBtn = page.getByTestId('start-exam');
    if (await startBtn.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await startBtn.click();
    }

    const topic = page.getByTestId('topic-2M1');
    await topic.waitFor({ timeout: 5_000 });

    /* Should start unselected */
    await expect(topic).toHaveAttribute('data-selected', 'false');
    await topic.click();
    await expect(topic).toHaveAttribute('data-selected', 'true');
    await topic.click();
    await expect(topic).toHaveAttribute('data-selected', 'false');
  });

  test('full flow: settings → exam → submit → score report', async ({ page }) => {
    const startBtn = page.getByTestId('start-exam');
    if (await startBtn.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await startBtn.click();
    }

    /* Select a topic and generate */
    await page.getByTestId('topic-2M1').click();
    await page.getByTestId('generate-exam').click();

    /* Exam view loaded: submit button visible */
    const submitBtn = page.getByTestId('submit-exam');
    await submitBtn.waitFor({ timeout: 5_000 });

    /* Answer an MC option if available (gives non-zero score; otherwise submit empty) */
    const mcOption = page.locator('[data-testid^="mc-option-"]').first();
    if (await mcOption.isVisible({ timeout: 1_000 }).catch(() => false)) {
      await mcOption.click();
    }

    /* Submit → confirm dialog → confirm */
    await submitBtn.click();
    await page.waitForTimeout(300);
    const confirmBtn = page.locator('button').filter({ hasText: /確認交卷/ }).first();
    if (await confirmBtn.isVisible({ timeout: 1_000 }).catch(() => false)) {
      await confirmBtn.click();
    }

    /* Score report renders */
    const scoreReport = page.getByTestId('score-report');
    await scoreReport.waitFor({ timeout: 5_000 });
    await expect(scoreReport).toBeVisible();
  });

  test('after submit, MC questions show data-correct=true on the correct option only', async ({ page }) => {
    const startBtn = page.getByTestId('start-exam');
    if (await startBtn.isVisible({ timeout: 3_000 }).catch(() => false)) {
      await startBtn.click();
    }

    await page.getByTestId('topic-2M1').click();
    await page.getByTestId('generate-exam').click();
    await page.getByTestId('submit-exam').waitFor();

    /* Submit directly (no MC click — leave all empty for speed) */
    await page.getByTestId('submit-exam').click();
    const confirmBtn = page.locator('button').filter({ hasText: /確認交卷/ }).first();
    if (await confirmBtn.isVisible({ timeout: 1_000 }).catch(() => false)) {
      await confirmBtn.click();
    }

    await page.waitForTimeout(800);

    /* Group MC options by question id; assert each group has exactly 1 with data-correct=true */
    const mcGroups = await page.locator('[data-testid^="mc-option-"]').evaluateAll(els => {
      const groups = {};
      for (const el of els) {
        const tid = el.getAttribute('data-testid') || '';
        const qId = tid.replace(/^mc-option-/, '').replace(/-[A-D]$/, '');
        if (!groups[qId]) groups[qId] = { correct: 0, total: 0 };
        groups[qId].total++;
        if (el.getAttribute('data-correct') === 'true') groups[qId].correct++;
      }
      return groups;
    });

    /* If no MC questions exist for 2M1 at this difficulty, skip */
    if (Object.keys(mcGroups).length === 0) {
      test.skip();
      return;
    }

    for (const [qId, { correct, total }] of Object.entries(mcGroups)) {
      expect(correct, `MC ${qId}: should have exactly 1 correct (got ${correct}/${total})`).toBe(1);
    }
  });
});
