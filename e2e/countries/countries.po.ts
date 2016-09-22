import { browser, element, by, ExpectedConditions } from 'protractor/globals';

export class CountriesPage {
  navigateTo() {
    return browser.get('/countries');
  }
    
  addCountry(countryName) {
      element(by.css('body > app-root > div > app-countries > app-country-entry:nth-child(2) > header > button')).click();
      //element(by.css('#md-input-0-input')).cl
  }

}
