import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await page.screenshot({ path: "qa/new-intro.png" });
await page.locator(".entrance").waitFor({ state: "detached" });
await page.waitForTimeout(1500);
await page.screenshot({ path: "qa/new-hero.png" });
await page.locator("#life").scrollIntoViewIfNeeded();
await page.waitForTimeout(700);
await page.locator("#life").screenshot({ path: "qa/new-life.png" });
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:5173/");
await page.locator(".entrance").waitFor({ state: "detached" });
await page.waitForTimeout(1500);
await page.screenshot({ path: "qa/new-mobile.png" });
console.log(
  await page.evaluate(() => ({
    width: innerWidth,
    scroll: document.documentElement.scrollWidth,
    images: [...document.images]
      .filter((x) => !x.complete || !x.naturalWidth)
      .map((x) => x.src),
  })),
);
await browser.close();
