angular.module("app").controller('myProfileCtrl',function($scope,$http){
    userModel.getUsers($http,'id',sessionStorage.userId).then(function(users){
        $scope.user = users[0];
        $scope.$digest();
    }) ;
    
});