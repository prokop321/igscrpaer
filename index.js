let images;
const puppeteer = require("puppeteer");
const fs = require("fs");
const https = require("https");

let lastImageurl = "";

let lastName = 0;

const tag = async (tag) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log("Opening instagram");
  await page.goto("https://www.instagram.com/accounts/login/");
  await delay(1000);
  await page.click("button._a9_1");
  await delay(5000);
  await page.screenshot({ path: "screenshot.png" });
  await page.type("input[name='username']", "eiv96310");
  await page.type("input[name='password']", "1Petr2Petr");
  await page.keyboard.press("Enter");
  await delay(10000);

  await page.goto("https://www.instagram.com/explore/tags/" + tag + "/");
  await page.waitForSelector("article");
  await page.screenshot({ path: "screenshot.png" });

  await page.screenshot({ path: "screenshot.png" });
  await page.waitForSelector("article");
  await delay(1000 + Math.random() * 5 * 1000);
  while (true) {
    await page.screenshot({ path: "screenshot.png" });
    console.log("Downloading images");
    images = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll("article img"));
      return images.map((img) => img.src);
    });
    if (Math.random() > 0.5) {
      await delay(1000 + Math.random() * 5 * 1000);
    }
    await downloadArray(images, tag);
    //scroll down
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight * 1.2 * Math.random());
    });
    await delay(2000 + Math.random() * 5 * 1000);
    await page.screenshot({ path: "screenshot.png" });
  }
};

const account = async (acc) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log("Opening instagram");
  await page.goto("https://www.instagram.com/accounts/login/");
  await delay(1000);
  await page.click("button._a9_1");
  await delay(5000);
  await page.screenshot({ path: "screenshot.png" });
  await page.type("input[name='username']", "");
  await page.type("input[name='password']", "");
  await page.keyboard.press("Enter");
  await delay(10000);

  await page.goto("https://www.instagram.com/" + acc + "/");
  await page.waitForSelector("article");
  await page.screenshot({ path: "screenshot.png" });

  await page.screenshot({ path: "screenshot.png" });
  await page.waitForSelector("article");
  await delay(1000 + Math.random() * 5 * 1000);
  while (true) {
    await page.screenshot({ path: "screenshot.png" });
    console.log("Downloading images");
    images = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll("article img"));
      return images.map((img) => img.src);
    });
    if (Math.random() > 0.5) {
      await delay(1000 + Math.random() * 5 * 1000);
    }
    await downloadArray(images, acc);
    //scroll down
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight * 1.2 * Math.random());
    });
    await delay(2000 + Math.random() * 5 * 1000);
    await page.screenshot({ path: "screenshot.png" });
  }
};

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const downloadArray = async (urls, tag) => {
  const start = lastImageurl ? urls.indexOf(lastImageurl) + 1 : 0;
  for (let i = start; i < urls.length; i++) {
    const url = urls[i];
    const path = "images/" + tag + lastName + ".jpg";
    lastName++;
    console.log("Downloading image " + lastName);
    await delay(12 * Math.random() * 10);

    download(url, path, tag);
  }
  lastImageurl = urls[urls.length - 1];
};

const download = (url, path) => {
  const file = fs.createWriteStream(path);
  https.get(url, (response) => {
    response.pipe(file);
  });
};

account("realskybri");
