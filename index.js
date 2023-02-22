const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const website_url = 'https://www.bannerbear.com/blog/how-to-download-images-from-a-website-using-puppeteer/';
  await page.goto(website_url, { waitUntil: 'networkidle0'})
  await page.emulateMediaType('screen')
  const pdf = await page.pdf({
    path: './result.pdf',
    printBackground: true,
    format: 'A4',
  })
  await browser.close()
})()