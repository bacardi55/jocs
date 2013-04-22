'use strict';

angular.module('jocsApp')
  .controller('MainCtrl', function ($scope, $window, Comments) {
    $scope.comments = [];
    $scope.title = 'Jocs\' on me';
    $scope.errorMessage = '';
    $scope.status = 1;
    $scope.statusMessage = 0;
    $scope.commentSent = false;

    var getCommentSuccess = function(data) {
      if (data.status === 'success') {
        $scope.errorMessage = '';
        $scope.comments = data.comments;
        $scope.status = 1;
      }
      else {
        $scope.statusMessage = 0;
        $scope.errorMessage = 'Comments for this page couldn\'t be retrieved';
        $scope.status = 0;
      }
    };

    var getCommentError = function() {
      $scope.statusMessage = 0;
      $scope.errorMessage = 'An error occured';
      $scope.status = 0;
    };

    var addSuccess = function(data) {
      if (data.status === 'success') {
        $scope.errorMessage = '';
        $scope.status = 1;
        $scope.statusMessage = data.message;
      }
      else {
        $scope.statusMessage = 0;
        $scope.errorMessage = data.message;
        $scope.status = 0;
        $scope.message = '';
      }

      $scope.commentSent = true;
      Comments.get(getCommentSuccess, getCommentError);
    };

    var addError = function() {
      $scope.errorMessage = 'Comment couldn\'t be added';
      $scope.status = 0;
      $scope.statusMessage = 0;
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
