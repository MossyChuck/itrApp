angular.module('app').controller('instructionCtrl',function($scope,$http){
    $scope.instruction = instructionModel.getInstructionById(localStorage.instructionId);
    $scope.profile = function(id) {
        localStorage.profileId = id;
        $scope.$emit('changeContentUrl', { url: '/htmls/content/profile.html'});
    }
    $scope.getUsername = function(id) {
        return userModel.getUserById(id).username;
    }
    $scope.isAuthor = function(id){
        if(id==sessionStorage.userId){
            return true;
        } else{
            return false;
        }
    }
    $scope.editInstruction = function(id){
        localStorage.instructionId = id;
        $scope.$emit('changeContentUrl',{ url: '/htmls/content/editInstruction.html'});
    }
    $scope.deleteInstruction = function(id){
        instructionModel.deleteInstructionById($http,id);
        $scope.$emit('changeContentUrl', { url: '/htmls/content/main.html'});
    }
});