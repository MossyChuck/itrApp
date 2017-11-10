angular.module('app').controller('mainCtrl', function($scope, $http) {
    $scope.data = instructionModel.data;
    $scope.limitValue = 3;
    $scope.instructionsPerPage = 3;
    $scope.sortType = 'id';
    $scope.getUsername = function (id) {
        return userModel.getUserById(id).username;
    }
    $scope.profile = function (id) {
        localStorage.profileId = id;
        $scope.$emit('changeContentUrl', { url: '/htmls/content/profile.html'});
    }
    $scope.openInstruction = function (id) {
        localStorage.instructionId = id;
        $scope.$emit('changeContentUrl', { url: '/htmls/content/instruction.html'});
    }
    $scope.averageRating = function (id) {
        var rating = 0;
        for(var i = 0; i<$scope.data.length; i++){
            if($scope.data[i].id == id){
                
                for(var j = 0; j < $scope.data[i].rating.length; j++) {
                    rating+=$scope.data[i].rating[j].rating;
                }
                if(!rating) return rating;
                rating/=$scope.data[i].rating.length;
                return rating;                
            }
        }
        return 0;
    }
    $scope.ratingSort = function (value){
        console.log($scope.sortType);
        return $scope.averageRating(value.id);
    }
    $scope.setSortType = function (type){
        console.log(type);
        $scope.sortType = type;
    }
});
