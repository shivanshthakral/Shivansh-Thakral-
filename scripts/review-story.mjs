import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
mkdirSync("qa/story", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  await page.addInitScript(() => localStorage.setItem("apex-motion-v2", "off"));
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await page.addStyleTag({
    content:
      "main>section{content-visibility:visible!important;contain-intrinsic-size:none!important}",
  });
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const id of ["work", "workbench", "about", "ask"]) {
      const el = page.locator("#" + id);
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);
      await el.screenshot({ path: `qa/story/${id}-${width}.png` });
    }
    const images = await page
      .locator(".project-character")
      .evaluateAll((imgs) =>
        imgs.map((img) => ({
          src: img.src,
          loaded: img.complete && img.naturalWidth > 0,
        })),
      );
    assert.equal(images.length, 3);
    assert.ok(images.every((x) => x.loaded));
    await page.getByRole("tab", { name: "02 The builder" }).click();
    assert.match(
      await page.locator("#story-panel").innerText(),
      /Making is the point/,
    );
    await page.getByRole("tab", { name: "03 The human" }).click();
    assert.match(await page.locator("#story-panel").innerText(), /life beyond/);
    await page
      .locator("#about")
      .screenshot({ path: `qa/story/about-human-${width}.png` });
    await page.getByRole("tab", { name: "01 The engineer" }).click();
    await page
      .locator(".lab-controls")
      .getByRole("button", { name: "02 Connect" })
      .click();
    assert.match(await page.locator(".lab-narration").innerText(), /structure/);
    await page.getByRole("button", { name: "Next build step" }).click();
    assert.match(
      await page.locator(".lab-narration").innerText(),
      /Make it useful/,
    );
    await page
      .locator(".lab-controls")
      .getByRole("button", { name: "01 Question" })
      .click();
    await page.locator(".portal-button").click();
    assert.ok(await page.locator(".agent-avatar").isVisible());
    await page
      .getByRole("dialog", { name: "Ask Shivansh", exact: true })
      .screenshot({ path: `qa/story/chat-${width}.png` });
    await page.keyboard.press("Escape");
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (let i = 0; i < 3; i++) {
    const el = page.locator(".project-visual").nth(i);
    await el.scrollIntoViewIfNeeded();
    await el.screenshot({ path: `qa/story/project-${i}.png` });
  }
  assert.deepEqual(errors, []);
  writeFileSync(
    "qa/story/results.json",
    JSON.stringify(
      {
        passed: true,
        errors,
        checks: [
          "All three artwork images loaded",
          "About chapters change narrative and thought card",
          "Build process steps and next control",
          "Agent portrait and portal open chatbot",
          "Desktop and mobile section screenshots",
        ],
      },
      null,
      2,
    ),
  );
  console.log("Story checks passed");
} finally {
  await browser.close();
}
