import { test } from '@playwright/test';
import { TestPage } from '../objects/addContact.po';
import { access } from 'fs';
// const testData = require('../fixtures/loginFixture.json')
const { authenticateUser, createEntity, deleteEntity, getEntity, validateEntity} = require('../utils/helper.spec')
let accessToken;

test.beforeEach(async ({page}) => {
  await page.waitForTimeout(5000);
  await page.goto('/');
  const test = new TestPage(page);
  await test.login('mandishvaidya12345@gmail.com', 'mandish')
  await test.verifyValidLogin();
})

test.describe ('Contact test cases', () => {
  test('Add contact', async ({page}) => {
    const test = new TestPage(page);
    await test.addNewContact("username","username","1111-11-11","abc@abc.com","1111111111","username","username","username","username","44600","username");
    await test.validateContactCreated("username","username","1111-11-11","abc@abc.com","1111111111","username","username","username","username","44600","username");
    // await test.deleteContact("username", "username", "abc@abc.com");
  });

  test('Manual - Edit contact', async ({page}) => {
    const test = new TestPage(page);
    await test.addNewContact("username11","username1","1111-11-11","abc11@abc.com","1111111111","username1","username1","username1","username1","44600","username1");
    await test.validateContactCreated("username11","username1","1111-11-11","abc11@abc.com","1111111111","username1","username1","username1","username1","44600","username1");
    await test.editContact("abc11@abc.com","editedusername1","editedusername1","1111-11-11","editedabc1@abc.com","1111111111","username1","editedusername1","username1","username1","44600","editedusername1");
    await test.validateContactCreated("editedusername1","editedusername1","1111-11-11","editedabc1@abc.com","1111111111","username1","editedusername1","username1","username1","44600","editedusername1");
  });

  test.only('API - Contact Edit test', async ({page, request}) => {
    const Data = {
      "firstName": "testJohn",
      "lastName": "testJohnDoe",
      "birthdate": "1990-01-20",
      "email": "testJohnjohndoe@gmail.com",
      "phone": "98123345678",
      "strret1": "Address1",
      "city": "City1",
      "stateProvince": "State1",
      "postalCode": "12345",
      "country": "Nepal"
    };
    const contact = new TestPage(page);
    accessToken = await authenticateUser ("mandishvaidya12345@gmail.com", "mandish", {request});
    await createEntity(Data, accessToken, '/contacts', {request});
    await page.waitForTimeout(2000);
    page.reload();
    // await page.waitForTimeout(10000);
    // await contact.viewContact(); // create bhayeko contact lai click garne
    // await contact.contactEdit(contactTestData.contactEdit,firstName);
    await contact.editContact("testJohnjohndoe@gmail.com","johneditedusername1","editedusername1","1111-11-11","editedabc1@abc.com","1111111111","username1","editedusername1","username1","username1","44600","editedusername1");
    await contact.validateContactCreated("johneditedusername1","editedusername1","1111-11-11","editedabc1@abc.com","1111111111","username1","editedusername1","username1","username1","44600","editedusername1");

  })

})





