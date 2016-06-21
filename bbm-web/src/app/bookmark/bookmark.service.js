export default class BookmarkService {
  constructor(Restangular, commonConstants) {
    'ngInject';
    
    this.Restangular = Restangular;
    this.Restangular.setBaseUrl(commonConstants.baseUrl);
  }

  getBookmarks() {
    return this.Restangular.all('bookmark').getList();
  }
}