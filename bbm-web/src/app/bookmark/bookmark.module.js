import bookmarkConfig from './bookmark.config';
import BookmarkService from './bookmark.service';

export default angular.module('bbm.bookmark', [])
    .config(bookmarkConfig)
    .service('bookmarkService', BookmarkService);
    

