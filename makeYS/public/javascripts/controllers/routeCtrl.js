angular.module("app").controller("routeCtrl",function($scope){
    $scope.url = "/htmls/signUp.html";
    $scope.$on('changeUrl', function(event,args){
        $scope.url = args.url;
        $scope.message = args.message;
    });
});
