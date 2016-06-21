import ProfileService from './profile.service';

describe('Profile Service', () => {
  let profileService;

  beforeEach(angular.mock.module('masterclass'));

  beforeEach(inject(() => {
    profileService = new ProfileService();
  }));

  it("should have initialized the service", function () {
    expect(profileService).toBeDefined();
  });
  
});
