angular.module('app').controller('mainCtrl', function($scope, $http) {
    $scope.data = instructionModel.data;
    $scope.limitValue = 3;
    $scope.instructionsPerPage = 3;
    $scope.sortType = 'id';
    $scope.tags = instructionModel.tags;
    console.log(instructionModel.tags);
    $scope.getUsername = function (id) {
        return userModel.getUserById(id).username;
    }
    $scope.getAuthor = function (id) {
        return userModel.getUserById(id);
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
    $scope.searchByTag = function (index) {
        var results = [];
        for(var i = 0; i < instructionModel.data.length; i++) {
            var tags = instructionModel.data[i].tags;
            for(var j = 0; j < tags.length; j++) {
                if(tags[j] == instructionModel.tags[index].tag) {
                    results.push(instructionModel.data[i].id);
                }
            }

        }
        console.log(results);
        localStorage.searchResults = results;
        $scope.$emit('changeContentUrl', { url: 'htmls/content/searchResults.html'});
    }
});
