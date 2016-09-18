import { InfographicsServerPage } from './app.po';

describe('infographics-server App', function() {
  let page: InfographicsServerPage;

  beforeEach(() => {
    page = new InfographicsServerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
