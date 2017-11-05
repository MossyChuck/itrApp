angular.module('app').controller('instructionCtrl',function($scope){
    $scope.instruction = instructionModel.getInstructionById(localStorage.instructionId);
    $scope.profile = function(id) {
        localStorage.profileId = id;
        $scope.$emit('changeContentUrl', { url: '/htmls/content/profile.html'});
    }
    $scope.getUsername = function(id) {
        return userModel.getUserById(id).username;
    }
});