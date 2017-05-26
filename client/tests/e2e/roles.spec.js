import faker from 'faker';
import config from './config';

const fakeRole = faker.lorem.word();

export default {
  'Admin signin and create role': browser =>
    browser
      .maximizeWindow()
      .url(config.url)
      .waitForElementVisible('body')
      .click('#signin')
      .setValue('Input[name=email]', 'admin@test.com')
      .setValue('Input[name=password]', 'admin')
      .click('button')
      .pause(1000)
      .assert.containsText('h4#fiddle-text',
      'Welcome to Meek - Document Management System')
      .pause(2000)
      .click('#menuBar')
      .pause(1000)
      .click('#roles')
      .pause(2000)
      .assert.urlContains('roles')
      .click('body')
      .pause(2000)
      .waitForElementVisible('#rolesBtn')
      .click('#rolesBtn')
      .pause(2000)
      // .click('.rolesForm')
      .setValue('Input#titleUnique', fakeRole)
      .pause(5000)
      .click('#crRole')
      .pause(2000)
      .click('button.modal-close')
      .pause(2000)
      .assert.containsText('tr:last-child td:nth-child(2)', fakeRole)
      .end(),

  'Admin edit role': browser =>
    browser
      .maximizeWindow()
      .url(config.url)
      .waitForElementVisible('body')
      .click('#signin')
      .setValue('Input[name=email]', 'admin@test.com')
      .setValue('Input[name=password]', 'admin')
      .click('button')
      .pause(1000)
      .click('#menuBar')
      .pause(1000)
      .click('#roles')
      .pause(2000)
      .click('body')
      .pause(2000)
      .click('tr:nth-child(4) td:nth-child(5)')
      .pause(2000)
      // .waitForElementVisible('.rolesForm', 9000)
      // .click('.rolesForm')
      .waitForElementVisible('#editRole', 70000)
      .setValue('Input#editRole', 'editors')
      .pause(5000)
      .click('#crRole')
      .pause(2000)
      .click('button.modal-close')
      .pause(2000)
      .assert.containsText('tr:nth-child(4) td:nth-child(2)', 'editors')
      .end(),
};