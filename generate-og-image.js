const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto('file:///' + path.resolve(__dirname, 'og-image.html').replace(/\\/g, '/'));
  await page.screenshot({ path: path.resolve(__dirname, 'og-image.png'), type: 'png' });
  await browser.close();
  console.log('og-image.png generated');
})();
