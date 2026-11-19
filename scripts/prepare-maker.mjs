import { chromium } from "playwright";
import { writeFileSync } from "node:fs";
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:5173");
  const result = await page.evaluate(async () => {
    const image = new Image();
    image.src = "/images/shivansh-maker.png";
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = Math.round((800 * image.height) / image.width);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return {
      image: canvas.toDataURL("image/webp", 0.88).split(",")[1],
      alpha: ctx.getImageData(0, 0, 1, 1).data[3],
    };
  });
  writeFileSync(
    "public/images/shivansh-maker.webp",
    Buffer.from(result.image, "base64"),
  );
  console.log({
    alphaAtCorner: result.alpha,
    bytes: Buffer.from(result.image, "base64").length,
  });
} finally {
  await browser.close();
}
