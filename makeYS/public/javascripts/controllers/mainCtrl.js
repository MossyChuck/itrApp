angular.module('app').controller('mainCtrl',function($scope,$http){
    userModel.load($http).then(function(responce){
        userModel.data.forEach(function(element) {
            element.email = element.email.replace('%40','@');
        }, this);
        $scope.$digest();
    })
    instructionModel.load($http,$scope).then(function(responce){
        $scope.data = responce;
        $scope.data.forEach(function(element) {
            element.steps = JSON.parse(element.steps);
        }, this);
        $scope.$digest();
    });
    $scope.getUsername = function(id){
        console.log(userModel.getUserById(instructionModel.data[0].authorId).username);
        return userModel.getUserById(instructionModel.data[0].authorId).username;
    }
});