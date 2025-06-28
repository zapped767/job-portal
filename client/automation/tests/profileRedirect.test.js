const setupDriver = require('../utils/setupDriver');
const { By, until } = require('selenium-webdriver');

(async function testProfileRedirect() {
  const driver = await setupDriver();

  try {
    // 1. Go to Login Page
    await driver.get('http://localhost:5173/login');
    await driver.sleep(3000); // wait for page to fully load

    // 2. Fill login credentials (slow down typing)
    const emailInput = await driver.findElement(By.name('email'));
    await emailInput.sendKeys('john@example.com');
    await driver.sleep(1000);

    const passwordInput = await driver.findElement(By.name('password'));
    await passwordInput.sendKeys('password123');
    await driver.sleep(1000);

    // 3. Submit the login form
    const loginBtn = await driver.findElement(By.css('button[type="submit"]'));
    await driver.sleep(1000);
    await loginBtn.click();

    // 4. Wait until redirected to profile page
    await driver.wait(until.urlContains('/user-profile'), 10000); // increased to 10s
    await driver.sleep(3000); // wait for UI animation/rendering

    // 5. Wait for profile content to appear (Edit Profile button)
    const editButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Edit Profile')]")),
      10000
    );

    if (editButton) {
      console.log('✅ Profile Redirect Test Passed');
    } else {
      console.log('❌ Profile page did not load as expected');
    }

    await driver.sleep(3000); // pause before closing browser
  } catch (error) {
    console.error('❌ Profile Redirect Test Failed', error);
  } finally {
    await driver.quit();
  }
})();
