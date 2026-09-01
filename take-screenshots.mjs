import puppeteer from "puppeteer";

const screenshots = [
  { url: "http://localhost/challenge-8/public/index.php", name: "challenge-8.webp" },
  { url: "http://localhost/OW_heroes/public/index.php", name: "ow-heroes.webp" },
  { url: "https://vankalsbeekdigital.com/", name: "vankalsbeekdigital-home.webp", width: 1280, dark: true },
  { url: "https://vankalsbeekdigital.com/", name: "vankalsbeekdigital-mobile.webp", width: 390, dark: true },
];

const browser = await puppeteer.launch({ headless: true });
for (const { url, name, width = 1280, dark = false } of screenshots) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 800 });
  try {
    if (dark) {
      await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }]);
      await page.evaluateOnNewDocument(() => localStorage.setItem("vkd-theme", "dark"));
    }
    await page.goto(url, { waitUntil: "networkidle0", timeout: 10000 });
    await new Promise((r) => setTimeout(r, 4000));
    await page.screenshot({ path: `screenshots/${name}`, fullPage: !dark });
    console.log(`OK ${name}${dark ? " (dark, viewport)" : ""}`);
  } catch (e) {
    console.log(`FAIL ${name}: ${e.message}`);
  }
  await page.close();
}
await browser.close();
