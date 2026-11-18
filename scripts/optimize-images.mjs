import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:5173/");
  const files = [
    ...["health-character", "content-character", "crm-character"].map((x) => [
      `images/projects/${x}.png`,
      `images/projects/${x}.webp`,
      800,
    ]),
    ["images/about-engineer.png", "images/about-engineer.webp", 960],
    ...["suit", "adventure", "off-duty", "yellow-shirt"].map((x) => [
      `photos/${x}.jpeg`,
      `photos/${x}-intro.webp`,
      480,
    ]),
    ["images/shivansh-builder.png", "images/shivansh-builder.webp", 960],
    ...["healthpredict", "contentstack", "crm"].map((x) => [
      `images/projects/${x}.png`,
      `images/projects/${x}.webp`,
      1536,
    ]),
    ["images/agent-portrait.png", "images/agent-portrait.webp", 512],
    ["images/shivansh-character.png", "images/shivansh-character.webp", 960],
    ...["suit", "adventure", "off-duty", "yellow-shirt"].map((x) => [
      `photos/${x}.jpeg`,
      `photos/${x}.webp`,
      1000,
    ]),
  ];
  for (const [source, target, width] of files) {
    const data = await page.evaluate(
      async ({ source, width }) => {
        const img = new Image();
        img.src = "/" + source;
        await img.decode();
        const c = document.createElement("canvas");
        const ratio = Math.min(1, width / img.naturalWidth);
        c.width = Math.round(img.naturalWidth * ratio);
        c.height = Math.round(img.naturalHeight * ratio);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        return c.toDataURL("image/webp", 0.88).split(",")[1];
      },
      { source, width },
    );
    const bytes = Buffer.from(data, "base64");
    writeFileSync("public/" + target, bytes);
    console.log(target, bytes.length);
  }
} finally {
  await browser.close();
}
