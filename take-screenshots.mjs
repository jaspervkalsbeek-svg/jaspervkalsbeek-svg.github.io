import puppeteer from "puppeteer";
import { writeFileSync } from "fs";

const screenshots = [
  { url: "http://localhost/challenge-8/public/index.php", name: "challenge-8.webp" },
  { url: "http://localhost/OW_heroes/public/index.php", name: "ow-heroes.webp" },
];

const browser = await puppeteer.launch({ headless: true });
for (const { url, name } of screenshots) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  try {
    await page.goto(url, { waitUntil: "networkidle0", timeout: 10000 });
    await page.screenshot({ path: `screenshots/${name}`, fullPage: true });
    console.log(`OK ${name}`);
  } catch (e) {
    console.log(`FAIL ${name}: ${e.message}`);
  }
  await page.close();
}
await browser.close();
