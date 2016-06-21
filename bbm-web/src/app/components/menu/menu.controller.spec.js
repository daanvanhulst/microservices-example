import MenuController from './menu.controller';

describe('controllers', () => {
  let menuController;

  beforeEach(() => {
    menuController = new MenuController();
  });

  it("should have initialized the Menu controller", function () {
    expect(menuController).toBeDefined();
  });
});
