import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
mkdirSync("qa", { recursive: true });
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.screenshot({ path: "qa/desktop-hero.png" });
await page
  .getByRole("button", { name: "Motion on. Turn motion off", exact: true })
  .click();
await page.screenshot({ path: "qa/desktop-full.png", fullPage: true });
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await page.screenshot({ path: "qa/mobile-hero.png" });
await page.screenshot({ path: "qa/mobile-full.png", fullPage: true });
writeFileSync("qa/console.json", JSON.stringify(errors, null, 2));
console.log(JSON.stringify({ errors, status: await page.title() }));
await browser.close();
