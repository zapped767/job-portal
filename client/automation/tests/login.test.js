const setupDriver = require('../utils/setupDriver');
const { By, until } = require('selenium-webdriver');

(async function testLogin() {
  const driver = await setupDriver();

  try {
    await driver.get('http://localhost:5173/login');
    await driver.sleep(3000);

    // Fill Email
    const emailInput = await driver.findElement(By.name('email'));
    await emailInput.sendKeys('john@example.com');
    await driver.sleep(1000);

    // Fill Password
    const passwordInput = await driver.findElement(By.name('password'));
    await passwordInput.sendKeys('password123');
    await driver.sleep(1000);

    // Submit Login
    const loginBtn = await driver.findElement(By.css('button[type="submit"]'));
    await driver.sleep(1000);
    await loginBtn.click();

    // Wait for redirect to profile
    await driver.wait(until.urlContains('/user-profile'), 10000);
    await driver.sleep(3000);

    const editBtn = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(),'Edit Profile')]")),
      10000
    );

    if (editBtn) {
      console.log('✅ Login Test Passed');
    } else {
      console.log('❌ Login Test Failed - Profile not found');
    }
  } catch (error) {
    console.error('❌ Login Test Failed', error);
  } finally {
    await driver.quit();
  }
})();
