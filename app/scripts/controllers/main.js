'use strict';

angular.module('jocsApp')
  .controller('MainCtrl', function ($scope, $window, Comments) {
    $scope.comments = [];
    $scope.title = 'Jocs\' on me';
    $scope.isError = 0;
    $scope.isSuccess = 0;
    $scope.message = '';
    $scope.commentSent = false;

    var getCommentSuccess = function(data) {
      if (data.status === 'success') {
        $scope.comments = data.comments;
      }
      else {
        $scope.isSuccess = 0;
        $scope.isError = 1;
        $scope.message = 'Comments for this page couldn\'t be retrieved';
      }
    };

    var getCommentError = function() {
      $scope.isError = 1;
      $scope.isSuccess = 0;
      $scope.message = 'An error occured';
    };

    var addSuccess = function(data) {
      if (data.status === 'success') {
        $scope.isError = 0;
        $scope.isSuccess = 1;
        $scope.message = data.message;
      }
      else {
        $scope.message = data.message;
        $scope.isSuccess = 0;
        $scope.isError = 1;
      }

      $scope.commentSent = true;
      Comments.get(getCommentSuccess, getCommentError);
    };

    var addError = function() {
      $scope.message = 'Comment couldn\'t be added';
      $scope.isError = 1;
      $scope.isSuccess = 0;
    };

    Comments.get(getCommentSuccess, getCommentError);

    $scope.addComment = function() {
      if ($scope.newComment !== 'undefined') {
        var data = {
          'href': window.location.href,
          'newComment': $scope.newComment
        };
        Comments.add(data, addSuccess, addError);
      }
    };
  });
