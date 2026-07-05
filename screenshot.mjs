import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:8080/index.html';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

page.on('console', msg => { if (msg.type() === 'error') console.log('CONSOLE ERROR:', msg.text()); });
page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

await page.goto(url, { waitUntil: 'networkidle' });

const tabs = ['morning', 'afterschool', 'aisw', 'custom', 'care'];
for (const tab of tabs) {
  await page.click(`button[data-tab="${tab}"]`);
  await page.waitForTimeout(150);
  await page.screenshot({ path: `screenshot-tab-${tab}.png`, fullPage: true });
}

await page.setViewportSize({ width: 390, height: 844 });
await page.click('button[data-tab="afterschool"]');
await page.waitForTimeout(150);
await page.screenshot({ path: `screenshot-mobile-afterschool.png`, fullPage: true });

await browser.close();
console.log('done');
