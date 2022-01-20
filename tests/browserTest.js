/* globals gauge*/
"use strict";
const { openBrowser,write, closeBrowser, goto, press, screenshot, text, focus, textBox, toRightOf } = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({ headless: headless })
});

afterSuite(async () => {
    await closeBrowser();
});

gauge.screenshotFn = async function() {
    return await screenshot({ encoding: 'base64' });
};

step("Goto Zuut Page", async () => {
    await goto('https://zuut-dev.herokuapp.com');
});

step("Page contains <content>", async (content) => {
    assert.ok(await text(content).exists());
});