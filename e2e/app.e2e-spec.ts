import { UricoGtasksPage } from './app.po';

describe('urico-gtasks App', () => {
  let page: UricoGtasksPage;

  beforeEach(() => {
    page = new UricoGtasksPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
