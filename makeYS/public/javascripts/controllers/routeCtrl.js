angular.module("app").controller("routeCtrl",function($scope){
    $scope.url = "/htmls/main.html";
    $scope.$on('changeUrl', function(event,args){
        $scope.url = args.url;
        $scope.message = args.message;
    });
    $scope.changeUrl = function(url){
        $scope.url = url;
    }
});
