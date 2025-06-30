import { test, expect } from '@playwright/test';
import { TestPage } from '../objects/addContact.po';
const testData = require('../fixtures/contactFixture.json')
const { authenticateUser, createEntity, deleteEntity, getEntity, validateEntity} = require('../utils/helper.spec')
let accessToken;

test.beforeEach(async ({page}) => {
  await page.waitForTimeout(5000);
  await page.goto('/');
  const test = new TestPage(page);
  await test.login(testData.validUser.email, testData.validUser.password)
  await test.verifyValidLogin();
})

test.describe ('Contact test cases', () => {
  test('Add contact', async ({page, request}) => {
    const test = new TestPage(page);
    await test.addNewContact("username","username","1111-11-11","abc@abc.com","1111111111","username","username","username","username","44600","username");
    
    //viewContact();
    await page.goto('/contactList');
    await expect(page.locator('body')).toContainText("abc@abc.com");
    await page.locator(`text=${"abc@abc.com"}`).first().click();

    await test.validateContactCreated("username","username","1111-11-11","abc@abc.com","1111111111","username","username","username","username","44600","username");
    // await test.deleteContact("username", "username", "abc@abc.com");
    
    accessToken = await authenticateUser(testData.validUser.email, testData.validUser.password, {request});
    const id = await getEntity(accessToken, `/contacts`, '200', {request});
    await deleteEntity(accessToken, `/contacts/${id}`, {request}) 
    await validateEntity(accessToken, `/contacts/${id}`, '404', {request});
  });

  test('Manual - Edit contact', async ({page}) => {
    const test = new TestPage(page);
    await test.addNewContact("username11","username1","1111-11-11","abc11@abc.com","1111111111","username1","username1","username1","username1","44600","username1");
    
    //viewContact();
    await page.goto('/contactList');
    await expect(page.locator('body')).toContainText("abc11@abc.com");
    await page.locator(`text=${"abc11@abc.com"}`).first().click();

    await test.validateContactCreated("username11","username1","1111-11-11","abc11@abc.com","1111111111","username1","username1","username1","username1","44600","username1");
    await test.editContact("abc11@abc.com","editedusername1","editedusername1","1111-11-11","editedabc1@abc.com","1111111111","username1","editedusername1","username1","username1","44600","editedusername1");
    await test.validateContactCreated("editedusername1","editedusername1","1111-11-11","editedabc1@abc.com","1111111111","username1","editedusername1","username1","username1","44600","editedusername1");
  });

  test('Contact delete test', async ({page, request}) => {
    const Data = {
      "firstName": "testJohn",
      "lastName": "testJohnDoe",
      "birthdate": "1990-01-20",
      "email": "testJohnjohndoe@gmail.com",
      "phone": "98123345678",
      "street1": "Address1",
      "city": "City1",
      "stateProvince": "State1",
      "postalCode": "12345",
      "country": "Nepal"
    };
    const contact = new TestPage(page);
    accessToken = await authenticateUser (testData.validUser.email, testData.validUser.password, {request});
    await createEntity(Data, accessToken, '/contacts', {request});
    await page.waitForTimeout(2000);
    page.reload();

    //viewContact();
    // await page.goto('/contactList');
    // await expect(page.locator('body')).toContainText("testJohnjohndoe@gmail.com");
    await page.locator(`text=${"testJohnjohndoe@gmail.com"}`).first().click();

    const id = await getEntity(accessToken, '/contacts', '200', {request})
    await contact.deleteContactEXTRA(); //test ?
    await validateEntity(accessToken, `/contacts/${id}`, '404', {request});
  })

  test('API - Contact Add/Edit/Delete test', async ({page, request}) => {
    const contact = new TestPage(page);
    accessToken = await authenticateUser (testData.validUser.email, testData.validUser.password, {request});
    const Data = {
      "firstName": "testJohn",
      "lastName": "testJohnDoe",
      "birthdate": "1990-01-20",
      "email": "testJohnjohndoe@gmail.com",
      "phone": "98123345678",
      "street1": "Address1",
      "city": "City1",
      "stateProvince": "State1",
      "postalCode": "12345",
      "country": "Nepal"
    };
    await createEntity(Data, accessToken, '/contacts', {request});
    await page.waitForTimeout(2000);
    page.reload();
    // await contact.viewContact(); // create bhayeko contact lai click garne
    // await contact.contactEdit(contactTestData.contactEdit,firstName);
    await contact.editContact("testJohnjohndoe@gmail.com","johneditedusername1","editedusername1","1111-11-11","editedabc1@abc.com","1111111111","username1","editedusername1","username1","username1","44600","editedusername1");
    await contact.validateContactCreated("johneditedusername1","editedusername1","1111-11-11","editedabc1@abc.com","1111111111","username1","editedusername1","username1","username1","44600","editedusername1");
    const id = await getEntity(accessToken, '/contacts', '200', {request})
    await deleteEntity(accessToken, `/contacts/${id}`, {request}) 
    await validateEntity(accessToken, `/contacts/${id}`, '404', {request});
  })

})





