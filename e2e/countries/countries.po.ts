import { browser, element, by, ExpectedConditions } from 'protractor/globals';

export class CountriesPage {
  navigateTo() {
    return browser.get('/countries');
  }
    
  addCountry(countryName) {
      element(by.css('.app-country-add > header > button > span')).click();
      element(by.css('.app-country-add md-input[name="name"] input')).sendKeys(countryName);
      element(by.css('.app-country-add > form > section.details > div.form-group.ctry-form__description > textarea')).sendKeys('test');
      element(by.css('.app-country-add > form > header > button')).click();
      let newCountryElement = element(by.css(`.app-country-${countryName}`));
      browser.wait(ExpectedConditions.presenceOf(newCountryElement));
      expect(newCountryElement).toBeDefined();
  }

  editCountry(countryName: string, description: string | null) {
    element(by.css(`.app-country-${countryName} > header > button.editCountry`)).click();
    browser.wait(ExpectedConditions.presenceOf(element(by.css(`app-country-entry.app-country-${countryName} > form`))))
    if (description !== null) {
      element(by.css(`.app-country-${countryName} > form > section.details > div.form-group.ctry-form__description > textarea`)).sendKeys(description);
      element(by.css(`.app-country-${countryName} > form > header > button`)).click();
    }
    browser.wait(ExpectedConditions.presenceOf(element(by.css(`.app-country-${countryName} > header > button.editCountry`))))
    

  }

  removeCountry(countryName) {
    element(by.css(`.app-country-${countryName} > header > button:nth-child(3)`)).click();
    element(by.css(`.app-country-${countryName} > form > section.sidebar > div > button`)).click();
    browser.sleep(500);
  }

}
