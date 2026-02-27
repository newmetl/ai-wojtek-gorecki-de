const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    headless: 'new'
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

  const filePath = 'file://' + path.resolve(__dirname, 'og-banner.html');
  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 15000 });

  // Wait for font to load
  await page.evaluateHandle('document.fonts.ready');
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({
    path: path.resolve(__dirname, 'images/og-banner.jpg'),
    type: 'jpeg',
    quality: 90
  });

  console.log('OG banner generated: images/og-banner.jpg');
  await browser.close();
})();
