const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const html = fs.readFileSync('output.html', 'utf8');
  await page.setContent(html, { waitUntil: 'load' });
  await page.pdf({ path: 'SBGG-Checkliste-Print-Version.pdf', format: 'A4', margin: { left: '1cm', top: '2cm', right: '1cm', bottom: '2.5cm' } });

  await browser.close();
  console.log("HTML converted to PDF.");
})();