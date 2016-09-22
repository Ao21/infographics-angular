import { CountriesPage } from './countries.po';
import { InfographicsServerPage } from './../app.po';
fdescribe('infographics-server App', function () {
    let page: InfographicsServerPage;
    let countries: CountriesPage

    beforeEach(() => {
        page = new InfographicsServerPage();
        countries = new CountriesPage();
    });

    xit('stress test countries', () => {
        page.navigateTo();
        page.login();
        for (var i = 0; i <= 10; i++){
            countries.editCountry('Denmark', 'Denmark is an important donor and partner to UNHCR. In 2014, Denmark donated USD 77.2 million to UNHCR and ranked as UNHCR’s 11th largest donor. Denmark is the only donor to contribute with an emergency fund at the start of the year which is at UNHCR’s discretion to allocate where the need is the greatest. In addition, Denmark contributes annually with a large unearmarked contribution.');
        }
        
    });

    it('should be able to add a series of countries', () => {
        page.navigateTo();
        page.login();
        countries.editCountry('Denmark', 'Denmark is an important donor and partner to UNHCR. In 2014, Denmark donated USD 77.2 million to UNHCR and ranked as UNHCR’s 11th largest donor. Denmark is the only donor to contribute with an emergency fund at the start of the year which is at UNHCR’s discretion to allocate where the need is the greatest. In addition, Denmark contributes annually with a large unearmarked contribution.');
    })

});
