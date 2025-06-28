const setupDriver = require('../utils/setupDriver');
const { By, until } = require('selenium-webdriver');

async function slowType(element, text, delay = 100) {
  for (const char of text) {
    await element.sendKeys(char);
    await new Promise((r) => setTimeout(r, delay));
  }
}

(async function fullFlowTest() {
  const driver = await setupDriver();
  const uniqueId = Date.now(); // Unique timestamp-based email
  const email = `john${uniqueId}@example.com`;
  const password = 'password123';

  try {
    console.log('➡️ Starting Sign Up...');
    await driver.get('http://localhost:5173/signup');
    await driver.sleep(2000);

    // Select role
    await driver.findElement(By.css('input[value="APPLICANT"]')).click();
    await driver.sleep(1000);

    // Fill signup form
    await slowType(await driver.findElement(By.name('name')), 'John Doe');
    await slowType(await driver.findElement(By.name('email')), email);
    await slowType(await driver.findElement(By.name('password')), password);
    await driver.sleep(1000);

    // Submit signup
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Wait for login page redirect
    await driver.wait(until.urlContains('/login'), 10000);
    console.log('✅ Sign Up Success, redirected to Login');

    console.log('➡️ Starting Login...');
    await driver.sleep(2000);

    // Fill login form
    await slowType(await driver.findElement(By.name('email')), email);
    await slowType(await driver.findElement(By.name('password')), password);
    await driver.sleep(1000);

    // Submit login
    await driver.findElement(By.css('button[type="submit"]')).click();

    // Wait for redirect to profile
    await driver.wait(until.urlContains('/user-profile'), 10000);
    await driver.sleep(3000);

    // Confirm Profile Edit button is visible
    const editBtn = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(),'Edit Profile')]")),
      10000
    );

    if (editBtn) {
      console.log('✅ Login and Profile Redirect Successful');
    } else {
      console.log('❌ Profile Page Verification Failed');
    }
  } catch (error) {
    console.error('❌ Full Flow Test Failed:', error);
  } finally {
    await driver.quit();
  }
})();
