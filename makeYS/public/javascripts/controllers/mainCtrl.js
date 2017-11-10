angular.module('app').controller('mainCtrl', function($scope, $http) {
    $scope.data = instructionModel.data;
    $scope.limitValue = 3;
    $scope.instructionsPerPage = 3;
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
    $scope.averageRating = function (id) {
        var rating = 0;
        for(var i = 0; i<data.length; i++){
            if(data[i].id == id){
                
            }
        }
        return rating/$scope.instruction.rating.length;
    }
});
