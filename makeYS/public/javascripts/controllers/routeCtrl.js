angular.module("app").controller("routeCtrl",function($scope, $http){
    $scope.contentUrl = "/htmls/content/main.html";
    $scope.headerUrl = sessionStorage.length > 0?"/htmls/headers/autorizedUser.html" : "/htmls/headers/nonAutorized.html";
    userModel.getUsers($http);
    userModel.changeProperty($http,49,'verifyed',1);
    userModel.getUsers($http);
    $scope.$on('changeContentUrl', function(event,args){
        $scope.contentUrl = args.url;
        $scope.message = args.message;
        //$scope.$digest();
    });
    $scope.$on('changeHeaderUrl', function(event,args){
        $scope.headerUrl = args.url;
    });
    $scope.logout = function(){
        //sessionStorage =null;
        delete sessionStorage.role;
        delete sessionStorage.userId;
        $scope.headerUrl = "/htmls/headers/nonAutorized.html";
    }
    $scope.changeContentUrl = function(url){
        $scope.contentUrl = url;
    }
    
});
