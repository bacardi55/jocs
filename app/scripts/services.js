'use strict';

angular.module('PocsServices', ['ngResource']).
    factory('Comments', function($http) {


  var url = '';
  var key = '';

  var CommentsManager = {
    'get': function(getSuccess, getError) {
      $http.jsonp(
        url + '?key=' + key + '&callback=JSON_CALLBACK'
      ).success(getSuccess).error(getError);
    },
    'add': function(comment, addSuccess, addError) {
      var data = {
        'key': key,
        'newComment': comment.newComment,
        'href': comment.href,
      };

      $http.post(url, data).success(addSuccess).error(addError);
    }
  };
  return CommentsManager;
}).config(['$httpProvider', function($httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  delete $httpProvider.defaults.headers.common['x-csrftoken'];
  delete $httpProvider.defaults.headers.common['x-insight'];
}]);
