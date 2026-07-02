import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const url = process.argv[2];
const label = process.argv[3];

if (!url) {
  console.error('Usage: node screenshot.mjs <url> [label]');
  process.exit(1);
}

const screenshotDir = './temp-screenshots';
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

const existingFiles = fs.readdirSync(screenshotDir).filter(f => f.startsWith('screenshot-'));
let maxNum = 0;
existingFiles.forEach(f => {
  const match = f.match(/screenshot-(\d+)/);
  if (match) {
    maxNum = Math.max(maxNum, parseInt(match[1]));
  }
});

const nextNum = maxNum + 1;
const filename = label ? `screenshot-${nextNum}-${label}.png` : `screenshot-${nextNum}.png`;
const filepath = path.join(screenshotDir, filename);

const width = parseInt(process.env.W || '1440', 10);
const height = parseInt(process.env.H || '900', 10);
const fullPage = process.env.FULL === '1';

(async () => {
  let browser;
  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      protocolTimeout: 180000,
    });
    const page = await browser.newPage();
    // Full-page shots of long pages get huge at 2x; drop to 1x to stay fast.
    await page.setViewport({ width, height, deviceScaleFactor: fullPage ? 1 : 2 });
    await page.goto(url, { waitUntil: 'networkidle2' });
    // let entrance animations settle
    await new Promise((r) => setTimeout(r, 1000));

    // Scroll through the page in steps so IntersectionObserver-based
    // scroll-reveal animations (whileInView, once:true) all fire.
    await page.evaluate(async () => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      // Disable smooth scrolling so the final scroll-to-top is instant,
      // otherwise the capture happens mid-animation partway down the page.
      const prev = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      const step = Math.round(window.innerHeight * 0.8);
      for (let y = 0; y <= document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await sleep(140);
      }
      window.scrollTo(0, 0);
      await sleep(250);
      document.documentElement.style.scrollBehavior = prev;
    });

    // optional scroll to a specific Y for a section shot (SCROLL=px)
    if (process.env.SCROLL) {
      await page.evaluate((y) => window.scrollTo(0, y), parseInt(process.env.SCROLL, 10));
      await new Promise((r) => setTimeout(r, 500));
    }

    await page.screenshot({ path: filepath, fullPage });
    console.log(`Screenshot saved: ${filepath} (${width}x${height}${fullPage ? ' full' : ''})`);
  } catch (error) {
    console.error('Screenshot failed:', error);
    process.exit(1);
  } finally {
    if (browser) await browser.close();
  }
})();
