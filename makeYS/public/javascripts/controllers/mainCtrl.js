angular.module('app').controller('mainCtrl', function($scope, $http) {
    userModel.load($http).then(function() {
        userModel.data.forEach(function(element) {
            element.email = element.email.replace('%40', '@');
        }, this);
        $scope.$digest();
    });
    instructionModel.load($http,$scope).then(function(responce) {
        $scope.data = responce;
        $scope.data.forEach(function(element) {
            element.steps = JSON.parse(element.steps);
        }, this);
        $scope.$digest();
    });
    $scope.getUsername = function(id) {
        return userModel.getUserById(id).username;
    }
    $scope.profile = function(id) {
        localStorage.profileId = id;
        $scope.$emit('changeContentUrl', { url: '/htmls/content/profile.html'});
    }
});
