import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
mkdirSync("qa/playgrounds", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await ctx.newPage();
  await page.addInitScript(() => localStorage.setItem("apex-motion-v2", "off"));
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await page.addStyleTag({
    content:
      "main>section{content-visibility:visible!important;contain-intrinsic-size:none!important}",
  });
  const violations = [];
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (let i = 0; i < 3; i++) {
      const p = page.locator(".project-interactive").nth(i);
      await p.scrollIntoViewIfNeeded();
      await p.screenshot({ path: `qa/playgrounds/project-${i}-${width}.png` });
      const image = p.locator(".project-character");
      await image.evaluate((img) => img.decode());
      assert.ok(await image.evaluate((img) => img.naturalWidth > 0));
      for (let step = 0; step < 3; step++) {
        const btn = p.locator(".play-step-buttons button").nth(step);
        await btn.evaluate((e) => e.scrollIntoView({ block: "center" }));
        await btn.click();
        assert.equal(await btn.getAttribute("aria-pressed"), "true");
        assert.equal(
          await p
            .locator(".play-step-buttons button[aria-pressed=true]")
            .count(),
          1,
        );
      }
      if (i > 0) {
        const choices = p.locator(".demo-choices button");
        await choices.nth(1).click();
        assert.equal(await choices.nth(1).getAttribute("aria-pressed"), "true");
        await choices.nth(0).click();
      }
      await p.locator(".play-step-buttons button").nth(0).click();
      const a = await new AxeBuilder({ page })
        .include(".project-interactive:nth-child(" + (i + 1) + ")")
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      violations.push(
        ...a.violations.map((v) => ({
          width,
          project: i,
          id: v.id,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
      );
    }
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page
      .locator("#about")
      .screenshot({ path: `qa/playgrounds/about-${width}.png` });
    assert.equal(await page.locator('#about img[src^="/photos/"]').count(), 0);
    await page.getByRole("tab", { name: "02 The builder" }).click();
    assert.match(
      await page.locator(".identity-thought").innerText(),
      /build\(idea\)/,
    );
    await page.getByRole("tab", { name: "01 The engineer" }).click();
    const a = await new AxeBuilder({ page })
      .include("#about")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    violations.push(
      ...a.violations.map((v) => ({
        width,
        project: "about",
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    );
  }
  writeFileSync(
    "qa/playgrounds/results.json",
    JSON.stringify({ errors, violations }, null, 2),
  );
  console.log(
    JSON.stringify({ errors, accessibilityViolations: violations.length }),
  );
  assert.deepEqual(errors, []);
  assert.equal(violations.length, 0);
} finally {
  await browser.close();
}
