angular.module("app").controller("routeCtrl",function($scope, $http) {
    userModel.load($http).then(function() {
        userModel.data.forEach(function(element) {
            element.email = element.email.replace('%40', '@');
        }, this);
        $scope.$digest();
    });
    instructionModel.load($http,$scope).then(function(responce) {
        $scope.data = responce;
        $scope.data.forEach(function(element) {
            element.steps = JSON.parse(element.steps);
        }, this);
        $scope.$digest();
    });
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
