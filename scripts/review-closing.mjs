import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import assert from "node:assert/strict";
mkdirSync("qa/closing", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.addInitScript(() => localStorage.setItem("apex-motion-v2", "off"));
  await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
  await page.addStyleTag({
    content:
      "main>section{content-visibility:visible!important;contain-intrinsic-size:none!important}",
  });
  const violations = [];
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    for (const id of [
      "life",
      "journey",
      "constellation",
      "recognition",
      "beyond",
      "contact",
    ]) {
      const el = page.locator("#" + id);
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(180);
      await el.screenshot({ path: `qa/closing/${id}-${width}.png` });
      const a = await new AxeBuilder({ page })
        .include("#" + id)
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      violations.push(
        ...a.violations.map((v) => ({
          id: v.id,
          width,
          section: id,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            summary: n.failureSummary,
          })),
        })),
      );
    }
    await page.getByRole("button", { name: /Rajkumari Foundation/ }).click();
    assert.match(
      await page.locator(".notebook-page").innerText(),
      /clear explanation/,
    );
    await page.getByRole("button", { name: /PharmaLex/ }).click();
    assert.match(
      await page.locator(".notebook-page").innerText(),
      /Understand the system/,
    );
    await page.getByRole("button", { name: /Espire Infolabs/ }).click();
    await page.getByRole("tab", { name: "Systems" }).click();
    await page.getByRole("button", { name: "DB MongoDB" }).click();
    assert.match(
      await page.locator(".studio-insight").innerText(),
      /document form/,
    );
    await page.locator(".studio-project").click();
    assert.ok(
      await page
        .getByRole("dialog", { name: "Contentstack Accelerator", exact: true })
        .isVisible(),
    );
    await page.keyboard.press("Escape");
    await page.getByRole("tab", { name: "Intelligence" }).click();
    assert.ok(
      await page
        .locator(".studio-character")
        .evaluate((i) => i.complete && i.naturalWidth > 0),
    );
    await page
      .getByRole("button", { name: "An opportunity", exact: true })
      .click();
    await page
      .locator("#conversation-note")
      .fill("A thoughtful project & collaboration? #hello");
    const draft = new URL(
      await page.locator(".note-send a").getAttribute("href"),
    );
    assert.equal(draft.protocol, "mailto:");
    assert.equal(draft.searchParams.get("subject"), "An opportunity");
    assert.ok(
      draft.searchParams
        .get("body")
        .includes("A thoughtful project & collaboration? #hello"),
    );
    await page.locator("#conversation-note").fill("");
    await page
      .getByRole("button", { name: "A project idea", exact: true })
      .click();
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page
    .getByRole("button", { name: "Motion off. Turn motion on", exact: true })
    .click();
  await page.locator(".tool-studio").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.locator(".tool-studio").hover({ position: { x: 30, y: 150 } });
  assert.notEqual(
    await page
      .locator(".tool-studio")
      .evaluate((e) => e.style.getPropertyValue("--studio-x")),
    "0deg",
  );
  await page
    .locator("#constellation")
    .screenshot({ path: "qa/closing/studio-motion.png" });
  writeFileSync(
    "qa/closing/results.json",
    JSON.stringify(
      {
        errors,
        violations,
        checks: [
          "All lower sections captured desktop/mobile",
          "Every career chapter changes field note",
          "Tool selection updates insight",
          "Toolkit links correct project",
          "Builder image loads",
          "Email draft retains safely encoded subject and message",
          "Pointer depth responds with motion enabled",
        ],
      },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify({ errors, accessibilityViolations: violations.length }),
  );
  assert.deepEqual(errors, []);
  assert.equal(violations.length, 0);
} finally {
  await browser.close();
}
