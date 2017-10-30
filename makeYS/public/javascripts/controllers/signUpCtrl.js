angular.module("app").controller("signUpCtrl",function($scope) {
    $scope.textPattern = new RegExp('[a-z]');

    $scope.addNewUser = function (userDetails) {
        $scope.message = $scope.newUser;
    }

    $scope.message = "Ready";
});
