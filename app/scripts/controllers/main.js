'use strict';

angular.module('jocsApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.comments = [];
    $scope.title = 'Jocs\'s on me';

    $http.jsonp("http://debian55/perso/jocs/comments.json?jsoncallback=callback")
    .success(function(data) {
      $scope.comments = data.comments;
      $scope.title = data.title;
    }).error(function(data, status, headers, config) {
      $scope.alert_message = 'Comments couldn\'t be retrieved';
    });
  });
