import puppeteer from "puppeteer";

const screenshots = [
  { url: "http://localhost/challenge-8/public/index.php", name: "challenge-8.webp" },
  { url: "http://localhost/OW_heroes/public/index.php", name: "ow-heroes.webp" },
  { url: "https://vankalsbeekdigital.com/", name: "vankalsbeekdigital-home.webp", width: 1280 },
  { url: "https://vankalsbeekdigital.com/", name: "vankalsbeekdigital-mobile.webp", width: 390 },
];

const browser = await puppeteer.launch({ headless: true });
for (const { url, name, width = 1280 } of screenshots) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 800 });
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
