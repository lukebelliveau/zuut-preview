/* globals gauge*/
'use strict';
const {
  $,
  button,
  click,
  focus,
  openBrowser,
  write,
  closeBrowser,
  goto,
  into,
  press,
  text,
  textBox,
} = require('taiko');
const assert = require('assert');
const headless = process.env.headless_chrome.toLowerCase() === 'true';
// const headless = false;

beforeSuite(async () => {
  await openBrowser({ headless: headless });
});

afterSuite(async () => {
  await closeBrowser();
});

step('Create a grow', async () => {
  await goto('http://localhost:3000/');

  await click('Get started');

  await write('Taiko Time', into(textBox({ 'aria-label': 'name' })));
  await press('Enter');

  await write('12', into(textBox({ 'aria-label': 'length' })));
  await write('11', into(textBox({ 'aria-label': 'width' })));

  await click('Create new layout');

  await text('Taiko Time').exists();

  await click('Objects');
  await focus(button('Syringes'));
  await press('Enter');

  await assert.ok(await $("//span[text()='Syringes']").exists());
});
