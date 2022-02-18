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
// const headless = process.env.headless_chrome.toLowerCase() === 'true';
const headless = false;

const startUrl = process.env.START_URL || 'http://localhost:3000/';
const userName = process.env.TAIKO_USERNAME;
const password = process.env.TAIKO_PASSWORD;

beforeSuite(async () => {
  await openBrowser({ headless });
});

afterSuite(async () => {
  await closeBrowser();
});

step('Create a grow', async () => {
  await goto(startUrl);

  await click('Get started');

  await write(userName, into(textBox('Email address')));
  await write(password, into(textBox('Password')));
  await click('Continue');

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
