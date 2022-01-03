/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    write,
    closeBrowser,
    goto,
    press,
    screenshot,
    above,
    click,
    checkBox,
    listItem,
    toLeftOf,
    link,
    text,
    into,
    textBox,
    evaluate
} = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        headless: headless
    })
});

afterSuite(async () => {
    await closeBrowser();
});

// Return a screenshot file name
//gauge.customScreenshotWriter = async function () {
//    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
//        `screenshot-${process.hrtime.bigint()}.png`);

//    await screenshot({
//        path: screenshotFilePath
//    });
//    return path.basename(screenshotFilePath);
//};

step("Go to Zuut QA", async (item) => {
 try {
  await goto("https://zuut-qa.herokuapp.com");
  //await text('Welcone Home').get().then(elements => console.log(elements.length));
 } catch (error) {
  console.log(error);
 }
});