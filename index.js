const puppeteer = require('puppeteer');
const pug = require('pug');
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const postcssPresetEnv = require('postcss-preset-env')
const tailwindcss = require('tailwindcss');

async function generatePdf(title, content) {
  // Compile the Pug template
  const templatePath = path.join(__dirname, 'templates', 'template.pug');
  const template = pug.compileFile(templatePath);
  const html = template({ title, content });
  // Compile the Tailwind CSS file with PostCSS
  const cssPath = path.join(__dirname, 'styles', 'tailwind.css');
  const css = fs.readFileSync(cssPath, 'utf8');
  const processedCss = await postcss([tailwindcss, require('postcss-preset-env')]).process(css, {
    from: cssPath,
    to: 'tailwind.generated.css'
  });
  // Launch a new browser instance
  const browser = await puppeteer.launch();
  // Create a new page
  const page = await browser.newPage();
  // Set the page content
  await page.setContent(html);
  // Add the Tailwind CSS to the page
  await page.addStyleTag({ content: processedCss.css });
  // Generate the PDF and save to file
  const pdfPath = path.join(__dirname, './result.pdf');
  const pdf = await page.pdf({ format: 'A4', path: pdfPath, landscape: true});
  // Close the browser
  await browser.close();
  return pdf;
}

const main = async () => {
  try{
    await generatePdf('test')
  } catch(e){
    throw e;
  }
}

main()