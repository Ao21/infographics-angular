import { browser, element, by, ExpectedConditions } from 'protractor/globals';

export class InfographicsServerPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
   // return element(by.css('app-root h1')).getText();
  }

  login() {
    element(by.css('app-root > app-menu > div > button')).click(); 
    let loginEl = element(by.css('.a0-popup'));
    browser.wait(ExpectedConditions.presenceOf(loginEl), 10000);
    element(by.css('#a0-signin_easy_email')).sendKeys('ro.brett@gmail.com');
    element(by.css('#a0-signin_easy_password')).sendKeys('Ao21Ao21');
    element(by.css('#a0-onestep > div.a0-mode-container > div > form > div.bottom-content > div > button')).click();
    let countriesList = element(by.css('body > app-root > div > app-countries'));
    browser.wait(ExpectedConditions.presenceOf(countriesList),5000);

  }
}
