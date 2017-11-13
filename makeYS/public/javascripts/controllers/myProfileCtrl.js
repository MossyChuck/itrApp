angular.module('app').controller('myProfileCtrl', function($scope, $http) {
    $scope.user = userModel.getUserById(sessionStorage.userId);
    $scope.sessionStorage = sessionStorage;    
});
