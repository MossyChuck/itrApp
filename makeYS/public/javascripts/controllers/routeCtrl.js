angular.module("app").controller("routeCtrl",function($scope){
    $scope.contentUrl = "/htmls/content/main.html";
    $scope.headerUrl = "/htmls/headers/nonAutorized.html";
    $scope.$on('changeContentUrl', function(event,args){
        $scope.contentUrl = args.url;
        $scope.message = args.message;
    });
    $scope.changeContentUrl = function(url){
        $scope.contentUrl = url;
    }
    
});
