angular.module("app").controller("routeCtrl",function($scope, $http) {
    userModel.load($http).then(function() {
        $scope.$digest();
    });
    instructionModel.load($http,$scope).then(function () {
        $scope.$digest();
    });
    $scope.isAdmin = function(){
        return sessionStorage.role=='admin' ? true : false;
    }
    $scope.contentUrl = "/htmls/content/main.html";
    $scope.headerUrl = sessionStorage.userId != undefined?"/htmls/headers/autorizedUser.html" : "/htmls/headers/nonAutorized.html";
    $scope.$on('changeContentUrl', function (event,args) {
        $scope.contentUrl = args.url;
        $scope.message = args.message;
    });
    $scope.$on('changeHeaderUrl', function (event,args) {
        $scope.headerUrl = args.url;
    });
    $scope.logout = function () {
        delete sessionStorage.role;
        delete sessionStorage.userId;
        $scope.headerUrl = "/htmls/headers/nonAutorized.html";
    }
    $scope.changeContentUrl = function (url) {
        $scope.contentUrl = url;
    }
    $scope.search = function () {
        if(this.searchQuery == ''){
            return;
        }
        this.searchQuery.toLowerCase();
        var results = [];
        for(var i = 0; i < instructionModel.data.length; i++) {
            var instruction = JSON.stringify(instructionModel.data[i]);
            instruction.toLowerCase();
            if(instruction.indexOf(this.searchQuery) > -1){
                results.push(instructionModel.data[i].id);
            }
        }
        console.log(results);
        localStorage.searchResults = results;
        $scope.$emit('changeContentUrl', { url: 'htmls/content/searchResults.html'});
    }

});
