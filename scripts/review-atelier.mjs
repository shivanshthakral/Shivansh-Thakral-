import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
mkdirSync("qa/atelier", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const results = [];
try {
  for (const width of [1440, 390, 320, 768]) {
    const context = await browser.newContext({
      viewport: { width, height: width > 1000 ? 1000 : 844 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(process.env.QA_URL || "http://127.0.0.1:5173/", {
      waitUntil: "networkidle",
    });
    await page.addStyleTag({
      content:
        "main>section{content-visibility:visible!important;contain-intrinsic-size:none!important}",
    });
    for (const selector of [
      ".project-mint",
      ".project-copper",
      ".project-lilac",
      "#workbench",
      "#beyond",
    ]) {
      const section = page.locator(selector).first();
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      await section
        .locator("img")
        .evaluateAll((imgs) => Promise.all(imgs.map((img) => img.decode())));
      await section.screenshot({
        path: `qa/atelier/${selector.replace(/[#.]/g, "")}-${width}.png`,
      });
    }
    const buttons = page.locator(".maker-chapters button");
    for (let i = 0; i < 3; i++) {
      await buttons.nth(i).click();
      assert.equal(await buttons.nth(i).getAttribute("aria-pressed"), "true");
      assert.equal(
        await page.locator(".maker-chapters button[aria-pressed=true]").count(),
        1,
      );
      assert.ok(
        (await page.locator(".maker-narrative h3").innerText()).length > 5,
      );
    }
    await page
      .locator("#workbench")
      .screenshot({ path: `qa/atelier/maker-complete-${width}.png` });
    for (let i = 0; i < 3; i++) {
      if (
        (await page
          .locator(".principle button")
          .nth(i)
          .getAttribute("aria-expanded")) !== "true"
      )
        await page.locator(".principle button").nth(i).click();
      assert.equal(
        await page
          .locator(".principle button")
          .nth(i)
          .getAttribute("aria-expanded"),
        "true",
      );
    }
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth + 1,
    );
    const axe = await new AxeBuilder({ page })
      .include("#workbench")
      .include("#beyond")
      .include(".project-interactive")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    results.push({
      width,
      overflow,
      errors,
      violations: axe.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    });
    await context.close();
  }
  const animated = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const movie = await animated.newPage();
  await movie.goto(process.env.QA_URL || "http://127.0.0.1:5173/", {
    waitUntil: "networkidle",
  });
  await movie.locator(".entrance").waitFor({ state: "detached" });
  await movie.locator(".maker-play").scrollIntoViewIfNeeded();
  await movie
    .getByRole("button", { name: "Play the visual story", exact: true })
    .click();
  await movie.waitForFunction(() =>
    document.querySelector("#workbench")?.classList.contains("maker-phase-1"),
  );
  await movie
    .getByRole("button", { name: "Pause the visual story", exact: true })
    .click();
  await movie.waitForTimeout(5500);
  assert.ok(await movie.locator(".maker-phase-1").count());
  await movie
    .getByRole("button", { name: "Play the visual story", exact: true })
    .click();
  await movie.waitForFunction(() =>
    document.querySelector("#workbench")?.classList.contains("maker-phase-2"),
  );
  await movie
    .getByRole("button", { name: "Motion on. Turn motion off", exact: true })
    .click();
  assert.equal(await movie.locator(".maker-play").count(), 0);
  await movie.locator(".maker-chapters button").first().focus();
  await movie.keyboard.press("Enter");
  assert.ok(await movie.locator(".maker-phase-0").count());
  await animated.close();
  console.log(
    "Story playback, pause, motion-off and keyboard activation passed.",
  );
  writeFileSync("qa/atelier/results.json", JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
  assert.ok(
    results.every(
      (r) => !r.overflow && !r.errors.length && !r.violations.length,
    ),
  );
} finally {
  await browser.close();
}
