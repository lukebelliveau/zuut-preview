/* globals gauge*/
"use strict";
const { $, button, click, focus, openBrowser, write, closeBrowser, goto, into, press, text } = require('taiko');
const assert = require("assert");
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
  await openBrowser({ headless: headless });
});

afterSuite(async () => {
  await closeBrowser();
});

step("Create a grow", async () => {
  await goto('http://localhost:3000/');

  await click('Get started');

  await write('Taiko Time', into($('input[name="name"]')));
  await press('Enter');

  await write('12', into($('input[name="length"]')));
  await write('11', into($('input[name="width"]')));

  await click('Create new layout');

  await text('Taiko Time').exists();

  await click('Objects');
  await focus($(`//*[text()='Syringes']`));
  await press('Enter');
  await assert.ok(await $("//li[text()='Syringes']").exists());
});