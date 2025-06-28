const setupDriver = require('../utils/setupDriver');
const { By, until } = require('selenium-webdriver');

(async function testSignup() {
  const driver = await setupDriver();

  try {
    await driver.get('http://localhost:5173/signup');
    await driver.sleep(3000);

    // Wait and select role (radio)
    const applicantRadio = await driver.findElement(By.css('input[value="APPLICANT"]'));
    await driver.sleep(1000);
    await applicantRadio.click();
    await driver.sleep(1000);

    // Fill Name
    const nameInput = await driver.findElement(By.name('name'));
    await nameInput.sendKeys('John Doe');
    await driver.sleep(1000);

    // Fill Email
    const emailInput = await driver.findElement(By.name('email'));
    await emailInput.sendKeys('john@example.com');
    await driver.sleep(1000);

    // Fill Password
    const passwordInput = await driver.findElement(By.name('password'));
    await passwordInput.sendKeys('password123');
    await driver.sleep(1000);

    // Submit Form
    const submitBtn = await driver.findElement(By.css('button[type="submit"]'));
    await driver.sleep(1000);
    await submitBtn.click();

    // Wait for redirect to login
    await driver.wait(until.urlContains('/login'), 10000);
    await driver.sleep(3000);

    console.log('✅ Sign Up Test Passed');
  } catch (error) {
    console.error('❌ Sign Up Test Failed', error);
  } finally {
    await driver.quit();
  }
})();
