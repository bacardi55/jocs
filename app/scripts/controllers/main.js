'use strict';

angular.module('jocsApp')
  .controller('MainCtrl', function ($scope, $window, Comments, $http) {
    $scope.comments = [];
    $scope.title = 'Jocs\'s on me';
    $scope.error_message = '';
    $scope.status = 1;
    $scope.status_message = 0;

    var getCommentSuccess = function(data) {
      if (data.status == "success") {
        $scope.error_message = '';
        $scope.comments = data.comments;
        $scope.status = 1;
        $scope.status_message = 0;
      }
      else {
        $scope.status_message = 0;
        $scope.error_message = "Comments for this page couldn't be retrieved";
        $scope.status = 0;

      }
    }
    var getCommentError = function(data) {
      $scope.status_message = 0;
      $scope.error_message = "An error occured";
      $scope.status = 0;
    }

    var addSuccess = function(data) {
      if (data.status == "success") {
        $scope.error_message = '';
        $scope.status = 1;
        $scope.comments = data.comments;
        $scope.status_message = data.message;
        $scope.newComment = {};
      }
      else {
        $scope.status_message = 0;
        $scope.error_message = $data.message;
        $scope.status = 0;
        $scope.message
      }
    }
    var addError = function(data) {
      $scope.error_message = 'Comment couldn\'t be added';
      $scope.status = 0;
      $scope.status_message = 0;
    }

    Comments.get(getCommentSuccess, getCommentError);

    $scope.addComment = function() {
      if ($scope.newComment != "undefined") {
        var data = {
          'hostname': window.location.hostname,
          'pathname': window.location.pathname,
          'newComment': $scope.newComment
        }
        Comments.add(data, addSuccess, addError);
      }
    }
});
