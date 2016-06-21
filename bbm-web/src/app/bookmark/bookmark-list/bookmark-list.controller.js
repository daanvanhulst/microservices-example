export default class BookmarkListController {
  constructor (bookmarkService) {
    'ngInject';
    //Services
    this.bookmarkService = bookmarkService;
    //Variables
    this.bookmarks = [];
    
    this.activate();
  }

  activate() {
    this.bookmarkService.getBookmarks()
    .then((bookmarks) => {
      this.bookmarks = bookmarks;
    });
  }
}
