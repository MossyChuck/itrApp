angular.module("app").controller("routeCtrl",function($scope, $http) {
    $scope.contentUrl = "/htmls/content/main.html";
    $scope.headerUrl = sessionStorage.length > 0?"/htmls/headers/autorizedUser.html" : "/htmls/headers/nonAutorized.html";
    $scope.$on('changeContentUrl', function(event,args) {
        $scope.contentUrl = args.url;
        $scope.message = args.message;
    });
    $scope.$on('changeHeaderUrl', function(event,args) {
        $scope.headerUrl = args.url;
    });
    $scope.logout = function() {
        delete sessionStorage.role;
        delete sessionStorage.userId;
        $scope.headerUrl = "/htmls/headers/nonAutorized.html";
    }
    $scope.changeContentUrl = function(url) {
        $scope.contentUrl = url;
    }
    
});
