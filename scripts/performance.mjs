import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import { writeFileSync, mkdirSync } from "node:fs";
mkdirSync("qa", { recursive: true });
const chrome = await launch({
  chromePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  chromeFlags: [
    "--headless",
    "--disable-gpu",
    "--no-first-run",
    "--enable-unsafe-swiftshader",
  ],
  logLevel: "silent",
});
try {
  for (const formFactor of ["desktop", "mobile"]) {
    const result = await lighthouse("http://127.0.0.1:4173/", {
      port: chrome.port,
      output: ["json", "html"],
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      formFactor,
      ...(formFactor === "desktop"
        ? {
            throttling: {
              rttMs: 40,
              throughputKbps: 10240,
              cpuSlowdownMultiplier: 1,
            },
          }
        : {}),
      screenEmulation:
        formFactor === "desktop"
          ? {
              mobile: false,
              width: 1440,
              height: 900,
              deviceScaleFactor: 1,
              disabled: false,
            }
          : {
              mobile: true,
              width: 390,
              height: 844,
              deviceScaleFactor: 1,
              disabled: false,
            },
    });
    if (result.lhr.runtimeError) {
      throw new Error(`Lighthouse ${formFactor}: ${result.lhr.runtimeError.message}`);
    }
    writeFileSync(`qa/lighthouse-${formFactor}.json`, result.report[0]);
    writeFileSync(`qa/lighthouse-${formFactor}.html`, result.report[1]);
    console.log(
      JSON.stringify({
        formFactor,
        scores: Object.fromEntries(
          Object.entries(result.lhr.categories).map(([k, v]) => [
            k,
            Math.round(v.score * 100),
          ]),
        ),
        metrics: Object.fromEntries(
          [
            "first-contentful-paint",
            "largest-contentful-paint",
            "total-blocking-time",
            "cumulative-layout-shift",
          ].map((k) => [k, result.lhr.audits[k].displayValue]),
        ),
        issues: Object.entries(result.lhr.audits)
          .filter(
            ([k, v]) =>
              v.score !== null &&
              v.score < 0.9 &&
              v.details?.type !== "opportunity",
          )
          .map(([k, v]) => ({ id: k, title: v.title, score: v.score })),
      }),
    );
  }
} finally {
  await chrome.kill();
}
