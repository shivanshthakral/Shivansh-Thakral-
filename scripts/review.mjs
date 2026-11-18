import { chromium } from "playwright";
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: ["--enable-unsafe-swiftshader"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
await page.waitForTimeout(1600);
await page
  .getByRole("button", { name: "Motion on. Turn motion off", exact: true })
  .click();
await page.screenshot({ path: "qa/desktop-final-hero.png" });
await page.setViewportSize({ width: 1200, height: 630 });
await page.screenshot({ path: "public/og.png" });
for (const width of [1440, 390]) {
  await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
  for (const id of [
    "work",
    "about",
    "journey",
    "constellation",
    "recognition",
    "beyond",
    "contact",
  ]) {
    await page
      .locator(`#${id}`)
      .screenshot({ path: `qa/section-${id}-${width}.png` });
  }
}
await browser.close();
console.log("Section review screenshots captured");
