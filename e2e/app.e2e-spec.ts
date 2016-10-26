import { VisualizePage } from './app.po';

describe('visualize App', function() {
  let page: VisualizePage;

  beforeEach(() => {
    page = new VisualizePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
