angular.module('app').controller('mainCtrl', function($scope, $http) {
    $scope.data = instructionModel.data;
    $scope.getUsername = function(id) {
        return userModel.getUserById(id).username;
    }
    $scope.profile = function(id) {
        localStorage.profileId = id;
        $scope.$emit('changeContentUrl', { url: '/htmls/content/profile.html'});
    }
    $scope.openInstruction = function(id){
        localStorage.instructionId = id;
        $scope.$emit('changeContentUrl', { url: '/htmls/content/instruction.html'});
    }
});
